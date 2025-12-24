import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { LogOut, Users, Plus, Activity } from 'lucide-react';
import NewRequests from './NewRequests';
import AddProject from './AddProject';
import ProjectStatus from './ProjectStatus';

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'requests' | 'add' | 'status'>('requests');
  const [requestsCount, setRequestsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const { count: reqCount } = await supabase
      .from('lead_requests')
      .select('*', { count: 'exact', head: true });

    const { count: projCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    setRequestsCount(reqCount || 0);
    setProjectsCount(projCount || 0);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage leads and projects</p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Total Requests</p>
                <p className="text-3xl font-bold text-white">{requestsCount}</p>
              </div>
              <div className="p-4 bg-blue-500 rounded-xl">
                <Users className="text-white" size={32} />
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-white">{projectsCount}</p>
              </div>
              <div className="p-4 bg-[#22c55e] rounded-xl">
                <Activity className="text-white" size={32} />
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Quick Actions</p>
                <p className="text-sm text-white">Manage system</p>
              </div>
              <div className="p-4 bg-purple-500 rounded-xl">
                <Plus className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex space-x-4 mb-6 border-b border-white/20">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              New Requests
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'add'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Add Project
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'status'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Project Status
            </button>
          </div>

          <div>
            {activeTab === 'requests' && <NewRequests onRefresh={loadStats} />}
            {activeTab === 'add' && <AddProject onRefresh={loadStats} />}
            {activeTab === 'status' && <ProjectStatus />}
          </div>
        </div>
      </div>
    </div>
  );
}
