import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const GalleryPage: React.FC = () => {
  const { t } = useLanguage();

  const images = [
    "/assets/p00.png",
    "/assets/group.png",
    "/assets/c1.jpg",
    "/assets/c2.jpg",
    "/assets/c3.jpg",
    "/assets/c4.jpg",
    "/assets/c5.jpg",
    "/assets/c6.jpg",
    "/assets/m2.png",
    "/assets/m3.png",
    "/assets/c7.jpg",
    "/assets/h1.png",
    "/assets/h2.png",
    "/assets/h3.png",
    "/assets/h4.png",
    "/assets/h5.png",
    "/assets/h6.png",
    "/assets/h7.png",
    "/assets/h8.png",
    "/assets/h9.png",
    "/assets/h10.png",
    "/assets/h11.png",
    "/assets/m1.png",
    "/assets/m4.png",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-green-100 via-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 text-[#1F7A53]">
          {t("nav.gallery")}
        </h1>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="w-full h-64 overflow-hidden rounded-xl shadow-md bg-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(31, 122, 83, 0.3)",
              }}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
