# JalSetu Backend - Rainwater Harvesting API

API for calculating rainwater harvesting potential based on location, roof parameters, and household data.

## Project Structure

```text
backend/
├── main.py                         # FastAPI application with endpoints
├── rainwaterHarvestingPotential.py # Core calculation logic
├── rwhMethod.py                    # Supporting methods
├── requirements.txt                # Python dependencies
├── run.sh                          # Setup and run script
├── rain/
│   └── 2020.grd                    # Rainfall data file
└── tests/
    ├── __init__.py
    ├── conftest.py                 # Test fixtures
    └── test_api.py                 # API tests
```

## Setup

### Prerequisites

- Python 3.x installed

### Installation

1. **Virtual environment**:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the server**:

   ```bash
   python3 main.py
   ```

4. **Server details**:
   - API runs on: `http://localhost:8000`
   - Swagger UI docs: `http://localhost:8000/docs`

---

## API Endpoints

### Health Check

| Endpoint      | Method | Description           |
| ------------- | ------ | --------------------- |
| `/api/health` | GET    | Health check endpoint |

**Response:**

```json
{ "status": "healthy", "message": "API is working correctly" }
```

---

### Calculate Rainwater Harvesting

| Endpoint                              | Method | Description                              |
| ------------------------------------- | ------ | ---------------------------------------- |
| `/api/calculate-rainwater-harvesting` | GET    | Calculate rainwater harvesting potential |

#### Required Parameters

| Parameter        | Type   | Description                                                            |
| ---------------- | ------ | ---------------------------------------------------------------------- |
| `location`       | string | Location name (e.g., "Delhi", "Hyderabad")                             |
| `roof_area`      | float  | Roof area in square feet                                               |
| `roof_type`      | string | One of: `Concrete`, `PVC`, `Asbestos`, `Concrete Road`, `Bitumen Road` |
| `household_size` | int    | Number of people in household                                          |

#### Optional Parameters

| Parameter           | Type  | Default | Description                          |
| ------------------- | ----- | ------- | ------------------------------------ |
| `per_capita_demand` | float | 135     | Per capita water demand (liters/day) |
| `water_cost`        | float | 20      | Cost of water (Rs/m³)                |
| `start_year`        | int   | 2020    | Start year for rainfall data         |
| `end_year`          | int   | 2020    | End year for rainfall data           |

#### Example Request

```http
GET /api/calculate-rainwater-harvesting?location=Hyderabad&roof_area=1000&roof_type=Concrete&household_size=5
```

#### Response Fields

| Field                     | Description                                 |
| ------------------------- | ------------------------------------------- |
| `annual_rainfall_m`       | Annual rainfall in meters                   |
| `harvested_volume_m3`     | Harvestable water volume in cubic meters    |
| `harvested_volume_liters` | Harvestable water volume in liters          |
| `annual_demand_m3`        | Annual water demand in cubic meters         |
| `annual_demand_liters`    | Annual water demand in liters               |
| `feasibility`             | Feasibility rating (e.g., "Medium", "High") |
| `annual_savings_rs`       | Annual cost savings in rupees               |
| `input_parameters`        | Echo of input values                        |

---

## Testing

### Test Framework

- **pytest** with FastAPI TestClient

### Run Tests with Verbose Output

```bash
python3 pytest tests/ -v
```

### Test Coverage

| Test Class                                 | Description                             |
| ------------------------------------------ | --------------------------------------- |
| `TestHealthEndpoint`                       | Tests for `/api/health` endpoint        |
| `TestCalculateRainwaterHarvestingEndpoint` | Tests for the main calculation endpoint |

**Test categories include:**

- Happy path tests (valid requests)
- Input validation tests
- Error handling tests
- Default parameter verification
- Response field validation
