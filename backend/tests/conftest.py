import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)


@pytest.fixture
def mock_geocoder():
    """Mock geocoder to avoid real API calls during testing."""
    with patch('main.geocoder') as mock:
        mock_result = MagicMock()
        mock_result.ok = True
        mock_result.latlng = [17.30, 78.54]  # Hyderabad coordinates
        mock.osm.return_value = mock_result
        mock.arcgis.return_value = mock_result
        yield mock


@pytest.fixture
def mock_rainwater_calculation():
    """Mock the rainwater harvesting calculation function."""
    with patch('main.calculate_rainwater_harvesting') as mock:
        mock.return_value = {
            'location': {
                'latitude': 17.30,
                'longitude': 78.54
            },
            'annual_rainfall_m': 0.8,
            'runoff_coefficient': 0.95,
            'roof_type': 'Concrete',
            'roof_area_m2': 92.903,
            'harvested_volume_m3': 70.6,
            'harvested_volume_liters': 70600,
            'annual_demand_m3': 246.375,
            'annual_demand_liters': 246375,
            'household_size': 5,
            'per_capita_demand_lpd': 135,
            'feasibility': 'Medium',
            'annual_savings_rs': 1412.0,
            'water_cost_rs_per_m3': 20
        }
        yield mock
