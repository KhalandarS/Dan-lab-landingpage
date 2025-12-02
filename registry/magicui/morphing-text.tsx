import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MorphingTextProps {
  texts: string[];
  duration?: number;
}

export const MorphingText: React.FC<MorphingTextProps> = ({ 
  texts, 
  duration = 4 
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div className="relative h-8 overflow-hidden">
      {texts.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={
            index === i
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -10 }
          }
          transition={{ duration: 0.5 }}
          className="absolute w-full"
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
};
