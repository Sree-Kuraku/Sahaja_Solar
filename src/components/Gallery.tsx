import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";

import amaravathi from "../assets/images/Amaravathi-12kw.jpeg";
import gudivada from "../assets/images/gudivada-26kw.jpeg";
import guntur from "../assets/images/guntur-15kw.jpeg";
import hyd from "../assets/images/Hyd-15kw.jpeg";
import nuzividu from "../assets/images/nuzividu-18kw.jpeg";
import pamarru from "../assets/images/pamarru-6kw.jpeg";
import tanuku from "../assets/images/tanuku-50kw.jpeg";
import vij from "../assets/images/vij-12kw.jpeg";
import vijayawada from "../assets/images/vijayawada-15kw.jpeg";

interface GalleryImage {
  id: number;
  projectId: number;
  imagePath: string;
  caption: string;
}

interface GalleryProps {
  limit?: number;
  showViewAllButton?: boolean;
}

const predefinedImages = [
  {
    id: "static-1",
    image: amaravathi,
    caption: "Amaravathi Solar Project",
    capacity: "12 kW",
  },
  {
    id: "static-2",
    image: gudivada,
    caption: "Gudivada Solar Project",
    capacity: "26 kW",
  },
  {
    id: "static-3",
    image: guntur,
    caption: "Guntur Solar Project",
    capacity: "15 kW",
  },
  {
    id: "static-4",
    image: hyd,
    caption: "Hyderabad Solar Project",
    capacity: "15 kW",
  },
  {
    id: "static-5",
    image: nuzividu,
    caption: "Nuzividu Solar Project",
    capacity: "18 kW",
  },
  {
    id: "static-6",
    image: pamarru,
    caption: "Pamarru Solar Project",
    capacity: "6 kW",
  },
  {
    id: "static-7",
    image: tanuku,
    caption: "Tanuku Solar Project",
    capacity: "50 kW",
  },
  {
    id: "static-8",
    image: vij,
    caption: "Vij Solar Project",
    capacity: "12 kW",
  },
  {
    id: "static-9",
    image: vijayawada,
    caption: "Vijayawada Solar Project",
    capacity: "15 kW",
  },
];

export default function Gallery({ limit, showViewAllButton = false }: GalleryProps) {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/gallery"
      );

      setGallery(response.data);
    } catch (error) {
      console.error("Failed to load gallery", error);
    } finally {
      setLoading(false);
    }
  };

  // Combine backend images (if any) and predefined portfolio images
  const allProjects = [
    ...gallery.map((image) => ({
      id: `backend-${image.id}`,
      image: `http://localhost:8080/${image.imagePath}`,
      caption: image.caption,
      capacity: `Project #${image.projectId}`,
    })),
    ...predefinedImages,
  ];

  const displayedProjects = limit ? allProjects.slice(0, limit) : allProjects;

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Recent <span className="text-[#22c55e]">Projects</span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore some of our recently completed solar installations across Andhra Pradesh.
          </p>
        </div>

        {/* Loading */}
        {loading && gallery.length === 0 && predefinedImages.length === 0 && (
          <div className="text-center text-white text-xl">
            Loading Projects...
          </div>
        )}

        {/* No Images */}
        {!loading && displayedProjects.length === 0 && (
          <div className="text-center text-gray-300 text-xl">
            No Project Images Available
          </div>
        )}

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            limit === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          } gap-6 md:gap-8`}
        >
          {displayedProjects.map((image) => (
            <div
              key={image.id}
              className="group bg-[#131926] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#22c55e]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={image.image}
                  alt={image.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#22c55e] border border-[#22c55e]/30">
                  {image.capacity}
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#22c55e] transition-colors">
                  {image.caption}
                </h3>
                <p className="text-sm text-gray-400">
                  Capacity: <span className="text-gray-200 font-semibold">{image.capacity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button on Homepage */}
        {showViewAllButton && allProjects.length > (limit || 0) && (
          <div className="mt-14 text-center">
            <Link
              to="/gallery"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-black font-bold text-base shadow-lg shadow-[#22c55e]/25 hover:shadow-[#22c55e]/40 hover:scale-[1.03] transition-all duration-300"
            >
              <span>Explore All {allProjects.length}+ Recent Projects</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}