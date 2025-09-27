import { Droplet } from "lucide-react";

const Hero = () => {
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <Droplet className="h-16 w-16 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              Check Your Rooftop Rainwater
              <span className="text-blue-300 block mt-2">
                Harvesting Potential Instantly
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-100 leading-relaxed drop-shadow-md">
              Empower yourself to conserve groundwater with a simple assessment
              of your home or building.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Start My Assessment
            </button>
            <button className="border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl hover:border-white transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Learn More About RWH
            </button>
          </div>

          {/* Stats */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-blue-300">
                50,000+
              </div>
              <div className="text-gray-200 font-medium">
                Liters Potential/Year
              </div>
            </div>
            <div className="text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-emerald-300">
                ₹25,000
              </div>
              <div className="text-gray-200 font-medium">
                Average Annual Savings
              </div>
            </div>
            <div className="text-center space-y-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                80%
              </div>
              <div className="text-gray-200 font-medium">
                Groundwater Conservation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
