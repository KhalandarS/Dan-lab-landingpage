import React from "react";

export interface MeteorsProps {
  number?: number;
}

export const Meteors: React.FC<MeteorsProps> = ({ number = 20 }) => {
  const meteors = new Array(number).fill(true);
  
  return (
    <>
      {meteors.map((_, idx) => {
        const duration = Math.floor(Math.random() * (10 - 2) + 2);
        const delay = Math.random() * (0.8 - 0.2) + 0.2;
        return (
          <span
            key={"meteor" + idx}
            className="absolute top-1/2 left-1/2 h-1 w-1 rounded-[9999px] bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.8)] rotate-[215deg]"
            style={{
              top: 0,
              left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
              animation: `animate-meteor ${duration}s linear ${delay}s infinite`,
            } as React.CSSProperties}
          >
            <div className="absolute -top-1/2 h-1.5 w-1.5 translate-x-[-50%] transform">
              <div className="absolute top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
          </span>
        );
      })}
    </>
  );
};
