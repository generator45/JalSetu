export default function Awareness() {
  return (
    <div className=" py-32">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-4">
        <h3 className="text-4xl font-bold text-center mb-10 text-gray-800">
          What is Rainwater Harvesting?
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🏠</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Rooftop Rainwater Harvesting (RWH)
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Collects rainwater from rooftops and stores it for later use or
              directs it to recharge the ground, helping conserve water and
              reduce dependence on municipal supply.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🌍</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Artificial Recharge (AR)
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Helps replenish groundwater by channeling rainwater into the soil
              through recharge pits, trenches, or shafts, supporting sustainable
              water resources for your community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto flex flex-col gap-4 mt-32">
        <h3 className="text-4xl font-semibold text-center mt-12 mb-6 text-gray-800">
          Benefits of Rainwater Harvesting
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
            <span className="text-4xl mb-2">🌱</span>
            <h4 className="font-semibold text-lg mb-1 text-gray-800">
              Environmental
            </h4>
            <p className="text-gray-600 text-sm">
              Conserves water, reduces runoff, prevents flooding, and
              replenishes local aquifers.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
            <span className="text-4xl mb-2">💰</span>
            <h4 className="font-semibold text-lg mb-1 text-gray-800">
              Economic
            </h4>
            <p className="text-gray-600 text-sm">
              Lowers water bills and reduces dependence on municipal water
              supply.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
            <span className="text-4xl mb-2">👥</span>
            <h4 className="font-semibold text-lg mb-1 text-gray-800">
              Community
            </h4>
            <p className="text-gray-600 text-sm">
              Strengthens local water security and encourages community
              participation in sustainable water practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
