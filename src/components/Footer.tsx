import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080a0e] border-t border-white/15 py-14 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <img
                src="/brandLogo.png"
                alt="Sahaja Solar Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-white tracking-tight">
                SAHAJA <span className="text-[#22c55e]">SOLAR</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Leading renewable solar EPC in Andhra Pradesh & Telangana. Providing high-yield N-Type TOPCon rooftop solar installations with direct PM Surya Ghar subsidies.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2.5 bg-white/10 rounded-xl hover:bg-[#22c55e] hover:text-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-xl hover:bg-[#22c55e] hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-xl hover:bg-[#22c55e] hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white/10 rounded-xl hover:bg-[#22c55e] hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#22c55e] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-[#22c55e] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#22c55e] transition-colors">About Us</Link></li>
              <li><Link to="/why-solar" className="text-gray-400 hover:text-[#22c55e] transition-colors">Why Choose Solar</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-[#22c55e] transition-colors">Recent Projects Gallery</Link></li>
              <li><Link to="/subsidies" className="text-gray-400 hover:text-[#22c55e] transition-colors">PM Surya Ghar Subsidy</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#22c55e] transition-colors">Get Free Quote</Link></li>
            </ul>
          </div>

          {/* Services & Products */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#22c55e] pl-2.5">
              Solutions & Equipment
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services" className="text-gray-400 hover:text-[#22c55e] transition-colors">Residential Rooftop (1-10kW)</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#22c55e] transition-colors">Commercial & Industrial EPC</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#22c55e] transition-colors">N-Type TOPCon Solar Modules</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#22c55e] transition-colors">Grid-Tie & Hybrid Inverters</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#22c55e] transition-colors">Agricultural Solar Water Pumps</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-[#22c55e] transition-colors">Solar Batteries & Storage</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#22c55e] pl-2.5">
              Contact & Office
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start text-gray-400">
                <Phone size={18} className="mr-3 mt-0.5 text-[#22c55e] flex-shrink-0" />
                <div>
                  <a href="tel:+918019604025" className="hover:text-white font-mono block">+91 8019604025</a>
                  <a href="tel:+919490102030" className="hover:text-white font-mono block text-xs text-gray-500">+91 94901 02030</a>
                </div>
              </li>
              <li className="flex items-start text-gray-400">
                <Mail size={18} className="mr-3 mt-0.5 text-[#22c55e] flex-shrink-0" />
                <a href="mailto:sahajasolar@gmail.com" className="hover:text-white">sahajasolar@gmail.com</a>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={18} className="mr-3 mt-0.5 text-[#22c55e] flex-shrink-0" />
                <span>#11-228/1, Machalipatnam Road opp-132kv s.s, Pamarru, Krishna District, AP - 521157, India</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Sahaja Solar. All rights reserved. | www.sahajasolar.com</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white">Terms of Service</Link>
            <Link to="/subsidies" className="hover:text-white">PM Surya Ghar Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
