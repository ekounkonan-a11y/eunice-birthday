import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Letter = ({ char, index }: { char: string, index: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0, y: 50, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export const Loader = () => {
  const [loading, setLoading] = useState(true);
  const text = "HAPPY BIRTHDAY EUNICE";
  const letters = Array.from(text);

  useEffect(() => {
    // Launch fireworks - heavy sequence
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      
      try {
        confetti({
          particleCount,
          startVelocity: 35,
          spread: 360,
          ticks: 60,
          zIndex: 9999,
          colors: ['#FFC0CB', '#DDA0DD', '#F5F5DC', '#FFD700', '#B0E0E6'],
          origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.2, 0.5) }
        });
      } catch (e) {
        console.error("Confetti error", e);
      }
    }, 500);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise and gradient background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-[0.2em] mb-12">
              {letters.map((char, i) => (
                <div key={i} className="py-2">
                   <span className="font-['Montserrat_Alternates'] text-4xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <Letter char={char} index={i} />
                  </span>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="relative w-full max-w-xs mx-auto"
            >
               <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 2.5, duration: 4, ease: "linear" }}
                className="h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 3 }}
                className="font-['Poppins'] text-xs text-gray-400 mt-6 uppercase tracking-[0.4em] font-light"
              >
                Préparez-vous à l'élégance
              </motion.p>
            </motion.div>
          </div>
          
          {/* Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
