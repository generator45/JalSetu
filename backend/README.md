# JalSetu Backend API

FastAPI backend for calculating rainwater harvesting potential.

## Setup and Installation

### Prerequisites
- Python 3.8+
- pip

### Quick Start

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server:**
   ```bash
   python main.py
   ```
   
   Or use the convenience script:
   ```bash
   ./run.sh
   ```

4. **Access the API:**
   - API Server: http://localhost:8000
   - Interactive Documentation: http://localhost:8000/docs
   - Alternative Documentation: http://localhost:8000/redoc

## API Endpoints

### Main Endpoint
- **GET** `/api/calculate-rainwater-harvesting`
  - Calculate rainwater harvesting potential for a location
  - Parameters:
    - `location` (required): Location name (e.g., "Delhi", "Hyderabad")
    - `roof_area` (required): Roof area in square feet
    - `roof_type` (required): Type of roof (Concrete, PVC, Asbestos, Concrete Road, Bitumen Road)
    - `household_size` (required): Number of people in household
    - `per_capita_demand` (optional): Per capita water demand in L/day (default: 135)
    - `water_cost` (optional): Cost of water per cubic meter in Rs (default: 20)

### Example Request
```
GET /api/calculate-rainwater-harvesting?location=Hyderabad&roof_area=1000&roof_type=Concrete&household_size=4
```

### Health Check
- **GET** `/api/health` - Check if the API is running
- **GET** `/` - Root endpoint

## Features

- **Location-based calculations**: Automatically converts location names to coordinates
- **Multiple roof types**: Supports different runoff coefficients
- **Unit conversion**: Automatically converts square feet to square meters
- **Comprehensive results**: Returns detailed calculations including:
  - Annual rainfall data
  - Water harvesting potential
  - Demand analysis
  - Feasibility assessment
  - Cost savings

## Dependencies

- FastAPI: Web framework
- Uvicorn: ASGI server
- Geocoder: Location to coordinates conversion
- imdlib: Indian Meteorological Department rainfall data
- xarray, numpy, pandas: Data processing

## CORS Configuration

The API is configured to accept requests from:
- http://localhost:3000 (Create React App)
- http://localhost:5173 (Vite)

## Error Handling

The API includes comprehensive error handling for:
- Invalid input parameters
- Geocoding failures
- Data processing errors
- Network issues
