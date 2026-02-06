import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MessageCircle, Facebook, X, Info } from 'lucide-react';

export const CreditButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { 
      name: 'Site Web', 
      icon: <ExternalLink size={18} />, 
      url: 'https://ekounforge.com',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle size={18} />, 
      url: 'https://wa.me/2250707070707', // Placeholder
      color: 'hover:text-green-600'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={18} />, 
      url: 'https://facebook.com/ekounforge', // Placeholder
      color: 'hover:text-blue-800'
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[9000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            className="absolute bottom-16 left-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 min-w-[180px] border border-white/20"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all ${link.color} hover:bg-gray-50 text-gray-700 font-['Poppins'] text-sm font-medium`}
                >
                  <span className="p-1.5 bg-gray-100 rounded-lg">{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-md border border-white shadow-lg rounded-full group transition-all"
      >
        <span className="font-['Montserrat_Alternates'] text-xs font-bold tracking-tighter text-gray-800">
          By <span className="text-[var(--color-rose-poudre)]">Ekoun Forge</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400 group-hover:text-[var(--color-rose-poudre)]"
        >
          {isOpen ? <X size={14} /> : <Info size={14} />}
        </motion.div>
      </motion.button>
    </div>
  );
};
