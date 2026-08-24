import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SolarModules from '../components/SolarModules';
import SolarInverters from '../components/SolarInverters';
import SolarBatteries from '../components/SolarBatteries';
import SolarStreetLights from '../components/SolarStreetLights';
import SolarWaterHeaters from '../components/SolarWaterHeaters';
import SolarWaterPumps from '../components/SolarWaterPumps';
import SolarOffGrid from '../components/SolarOffGrid';
import LeadForm from '../components/LeadForm';
import { Sun, Zap, Battery, Lightbulb, Flame, Droplets, Radio } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  { id: 'solar-modules', label: 'Solar Modules', icon: Sun },
  { id: 'solar-inverters', label: 'Solar Inverters', icon: Zap },
  { id: 'solar-batteries', label: 'Solar Batteries', icon: Battery },
  { id: 'street-lights', label: 'Street Lights', icon: Lightbulb },
  { id: 'solar-water-heaters', label: 'Water Heaters', icon: Flame },
  { id: 'water-pumps', label: 'Water Pumps', icon: Droplets },
  { id: 'off-grid', label: 'Off-Grid / Hybrid', icon: Radio },
];

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    navigate(`/products#${id}`);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setActiveCategory(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -90;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="pt-20 bg-[#0b0d11] min-h-screen text-white">
      {/* Category Filter & Quick Navigation Bar */}
      <div className="sticky top-16 z-40 backdrop-blur-xl bg-[#0b0d11]/90 border-b border-white/15 py-3 px-4 shadow-lg overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3 min-w-max">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#22c55e] text-black shadow-lg shadow-green-500/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Products
          </button>

          {PRODUCT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#22c55e] text-black shadow-lg shadow-green-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Sections */}
      <div className="space-y-12">
        <SolarModules />
        <SolarInverters />
        <SolarBatteries />
        <SolarStreetLights />
        <SolarWaterHeaters />
        <SolarWaterPumps />
        <SolarOffGrid />
        <LeadForm />
      </div>
    </div>
  );
}
