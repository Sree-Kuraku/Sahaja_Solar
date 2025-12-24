import { TrendingDown, Leaf, Shield, IndianRupee } from 'lucide-react';

const benefits = [
  {
    icon: IndianRupee,
    title: 'Save Money',
    description: 'Reduce your electricity bills by up to 90% and protect against rising energy costs',
    stat: '90%',
    statLabel: 'Bill Reduction'
  },
  {
    icon: Leaf,
    title: 'Go Green',
    description: 'Reduce your carbon footprint and contribute to a cleaner, healthier environment',
    stat: '4 Tons',
    statLabel: 'CO₂ Saved/Year'
  },
  {
    icon: Shield,
    title: 'Energy Independence',
    description: 'Generate your own power and reduce dependence on the grid with reliable solar energy',
    stat: '25 Years',
    statLabel: 'System Life'
  },
  {
    icon: TrendingDown,
    title: 'Increase Property Value',
    description: 'Homes with solar systems sell for more and attract environmentally conscious buyers',
    stat: '15%',
    statLabel: 'Value Increase'
  }
];

export default function WhySolarSection() {
  return (
    <section id="why-solar" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-[#22c55e]">Solar Energy?</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the numerous benefits of switching to solar power for your home or business
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-[#22c55e] rounded-xl">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#22c55e]">{benefit.stat}</div>
                  <div className="text-sm text-gray-400">{benefit.statLabel}</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
