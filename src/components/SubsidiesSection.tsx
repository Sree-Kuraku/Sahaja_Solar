import { IndianRupee, Zap, TrendingDown, Award } from 'lucide-react';

const subsidies = [
  {
    icon: IndianRupee,
    title: 'PM Surya Ghar Muft Bijli Yojana',
    description: 'Get up to 60% subsidy on rooftop solar installations under this flagship scheme. Eligible households can receive financial assistance for systems up to 3kW.',
    benefits: ['₹30,000 for 1kW', '₹60,000 for 2kW', '₹78,000 for 3kW'],
    color: 'bg-blue-500'
  },
  {
    icon: Zap,
    title: 'State Solar Subsidy Programs',
    description: 'Additional state-level incentives and subsidies available across various Indian states to promote solar energy adoption.',
    benefits: ['Tax exemptions', 'Net metering benefits', 'Accelerated depreciation'],
    color: 'bg-green-500'
  },
  {
    icon: TrendingDown,
    title: 'MNRE Solar Rooftop Scheme',
    description: 'Ministry of New and Renewable Energy provides central financial assistance for residential sectors to install rooftop solar systems.',
    benefits: ['40% for up to 3kW', '20% for 3-10kW', 'Interest subsidies'],
    color: 'bg-purple-500'
  },
  {
    icon: Award,
    title: 'Commercial & Industrial Benefits',
    description: 'Special incentives for commercial and industrial establishments including tax benefits and accelerated depreciation.',
    benefits: ['80% depreciation', 'GST benefits', 'Carbon credits'],
    color: 'bg-orange-500'
  }
];

export default function SubsidiesSection() {
  return (
    <section id="subsidies" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Government <span className="text-[#22c55e]">Subsidies</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Take advantage of various government schemes and subsidies to make solar energy more affordable
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {subsidies.map((subsidy, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`${subsidy.color} p-4 rounded-xl flex-shrink-0`}>
                  <subsidy.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {subsidy.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {subsidy.description}
                  </p>
                  <div className="space-y-2">
                    {subsidy.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-[#22c55e]">
                        <span className="mr-2">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
