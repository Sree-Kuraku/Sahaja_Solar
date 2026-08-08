import solarSystems from "../assets/images/solar_systems.png";

export default function SolarOffGrid() {
  return (
    <section id="off-grid" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-center">
          <span className="text-white">Solar </span>
          <span className="text-[#22c55e]">Off Grid & Hybrid Systems</span>
        </h2>

        {/* Short Description */}
        <p className="text-center text-gray-300 mt-4 max-w-4xl mx-auto">
          Complete off-grid solar power solutions for homes, farms,
          and remote locations with reliable battery backup.
        </p>

        {/* Solar Off Grid Image */}
     {/* Solar Off Grid & Hybrid System Image */}
<div className="mt-10 flex justify-center">
  <img
    src={solarSystems}
    alt="Solar Off Grid and Hybrid System"
    className="w-full max-w-4xl max-h-[450px] object-contain rounded-3xl shadow-2xl"
  />
</div>

        {/* Main Glass Information Box */}
        <div className="mt-12 bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-3xl p-8 md:p-12 shadow-2xl">

          {/* Section Title */}
          <h3 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-6">
            Reliable Solar Off Grid Power Solutions
          </h3>

          {/* Detailed Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            Our off-grid solar systems provide independent and reliable
            electricity without depending on the conventional power grid.
            These systems combine high-efficiency solar panels, batteries,
            inverters, and intelligent power management to supply continuous
            power for homes, farms, offices, shops, and remote locations.
            They are designed to provide dependable backup power while
            reducing electricity costs and supporting clean renewable energy.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Energy Independence
              </h4>

              <p className="text-gray-300 mt-3">
                Generate and use your own clean solar electricity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Battery Backup
              </h4>

              <p className="text-gray-300 mt-3">
                Store solar energy for use during nighttime and outages.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Reliable Power
              </h4>

              <p className="text-gray-300 mt-3">
                Designed to provide dependable power for essential loads.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <h4 className="text-xl font-bold text-[#22c55e]">
                Low Operating Cost
              </h4>

              <p className="text-gray-300 mt-3">
                Reduce dependence on grid electricity and fuel-based power.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}