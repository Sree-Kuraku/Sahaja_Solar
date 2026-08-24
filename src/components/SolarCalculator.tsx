import { useState, useId } from 'react';
import { Zap, Sun, ShieldCheck, TrendingUp, DollarSign, Trees, ArrowRight } from 'lucide-react';

interface SolarCalculatorProps {
  onQuoteClick?: () => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Delhi',
  'Kerala',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Other State'
];

export default function SolarCalculator({ onQuoteClick }: SolarCalculatorProps) {
  const billSliderId = useId();
  const capacitySliderId = useId();
  const locationSelectId = useId();
  const [calcMode, setCalcMode] = useState<'bill' | 'capacity'>('bill');
  const [monthlyBill, setMonthlyBill] = useState<number>(6000);
  const [solarCapacity, setSolarCapacity] = useState<number>(6);
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [location, setLocation] = useState<string>('Andhra Pradesh');

  // Calculations
  // Average tariff per unit in India: ~₹7.5/unit residential, ~₹9.5/unit commercial
  // 1 kW produces ~126 units (kWh) per month (~4.2 units/day)
  // Average benchmark cost: ₹58,000 to ₹65,000 per kW installed

  const effectiveCapacity =
    calcMode === 'bill'
      ? Math.max(1, Math.min(50, Math.round((monthlyBill / (propertyType === 'Residential' ? 7.5 : 9.5)) / 126)))
      : solarCapacity;

  const estimatedMonthlyUnits = Math.round(effectiveCapacity * 126);
  const unitTariff = propertyType === 'Residential' ? 7.5 : 9.5;
  const estimatedMonthlySavings = Math.min(
    calcMode === 'bill' ? monthlyBill : estimatedMonthlyUnits * unitTariff,
    Math.round(estimatedMonthlyUnits * unitTariff * 0.92)
  );

  // PM Surya Ghar Muft Bijli Yojana Subsidies (Residential Only):
  // 1 kW: ₹30,000 | 2 kW: ₹60,000 | 3 kW and above: ₹78,000
  let applicableSubsidy = 0;
  if (propertyType === 'Residential') {
    if (effectiveCapacity === 1) applicableSubsidy = 30000;
    else if (effectiveCapacity === 2) applicableSubsidy = 60000;
    else if (effectiveCapacity >= 3) applicableSubsidy = 78000;
  }

  const baseCostPerKw = propertyType === 'Residential' ? 62000 : 54000;
  const grossSystemCost = effectiveCapacity * baseCostPerKw;
  const netInvestment = Math.max(0, grossSystemCost - applicableSubsidy);

  const annualSavings = estimatedMonthlySavings * 12;
  const lifetime25YrSavings = annualSavings * 25;
  const paybackYears = (netInvestment / annualSavings).toFixed(1);
  const co2SavedTons = (effectiveCapacity * 1.2).toFixed(1);
  const treesEquivalent = Math.round(effectiveCapacity * 30);

  const formatRupee = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    } else {
      const el = document.getElementById('contact') || document.getElementById('quote-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-b from-[#0b0d11] via-[#0f172a] to-[#0b0d11] relative z-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] text-xs font-mono uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            PM Surya Ghar Subsidy Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Calculate Your <span className="text-[#22c55e]">Solar Savings</span>
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Estimate your solar panel capacity, direct central government subsidy, and monthly power bill savings in seconds.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Controls (7 Columns) */}
          <div className="lg:col-span-7 bg-white/[0.05] border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            
            {/* Mode Switcher Tabs */}
            <div>
              <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 mb-8">
                <button
                  type="button"
                  onClick={() => setCalcMode('bill')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    calcMode === 'bill'
                      ? 'bg-[#22c55e] text-black shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  BY ELECTRICITY BILL
                </button>

                <button
                  type="button"
                  onClick={() => setCalcMode('capacity')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    calcMode === 'capacity'
                      ? 'bg-[#22c55e] text-black shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  BY SOLAR CAPACITY
                </button>
              </div>

              {/* Slider 1: Bill / Capacity */}
              {calcMode === 'bill' ? (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor={billSliderId} className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Average Monthly Bill
                    </label>
                    <span className="text-xs text-gray-400 font-mono">Range: ₹1,000 – ₹50,000+</span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/10 mb-4 flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-bold text-[#22c55e] font-mono">
                      ₹{monthlyBill.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-400">per month</span>
                  </div>

                  <input
                    id={billSliderId}
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#22c55e]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                    <span>₹1,000</span>
                    <span>₹25,000</span>
                    <span>₹50,000+</span>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label htmlFor={capacitySliderId} className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
                      Solar System Capacity
                    </label>
                    <span className="text-xs text-gray-400 font-mono">Range: 1 kW – 50 kW</span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/10 mb-4 flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-bold text-[#22c55e] font-mono">
                      {solarCapacity} kW
                    </span>
                    <span className="text-xs text-gray-400">Rooftop Area: ~{solarCapacity * 90} sq.ft</span>
                  </div>

                  <input
                    id={capacitySliderId}
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={solarCapacity}
                    onChange={(e) => setSolarCapacity(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#22c55e]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                    <span>1 kW</span>
                    <span>25 kW</span>
                    <span>50 kW</span>
                  </div>
                </div>
              )}

              {/* Property Type Selection */}
              <div className="mb-8">
                <span className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  Property Type
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPropertyType('Residential')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      propertyType === 'Residential'
                        ? 'bg-[#22c55e]/15 border-[#22c55e] text-white shadow-lg'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${propertyType === 'Residential' ? 'bg-[#22c55e] text-black' : 'bg-white/10 text-gray-300'}`}>
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Residential</h4>
                        <p className="text-[11px] text-gray-400">Home / Rooftop (Subsidy Eligible)</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPropertyType('Commercial')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      propertyType === 'Commercial'
                        ? 'bg-[#22c55e]/15 border-[#22c55e] text-white shadow-lg'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${propertyType === 'Commercial' ? 'bg-[#22c55e] text-black' : 'bg-white/10 text-gray-300'}`}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Commercial</h4>
                        <p className="text-[11px] text-gray-400">Business / Factory / Industry</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* State Selection */}
              <div className="mb-6">
                <label htmlFor={locationSelectId} className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Installation Location
                </label>
                <select
                  id={locationSelectId}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#22c55e] text-sm"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st} className="bg-[#0f172a] text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={handleQuoteClick}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#eab308] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-bold text-base flex items-center justify-center gap-3 shadow-xl transition-transform active:scale-[0.99]"
            >
              Calculate My Custom Proposal & Apply Subsidy
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Results Card (5 Columns) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#12161f] to-[#0d1017] border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs text-[#22c55e] font-mono uppercase tracking-widest font-semibold block">
                    YOUR SOLAR ESTIMATE
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Sahaja Recommended Plan
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e]">
                  <Sun className="w-5 h-5" />
                </div>
              </div>

              {/* Recommended Capacity Hero Badge */}
              <div className="text-center p-5 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest font-mono block">
                  RECOMMENDED SYSTEM CAPACITY
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[#f59e0b] my-2 font-mono">
                  {effectiveCapacity} <span className="text-2xl text-white font-sans">kW</span>
                </div>

                {/* Capacity Visual Tiles */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {Array.from({ length: Math.min(10, effectiveCapacity) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-6 rounded-sm bg-[#22c55e]/30 border border-[#22c55e] flex items-center justify-center"
                    >
                      <div className="w-1.5 h-3 bg-[#22c55e] rounded-xs" />
                    </div>
                  ))}
                  {effectiveCapacity > 10 && (
                    <span className="text-xs text-gray-400 self-center font-mono">
                      +{effectiveCapacity - 10} panels
                    </span>
                  )}
                </div>
              </div>

              {/* Financial & Energy Breakdown */}
              <div className="space-y-3.5 text-sm">
                
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Estimated System Cost:</span>
                  <span className="font-mono font-semibold text-white">
                    {formatRupee(grossSystemCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400">Applicable PM Subsidy:</span>
                    <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                  </div>
                  <span className="font-mono font-semibold text-[#22c55e]">
                    {applicableSubsidy > 0 ? `-${formatRupee(applicableSubsidy)}` : 'N/A (Commercial)'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2.5 bg-white/[0.06] px-3.5 rounded-xl border border-white/10">
                  <span className="font-bold text-white">Estimated Final Investment:</span>
                  <span className="font-mono font-extrabold text-lg text-[#f59e0b]">
                    {formatRupee(netInvestment)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Est. Monthly Generation:</span>
                  <span className="font-mono text-gray-200">
                    ~{estimatedMonthlyUnits.toLocaleString()} kWh (units)
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Est. Monthly Bill Savings:</span>
                  <span className="font-mono font-semibold text-[#22c55e]">
                    ~{formatRupee(estimatedMonthlySavings)} / mo
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">25-Year Lifetime Savings:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ~{formatRupee(lifetime25YrSavings)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400">Estimated Payback Period:</span>
                  <span className="font-mono font-semibold text-white">
                    ~{paybackYears} Years
                  </span>
                </div>

              </div>
            </div>

            {/* Environmental Impact Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-[#22c55e]" />
                <span>~{treesEquivalent} Trees Planted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{co2SavedTons} Tons CO₂ Cut / Yr</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
