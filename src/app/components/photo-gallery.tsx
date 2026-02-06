import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Maximize2, X } from 'lucide-react';

const galleryImages = import.meta.glob('/src/assets/gallery/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
});

const PHOTOS = Object.entries(galleryImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

export const PhotoGallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
            <h3 className="font-['Montserrat_Alternates'] text-3xl md:text-4xl font-bold text-gray-900 mb-4">Galerie Souvenirs</h3>
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
                  onClick={() => setSelectedImg(src)}
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

      {/* Lightbox Implementation */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback 
                src={selectedImg} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-white/5"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
