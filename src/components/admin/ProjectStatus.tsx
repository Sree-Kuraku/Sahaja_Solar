import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Clock, Activity } from 'lucide-react';

interface Project {
  id: number;
  projectId: string;
  customerName: string;
  mandal: string;
  panelType: string;
  capacity: number;
  status: string;
  progress: number;
  createdAt: string;
}

export default function ProjectStatus() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="text-[#22c55e]" size={20} />;
      case "Surveying":
        return <Activity className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-yellow-500" size={20} />;
    }
  };

  const updateProject = async (id: number, project: Project) => {

    try {

        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:8080/api/projects/${id}`,
            project,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        loadProjects();

    } catch(error){

        console.error(error);

    }

}

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center text-gray-400 py-12">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No projects yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Project ID
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Customer
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Mandal
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Panel Type
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Capacity
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Status
                </th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">
                  Progress
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="text-white font-medium">
                      {project.projectId}
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-white">
                    {project.customerName}
                  </td>

                  <td className="py-4 px-4 text-white">
                    {project.mandal}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {project.panelType}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-white">
                    {project.capacity} kW
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}

                      <select
    value={project.status}
    onChange={(e) =>
        updateProject(project.id!, {
            ...project,
            status: e.target.value
        })
    }
    className="bg-[#1e293b] text-white rounded px-2 py-1"
>
    <option value="Pending">Pending</option>
    <option value="Surveying">Surveying</option>
    <option value="Completed">Completed</option>
</select>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#22c55e] h-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>

                      <input
                       type="number"
    min="0"
    max="100"
    value={project.progress}
    onChange={(e)=>
        updateProject(project.id!,{
            ...project,
            progress:Number(e.target.value)
        })
    }
    className="w-20 bg-[#1e293b] text-white rounded px-2"
/>
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