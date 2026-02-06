import React from 'react';
import { motion } from 'framer-motion';

const PETAL_IMAGE = "https://images.unsplash.com/photo-1762328845844-64b041d0c5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcm9zZSUyMHBldGFscyUyMHRvcCUyMHZpZXd8ZW58MXx8fHwxNzcwMDUzNTY1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const LEAF_IMAGE = "https://images.unsplash.com/photo-1721687221018-bb9e2db0af72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBldWNhbHlwdHVzJTIwbGVhdmVzJTIwaXNvbGF0ZWR8ZW58MXx8fHwxNzcwMDUzNTY1fDA&ixlib=rb-4.1.0&q=80&w=1080";

export const FloatingElements = () => {
  const elements = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: -20, 
            rotate: 0,
            opacity: 0 
          }}
          animate={{
            y: "110vh",
            x: `${(Math.random() * 100) - 10}%`,
            rotate: 360,
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute w-6 h-6 md:w-8 md:h-8"
        >
          <img 
            src={i % 2 === 0 ? PETAL_IMAGE : LEAF_IMAGE} 
            alt="" 
            className="w-full h-full object-contain opacity-40 blur-[1px]"
          />
        </motion.div>
      ))}
    </div>
  );
};
