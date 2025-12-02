import React, { useEffect, useState, useRef } from "react";
import { RetroComputer } from "./components/RetroComputer";
import { Globe } from "./components/Globe";
import { FloatingLabel } from "./components/FloatingLabel";
import FancyCard from "./components/FancyCard";
import { OrbitingCircles } from "./components/ui/orbiting-circles";
import { BenefitCard } from "./components/BenefitCard";
import { Bot, Smartphone, Code, Glasses } from "lucide-react";
import { motion } from "framer-motion";

function App() {
  const [isTerminalInView, setIsTerminalInView] = useState(false);
  const terminalRef = useRef(null);

  const [navScale, setNavScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const minScale = 0.7;
      const maxScroll = 500;
      const progress = Math.min(scrollY / maxScroll, 1);
      const smoothScale = 1 - (1 - minScale) * progress;
      setNavScale(smoothScale);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsTerminalInView(true),
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (terminalRef.current) observer.observe(terminalRef.current);
    return () => terminalRef.current && observer.unobserve(terminalRef.current);
  }, []);

  const googleFormUrl = "https://form.typeform.com/to/s8oqryLy";

  const handleApplyClick = () => {
    window.open(googleFormUrl, "_blank");
  };

  return (
    <div
      className="min-h-screen relative w-full"
      style={{
        backgroundColor: "#F2F2F2",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' fill='none'%3E%3Cfilter id='a' x='0' y='0' width='200%' height='200%'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/feMergeNode/%3E%3C/feMerge%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23a)' opacity='.18'/%3E%3C/svg%3E\")",
      }}
    >

      {/* NAVBAR */}
      <nav
        style={{
          transform: `scale(${navScale})`,
          paddingLeft: `${20 * navScale}px`,
          paddingRight: `${20 * navScale}px`,
          gap: `${40 * navScale}px`,
        }}
        className="fixed top-12 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 
        flex justify-between items-center px-10 py-5 
        rounded-full border border-white/5 backdrop-blur-xl
        bg-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        transition-transform duration-500 ease-out origin-top"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent opacity-5 pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]"></div>
          <span className="font-mono text-[22px] md:text-[24px] tracking-[0.55em] font-extrabold text-gray-900">
            DAN LAB
          </span>
        </div>

        <div className="flex gap-10 md:gap-14 font-mono text-[14px] uppercase tracking-[0.25em] text-gray-800 relative z-10">
          <a href="#products" className="relative group">
            Products
            <span className="absolute left-1/2 bottom-[-3px] h-[2px] w-0 bg-black group-hover:w-full group-hover:left-0 transition-all duration-300" />
          </a>
          <a href="#research" className="relative group">
            Research
            <span className="absolute left-1/2 bottom-[-3px] h-[2px] w-0 bg-black group-hover:w-full group-hover:left-0 transition-all duration-300" />
          </a>
          <a href="#contact" className="relative group">
            Join Us
            <span className="absolute left-1/2 bottom-[-3px] h-[2px] w-0 bg-black group-hover:w-full group-hover:left-0 transition-all duration-300" />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center py-38 px-4">
        <FloatingLabel label="(4)" sublabel="active" className="top-[15%] left-[5%] md:top-32 md:left-24 lg:left-32" delay={0.2} />
        <FloatingLabel label="(AGI)" sublabel="goal" className="top-[15%] right-[5%] md:top-32 md:right-24 lg:right-32" delay={0.4} />
        <FloatingLabel label="(2025)" sublabel="est." className="bottom-[25%] left-[5%] md:bottom-40 md:left-24 lg:left-32" delay={0.6} />
        <FloatingLabel label="(100%)" sublabel="future" className="bottom-[25%] right-[5%] md:bottom-40 md:right-24 lg:right-32" delay={0.8} />

        <div className="mb-8 scale-90 md:scale-100">
          <RetroComputer />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col items-center mt-6 md:mt-10"
        >
          <div className="mb-6 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm">
            <p className="font-mono text-[16px] tracking-[0.2em] text-gray-600 uppercase">
              AI Product & Research Lab
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[1.1] text-center tracking-tight">
            building the future <br />
            <span className="italic text-gray-500 font-light">of automated life</span>
          </h1>
        </motion.div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="relative z-10 py-32 px-6 md:px-20 bg-[#F7F7F5]">
        <div className="text-center mb-24">
          <span className="font-mono text-[18px] uppercase border border-gray-300 px-3 py-1.5 rounded-full text-gray-500 bg-white">
            Consumer & Dev Tools
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-8 text-gray-900">product ecosystem</h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
          <FancyCard title="Agent8" icon={<Bot />} gradient="blue" description="No-code AI agent builder. Create autonomous workflows using natural language." status="Live Beta" />
          <FancyCard title="Zerant" icon={<Smartphone />} gradient="purple" description="AI-powered mobile browser that fills forms, books flights, and navigates for you." status="Waitlist" />
          <FancyCard title="Dapify" icon={<Code />} gradient="default" description="Web3 development studio for generating smart contracts & decentralized apps." status="Alpha" />
          <FancyCard title="AI Glasses" icon={<Glasses />} gradient="orange" description="Next-gen AR glasses powered by multimodal AI overlays." status="Prototype" />
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" className="relative z-10 py-32 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif mb-4">
            Dan Lab Product Research
          </motion.h2>
          <motion.div initial={{ width: 0 }} whileInView={{ width: "200px" }} transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-white mx-auto" />
        </div>

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

            {/* LEFT */}
            <div className="lg:w-1/2">
              <span className="font-mono text-[18px] uppercase text-blue-400 tracking-widest">Research Division</span>
              <h2 className="text-5xl md:text-8xl font-serif mt-6 mb-12 leading-none">
                path to <br />
                <span className="italic text-gray-600">AGI</span>
              </h2>
            </div>

            {/* RIGHT — GLOBE */}
            <div className="lg:w-1/2 relative h-[500px] flex justify-center items-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                className="absolute w-[380px] h-[380px] rounded-full border border-blue-500/20"
                style={{ boxShadow: "0 0 40px rgba(0, 150, 255, 0.15), inset 0 0 20px rgba(0, 100, 255, 0.08)" }}
              />

              <div className="scale-125 relative z-10"><Globe /></div>

              {/* LINES */}
              <motion.div className="absolute top-[18%] right-[58%] w-[120px] h-[1px] bg-blue-400/20"
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3 }} />
              <motion.div className="absolute bottom-[27%] right-[18%] w-[80px] h-[1px] bg-blue-400/20"
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} />
              <motion.div className="absolute top-[62%] left-[12%] w-[140px] h-[1px] bg-blue-400/20"
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} />

              {/* FLOATING LABELS */}
              <div className="group absolute top-[15%] right-[60%] z-50">
                <FloatingLabel label="Reasoning" sublabel="Core A" delay={0.5} />
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 
                  bg-black/50 backdrop-blur-xl px-5 py-4 rounded-xl 
                  border border-blue-300/20 shadow-[0_0_15px_rgba(0,140,255,0.35)]
                  text-[14px] font-mono leading-relaxed text-blue-100 w-64 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 text-center pointer-events-none">
                  Structured inference, logical planning, and multi-step cognition.
                </div>
              </div>

              <div className="group absolute bottom-[25%] right-[15%] z-50">
                <FloatingLabel label="Creative" sublabel="Core B" delay={0.7} />
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  text-base font-mono text-purple-300 text-right 
                  bg-black/70 px-4 py-3 rounded-lg backdrop-blur-lg 
                  border border-purple-500/20 w-64 z-50">
                  Generative ideation, re-imagining patterns, adaptive creativity.
                </div>
              </div>

              <div className="group absolute top-[60%] left-[5%] z-50">
                <FloatingLabel label="Synthesis" sublabel="AGI Fabric" delay={0.9} />
                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  text-base font-mono text-green-300 text-center 
                  bg-black/70 px-4 py-3 rounded-lg backdrop-blur-lg 
                  border border-green-500/20 w-64 z-50">
                  Combining multimodal information into coherent, novel outputs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="relative z-10 py-32 bg-[#F8F8F8] border-t border-gray-200">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">performance metrics</h2>
          <p className="font-mono text-gray-500 text-[22px] tracking-[0.4em] uppercase">measurable impact</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <BenefitCard text="8x" text1="Faster Growth" />
          <BenefitCard text="89%" text1="Automation Accuracy" />
          <BenefitCard text="12x" text1="Productivity Boost" />
        </div>
      </section>

      {/* FOOTER */}
      
   {/* MAGICUI EXACT TWO-BOX LAYOUT */}
{/* MAGICUI CONNECTED OUTLINE BOX */}
{/* MAGICUI CONNECTED OUTLINE BOX FIXED SPACING + CONNECTED LINES */}
<div className="w-full border border-black/15 rounded-3xl p-12 mt-20">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative">

    {/* Center Divider (perfectly connected) */}
    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black/15"></div>

    {/* LEFT — TERMINAL */}
    <div className="flex justify-center lg:justify-end pr-8">
      <div className="w-full max-w-lg">
        <div ref={terminalRef}>
          {isTerminalInView && <TerminalDemo />}
        </div>
      </div>
    </div>

    {/* RIGHT — SOCIAL ORBITS */}
    <div className="flex justify-center lg:justify-start pl-8">
      <div className="relative flex h-[330px] w-full max-w-xs justify-center items-center overflow-visible">

        {/* OUTER ORBIT (BIGGER NOW) */}
        <OrbitingCircles iconSize={48} radius={150}>
          <Icons.discord />
          <Icons.gitHub />
          <Icons.twitter />
          <Icons.instagram />
        </OrbitingCircles>

        {/* INNER ORBIT slightly larger */}
        <OrbitingCircles iconSize={32} radius={110} reverse speed={2}>
          <Icons.gitHub />
          <Icons.twitter />
          <Icons.instagram />
          <Icons.discord />
        </OrbitingCircles>

      </div>
    </div>

  </div>
