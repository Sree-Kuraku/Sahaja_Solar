import { useState, useEffect } from 'react';
import { supabase, Project } from '../../lib/supabase';
import { CheckCircle, Clock, Activity } from 'lucide-react';

export default function ProjectStatus() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="text-[#22c55e]" size={20} />;
      case 'Surveying':
        return <Activity className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#22c55e]/20 text-[#22c55e]';
      case 'Surveying':
        return 'bg-blue-500/20 text-blue-300';
      default:
        return 'bg-yellow-500/20 text-yellow-300';
    }
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 py-12">No projects yet</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Project ID</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Customer</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Mandal</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Panel Type</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Capacity</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Progress</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-white font-medium">{project.project_id}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(project.created_at!).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{project.customer_name}</td>
                  <td className="py-4 px-4 text-white">{project.mandal}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {project.panel_type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white">{project.capacity} kW</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#22c55e] h-full transition-all duration-300"
                          style={{ width: `${project.progress_percentage}%` }}
                        />
                      </div>
                      <span className="text-white text-sm w-12 text-right">
                        {project.progress_percentage}%
                      </span>
                    </div>
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
