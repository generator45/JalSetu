import { MapPin, Home, Hammer, Users } from "lucide-react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  function redirectToReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);
    const location = formData.get("location") as string;
    const roofArea = formData.get("roofArea") as string;
    const roofType = formData.get("roofType") as string;
    const dwellers = formData.get("dwellers") as string;

    // Validate required fields
    if (!location || !roofArea || !roofType || !dwellers) {
      alert("Please fill in all required fields");
      return;
    }

    // Create query parameters
    const queryParams = new URLSearchParams({
      location: location,
      roofArea: roofArea,
      roofType: roofType,
      dwellers: dwellers,
    });

    // Navigate to report page with query parameters
    navigate(`/report?${queryParams.toString()}`);
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(46, 125, 50, 0.4), rgba(2, 119, 189, 0.4)), url('https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        }}
      />
      {/* Hero Section */}
      <div className="relative z-10 max-w-[90rem] pt-56 mx-auto flex items-center gap-10">
        <div className="flex-7 space-y-6">
          <div className="font-lilita text-7xl text-white leading-16">
            <span>Harvest Rain.</span>
            <br />
            <span>Secure the Future.</span>
          </div>
          <p className="text-2xl text-gray-100 drop-shadow-md font-medium italic">
            Find out your rooftop's rainwater harvesting potential in minutes
            and get accurate cost estimates.
          </p>
          <div className="flex items-center gap-4">
            {/* <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none hover:cursor-pointer">
              Check Potential
            </button> */}
            <a
              href="#awareness"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("awareness")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl hover:border-white transform hover:-translate-y-1 transition-all duration-300 focus:outline-none hover:cursor-pointer"
            >
              Learn More About RWH
            </a>
          </div>
        </div>
        {/* Form */}
        <div className="flex-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Check Your Potential
            </h3>
            <form onSubmit={redirectToReport} className="space-y-5">
              {/* First Row - Location and Roof Area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location"
                    className="text-white font-medium mb-2 flex items-center gap-2"
                  >
                    <MapPin size={16} />
                    Location
                  </label>
                  <input
                    required={true}
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter your location"
                    className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="roofArea"
                    className="text-white font-medium mb-2 flex items-center gap-2"
                  >
                    <Home size={16} />
                    Roof Area (sq ft)
                  </label>
                  <input
                    required={true}
                    type="number"
                    id="roofArea"
                    name="roofArea"
                    placeholder="Enter roof area"
                    className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Second Row - Roof Type and Number of Dwellers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="roofType"
                    className="text-white font-medium mb-2 flex items-center gap-2"
                  >
                    <Hammer size={16} />
                    Roof Type
                  </label>
                  <select
                    id="roofType"
                    name="roofType"
                    required={true}
                    className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800 text-white">
                      Select roof type
                    </option>
                    <option value="Concrete" className="bg-gray-800 text-white">
                      Concrete
                    </option>
                    <option value="PVC" className="bg-gray-800 text-white">
                      PVC
                    </option>
                    <option value="Asbestos" className="bg-gray-800 text-white">
                      Asbestos
                    </option>
                    <option
                      value="Concrete Road"
                      className="bg-gray-800 text-white"
                    >
                      Concrete Road
                    </option>
                    <option
                      value="Bitumen Road"
                      className="bg-gray-800 text-white"
                    >
                      Bitumen Road
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dwellers"
                    className="text-white font-medium mb-2 flex items-center gap-2"
                  >
                    <Users size={16} />
                    Number of Dwellers
                  </label>
                  <input
                    required={true}
                    type="number"
                    id="dwellers"
                    name="dwellers"
                    placeholder="Enter number of dwellers"
                    min="1"
                    className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Check Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:cursor-pointer hover:-translate-y-0.5 transition-all duration-300 focus:outline-none mt-6"
              >
                Check Potential
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
