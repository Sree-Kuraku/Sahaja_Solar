import { Award, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const keyHighlights = [
  {
    icon: Award,
    title: 'Tier-1 Certified Panels',
    description: 'N-Type TOPCon & Bifacial high-efficiency modules with 30-year linear performance warranty.',
  },
  {
    icon: ShieldCheck,
    title: 'Govt. Subsidy Channel Partner',
    description: 'Direct PM Surya Ghar Muft Bijli Yojana subsidy processing up to ₹78,000 directly to your bank account.',
  },
  {
    icon: Zap,
    title: 'Fast 7-Day Net Metering & Turnkey EPC',
    description: 'Complete end-to-end design, DISCOM approvals, net meter installation, and commissioning.',
  },
  {
    icon: Users,
    title: 'In-House Certified Solar Engineers',
    description: '350+ successful residential, commercial, and agricultural rooftop installations across AP & Telangana.',
  },
];

const stats = [
  { value: '350+', label: 'Rooftops Installed' },
  { value: '90%', label: 'Max Bill Savings' },
  { value: '30 Yrs', label: 'Performance Warranty' },
  { value: '4.9★', label: 'Customer Rating' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#0b0d11] via-[#0f172a] to-[#0b0d11] relative z-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] text-xs font-mono uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              Pioneering Clean Solar Energy
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              About <span className="text-[#22c55e]">Sahaja Solar</span>
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
              <strong>Sahaja Solar</strong> is a premier solar EPC (Engineering, Procurement, and Construction) company delivering state-of-the-art rooftop solar systems, commercial solar power plants, and agricultural solar pumping solutions across Andhra Pradesh and Telangana.
            </p>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              We empower homeowners and businesses to take complete control of their energy costs. By pairing ultra-high efficiency monocrystalline solar panels with smart grid-tied inverters and direct central government subsidies, our customers save up to <strong>90% on monthly electricity bills</strong> while securing clean power independence for 30+ years.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {keyHighlights.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-3.5 hover:border-[#22c55e]/40 transition-colors">
                  <div className="p-2.5 rounded-xl bg-[#22c55e]/15 text-[#22c55e] flex-shrink-0">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{feat.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More Link */}
            <div className="flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22c55e] hover:bg-[#1ea34d] text-white font-semibold text-sm transition-all shadow-lg shadow-green-500/20"
              >
                Read Full Company Story
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-all"
              >
                Our Solar Solutions
              </Link>
            </div>
          </div>

          {/* Right Visual Card & Stats (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="backdrop-blur-xl bg-white/[0.05] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden mb-6 group">
                <img
                  src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sahaja Solar Rooftop Installation"
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div>
                    <span className="text-[11px] font-mono text-[#22c55e] uppercase tracking-wider block">
                      Certified Installation
                    </span>
                    <h4 className="text-base font-bold text-white">
                      AP & Telangana Leading Solar Provider
                    </h4>
                  </div>
                </div>
              </div>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#22c55e] font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
