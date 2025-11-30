import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Header() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        fixed top-10 left-1/2 -translate-x-1/2
        w-[90%] max-w-7xl 
        z-50 flex items-center justify-between px-2
      "
    >

      {/* LEFT: DAN LAB */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-5 cursor-pointer"
      >
        <div
          className="
            w-3.5 h-3.5 
            bg-green-500 rounded-full 
            shadow-[0_0_18px_rgba(0,255,120,1)]
            animate-ping
          "
        ></div>

        <span
          className="
            font-mono uppercase
            text-[20px] md:text-[22px]
            tracking-[0.65em]
            font-extrabold
            text-gray-900
          "
        >
          DAN LAB
        </span>
      </motion.div>

      {/* RIGHT: NAV LINKS */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-12 font-mono text-[12px] uppercase tracking-[0.25em] text-gray-700"
      >
        {[
          { name: "Products", href: "#products" },
          { name: "Research", href: "#research" },
          { name: "Join", href: "#contact" },
        ].map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className="relative group"
          >
            {item.name}

            <span
              className="
                absolute left-1/2 -translate-x-1/2 
                -bottom-[4px] h-[2px] w-0 
                bg-gray-900 rounded-full 
                transition-all duration-300 
                group-hover:w-full
              "
            ></span>

            <span
              className="
                absolute inset-0 blur-lg opacity-0 
                group-hover:opacity-40 transition-all duration-300
                bg-gray-400
              "
            ></span>
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
}
