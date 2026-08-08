import { useEffect, useState } from "react";
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

export default function Gallery() {
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
        {loading && (
          <div className="text-center text-white text-xl">
            Loading Projects...
          </div>
        )}

        {/* No Images */}
        {!loading && gallery.length === 0 && predefinedImages.length === 0 && (
          <div className="text-center text-gray-300 text-xl">
            No Project Images Available
          </div>
        )}

        {/* Gallery */}
        {/* Gallery */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

  {/* Predefined Images */}
  {predefinedImages.map((image) => (

    <div
      key={image.id}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
    >

      {/* Image */}
      <div className="h-64 overflow-hidden">

        <img
          src={image.image}
          alt={image.caption}
          className="w-full h-full object-cover"
        />

      </div>

      {/* Details */}
      <div className="p-5">

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {image.caption}
        </h3>

        <p className="text-gray-600">
          Capacity: {image.capacity}
        </p>

      </div>

    </div>

  ))}


  {/* Backend Images */}
  {gallery.map((image) => (

    <div
      key={`backend-${image.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
    >

      {/* Image */}
      <div className="h-64 overflow-hidden">

        <img
          src={`http://localhost:8080/${image.imagePath}`}
          alt={image.caption}
          className="w-full h-full object-cover"
        />

      </div>

      {/* Details */}
      <div className="p-5">

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {image.caption}
        </h3>

        <p className="text-gray-600">
          Project #{image.projectId}
        </p>

      </div>

    </div>

  ))}

</div>
      </div>

    </section>
  );
}