import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

interface Project {
  id: number;
  projectId: string;
}

interface GalleryImage {
  id: number;
  projectId: number;
  imagePath: string;
  caption: string;
}

export default function ProjectGallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);

  const [projectId, setProjectId] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadProjects();
    loadGallery();
  }, []);

  const loadProjects = async () => {
    try {
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
      console.error(error);
    }
  };

  const loadGallery = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/api/gallery",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGallery(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    if (!projectId || !caption || !file) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();

    formData.append("projectId", projectId);
    formData.append("caption", caption);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/gallery/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Image Uploaded Successfully");

      loadGallery();

      setProjectId("");
      setCaption("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };
  const deleteImage = async (id: number) => {

  if (!window.confirm("Delete this image?")) {
    return;
  }

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:8080/api/gallery/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Image Deleted Successfully");

    loadGallery();

  } catch (error) {
    console.error(error);
    alert("Delete Failed");
  }

};

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Project Gallery
      </h2>

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="w-full p-3 rounded bg-slate-800 text-white"
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option
            key={project.id}
            value={project.id}
          >
            {project.projectId}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-3 rounded bg-slate-800 text-white"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        className="w-full text-white"
      />

      <button
        onClick={uploadImage}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        Upload Image
      </button>

      <hr className="border-gray-600" />

      <h3 className="text-xl font-bold text-white">
        Uploaded Images
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.map((image) => (

  <div
    key={image.id}
    className="bg-slate-800 rounded-xl overflow-hidden shadow-lg"
  >

    <img
      src={`http://localhost:8080/${image.imagePath}`}
      alt={image.caption}
      className="w-full h-64 object-cover"
    />

    <div className="p-4">

      <h3 className="text-white font-bold text-lg">
        {image.caption}
      </h3>

      <p className="text-gray-400 mb-4">
        Project ID: {image.projectId}
      </p>

     <button
  onClick={() => deleteImage(image.id)}
  className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>
  <Trash2 size={18} />
  Delete
</button>

    </div>

  </div>

))}
      </div>
    </div>
  );
}