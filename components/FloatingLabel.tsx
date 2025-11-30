import React from 'react';
import { motion } from 'framer-motion';

interface FloatingLabelProps {
    label: string;
    sublabel: string;
    className?: string;
    delay?: number;
    style?: 'default' | 'dark';
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({ label, sublabel, className = "", delay = 0, style = 'default' }) => {
    const isDark = style === 'dark';
    
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
            className={`absolute flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border backdrop-blur-xl ${
                isDark 
                ? 'bg-black/40 border-white/10 text-white' 
                : 'bg-white/40 border-white/60 text-gray-800'
            } ${className}`}
        >
            <div className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</div>
            <div className={`w-[1px] h-3 ${isDark ? 'bg-white/20' : 'bg-gray-400/40'}`}></div>
            <div className={`text-[10px] uppercase tracking-wider font-mono ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{sublabel}</div>
        </motion.div>
    );
};