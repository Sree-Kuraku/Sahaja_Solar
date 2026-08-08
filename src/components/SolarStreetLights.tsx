import streetLight from "../assets/images/solar_street_light.avif";

export default function SolarStreetLights() {
  return (
    <section id="street-lights" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <h2 className="text-5xl font-bold text-center">
          <span className="text-white">Solar </span>
          <span className="text-[#22c55e]">Street Lights</span>
        </h2>

        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          Reliable and energy-efficient solar street lights for roads, parks,
          campuses, villages, and commercial spaces.
        </p>

        {/* Image */}

       <div className="mt-12 flex justify-center">
  <img
    src={streetLight}
    alt="Solar Street Light"
    className="w-full max-w-5xl h-[380px] object-contain rounded-3xl shadow-2xl"
  />
</div>

        {/* Information */}

        <div className="mt-12 backdrop-blur-xl bg-white/10 border border-cyan-400/20 rounded-3xl p-10">

          <h3 className="text-3xl font-bold text-[#22c55e] mb-5">
            Premium Solar Street Lighting Solutions
          </h3>

          <p className="text-gray-300 leading-8 text-lg">
            Our solar street lighting systems provide dependable illumination
            without electricity bills. Designed with high-efficiency solar
            panels, long-life lithium batteries, intelligent charge controllers,
            and powerful LED luminaires, they deliver reliable lighting for
            streets, highways, parks, campuses, industrial areas, villages, and
            public spaces. These systems are weather-resistant, easy to install,
            environmentally friendly, and require minimal maintenance, making
            them a cost-effective lighting solution.
          </p>

          {/* Features */}

          <div className="grid md:grid-cols-4 gap-6 mt-10">

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <h4 className="text-[#22c55e] font-bold text-xl">
                LED Lighting
              </h4>
              <p className="text-gray-400 mt-2">
                High brightness with low power consumption.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <h4 className="text-[#22c55e] font-bold text-xl">
                Lithium Battery
              </h4>
              <p className="text-gray-400 mt-2">
                Long backup time with extended battery life.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <h4 className="text-[#22c55e] font-bold text-xl">
                IP65 Protection
              </h4>
              <p className="text-gray-400 mt-2">
                Waterproof and suitable for all weather conditions.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <h4 className="text-[#22c55e] font-bold text-xl">
                Zero Electricity Cost
              </h4>
              <p className="text-gray-400 mt-2">
                Runs completely on solar energy.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}