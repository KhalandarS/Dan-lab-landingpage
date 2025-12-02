import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TerminalDemo = () => {
  const [displayText, setDisplayText] = useState("");
  const commands = [
    "$ dan lab init",
    "> Building AGI foundation...",
    "> 4 active projects",
    "> AI agents deployed",
    "> Status: Live Beta",
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let timeout;

    const type = () => {
      if (currentIndex < commands.length) {
        if (charIndex < commands[currentIndex].length) {
          setDisplayText(
            commands.slice(0, currentIndex).join("\n") +
              (currentIndex > 0 ? "\n" : "") +
              commands[currentIndex].substring(0, charIndex + 1)
          );
          charIndex++;
          timeout = setTimeout(type, 30);
        } else {
          currentIndex++;
          charIndex = 0;
          timeout = setTimeout(type, 500);
        }
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-96 bg-black rounded-lg border border-white/10 p-6 font-mono text-sm text-green-400 overflow-hidden shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <pre className="whitespace-pre-wrap break-words leading-relaxed">
        {displayText}
        <span className="animate-pulse">|</span>
      </pre>
    </motion.div>
  );
};
