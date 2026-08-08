import { useState, FormEvent } from 'react';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

interface AddProjectProps {
  onRefresh: () => void;
}

const panelTypes = ['Waaree', 'Tata', 'Vikram', 'Goldi'];

export default function AddProject({ onRefresh }: AddProjectProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    customerName: '',
    mandal: '',
    panelType: 'Waaree',
    capacity: '',
    status: 'Pending' as 'Pending' | 'Surveying' | 'Completed',
    progress: '0'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem("token");

await axios.post(
    "http://localhost:8080/api/projects",
    {
        projectId: formData.projectId,
        customerName: formData.customerName,
        mandal: formData.mandal,
        panelType: formData.panelType,
        capacity: parseFloat(formData.capacity),
        status: formData.status,
        progress: parseInt(formData.progress)
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

      setSuccess(true);
      setFormData({
        projectId: '',
        customerName: '',
        mandal: '',
        panelType: 'Waaree',
        capacity: '',
        status: 'Pending',
        progress: '0'
      });
      onRefresh();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
    if (axios.isAxiosError(err)) {
        console.log(err.response);
        setError(err.response?.data || "Failed to add project.");
    } else {
        setError("Something went wrong.");
    }
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {success && (
        <div className="p-4 bg-[#22c55e] text-white rounded-lg flex items-center">
          <CheckCircle className="mr-3" />
          <span>Project added successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2 font-medium">Project ID *</label>
            <input
              type="text"
              required
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
              placeholder="PRJ-001"
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-medium">Customer Name *</label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2 font-medium">Mandal *</label>
            <input
              type="text"
              required
              value={formData.mandal}
              onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
              placeholder="Enter mandal"
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-medium">Panel Type *</label>
            <select
              required
              value={formData.panelType}
              onChange={(e) => setFormData({ ...formData, panelType: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
            >
              {panelTypes.map((type) => (
                <option key={type} value={type} className="bg-[#0f172a]">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2 font-medium">Capacity (kW) *</label>
            <input
              type="number"
              step="0.1"
              required
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
              placeholder="5.0"
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-medium">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Pending' | 'Surveying' | 'Completed' })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
            >
              <option value="Pending" className="bg-[#0f172a]">Pending</option>
              <option value="Surveying" className="bg-[#0f172a]">Surveying</option>
              <option value="Completed" className="bg-[#0f172a]">Completed</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2 font-medium">Progress Percentage *</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
              placeholder="0"
            />
          </div>
         
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#22c55e] text-white font-bold rounded-lg hover:bg-[#1ea34d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Project...' : 'Add Project'}
        </button>
      </form>
    </div>
  );
}
