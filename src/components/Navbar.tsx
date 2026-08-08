import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  onContactClick: () => void;
}

export default function Navbar({
  onAdminClick,
  onContactClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });

      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">
              SAHAJA <span className="text-[#22c55e]">SOLAR</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">

            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-[#22c55e] transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[#22c55e] transition-colors"
            >
              About Us
            </button>

            <button
              onClick={() => scrollToSection('why-solar')}
              className="text-white hover:text-[#22c55e] transition-colors"
            >
              Why Solar
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-[#22c55e] transition-colors"
            >
              Services
            </button>

            {/* Gallery */}
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-white hover:text-[#22c55e] transition-colors"
            >
              Gallery
            </button>

            <button
              onClick={() => scrollToSection('subsidies')}
              className="text-white hover:text-[#22c55e] transition-colors"
            >
              Subsidies
            </button>

            <div className="relative z-50">
  <button
  type="button"
  onClick={() => setShowProducts((prev) => !prev)}
  className="flex items-center gap-1 text-white hover:text-[#22c55e] transition-colors"
>
  Products
  <ChevronDown
    size={18}
    className={`transition-transform ${
      showProducts ? "rotate-180" : ""
    }`}
  />
</button>

  {showProducts && (
   <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 bg-white">

      <button
        onClick={() => {
    scrollToSection("solar-modules");
    setShowProducts(false);
    setIsOpen(false);
}}
        className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
      >
        Solar Modules
      </button>

      <button
        onClick={() => {
    scrollToSection("street-lights");
    setShowProducts(false);
    setIsOpen(false);
}}
        className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
      >
        Solar Street Lights
      </button>

      <button
       onClick={() => {
    scrollToSection("water-pumps");
    setShowProducts(false);
    setIsOpen(false);
}}
        className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
      >
        Solar Water Pumps
      </button>

      <button
       onClick={() => {
    scrollToSection("off-grid");
    setShowProducts(false);
    setIsOpen(false);
}}
        className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
      >
        Solar Off Grid & Hybrid Systems
      </button>
      <button
  onClick={() => {
    scrollToSection("solar-inverters");
    setShowProducts(false);
    setIsOpen(false);
  }}
  className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
>
  Solar Inverters
</button>

<button
  onClick={() => {
    scrollToSection("solar-batteries");
    setShowProducts(false);
    setIsOpen(false);
  }}
  className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
>
  Solar Batteries
</button>
   <button
  onClick={() => {
    scrollToSection("solar-water-heaters");
    setShowProducts(false);
    setIsOpen(false);
  }}
  className="block w-full text-left px-4 py-3 hover:bg-green-100 text-gray-800"
>
  Solar Water Heaters
</button>
      

    </div>
  )}

</div>

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

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-[#0f172a]/95 border-t border-white/20">

          <div className="px-4 py-4 space-y-3">

            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-white hover:text-[#22c55e] py-2"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-white hover:text-[#22c55e] py-2"
            >
              About Us
            </button>

            <button
              onClick={() => scrollToSection('why-solar')}
              className="block w-full text-left text-white hover:text-[#22c55e] py-2"
            >
              Why Solar
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-white hover:text-[#22c55e] py-2"
            >
              Services
            </button>

            {/* Gallery */}
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left text-white hover:text-[#22c55e] py-2"
            >
              Gallery
            </button>

            <button
              onClick={() => scrollToSection('subsidies')}
              className="block w-full text-left text-white hover:text-[#22c55e] py-2"
            >
              Subsidies
            </button>

           <button
  onClick={() => {
  scrollToSection("solar-modules");
  setIsOpen(false);
}}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Modules
</button>

<button
  onClick={() => {
  scrollToSection("street-lights");
  setIsOpen(false);
}}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Street Lights
</button>

<button
 onClick={() => {
  scrollToSection("water-pumps");
  setIsOpen(false);
}}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Water Pumps
</button>

<button
 onClick={() => {
  scrollToSection("off-grid");
  setIsOpen(false);
}}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Off Grid & Hybrid Systems
</button>
<button
  onClick={() => {
    scrollToSection("solar-inverters");
    setIsOpen(false);
  }}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Inverters
</button>

<button
  onClick={() => {
    scrollToSection("solar-batteries");
    setIsOpen(false);
  }}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Batteries
</button>
  <button
  onClick={() => {
    scrollToSection("solar-water-heaters");
    setIsOpen(false);
  }}
  className="block w-full text-left text-white hover:text-[#22c55e] py-2"
>
  Solar Water Heaters
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