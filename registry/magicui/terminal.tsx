import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export const Terminal = ({ children, className = '' }: TerminalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full bg-black/80 backdrop-blur border border-green-500/30 rounded-lg p-4 font-mono text-sm text-green-400 overflow-hidden shadow-lg ${className}`}
    >
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-green-500/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-green-500/60 ml-2">terminal</span>
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </motion.div>
  );
};

interface TypingAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export const TypingAnimation = ({ children, className = '' }: TypingAnimationProps) => {
  const text = typeof children === 'string' ? children : '';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <div className={className}>{displayedText}</div>;
};

interface AnimatedSpanProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSpan = ({ children, className = '' }: AnimatedSpanProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
