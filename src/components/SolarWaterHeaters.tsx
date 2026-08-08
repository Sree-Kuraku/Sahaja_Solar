import solarWaterHeater from "../assets/images/solar_water_heater.jpg";

export default function SolarWaterHeaters() {
  return (
    <section id="solar-water-heaters" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">
          <span className="text-white">Solar </span>
          <span className="text-[#22c55e]">Water Heaters</span>
        </h2>

        {/* Description */}
        <p className="text-center text-gray-300 mt-4 max-w-4xl mx-auto">
          High-quality solar water heating systems for homes, apartments,
          hotels, hospitals and industries.
        </p>

        {/* Solar Water Heater Image */}
        <div className="mt-10 flex justify-center">
          <img
            src={solarWaterHeater}
            alt="Solar Water Heater System"
            className="w-full max-w-5xl max-h-[560px] object-contain rounded-3xl shadow-2xl"
          />
        </div>

        {/* Information Section */}
        <div className="mt-14 bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-3xl p-8 md:p-10">

          <h3 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-5">
            Efficient Solar Water Heating Solutions
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Solar water heaters use solar energy to heat water for residential,
            commercial, and industrial applications. They help reduce
            electricity consumption, lower heating costs, and provide a
            reliable supply of hot water while making better use of clean
            renewable energy.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Energy Efficient
              </h4>
              <p className="text-gray-300 mt-3">
                Uses free solar energy to heat water efficiently.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Lower Electricity Bills
              </h4>
              <p className="text-gray-300 mt-3">
                Reduces electricity consumption used for water heating.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Eco Friendly
              </h4>
              <p className="text-gray-300 mt-3">
                Provides hot water using clean and renewable solar energy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Multiple Applications
              </h4>
              <p className="text-gray-300 mt-3">
                Suitable for homes, hotels, hospitals and industries.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}