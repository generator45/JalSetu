from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from typing import Optional
import geocoder
from rainwaterHarvestingPotential import calculate_rainwater_harvesting

app = FastAPI(
    title="JalSetu - Rainwater Harvesting API",
    description="API for calculating rainwater harvesting potential",
    version="1.0.0"
)

# Add CORS middleware to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

def get_coordinates_from_location(location: str):
    """
    Convert location string to latitude and longitude using geocoding
    """
    try:
        # Use geocoder to get coordinates from location name
        g = geocoder.osm(location)
        if g.ok:
            return g.latlng[0], g.latlng[1]  # latitude, longitude
        else:
            # Fallback: try with different geocoding service
            g = geocoder.arcgis(location)
            if g.ok:
                return g.latlng[0], g.latlng[1]
            else:
                raise ValueError(f"Could not find coordinates for location: {location}")
    except Exception as e:
        raise ValueError(f"Geocoding error: {str(e)}")

@app.get("/")
async def root():
    """
    Root endpoint to check if API is running
    """
    return {"message": "JalSetu Rainwater Harvesting API is running!"}

@app.get("/api/calculate-rainwater-harvesting")
async def calculate_rainwater_harvesting_api(
    location: str = Query(..., description="Location name (e.g., 'Delhi', 'Hyderabad')"),
    roof_area: float = Query(..., description="Roof area in square feet"),
    roof_type: str = Query(..., description="Type of roof (Concrete, PVC, Asbestos, Concrete Road, Bitumen Road)"),
    household_size: int = Query(..., description="Number of people in household"),
    per_capita_demand: Optional[float] = Query(135, description="Per capita water demand in liters per day"),
    water_cost: Optional[float] = Query(20, description="Cost of water per cubic meter in Rs"),
    start_year: Optional[int] = Query(2020, description="Start year for rainfall data"),
    end_year: Optional[int] = Query(2020, description="End year for rainfall data")
):
    """
    Calculate rainwater harvesting potential for a given location and parameters
    """
    try:
        # Convert location to coordinates
        latitude, longitude = get_coordinates_from_location(location)
        
        # Convert roof area from square feet to square meters
        roof_area_m2 = roof_area * 0.092903  # 1 sq ft = 0.092903 sq m
        
        # Validate inputs
        if roof_area <= 0:
            raise HTTPException(status_code=400, detail="Roof area must be greater than 0")
        
        if household_size <= 0:
            raise HTTPException(status_code=400, detail="Household size must be greater than 0")
        
        if roof_type not in ["Concrete", "PVC", "Asbestos", "Concrete Road", "Bitumen Road"]:
            raise HTTPException(status_code=400, detail="Invalid roof type")
        
        # Call the rainwater harvesting calculation function
        results = calculate_rainwater_harvesting(
            latitude=latitude,
            longitude=longitude,
            roof_area_m2=roof_area_m2,
            roof_type=roof_type,
            household_size=household_size,
            per_capita_demand_lpd=per_capita_demand,
            water_cost_rs_per_m3=water_cost,
            start_year=start_year,
            end_year=end_year
        )
        
        # Add original input values to the response
        results['input_parameters'] = {
            'location': location,
            'roof_area_sqft': roof_area,
            'roof_area_m2': roof_area_m2,
            'roof_type': roof_type,
            'household_size': household_size,
            'per_capita_demand_lpd': per_capita_demand,
            'water_cost_rs_per_m3': water_cost
        }
        
        # Format numbers for better readability
        formatted_results = {
            **results,
            'annual_rainfall_m': round(results['annual_rainfall_m'], 3),
            'harvested_volume_m3': round(results['harvested_volume_m3'], 2),
            'harvested_volume_liters': round(results['harvested_volume_liters'], 0),
            'annual_demand_m3': round(results['annual_demand_m3'], 2),
            'annual_demand_liters': round(results['annual_demand_liters'], 0),
            'annual_savings_rs': round(results['annual_savings_rs'], 2)
        }
        
        return JSONResponse(content=formatted_results)
        
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "message": "API is working correctly"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
