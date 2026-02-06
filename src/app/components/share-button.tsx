import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Twitter, Send, Facebook, X } from 'lucide-react';

export const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = "Joyeux Anniversaire Eunice ! 🎂";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      name: 'WhatsApp', 
      icon: <Send size={20} className="rotate-[-20deg]" />, 
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + siteUrl)}`
    },
    { 
      name: 'Twitter', 
      icon: <Twitter size={20} />, 
      color: 'bg-[#1DA1F2]',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(siteUrl)}`
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={20} />, 
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`
    },
  ];

  return (
    <div className="fixed bottom-24 right-6 z-[9000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 bg-white rounded-3xl shadow-2xl p-4 min-w-[200px] border border-gray-100"
          >
            <p className="font-['Montserrat_Alternates'] font-bold text-gray-900 text-sm mb-4 px-2">Partager la magie</p>
            <div className="space-y-2">
              {shareOptions.map((option) => (
                <a
                  key={option.name}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-2xl transition-colors group"
                >
                  <div className={`${option.color} text-white p-2 rounded-xl`}>
                    {option.icon}
                  </div>
                  <span className="font-['Poppins'] text-sm text-gray-700 font-medium">{option.name}</span>
                </a>
              ))}
              
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-2xl transition-colors"
              >
                <div className="bg-gray-100 text-gray-600 p-2 rounded-xl">
                  {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </div>
                <span className="font-['Poppins'] text-sm text-gray-700 font-medium">
                  {copied ? 'Copié !' : 'Copier le lien'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[var(--color-rose-poudre)] text-white rounded-full shadow-xl flex items-center justify-center relative overflow-hidden group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="relative z-10"
        >
           {isOpen ? <X size={28} /> : <Share2 size={28} />}
        </motion.div>
        
        {/* Pulsing glow effect */}
        <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
      </motion.button>
    </div>
  );
};
