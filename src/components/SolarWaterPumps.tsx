import solarWaterPump from "../assets/images/solar_water_pump.jpg";

export default function SolarWaterPumps() {
  return (
    <section id="water-pumps" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">
          <span className="text-white">Solar </span>
          <span className="text-[#22c55e]">Water Pumps</span>
        </h2>

        {/* Short Description */}
        <p className="text-center text-gray-300 mt-4 max-w-4xl mx-auto">
          Reliable solar water pumping solutions for agriculture,
          irrigation, borewells, farms, and residential water supply.
        </p>

        {/* Solar Water Pump Image */}
        <div className="mt-10 flex justify-center">
          <img
            src={solarWaterPump}
            alt="Solar Water Pump"
            className="w-full max-w-4xl h-auto max-h-[450px] object-contain rounded-3xl border border-cyan-400/20 shadow-2xl"
          />
        </div>

        {/* Main Glass Information Box */}
        <div className="mt-12 bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-3xl p-8 md:p-12 shadow-2xl">

          {/* Section Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-6">
            Efficient Solar Water Pumping Solutions
          </h3>

          {/* Detailed Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            Our solar water pumping systems provide reliable and
            energy-efficient water supply without depending on conventional
            electricity. Powered by high-efficiency solar panels, these
            systems are ideal for agricultural irrigation, farms, borewells,
            livestock watering, gardens, and residential applications.
            Solar water pumps help reduce electricity costs, require minimal
            maintenance, and provide dependable water pumping using clean
            renewable energy.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                High Efficiency
              </h4>

              <p className="text-gray-300 mt-3">
                Efficient water pumping using clean solar energy.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Low Running Cost
              </h4>

              <p className="text-gray-300 mt-3">
                Reduces electricity expenses and operating costs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Easy Maintenance
              </h4>

              <p className="text-gray-300 mt-3">
                Durable systems designed for simple and reliable operation.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Eco Friendly
              </h4>

              <p className="text-gray-300 mt-3">
                Uses renewable solar energy with no harmful emissions.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}