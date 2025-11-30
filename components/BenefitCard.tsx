/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const BenefitCard = ({
  className = "",
  text = "12x",
  text1 = "Faster growth",
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getTargetValue = () => {
    if (text.includes("%")) return parseInt(text);
    if (text.includes("x")) return parseInt(text);
    return parseInt(text) || 0;
  };

  const targetValue = getTargetValue();
  const suffix = text.includes("%") ? "%" : text.includes("x") ? "x" : "";

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 2000;

    if (inView) {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * targetValue);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(targetValue);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [inView, targetValue]);

  return (
    <div
      ref={ref}
      className={`flex flex-col w-72 md:w-80 items-center gap-6 p-6 relative bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}
    >
      <div className="flex flex-col items-start w-full">
        <div className="text-gray-900 font-serif text-5xl md:text-6xl mb-1 leading-none">
          {inView ? `${count}${suffix}` : `0${suffix}`}
        </div>

        <div className="text-gray-600 font-mono text-sm tracking-widest uppercase">
          {text1}
        </div>
      </div>
    </div>
  );
};
