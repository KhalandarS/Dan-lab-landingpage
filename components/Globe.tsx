import React, { useEffect, useState, useRef } from 'react';

const GLOBE_RADIUS = 100;
const DOT_COUNT = 200;

interface Point {
    x: number;
    y: number;
    z: number;
    lat: number;
    lon: number;
}

export const Globe: React.FC = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [rotation, setRotation] = useState(0);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const newPoints: Point[] = [];
        // Fibonacci sphere algorithm for even distribution
        const phi = Math.PI * (3 - Math.sqrt(5)); 
        for (let i = 0; i < DOT_COUNT; i++) {
            const y = 1 - (i / (DOT_COUNT - 1)) * 2; // y goes from 1 to -1
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            newPoints.push({ x: x * GLOBE_RADIUS, y: y * GLOBE_RADIUS, z: z * GLOBE_RADIUS, lat: 0, lon: 0 });
        }
        setPoints(newPoints);
    }, []);

    const animate = () => {
        setRotation(prev => prev + 0.005);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    // Project 3D points to 2D
    const projectedPoints = points.map(p => {
        // Rotate around Y axis
        const cosRot = Math.cos(rotation);
        const sinRot = Math.sin(rotation);
        const x = p.x * cosRot - p.z * sinRot;
        const z = p.z * cosRot + p.x * sinRot;
        
        // Simple perspective projection
        const scale = 300 / (300 - z);
        const x2d = x * scale + 150; // Center offset
        const y2d = p.y * scale + 150;
        const opacity = Math.max(0.1, (z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));
        const size = Math.max(1, 3 * scale);

        return { x: x2d, y: y2d, opacity, size, z };
    }).sort((a, b) => a.z - b.z); // Sort by Z for painter's algorithm

    return (
        <div className="w-[300px] h-[300px] relative">
            <svg width="300" height="300" viewBox="0 0 300 300" className="w-full h-full">
                <defs>
                     <radialGradient id="globe-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#4B5563" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#1F2937" stopOpacity="0.0" />
                    </radialGradient>
                </defs>
                <circle cx="150" cy="150" r="100" fill="url(#globe-gradient)" />
                {projectedPoints.map((p, i) => (
                    <circle 
                        key={i} 
                        cx={p.x} 
                        cy={p.y} 
                        r={p.size} 
                        fill={p.z > 0 ? "#9CA3AF" : "#4B5563"} // Lighter front, darker back
                        opacity={p.opacity}
                    />
                ))}
                
                {/* Orbit ring */}
                <ellipse cx="150" cy="150" rx="140" ry="40" fill="none" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.5" transform="rotate(-15 150 150)" />
                <circle cx="150" cy="150" r="4" fill="#60A5FA" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                     <animateMotion dur="6s" repeatCount="indefinite" path="M -140 0 A 140 40 0 1 1 140 0 A 140 40 0 1 1 -140 0" rotate="auto" />
                </circle>
            </svg>
            
            {/* Floating Label */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                 {/* Center hidden */}
             </div>
        </div>
    );
};