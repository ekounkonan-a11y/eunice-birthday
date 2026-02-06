import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from 'framer-motion';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Maximize2 } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = import.meta.glob('/src/assets/gallery/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
});

const PHOTOS = Object.entries(galleryImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

export const PhotoGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Préparer les slides pour yet-another-react-lightbox
  const slides = PHOTOS.map((src) => ({ src }));

  return (
    <section className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
            <h3
              className="notranslate font-['Montserrat_Alternates'] text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              translate="no"
            >
              Galerie Souvenirs
            </h3>
            <p className="font-['Poppins'] text-gray-500">Quelques éclats de rire et de beauté capturés dans le temps.</p>
        </div>

        {PHOTOS.length === 0 ? (
          <div className="text-center font-['Poppins'] text-gray-500">
            Ajoutez vos photos dans src/assets/gallery.
          </div>
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter="24px">
              {PHOTOS.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl cursor-pointer"
                  onClick={() => {
                    setPhotoIndex(i);
                    setLightboxOpen(true);
                  }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10 flex items-center justify-center">
                      <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="bg-white/90 p-4 rounded-full text-gray-900"
                      >
                          <Maximize2 size={24} />
                      </motion.div>
                  </div>
                  <ImageWithFallback 
                    src={src} 
                    alt={`Eunice souvenir ${i + 1}`} 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>

      {/* yet-another-react-lightbox Implementation */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
        animation={{
          fade: 300,
          swipe: 300,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
      />
    </section>
  );
};
