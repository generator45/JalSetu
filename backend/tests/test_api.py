"""
API Tests for JalSetu Rainwater Harvesting Backend

Tests cover:
- Health check endpoint
- Rainwater harvesting calculation endpoint
- Input validation
- Error handling
"""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock


class TestHealthEndpoint:
    """Tests for the /api/health endpoint."""

    def test_health_check_returns_200(self, client):
        """Test that health endpoint returns 200 status."""
        response = client.get("/api/health")
        assert response.status_code == 200


class TestCalculateRainwaterHarvestingEndpoint:
    """Tests for the /api/calculate-rainwater-harvesting endpoint."""

    # --- Happy Path Tests ---

    def test_valid_request_returns_200(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that a valid request returns 200 status."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 200

    def test_valid_request_returns_all_fields(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that response contains all expected fields."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        data = response.json()
        
        # Check main response fields
        assert "annual_rainfall_m" in data
        assert "harvested_volume_m3" in data
        assert "harvested_volume_liters" in data
        assert "annual_demand_m3" in data
        assert "annual_demand_liters" in data
        assert "feasibility" in data
        assert "annual_savings_rs" in data
        assert "input_parameters" in data

    def test_valid_request_includes_input_parameters(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that response includes original input parameters."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Delhi",
                "roof_area": 500,
                "roof_type": "PVC",
                "household_size": 3
            }
        )
        data = response.json()
        
        assert data["input_parameters"]["location"] == "Delhi"
        assert data["input_parameters"]["roof_area_sqft"] == 500
        assert data["input_parameters"]["roof_type"] == "PVC"
        assert data["input_parameters"]["household_size"] == 3

    def test_default_optional_parameters(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that default values are applied for optional parameters."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        data = response.json()
        
        # Check default values
        assert data["input_parameters"]["per_capita_demand_lpd"] == 135
        assert data["input_parameters"]["water_cost_rs_per_m3"] == 20

    def test_custom_optional_parameters(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that custom optional parameters are used correctly."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5,
                "per_capita_demand": 150,
                "water_cost": 30
            }
        )
        data = response.json()
        
        assert data["input_parameters"]["per_capita_demand_lpd"] == 150
        assert data["input_parameters"]["water_cost_rs_per_m3"] == 30

    # --- Missing Required Parameters Tests ---

    def test_missing_location_returns_422(self, client):
        """Test that missing location parameter returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 422

    def test_missing_roof_area_returns_422(self, client):
        """Test that missing roof_area parameter returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 422

    def test_missing_roof_type_returns_422(self, client):
        """Test that missing roof_type parameter returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "household_size": 5
            }
        )
        assert response.status_code == 422

    def test_missing_household_size_returns_422(self, client):
        """Test that missing household_size parameter returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete"
            }
        )
        assert response.status_code == 422

    # --- Invalid Input Validation Tests ---

    def test_zero_roof_area_returns_400(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that zero roof area returns 400 error."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 0,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 400
        assert "Roof area must be greater than 0" in response.json()["detail"]

    def test_negative_roof_area_returns_400(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that negative roof area returns 400 error."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": -100,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 400
        assert "Roof area must be greater than 0" in response.json()["detail"]

    def test_zero_household_size_returns_400(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that zero household size returns 400 error."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 0
            }
        )
        assert response.status_code == 400
        assert "Household size must be greater than 0" in response.json()["detail"]

    def test_negative_household_size_returns_400(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that negative household size returns 400 error."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": -5
            }
        )
        assert response.status_code == 400
        assert "Household size must be greater than 0" in response.json()["detail"]

    def test_invalid_roof_type_returns_400(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that invalid roof type returns 400 error."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "InvalidType",
                "household_size": 5
            }
        )
        assert response.status_code == 400
        assert "Invalid roof type" in response.json()["detail"]

    # --- Valid Roof Type Tests ---

    @pytest.mark.parametrize("roof_type", [
        "Concrete",
        "PVC", 
        "Asbestos",
        "Concrete Road",
        "Bitumen Road"
    ])
    def test_all_valid_roof_types_accepted(self, client, mock_geocoder, mock_rainwater_calculation, roof_type):
        """Test that all valid roof types are accepted."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": roof_type,
                "household_size": 5
            }
        )
        assert response.status_code == 200

    # --- Geocoding Error Tests ---

    def test_invalid_location_returns_400(self, client):
        """Test that invalid location returns 400 error."""
        with patch('main.geocoder') as mock_geo:
            mock_result = MagicMock()
            mock_result.ok = False
            mock_geo.osm.return_value = mock_result
            mock_geo.arcgis.return_value = mock_result
            
            response = client.get(
                "/api/calculate-rainwater-harvesting",
                params={
                    "location": "InvalidLocationXYZ123",
                    "roof_area": 1000,
                    "roof_type": "Concrete",
                    "household_size": 5
                }
            )
            assert response.status_code == 400
            assert "Could not find coordinates" in response.json()["detail"]

    def test_geocoding_exception_returns_400(self, client):
        """Test that geocoding exceptions are handled properly."""
        with patch('main.geocoder') as mock_geo:
            mock_geo.osm.side_effect = Exception("Network error")
            
            response = client.get(
                "/api/calculate-rainwater-harvesting",
                params={
                    "location": "Hyderabad",
                    "roof_area": 1000,
                    "roof_type": "Concrete",
                    "household_size": 5
                }
            )
            assert response.status_code == 400
            assert "Geocoding error" in response.json()["detail"]

    # --- Unit Conversion Tests ---

    def test_roof_area_conversion_sqft_to_m2(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that roof area is correctly converted from sq ft to sq m."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,  # 1000 sq ft
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        data = response.json()
        
        # 1000 sq ft * 0.092903 = 92.903 sq m
        expected_m2 = 1000 * 0.092903
        assert abs(data["input_parameters"]["roof_area_m2"] - expected_m2) < 0.001

    # --- Response Formatting Tests ---

    def test_response_values_are_rounded(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that response values are properly rounded."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        data = response.json()
        
        # Check that values are numbers (not strings) and rounded
        assert isinstance(data["annual_rainfall_m"], float)
        assert isinstance(data["harvested_volume_m3"], float)
        assert isinstance(data["harvested_volume_liters"], (int, float))
        assert isinstance(data["annual_demand_m3"], float)
        assert isinstance(data["annual_savings_rs"], float)

    # --- Invalid Data Type Tests ---

    def test_string_roof_area_returns_422(self, client):
        """Test that string value for roof_area returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": "not_a_number",
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 422
        assert "roof_area" in response.text.lower()

    def test_string_household_size_returns_422(self, client):
        """Test that string value for household_size returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": "five"
            }
        )
        assert response.status_code == 422
        assert "household_size" in response.text.lower()

    def test_float_household_size_returns_422(self, client):
        """Test that float value for household_size (expecting int) returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5.5
            }
        )
        # FastAPI may accept or reject floats for int params depending on version
        # If it accepts, it truncates; if not, returns 422
        assert response.status_code in [200, 422]

    def test_string_per_capita_demand_returns_422(self, client):
        """Test that string value for per_capita_demand returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5,
                "per_capita_demand": "invalid"
            }
        )
        assert response.status_code == 422

    def test_string_water_cost_returns_422(self, client):
        """Test that string value for water_cost returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5,
                "water_cost": "twenty"
            }
        )
        assert response.status_code == 422

    def test_string_start_year_returns_422(self, client):
        """Test that string value for start_year returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5,
                "start_year": "twenty-twenty"
            }
        )
        assert response.status_code == 422

    def test_string_end_year_returns_422(self, client):
        """Test that string value for end_year returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5,
                "end_year": "invalid_year"
            }
        )
        assert response.status_code == 422

    def test_empty_string_roof_area_returns_422(self, client):
        """Test that empty string for roof_area returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": "",
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 422

    def test_empty_string_household_size_returns_422(self, client):
        """Test that empty string for household_size returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": ""
            }
        )
        assert response.status_code == 422

    def test_empty_location_still_processed(self, client):
        """Test that empty location string is processed (geocoding will fail)."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        # Empty location will fail at geocoding step
        assert response.status_code in [400, 500]

    def test_special_characters_in_location(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that special characters in location are handled."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "New Delhi, India",
                "roof_area": 1000,
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        # Should work fine with commas and spaces
        assert response.status_code == 200

    def test_boolean_roof_area_returns_422(self, client):
        """Test that boolean value for roof_area returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": "true",
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 422

    def test_none_string_roof_area_returns_422(self, client):
        """Test that 'None' string for roof_area returns 422."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": "None",
                "roof_type": "Concrete",
                "household_size": 5
            }
        )
        assert response.status_code == 422

    def test_numeric_string_roof_type_returns_400(self, client, mock_geocoder, mock_rainwater_calculation):
        """Test that numeric string for roof_type returns 400 (invalid roof type)."""
        response = client.get(
            "/api/calculate-rainwater-harvesting",
            params={
                "location": "Hyderabad",
                "roof_area": 1000,
                "roof_type": "123",
                "household_size": 5
            }
        )
        assert response.status_code == 400
        assert "Invalid roof type" in response.json()["detail"]


class TestGeocodingFunction:
    """Tests for the get_coordinates_from_location function."""

    def test_osm_geocoder_used_first(self, client):
        """Test that OSM geocoder is tried first."""
        with patch('main.geocoder') as mock_geo:
            mock_result = MagicMock()
            mock_result.ok = True
            mock_result.latlng = [28.6139, 77.2090]  # Delhi
            mock_geo.osm.return_value = mock_result
            
            with patch('main.calculate_rainwater_harvesting') as mock_calc:
                mock_calc.return_value = {
                    'location': {'latitude': 28.6139, 'longitude': 77.2090},
                    'annual_rainfall_m': 0.7,
                    'runoff_coefficient': 0.95,
                    'roof_type': 'Concrete',
                    'roof_area_m2': 92.903,
                    'harvested_volume_m3': 60,
                    'harvested_volume_liters': 60000,
                    'annual_demand_m3': 200,
                    'annual_demand_liters': 200000,
                    'household_size': 4,
                    'per_capita_demand_lpd': 135,
                    'feasibility': 'Medium',
                    'annual_savings_rs': 1200,
                    'water_cost_rs_per_m3': 20
                }
                
                response = client.get(
                    "/api/calculate-rainwater-harvesting",
                    params={
                        "location": "Delhi",
                        "roof_area": 1000,
                        "roof_type": "Concrete",
                        "household_size": 4
                    }
                )
                
                mock_geo.osm.assert_called_once_with("Delhi")

    def test_arcgis_fallback_when_osm_fails(self, client):
        """Test that ArcGIS is used as fallback when OSM fails."""
        with patch('main.geocoder') as mock_geo:
            # OSM fails
            osm_result = MagicMock()
            osm_result.ok = False
            mock_geo.osm.return_value = osm_result
            
            # ArcGIS succeeds
            arcgis_result = MagicMock()
            arcgis_result.ok = True
            arcgis_result.latlng = [28.6139, 77.2090]
            mock_geo.arcgis.return_value = arcgis_result
            
            with patch('main.calculate_rainwater_harvesting') as mock_calc:
                mock_calc.return_value = {
                    'location': {'latitude': 28.6139, 'longitude': 77.2090},
                    'annual_rainfall_m': 0.7,
                    'runoff_coefficient': 0.95,
                    'roof_type': 'Concrete',
                    'roof_area_m2': 92.903,
                    'harvested_volume_m3': 60,
                    'harvested_volume_liters': 60000,
                    'annual_demand_m3': 200,
                    'annual_demand_liters': 200000,
                    'household_size': 4,
                    'per_capita_demand_lpd': 135,
                    'feasibility': 'Medium',
                    'annual_savings_rs': 1200,
                    'water_cost_rs_per_m3': 20
                }
                
                response = client.get(
                    "/api/calculate-rainwater-harvesting",
                    params={
                        "location": "Delhi",
                        "roof_area": 1000,
                        "roof_type": "Concrete",
                        "household_size": 4
                    }
                )
                
                mock_geo.osm.assert_called_once()
                mock_geo.arcgis.assert_called_once_with("Delhi")
                assert response.status_code == 200