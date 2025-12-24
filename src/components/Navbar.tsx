import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  onContactClick: () => void;
}

export default function Navbar({ onAdminClick, onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">
              SAHAJA <span className="text-[#22c55e]">SOLAR</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-[#22c55e] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-white hover:text-[#22c55e] transition-colors">
              About Us
            </button>
            <button onClick={() => scrollToSection('why-solar')} className="text-white hover:text-[#22c55e] transition-colors">
              Why Solar
            </button>
            <button onClick={() => scrollToSection('services')} className="text-white hover:text-[#22c55e] transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('subsidies')} className="text-white hover:text-[#22c55e] transition-colors">
              Subsidies
            </button>
            <button onClick={() => scrollToSection('partners')} className="text-white hover:text-[#22c55e] transition-colors">
              Panel Companies
            </button>
            <button
              onClick={onContactClick}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Us
            </button>
            <button
              onClick={onAdminClick}
              className="px-4 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34d] transition-colors font-medium"
            >
              Admin
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-[#0f172a]/95 border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-white hover:text-[#22c55e] py-2">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-white hover:text-[#22c55e] py-2">
              About Us
            </button>
            <button onClick={() => scrollToSection('why-solar')} className="block w-full text-left text-white hover:text-[#22c55e] py-2">
              Why Solar
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left text-white hover:text-[#22c55e] py-2">
              Services
            </button>
            <button onClick={() => scrollToSection('subsidies')} className="block w-full text-left text-white hover:text-[#22c55e] py-2">
              Subsidies
            </button>
            <button onClick={() => scrollToSection('partners')} className="block w-full text-left text-white hover:text-[#22c55e] py-2">
              Panel Companies
            </button>
            <button
              onClick={onContactClick}
              className="block w-full px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Us
            </button>
            <button
              onClick={onAdminClick}
              className="block w-full px-4 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34d] transition-colors font-medium"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
