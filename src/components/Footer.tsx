import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a]/95 border-t border-white/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              SAHAJA <span className="text-[#22c55e]">SOLAR</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Leading the renewable energy revolution with premium solar solutions for homes and businesses.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-[#22c55e] transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-[#22c55e] transition-colors">
                <Twitter size={20} className="text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-[#22c55e] transition-colors">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-[#22c55e] transition-colors">
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-[#22c55e] transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-[#22c55e] transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#22c55e] transition-colors">Services</a></li>
              <li><a href="#partners" className="text-gray-400 hover:text-[#22c55e] transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Residential Solar</li>
              <li className="text-gray-400">Commercial Solar</li>
              <li className="text-gray-400">Solar Design</li>
              <li className="text-gray-400">Maintenance</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400">
                <Mail size={18} className="mr-2 mt-1 text-[#22c55e] flex-shrink-0" />
                <span>sahajasolar@gmail.com</span>
              </li>
              <li className="flex items-start text-gray-400">
                <Phone size={18} className="mr-2 mt-1 text-[#22c55e] flex-shrink-0" />
                <span>+91 8019604025</span>
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin size={18} className="mr-2 mt-1 text-[#22c55e] flex-shrink-0" />
                <span>#11-228/1, Machalipatnam Road opp-132kv s.s, Pamarru,Krishna,AP-521157 India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Sahaja Solar. All rights reserved. | Powering a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}
