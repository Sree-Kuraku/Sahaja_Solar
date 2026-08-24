import LeadForm from '../components/LeadForm';
import { Phone, Mail, MapPin, Building } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0b0d11] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono text-[#22c55e] uppercase tracking-widest block mb-2">
            CONTACT & OFFICE
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Contact <span className="text-[#22c55e]">Sahaja Solar</span>
          </h1>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Ready to switch to clean solar energy and save up to 90% on electricity? Our certified solar engineers are here to help.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Phone Numbers */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 text-center flex flex-col justify-between hover:border-[#22c55e]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Call Us Directly</h3>
              <p className="text-xs text-gray-400 mb-3">Mon - Sat: 9:00 AM - 7:00 PM</p>
            </div>
            <div className="space-y-1.5">
              <a href="tel:+918019604025" className="text-sm font-bold text-[#22c55e] hover:underline font-mono block">
                +91 8019604025
              </a>
              <a href="tel:+917416202494" className="text-sm font-bold text-[#22c55e] hover:underline font-mono block">
                +91 7416202494
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 text-center flex flex-col justify-between hover:border-[#22c55e]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Email Support</h3>
              <p className="text-xs text-gray-400 mb-3">Quick responses within 24 hrs</p>
            </div>
            <a href="mailto:sahajasolar@gmail.com" className="text-sm font-bold text-[#22c55e] hover:underline block break-all">
              sahajasolar@gmail.com
            </a>
          </div>

          {/* Head Office Address */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 text-center flex flex-col justify-between hover:border-[#22c55e]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Head Office</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              #11-228/1, Machalipatnam Road opp-132kv s.s, Pamarru, Krishna District, AP - 521157, India
            </p>
          </div>

          {/* Vijayawada Branch Office */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 text-center flex flex-col justify-between hover:border-[#22c55e]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Vijayawada Branch</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              West End Towers, Patamata, Vijayawada, Andhra Pradesh – 520010
            </p>
          </div>

        </div>

        {/* Free Quote Form */}
        <LeadForm />

      </div>
    </div>
  );
}
