import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

interface FancyCardProps {
  title: string;
  icon: React.ReactNode;
  gradient?: "default" | "blue" | "purple" | "orange";
  description: string;
  status: string;
  size?: "large" | "default";
}

const FancyCard: React.FC<FancyCardProps> = ({
  title,
  icon,
  description,
  status,
  gradient = "default",
  size = "default",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => cardRef.current && observer.unobserve(cardRef.current);
  }, []);

  return (
    <Wrapper className={gradient} ref={cardRef} isVisible={isVisible} size={size}>
      <div className="card">
        <div className="background" />

        <div className="title">{title}</div>

        <div className="description-layer">
          <div className="description-content">
            <p>{description}</p>
            <span className="status">{status}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FancyCard;

const Wrapper = styled.div<{ isVisible: boolean; size?: "large" | "default" }>`
  .card {
    position: relative;
    width: ${(p) => (p.size === "large" ? "400px" : "260px")};
    height: ${(p) => (p.size === "large" ? "340px" : "220px")};
    background: #f4f4f4;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 16px;
    cursor: pointer;

    opacity: ${(p) => (p.isVisible ? 1 : 0)};
    transform: ${(p) => (p.isVisible ? "translateY(0)" : "translateY(30px)")};
    transition: opacity 0.6s ease-out, transform 0.6s ease-out, scale 0.4s ease;
  }

  .card:hover {
    transform: scale(1.06);
  }

  /* Backgrounds */
  &.default .background {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  }
  &.blue .background {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  }
  &.purple .background {
    background: linear-gradient(135deg, #faf5ff, #f3e8ff);
  }
  &.orange .background {
    background: linear-gradient(135deg, #fff7ed, #ffedd5);
  }

  .background {
    position: absolute;
    inset: 0;
  }

  /* ================================ */
  /* CLEAN DAN-LAB TYPOGRAPHY FIX     */
  /* ================================ */

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: "JetBrains Mono", "Space Mono", monospace;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.25em;

    color: #0f172a;
    font-size: ${(p) => (p.size === "large" ? "1.4rem" : "1.1rem")};
    z-index: 10;
    text-align: center;
    transition: all 0.45s ease;
    white-space: nowrap;
  }

  .card:hover .title {
    top: 14px;
    right: 14px;
    left: auto;
    transform: none;
    font-size: ${(p) => (p.size === "large" ? "1.1rem" : "0.95rem")};
    opacity: 0.95;
  }

  /* DESCRIPTION LAYER */
  .description-layer {
    position: absolute;
    width: 90%;
    height: 80%;
    bottom: -80%;
    left: -90%;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.15) -6px 6px 28px;
    padding: 25px;
    transition: all 0.7s ease-in-out;
  }

  .card:hover .description-layer {
    bottom: -10px;
    left: -10px;
  }

  .description-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .description-content p {
    font-family: "JetBrains Mono", "Space Mono", monospace;
    font-size: 0.78rem;
    font-weight: 400;
    color: #334155;
    line-height: 1.45;
    margin: 0;

    opacity: 0;
    transform: translateY(8px);
    transition: all 0.35s ease-out 0.15s;
  }

  .status {
    display: inline-block;
    align-self: flex-start;
    background: #0f172a;
    color: white;

    font-family: "JetBrains Mono", "Space Mono", monospace;
    text-transform: uppercase;
    letter-spacing: 0.2em;

    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.65rem;
    font-weight: 600;

    opacity: 0;
    transform: translateY(8px);
    transition: all 0.35s ease-out 0.25s;
  }

  .card:hover .description-content p,
  .card:hover .status {
    opacity: 1;
    transform: translateY(0);
  }
`;
