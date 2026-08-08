import { Sun, Award, CheckCircle, Star } from 'lucide-react';

const partners = [
  {
    name: 'Waaree ',
    description: 'India\'s largest solar panel manufacturer with 12 GW production capacity. Known for high-efficiency modules and excellent durability.',
    tier: 'Tier-1',
    efficiency: '21.5%',
    warranty: '25 Years',
    icon: Sun
  },
  {
    name: 'Tata Power Solar',
    description: 'Part of Tata Group, offering premium quality solar solutions with comprehensive service support across India.',
    tier: 'Tier-1',
    efficiency: '21.2%',
    warranty: '25 Years',
    icon: Award
  },
  {
    name: 'Adhani',
    description: 'Leading Indian solar energy company known for technological innovation and high-performance solar modules.',
    tier: 'Tier-1',
    efficiency: '20.8%',
    warranty: '25 Years',
    icon: CheckCircle
  },
  {
    name: 'rayzon',
    description: 'Trusted name in Indian solar industry, providing reliable and cost-effective solar solutions for all segments.',
    tier: 'Tier-1',
    efficiency: '20.5%',
    warranty: '25 Years',
    icon: Star
  }
];

export default function PartnersSection() {
  return (
    <div className="mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-green-700 rounded-full">
                  <partner.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-green-700 text-white text-sm rounded-full mb-3">
                    {partner.tier}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {partner.description}
                  </p>
                </div>
                <div className="w-full pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Efficiency</span>
                    <span className="font-semibold text-gray-900">{partner.efficiency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Warranty</span>
                    <span className="font-semibold text-gray-900">{partner.warranty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
