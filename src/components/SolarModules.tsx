import solarModule from "../assets/images/solar_module_1.jpg";
import PartnersSection from "./PartnersSection";

export default function SolarModules() {
  return (
    <section id="solar-modules" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <h2 className="text-5xl font-bold text-center">
          <span className="text-white">Solar </span>
          <span className="text-[#22c55e]">Modules</span>
        </h2>

        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          Premium solar modules from leading brands offering high efficiency,
          durability and reliable power generation.
        </p>

        {/* Image */}

        <div className="mt-12">
          <img
            src={solarModule}
            alt="Solar Modules"
            className="w-full max-h-[550px] object-cover rounded-3xl shadow-2xl border border-cyan-400/20"
          />
        </div>
        {/* Partners Section */}

        <PartnersSection />

      </div>
    </section>
  );
}