import { MapPin, Home, Square, Hammer, Users } from 'lucide-react';

const Report = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Rainwater Harvesting Report
          </h1>
          <p className="text-xl text-gray-600">
            Enter your details below to generate a comprehensive feasibility report
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Check Potential
          </h3>
          
          <form className="space-y-6">
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
                  placeholder="Enter your location"
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
                  placeholder="Enter roof area"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Second Row - Open Area and Roof Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="openArea"
                  className="text-gray-700 font-medium mb-2 flex items-center gap-2"
                >
                  <Square size={18} className="text-emerald-600" />
                  Open Area (sq ft)
                </label>
                <input
                  type="number"
                  id="openArea"
                  placeholder="Enter open area"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>

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
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="" className="text-gray-500">Select roof type</option>
                  <option value="Concrete">Concrete</option>
                  <option value="PVC">PVC</option>
                  <option value="Asbestos">Asbestos</option>
                  <option value="Concrete Road">Concrete Road</option>
                  <option value="Bitumen Road">Bitumen Road</option>
                </select>
              </div>
            </div>

            {/* Third Row - Number of Dwellers */}
            <div className="grid grid-cols-1 gap-6">
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
                  placeholder="Enter number of dwellers"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:cursor-pointer hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
              >
                Generate Report
              </button>
              
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-emerald-800 mb-3">
            What you'll get in your report:
          </h4>
          <ul className="space-y-2 text-emerald-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Annual rainfall data for your location
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Estimated water harvesting potential
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Cost-benefit analysis and ROI calculations
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Implementation recommendations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Report;