</div>

        <div>
          {/* APPLY BUTTON */}
          <div className="flex justify-center mt-20 mb-10">
            <button
              onClick={handleApplyClick}
              className="relative group overflow-hidden select-none px-14 py-5 rounded-full bg-black text-white font-mono uppercase tracking-[0.32em] text-[12px] transition-all duration-500 ease-out hover:scale-[1.1] active:scale-[0.94] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:-rotate-[0.6deg]"
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-[1200ms]" />
              <span className="absolute left-1/2 top-1/2 w-0 h-0 rounded-full bg-white/10 group-hover:w-[200%] group-hover:h-[200%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[900ms]" />
              <span className="absolute inset-y-0 left-0 w-full bg-white/15 translate-x-[-110%] group-hover:translate-x-[0%] transition-transform duration-[650ms]" />
              <span className="absolute inset-y-0 left-0 w-full bg-white/8 translate-x-[-130%] group-hover:translate-x-[15%] transition-transform duration-[900ms] delay-100" />
              <span className="absolute inset-y-0 left-0 w-full bg-white/4 translate-x-[-150%] group-hover:translate-x-[30%] transition-transform duration-[1100ms] delay-200" />
              <span className="relative z-10 transition-all duration-[600ms] group-hover:translate-x-[10px] group-hover:opacity-70 group-hover:-rotate-[1deg]">
                Apply Now →
              </span>
            </button>
          </div>

          {/* COPYRIGHT */}
          <div className="mt-16 border-t border-gray-100 pt-10">
            <div className="text-center font-mono text-[14px] text-gray-400">
              © 2025 DAN LAB INC. <br /> INDIA
            </div>
          </div>
        </div>
      </div>
  );
}

