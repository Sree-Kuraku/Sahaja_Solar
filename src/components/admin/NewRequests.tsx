import { useState, useEffect } from 'react';
import { supabase, LeadRequest } from '../../lib/supabase';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

interface NewRequestsProps {
  onRefresh: () => void;
}

export default function NewRequests({ onRefresh }: NewRequestsProps) {
  const [requests, setRequests] = useState<LeadRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<LeadRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredRequests(
        requests.filter((req) =>
          req.mandal.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredRequests(requests);
    }
  }, [searchTerm, requests]);

  const loadRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('lead_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data);
      setFilteredRequests(data);
    }
    setLoading(false);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Mandal..."
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading requests...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          {searchTerm ? 'No requests found for this mandal' : 'No requests yet'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Customer Name</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Mandal</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Contact</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Property Type</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Avg. Bill</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-white font-medium">
                      {request.first_name} {request.last_name}
                    </div>
                    <div className="text-sm text-gray-400">{request.state}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-white">
                      <MapPin size={16} className="mr-2 text-[#22c55e]" />
                      {request.mandal}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-white mb-1">
                      <Mail size={14} className="mr-2 text-gray-400" />
                      <span className="text-sm">{request.email}</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Phone size={14} className="mr-2 text-gray-400" />
                      <span className="text-sm">{request.phone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.property_type === 'Residential'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {request.property_type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white">{request.avg_monthly_bill}</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">
                    {new Date(request.created_at!).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
