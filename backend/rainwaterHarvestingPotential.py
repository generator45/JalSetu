import imdlib as imd

def calculate_rainwater_harvesting(latitude, longitude, roof_area_m2, roof_type, 
                                  household_size, per_capita_demand_lpd=135, 
                                  water_cost_rs_per_m3=500, start_year=2020, end_year=2020):
    """
    Calculate rainwater harvesting potential and feasibility for a given location.
    
    Args:
        latitude (float): Latitude of the location
        longitude (float): Longitude of the location
        roof_area_m2 (float): Roof area in square meters
        roof_type (str): Type of roof (Concrete, PVC, Asbestos, Concrete Road, Bitumen Road)
        household_size (int): Number of people in the household
        per_capita_demand_lpd (float): Per capita water demand in liters per day (default: 135)
        water_cost_rs_per_m3 (float): Cost of water per cubic meter in Rs (default: 20)
        start_year (int): Start year for rainfall data (default: 2020)
        end_year (int): End year for rainfall data (default: 2020)
    
    Returns:
        dict: Dictionary containing all the calculated results
    """
    
    # Runoff coefficients (based on roof type)
    runoff_coeff = {
        "Concrete": 0.95,
        "PVC": 0.98,
        "Asbestos": 0.85,
        "Concrete Road": 0.95,
        "Bitumen Road": 0.95
    }
    Cr = runoff_coeff.get(roof_type, 0.9)

    # ------------------------------
    # Step 2: Download Rainfall Data
    # ------------------------------
    rain_data = imd.get_data('rain', start_year, end_year, fn_format='yearwise')

    # Convert to xarray
    rain_dataset = rain_data.get_xarray()

    # ------------------------------
    # Step 3: Extract Rainfall for Location
    # ------------------------------
    # Extract rainfall time series (mm) for the nearest grid point
    rain_series_mm = rain_dataset.sel(lat=latitude, lon=longitude, method="nearest")['rain']

    # Clean missing values (-999)
    rain_series_mm = rain_series_mm.where(rain_series_mm != -999.0, drop=True)

    # Compute annual rainfall (mm → m)
    annual_rainfall_m = float(rain_series_mm.sum().values) / 1000.0

    # ------------------------------
    # Step 4: Apply Harvesting Formula
    # ------------------------------
    # Harvested water volume in cubic meters
    harvested_volume_m3 = annual_rainfall_m * roof_area_m2 * Cr
    harvested_volume_liters = harvested_volume_m3 * 1000

    # ------------------------------
    # Step 5: Compare with Demand
    # ------------------------------
    annual_demand_liters = household_size * per_capita_demand_lpd * 365
    annual_demand_m3 = annual_demand_liters / 1000

    # ------------------------------
    # Step 6: Calculate Savings
    # ------------------------------
    annual_savings_rs = harvested_volume_m3 * water_cost_rs_per_m3
    
    # Determine feasibility
    if annual_demand_m3 > 0:  # avoid division by zero
        ratio = harvested_volume_m3 / annual_demand_m3
    else:
        ratio = 0

    # Classify feasibility
    if ratio < 0.3:
        feasibility = "Low"
    elif 0.3 <= ratio < 0.7:
        feasibility = "Medium"
    else:
        feasibility = "High"

    # Return all results as a dictionary
    return {
        'location': {
            'latitude': latitude,
            'longitude': longitude
        },
        'annual_rainfall_m': annual_rainfall_m,
        'runoff_coefficient': Cr,
        'roof_type': roof_type,
        'roof_area_m2': roof_area_m2,
        'harvested_volume_m3': harvested_volume_m3,
        'harvested_volume_liters': harvested_volume_liters,
        'annual_demand_m3': annual_demand_m3,
        'annual_demand_liters': annual_demand_liters,
        'household_size': household_size,
        'per_capita_demand_lpd': per_capita_demand_lpd,
        'feasibility': feasibility,
        'annual_savings_rs': annual_savings_rs,
        'water_cost_rs_per_m3': water_cost_rs_per_m3
    }

# Example usage
if __name__ == "__main__":
    # Example parameters
    latitude = 17.30          # Example: Hyderabad
    longitude = 78.54
    roof_area_m2 = 100        # m²
    roof_type = "Concrete"    # Concrete, PVC, Asbestos, Road
    household_size = 5        # people
    per_capita_demand_lpd = 135  # liters per day (BIS standard)
    water_cost_rs_per_m3 = 20    # Rs per cubic meter
    
    # Calculate results
    results = calculate_rainwater_harvesting(
        latitude, longitude, roof_area_m2, roof_type, 
        household_size, per_capita_demand_lpd, water_cost_rs_per_m3
    )
    
    # Print results (same format as before)
    print("Location:", results['location']['latitude'], results['location']['longitude'])
    print(f"Annual Rainfall: {results['annual_rainfall_m']:.2f} m")
    print(f"Runoff Coefficient (Cr): {results['runoff_coefficient']}")
    print(f"Harvested Water: {results['harvested_volume_m3']:.2f} m³/year ({results['harvested_volume_liters']:.0f} liters)")
    print(f"Household Demand: {results['annual_demand_m3']:.2f} m³/year ({results['annual_demand_liters']:.0f} liters)")
    print("Feasibility:", results['feasibility'])
    print(f"Estimated Monetary Saving: ₹{results['annual_savings_rs']:.2f}/year")
