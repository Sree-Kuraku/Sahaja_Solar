import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  onContactClick?: () => void;
}

export default function Navbar({
  onAdminClick,
  onContactClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setShowProducts(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (sectionId: string) => {
    setShowProducts(false);
    setIsOpen(false);

    if (location.pathname === '/products') {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      navigate(`/products#${sectionId}`);
    }
  };

  const handleContactClick = () => {
    setIsOpen(false);
    setShowProducts(false);
    if (onContactClick && location.pathname === '/') {
      onContactClick();
    } else {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0b0d11]/85 border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/brandLogo.png"
              alt="Sahaja Solar Logo"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              SAHAJA <span className="text-[#22c55e]">SOLAR</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">

            <Link
              to="/"
              onClick={() => handleNavClick('/')}
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => handleNavClick('/about')}
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/why-solar"
              onClick={() => handleNavClick('/why-solar')}
              className={`text-sm font-medium transition-colors ${
                isActive('/why-solar') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
              }`}
            >
              Why Solar
            </Link>

            <Link
              to="/services"
              onClick={() => handleNavClick('/services')}
              className={`text-sm font-medium transition-colors ${
                isActive('/services') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
              }`}
            >
              Services
            </Link>

            <Link
              to="/gallery"
              onClick={() => handleNavClick('/gallery')}
              className={`text-sm font-medium transition-colors ${
                isActive('/gallery') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/subsidies"
              onClick={() => handleNavClick('/subsidies')}
              className={`text-sm font-medium transition-colors ${
                isActive('/subsidies') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
              }`}
            >
              Subsidies
            </Link>

            {/* Products Dropdown */}
            <div className="relative z-50">
              <button
                type="button"
                onClick={() => setShowProducts((prev) => !prev)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  isActive('/products') ? 'text-[#22c55e] font-semibold' : 'text-gray-200 hover:text-[#22c55e]'
                }`}
              >
                Products
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showProducts ? "rotate-180" : ""}`}
                />
              </button>

              {showProducts && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#0f172a] rounded-2xl shadow-2xl border border-white/20 py-2 backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={() => handleNavClick('/products')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm font-semibold text-[#22c55e]"
                  >
                    View All Products
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('solar-modules')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Modules (TOPCon)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('solar-inverters')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Inverters
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('solar-batteries')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Batteries
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('street-lights')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Street Lights
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('solar-water-heaters')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Water Heaters
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('water-pumps')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Water Pumps
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProductClick('off-grid')}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-gray-200 hover:text-[#22c55e]"
                  >
                    Solar Off-Grid & Hybrid
                  </button>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <button
              type="button"
              onClick={handleContactClick}
              className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-100 transition-all font-semibold text-xs uppercase tracking-wider"
            >
              Contact Us
            </button>

            {/* Admin Button */}
            <button
              onClick={onAdminClick}
              className="px-4 py-2 bg-[#22c55e] text-white rounded-xl hover:bg-[#1ea34d] transition-all font-semibold text-xs uppercase tracking-wider"
            >
              Admin
            </button>

          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-[#0b0d11]/98 border-t border-white/15 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-5 space-y-2 pb-24 text-sm font-medium">

            <button
              type="button"
              onClick={() => handleNavClick('/')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl ${
                isActive('/') ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('/about')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl ${
                isActive('/about') ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('/why-solar')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl ${
                isActive('/why-solar') ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              Why Solar
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('/services')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl ${
                isActive('/services') ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('/gallery')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl ${
                isActive('/gallery') ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              Gallery & Projects
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('/subsidies')}
              className={`block w-full text-left py-2.5 px-3 rounded-xl ${
                isActive('/subsidies') ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'text-gray-200 hover:bg-white/5'
              }`}
            >
              Subsidies
            </button>

            {/* Mobile Products Submenu */}
            <div className="pt-2 pb-1">
              <span className="block px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#22c55e]">
                Products & Equipment
              </span>
              <button
                type="button"
                onClick={() => handleNavClick('/products')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • View All Products
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('solar-modules')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Modules (TOPCon)
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('solar-inverters')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Inverters
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('solar-batteries')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Batteries
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('street-lights')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Street Lights
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('solar-water-heaters')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Water Heaters
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('water-pumps')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Water Pumps
              </button>
              <button
                type="button"
                onClick={() => handleProductClick('off-grid')}
                className="block w-full text-left py-2 px-3 text-sm text-gray-200 hover:text-[#22c55e]"
              >
                • Solar Off-Grid & Hybrid
              </button>
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="button"
                onClick={handleContactClick}
                className="block w-full py-3 text-center bg-white text-black rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                Contact Us
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminClick();
                }}
                className="block w-full py-3 text-center bg-[#22c55e] text-white rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                Admin
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}