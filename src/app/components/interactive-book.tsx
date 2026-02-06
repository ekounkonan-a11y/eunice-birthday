import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { clsx } from 'clsx';

const bookImages = import.meta.glob('/src/assets/book/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
});

const BOOK_PHOTOS = Object.entries(bookImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

const EUNICE_PHOTO_1 = BOOK_PHOTOS[0] ?? '';
const EUNICE_PHOTO_2 = BOOK_PHOTOS[1] ?? BOOK_PHOTOS[0] ?? '';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const words = text.split(" ");
  
  return (
    <motion.div
      className={clsx("flex flex-wrap justify-center", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.03, delayChildren: delay },
        },
      }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 },
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const Petal = ({ index }: { index: number }) => (
  <motion.div
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{ 
      y: [0, 600], 
      x: [0, index % 2 === 0 ? 30 : -30, 0],
      opacity: [0, 0.6, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      duration: 6 + Math.random() * 4, 
      repeat: Infinity, 
      delay: Math.random() * 5,
      ease: "linear"
    }}
    className="absolute text-pink-300 pointer-events-none z-20 text-xl"
    style={{ left: `${10 + Math.random() * 80}%`, top: '-50px' }}
  >
    {"\uD83C\uDF39"}
  </motion.div>
);

const MissingBookImage = ({ label }: { label: string }) => (
  <div className="w-full h-full flex items-center justify-center text-center px-6 font-['Poppins'] text-gray-400">
    Ajoutez une image dans src/assets/book ({label})
  </div>
);

export const InteractiveBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const flip = (newDir: number) => {
    const nextIndex = currentPage + newDir;
    if (nextIndex >= 0 && nextIndex <= 2) {
      setDirection(newDir);
      setCurrentPage(nextIndex);
    }
  };

  return (
    <section id="book-section" className="py-20 flex flex-col items-center bg-[#FDFCF9] min-h-[750px] overflow-hidden">
      <div className="relative w-[92vw] max-w-[480px] h-[650px] perspective-2000 select-none">
        
        {/* Book Container with Realistic Shadow and Texture */}
        <div className="relative w-full h-full bg-[#FCFBF7] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12),0_10px_10px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
          
          {/* Subtle Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

          <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{ rotateY: direction > 0 ? -110 : 110, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: direction > 0 ? 110 : -110, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.6, 0.05, 0.1, 0.9] }}
                className="absolute inset-0 flex flex-col items-center justify-between p-7 md:p-14"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
              
                {currentPage === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 md:space-y-10">
                    <motion.div 
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-5xl md:text-6xl mb-2 md:mb-4"
                    >
                      {"\u2709\uFE0F"}
                    </motion.div>
                    <div className="space-y-6 md:space-y-8">
                      <h2 className="font-['Montserrat_Alternates'] text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                        <TypewriterText text="Joyeux anniversaire Eunice" />
                      </h2>
                      <div className="font-['Poppins'] text-gray-600 leading-relaxed text-base md:text-xl italic">
                        <TypewriterText
                          delay={1.5}
                          text="Aujourd’hui est un jour particulier, car il célèbre une personne unique : toi. Que cette nouvelle année de ta vie t’apporte la paix, une santé durable et de nombreux moments de bonheur, loin du stress inutile. Profite pleinement de cette journée, souris sans raison et savoure chaque instant. Reste telle que tu es, authentique et précieuse."
                        />
                      </div>
                    </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 10 }}
                    className="pt-4 text-[var(--color-rose-poudre)]"
                  >
                    <Heart size={32} fill="currentColor" />
                  </motion.div>
                </div>
              )}

              {currentPage === 1 && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full relative">
                  {/* Realistic Floating Petals */}
                  {[...Array(8)].map((_, i) => <Petal key={i} index={i} />)}
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white z-10"
                  >
                    {EUNICE_PHOTO_1 ? (
                      <ImageWithFallback src={EUNICE_PHOTO_1} alt="Eunice Photo 1" className="w-full h-full object-cover" />
                    ) : (
                      <MissingBookImage label="image 1" />
                    )}
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="font-['Poppins'] text-center text-lg md:text-2xl font-semibold text-[var(--color-rose-poudre)] italic px-2 z-10 drop-shadow-sm"
                  >
                    {"\"Continue d'avancer à ton rythme, le meilleur est encore devant toi\""}
                  </motion.p>
                </div>
              )}

              {currentPage === 2 && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full relative">
                  {/* Floral Background Decor */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-[250px] rotate-12">{"\uD83D\uDC90"}</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-white z-10"
                  >
                    {EUNICE_PHOTO_2 ? (
                      <ImageWithFallback src={EUNICE_PHOTO_2} alt="Eunice Photo 2" className="w-full h-full object-cover" />
                    ) : (
                      <MissingBookImage label="image 2" />
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center space-y-6 z-10"
                  >
                    <p className="font-['Poppins'] text-lg md:text-2xl font-semibold text-gray-800 italic px-2">
                      {"\"Merci d\u2019\u00eatre toi. \u00c0 tr\u00e8s bient\u00f4t pour encore plus de sourires\""}
                    </p>
                    <div className="flex justify-center items-center gap-4 text-[var(--color-rose-poudre)]">
                      <Sparkles size={24} />
                      <Heart fill="currentColor" size={32} className="animate-pulse" />
                      <Sparkles size={24} />
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Realistic Page Number and Navigation Info */}
              <div className="w-full flex justify-between items-center text-[var(--color-nude)] opacity-50 mt-10 border-t border-gray-100 pt-6 z-10">
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-gray-400">Page {currentPage + 1} of 3</span>
                <div className="flex gap-4">
                  <Sparkles size={16} />
                  <Heart size={16} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Invisible Swipe Area for Realistic Interaction */}
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 80) flip(-1);
              if (info.offset.x < -80) flip(1);
            }}
            className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* Floating Navigation Controls */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-10 z-50">
          <motion.button 
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => flip(-1)}
            disabled={currentPage === 0}
            className={clsx(
              "w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center transition-all border border-gray-100",
              currentPage === 0 ? "opacity-10 cursor-not-allowed" : "text-[var(--color-rose-poudre)]"
            )}
          >
            <ChevronLeft size={28} />
          </motion.button>
          
          <div className="flex gap-4 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-white">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                animate={{ 
                  scale: i === currentPage ? 1.4 : 1,
                  backgroundColor: i === currentPage ? "var(--color-rose-poudre)" : "#E2E8F0"
                }}
                className="w-2.5 h-2.5 rounded-full"
              />
            ))}
          </div>

          <motion.button 
            whileHover={{ scale: 1.15, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => flip(1)}
            disabled={currentPage === 2}
            className={clsx(
              "w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center transition-all border border-gray-100",
              currentPage === 2 ? "opacity-10 cursor-not-allowed" : "text-[var(--color-rose-poudre)]"
            )}
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>

        {/* Subtle Swipe Hint for Mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0], x: [20, -20, 20] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -top-14 left-1/2 -translate-x-1/2 text-gray-400 text-xs md:hidden pointer-events-none flex items-center gap-3 font-medium uppercase tracking-widest"
        >
          <ChevronLeft size={14} /> Swipe to flip <ChevronRight size={14} />
        </motion.div>
      </div>
    </section>
  );
};
