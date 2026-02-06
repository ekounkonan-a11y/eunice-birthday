import React from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const heroImages = import.meta.glob('/src/assets/hero/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default'
});

const HERO_PHOTO = Object.entries(heroImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string)[0] ?? '';

export const Hero = () => {
  const titleWords = ["Joyeux", "Anniversaire", "EUNICE"];
  
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 md:py-0 overflow-hidden">
      {/* Title (Top on Mobile, Left on Desktop) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 order-1 md:order-1 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0"
      >
        <h1 
          className="notranslate font-['Montserrat_Alternates'] text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-4 flex flex-col md:block" 
          style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
          translate="no"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)",
                y: [0, -10, 0], // Floating motion
                rotate: i % 2 === 0 ? [-1, 1, -1] : [1, -1, 1] // Subtle swaying
              }}
              transition={{ 
                opacity: { delay: 0.2 + (i * 0.2), duration: 0.8 },
                scale: { delay: 0.2 + (i * 0.2), duration: 0.8 },
                filter: { delay: 0.2 + (i * 0.2), duration: 0.8 },
                y: {
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              translate="no"
              className={clsx(
                "notranslate",
                "inline-block",
                i === 1 && "text-[var(--color-rose-poudre)]"
              )}
            >
              {word}{i < titleWords.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </h1>
        
        {/* Subtitle hidden on mobile here, moved to order 3 */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="notranslate hidden md:block font-['Poppins'] text-lg md:text-xl text-gray-500 mb-8 max-w-md"
          translate="no"
        >
          {"11 f\u00e9vrier \u2014 une journ\u00e9e sp\u00e9ciale pour une personne exceptionnelle."}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden md:flex gap-4"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="notranslate px-8 py-3 bg-[var(--color-rose-poudre)] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            onClick={() => document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' })}
            translate="no"
          >
            Ouvrir mon cadeau
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Photo (Middle on Mobile, Right on Desktop) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 order-2 md:order-2 flex justify-center items-center relative"
      >
        <div className="relative group">
          <div className="absolute -inset-4 bg-[var(--color-nude)] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative aspect-[3/4] w-64 md:w-[400px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
            {HERO_PHOTO ? (
              <ImageWithFallback 
                src={HERO_PHOTO} 
                alt="Eunice Portrait" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center px-6 font-['Poppins'] text-gray-400">
                Ajoutez une image dans src/assets/hero
              </div>
            )}
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 text-[var(--color-rose-poudre)] opacity-60"
          >
            <Sparkles size={48} />
          </motion.div>
        </div>
      </motion.div>

      {/* Subtitle and CTA (Bottom on Mobile Only) */}
      <motion.div 
        className="w-full order-3 md:hidden flex flex-col items-center mt-8 text-center"
      >
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="notranslate font-['Poppins'] text-lg text-gray-500 mb-8 px-4"
          translate="no"
        >
          {"11 f\u00e9vrier \u2014 une journ\u00e9e sp\u00e9ciale pour une personne exceptionnelle."}
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="notranslate px-8 py-3 bg-[var(--color-rose-poudre)] text-white rounded-full font-medium shadow-lg"
          onClick={() => document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' })}
          translate="no"
        >
          Ouvrir mon cadeau
        </motion.button>
      </motion.div>
    </section>
  );
};