function TerminalDemo() {
  const [displayText, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const lines = [
    "> pnpm dlx shadcn@latest init",
    "✓ Preflight checks.",
    "✓ Verifying framework. Found Next.js.",
    "✓ Validating Tailwind CSS.",
    "✓ Validating import alias.",
    "✓ Writing components.json.",
    "✓ Checking registry.",
    "✓ Updating tailwind.config.ts",
    "✓ Updating app/globals.css",
    "✓ Installing dependencies.",
    "i Updated 1 file: - lib/utils.ts",
    "Success! Project initialization completed.",
    "You may now add components.",
  ];

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + "\n");
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  const formatText = (text) =>
    text.split("\n").map((line, index) => {
      if (line.startsWith("> ") || line.startsWith("✓ "))
        return <div key={index} className="text-green-400">{line}</div>;
      else if (line.startsWith("i "))
        return <div key={index} className="text-blue-400">{line}</div>;
      else if (line.trim() === "")
        return <div key={index}>&nbsp;</div>;
      else
        return <div key={index} className="text-gray-300">{line}</div>;
    });

  return (
    <div className="bg-black/90 border border-gray-700 rounded-lg p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-sm ml-2 font-mono">terminal</span>
      </div>

      <div className="font-mono text-sm space-y-1">
        {formatText(displayText)}
        <div className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
      </div>
    </div>
  );
}

const Icons = {
  gitHub: () => (
    <svg width="100" height="100" viewBox="0 0 438.549 438.549">
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  discord: () => (
    <svg width="100" height="100" viewBox="0 0 127.14 96.36">
      <path
        fill="currentColor"
        d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
      />
    </svg>
  ),
  twitter: () => (
    <svg width="100" height="100" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M23.953 4.569c-.885.392-1.83.656-2.825.775 
        1.014-.608 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 
        1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 
        0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 
        2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.061c0 
        2.385 1.693 4.374 3.946 4.827-.734.199-1.534.232-2.224.084.626 
        1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 
        2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 
        0 14.307-7.721 13.995-14.646.962-.695 1.8-1.562 2.46-2.549z"
      />
    </svg>
  ),
  instagram: () => (
    <svg width="100" height="100" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 
        5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 
        16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 
        0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 
        20.5h8.5A4.25 4.25 0 0 0 20.5 
        16.25v-8.5A4.25 4.25 0 0 0 16.25 
        3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 
        0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 
        7 3.5 3.5 0 0 0 0-7zm5.25-.75a1.25 1.25 
        0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"
      />
    </svg>
  ),
};

export default App;
