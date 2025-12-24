import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle } from 'lucide-react';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export default function LeadForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    state: '',
    mandal: '',
    full_address: '',
    property_type: 'Residential' as 'Residential' | 'Commercial',
    avg_monthly_bill: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('lead_requests')
        .insert([formData]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        state: '',
        mandal: '',
        full_address: '',
        property_type: 'Residential',
        avg_monthly_bill: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get A Free <span className="text-[#22c55e]">$0 Down</span> Solar Quote
            </h2>
            <p className="text-gray-300">
              Fill out the form below and our solar experts will contact you within 24 hours
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-[#22c55e] text-white rounded-lg flex items-center">
              <CheckCircle className="mr-3" />
              <span>Thank you! We'll contact you soon.</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500 text-white rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">State *</label>
                <select
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                >
                  <option value="" className="bg-[#0f172a]">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state} className="bg-[#0f172a]">
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Mandal/District *</label>
                <input
                  type="text"
                  required
                  value={formData.mandal}
                  onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  placeholder="Enter mandal or district"
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 font-medium">Full Address *</label>
              <textarea
                required
                value={formData.full_address}
                onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                placeholder="Enter complete address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Property Type *</label>
                <select
                  required
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value as 'Residential' | 'Commercial' })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                >
                  <option value="Residential" className="bg-[#0f172a]">Residential</option>
                  <option value="Commercial" className="bg-[#0f172a]">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Avg. Monthly Bill *</label>
                <input
                  type="text"
                  required
                  value={formData.avg_monthly_bill}
                  onChange={(e) => setFormData({ ...formData, avg_monthly_bill: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  placeholder="₹5000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#22c55e] text-white font-bold rounded-lg hover:bg-[#1ea34d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Get Free Quote</span>
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
