import { MapPin, Home, Hammer, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FormData {
  location: string;
  roofArea: number;
  roofType: string;
  dwellers: number;
}

interface ReportResult {
  location: {
    latitude: number;
    longitude: number;
  };
  annual_rainfall_m: number;
  runoff_coefficient: number;
  roof_type: string;
  roof_area_m2: number;
  harvested_volume_m3: number;
  harvested_volume_liters: number;
  annual_demand_m3: number;
  annual_demand_liters: number;
  household_size: number;
  per_capita_demand_lpd: number;
  feasibility: string;
  annual_savings_rs: number;
  water_cost_rs_per_m3: number;
  input_parameters: {
    location: string;
    roof_area_sqft: number;
    roof_area_m2: number;
    roof_type: string;
    household_size: number;
    per_capita_demand_lpd: number;
    water_cost_rs_per_m3: number;
  };
}

function Report() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    location: "",
    roofArea: 0,
    roofType: "",
    dwellers: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReportResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Populate form from query parameters on component mount
  useEffect(() => {
    const location = searchParams.get("location");
    const roofArea = searchParams.get("roofArea");
    const roofType = searchParams.get("roofType");
    const dwellers = searchParams.get("dwellers");

    if (location || roofArea || roofType || dwellers) {
      setFormData({
        location: location || "",
        roofArea: roofArea ? parseFloat(roofArea) : 0,
        roofType: roofType || "",
        dwellers: dwellers ? parseFloat(dwellers) : 0,
      });
    }

    if (location && roofArea && roofType && dwellers) {
      generateReport({
        location,
        roofArea: parseFloat(roofArea),
        roofType,
        dwellers: parseFloat(dwellers),
      });
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "roofArea" || name === "dwellers"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const generateQuery = (data: FormData) => {
    // Create query parameters for your backend API
    const queryParams = new URLSearchParams({
      location: data.location,
      roof_area: data.roofArea.toString(),
      roof_type: data.roofType,
      household_size: data.dwellers.toString(),
      // You can add more parameters as needed
      per_capita_demand: "135", // Default BIS standard
      water_cost: "500", // Default cost per cubic meter
    });

    return queryParams.toString();
  };

  async function generateReport(data: FormData) {
    setIsLoading(true);
    setError(null);
    setShowResult(false);

    try {
      // Validate form data
      if (
        !data.location ||
        !data.roofType ||
        data.roofArea <= 0 ||
        data.dwellers <= 0
      ) {
        throw new Error("Please fill in all required fields with valid values");
      }

      // Generate query string for backend API
      const queryString = generateQuery(data);

      // Your backend URL
      const backendUrl = `${
        import.meta.env.VITE_API_URL || "http://localhost:8000"
      }/api/calculate-rainwater-harvesting?${queryString}`;

      console.log("Making API call to:", backendUrl);

      // Make the actual API call
      const response = await fetch(backendUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate report");
      }

      const apiResult = await response.json();
      console.log("Backend Response:", apiResult);

      // Set the result and show it
      setResult(apiResult);
      setShowResult(true);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while generating the report"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    generateReport(formData);
  };
  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Rainwater Harvesting Report
          </h1>
          <p className="text-xl text-gray-600">
            Enter your details below to generate a comprehensive feasibility
            report
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Check Potential
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* First Row - Location and Roof Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                >
                  <MapPin size={18} className="text-emerald-600" />
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="roofArea"
                  className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                >
                  <Home size={18} className="text-emerald-600" />
                  Roof Area (sq ft)
                </label>
                <input
                  type="number"
                  id="roofArea"
                  name="roofArea"
                  value={formData.roofArea || ""}
                  onChange={handleInputChange}
                  placeholder="Enter roof area"
                  min="1"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Second Row - Roof Type and Number of Dwellers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="roofType"
                  className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                >
                  <Hammer size={18} className="text-emerald-600" />
                  Roof Type
                </label>
                <select
                  id="roofType"
                  name="roofType"
                  value={formData.roofType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select roof type</option>
                  <option value="Concrete">Concrete</option>
                  <option value="PVC">PVC</option>
                  <option value="Asbestos">Asbestos</option>
                  <option value="Concrete Road">Concrete Road</option>
                  <option value="Bitumen Road">Bitumen Road</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dwellers"
                  className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                >
                  <Users size={18} className="text-emerald-600" />
                  Number of Dwellers
                </label>
                <input
                  type="number"
                  id="dwellers"
                  name="dwellers"
                  value={formData.dwellers || ""}
                  onChange={handleInputChange}
                  placeholder="Enter number of dwellers"
                  min="1"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:cursor-pointer hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
              >
                {isLoading ? "Generating Report..." : "Generate Report"}
              </button>
            </div>
          </form>
        </div>

        {/* Loading UI */}
        {isLoading && (
          <div className="mt-8 bg-white rounded-xl shadow-2xl p-12 border border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Loading Animation */}
              <div className="relative">
                <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin">
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-emerald-600 rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">🌧️</div>
                </div>
              </div>

              {/* Loading Text with Animation */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Generating Your Report
                </h3>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-gray-600">Analyzing rainfall data</span>
                  <div className="flex space-x-1">
                    <div
                      className="w-1 h-1 bg-emerald-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-emerald-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-emerald-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Processing Location</span>
                  <span>Calculating Results</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full animate-pulse"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              {/* Loading Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-emerald-800">
                      Location Found
                    </div>
                    <div className="text-sm text-emerald-600">
                      Geocoding complete
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-spin">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">
                      Fetching Data
                    </div>
                    <div className="text-sm text-blue-600">
                      Rainfall analysis
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">
                      Generating Report
                    </div>
                    <div className="text-sm text-gray-500">
                      Final calculations
                    </div>
                  </div>
                </div>
              </div>

              {/* Fun Facts While Loading */}
              <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-lg p-4 max-w-lg text-center">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  💡 Did you know?
                </div>
                <div className="text-sm text-gray-600">
                  Rainwater harvesting can reduce your water bill by up to 50%
                  and help conserve precious groundwater resources!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {showResult && result && (
          <div className="mt-8 bg-white rounded-xl shadow-2xl p-8 border border-gray-200 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                📊 Rainwater Harvesting Report
              </h2>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${
                  result.feasibility === "High"
                    ? "bg-green-100 text-green-800"
                    : result.feasibility === "Medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {result.feasibility === "High"
                  ? "✅"
                  : result.feasibility === "Medium"
                  ? "⚠️"
                  : "❌"}{" "}
                Feasibility: {result.feasibility}
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="text-blue-600 text-2xl mb-2">🌧️</div>
                <div className="text-2xl font-bold text-blue-800">
                  {result.annual_rainfall_m.toFixed(2)}m
                </div>
                <div className="text-blue-600 text-sm">Annual Rainfall</div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                <div className="text-emerald-600 text-2xl mb-2">💧</div>
                <div className="text-2xl font-bold text-emerald-800">
                  {result.harvested_volume_m3.toFixed(1)}m³
                </div>
                <div className="text-emerald-600 text-sm">
                  Water Harvested/Year
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="text-purple-600 text-2xl mb-2">🏠</div>
                <div className="text-2xl font-bold text-purple-800">
                  {result.annual_demand_m3.toFixed(1)}m³
                </div>
                <div className="text-purple-600 text-sm">Annual Demand</div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                <div className="text-amber-600 text-2xl mb-2">💰</div>
                <div className="text-2xl font-bold text-amber-800">
                  ₹{result.annual_savings_rs.toFixed(0)}
                </div>
                <div className="text-amber-600 text-sm">Annual Savings</div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Location & Input Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">📍 Location:</span>
                    <span className="font-medium">
                      {result.input_parameters.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🏠 Roof Area:</span>
                    <span className="font-medium">
                      {result.input_parameters.roof_area_sqft} sq ft (
                      {result.roof_area_m2.toFixed(1)} m²)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🔨 Roof Type:</span>
                    <span className="font-medium">{result.roof_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">👥 Household Size:</span>
                    <span className="font-medium">
                      {result.household_size} people
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ⚡ Runoff Coefficient:
                    </span>
                    <span className="font-medium">
                      {(result.runoff_coefficient * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Water Analysis */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Water Analysis
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">💧 Harvested Volume:</span>
                    <span className="font-medium">
                      {result.harvested_volume_liters.toFixed(0)} L/year
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🚰 Daily Demand:</span>
                    <span className="font-medium">
                      {(result.annual_demand_liters / 365).toFixed(0)} L/day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">👤 Per Capita Demand:</span>
                    <span className="font-medium">
                      {result.per_capita_demand_lpd} L/person/day
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">💸 Water Cost:</span>
                    <span className="font-medium">
                      ₹{result.water_cost_rs_per_m3}/m³
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800">💰 Total Savings:</span>
                    <span className="text-emerald-600">
                      ₹{result.annual_savings_rs.toFixed(0)}/year
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowResult(false)}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Generate New Report
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Print Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
