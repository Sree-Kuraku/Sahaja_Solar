import { Award, ShieldCheck, Zap, Users } from 'lucide-react';
import LeadForm from '../components/LeadForm';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 bg-[#0b0d11] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#22c55e] uppercase tracking-widest block mb-2">
            COMPANY PROFILE & VALUES
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            About <span className="text-[#22c55e]">Sahaja Solar</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg leading-relaxed">
            Empowering homes, commercial buildings, and agriculture across Andhra Pradesh & Telangana with next-generation solar energy independence.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sahaja Solar Projects"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div>
                  <span className="text-xs font-mono text-[#22c55e] uppercase tracking-wider block">
                    FOUNDED WITH A GREEN VISION
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Over 350+ Rooftop Installations Completed
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-3xl font-bold text-white">
              Who We Are & What We Stand For
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At <strong>Sahaja Solar</strong>, we believe clean solar energy is the most impactful investment a family or enterprise can make. Headquartered in Andhra Pradesh with regional teams serving Vijayawada, Guntur, Amaravathi, Hyderabad, and surrounding districts, we provide comprehensive turnkey solar engineering, procurement, and construction (EPC).
            </p>
            <p className="text-gray-300 leading-relaxed">
              From residential homes seeking up to <strong>₹78,000 direct government subsidies</strong> under the PM Surya Ghar Muft Bijli Yojana, to industrial factories aiming for zero peak-tariff exposure, our certified solar engineers deliver unmatched installation quality, high-yield N-Type TOPCon panels, and 30-year performance peace of mind.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-3xl font-bold text-[#22c55e] font-mono">350+</div>
                <div className="text-xs text-gray-400 mt-1">Completed Rooftop Projects</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-3xl font-bold text-[#f59e0b] font-mono">30 Yrs</div>
                <div className="text-xs text-gray-400 mt-1">Linear Power Warranty</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white">Why Choose Sahaja Solar</h2>
            <p className="text-gray-400 text-sm mt-2">What sets our installations and customer experience apart</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tier-1 Hardware</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We only deploy Tier-1 monocrystalline N-Type TOPCon and bifacial panels engineered for high ambient temperatures.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Guaranteed Subsidies</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Complete paperwork management for direct transfer of PM Surya Ghar subsidies up to ₹78,000 directly to your bank account.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast 7-Day Net Metering</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                We handle DISCOM approvals, bidirectional net metering synchronization, and grid connection with zero hassle.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Dedicated Maintenance</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Comprehensive 5-year free AMC and lifetime performance monitoring with responsive local service engineers.
              </p>
            </div>
          </div>
        </div>

        {/* Lead Quote Form */}
        <LeadForm />

      </div>
    </div>
  );
}
