import React from "react";

export const SocialFooter = () => {
  return (
    <div className="flex items-center gap-10 mt-10">

      {socials.map((s, index) => (
        <div
          key={index}
          className="relative group cursor-pointer flex flex-col items-center"
        >

          {/* LABEL ABOVE ICON */}
          <span
            className="
              absolute bottom-[38px]
              font-mono text-[11px] font-bold 
              tracking-widest uppercase
              text-gray-600
              opacity-0 group-hover:opacity-100
              -translate-y-1 group-hover:translate-y-0
              transition-all duration-300
              pointer-events-none
              whitespace-nowrap
            "
          >
            {s.name}
          </span>

          {/* ICON */}
          <div
            className="
              transition-all duration-300 
              opacity-70 group-hover:opacity-100 
              group-hover:scale-110
            "
            style={{
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))",
            }}
          >
            {s.icon}
          </div>

        </div>
      ))}

    </div>
  );
};

const iconClass = "w-[28px] h-[28px]";

const socials = [
  {
    name: "Discord",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="black" strokeWidth="1.7">
        <path d="M20 4.5c-1.5-.7-3.3-1.2-5.3-1.3l-.3.6c2 .5 3.4 1.6 4.3 2.6-3.3-1.5-6.7-1.5-10 0 .9-1 2.3-2.1 4.3-2.6l-.3-.6C7.3 3.3 5.5 3.8 4 4.5 2 8 1.5 11.4 2 14.7c1.8 1.3 3.7 2.1 5.6 2.5l.7-.9c-1.5-.5-2.7-1.3-3.7-2.2 3.5 1.8 7.3 1.8 10.8 0-1 .9-2.2 1.7-3.7 2.2l.7.9c1.9-.4 3.8-1.2 5.6-2.5.5-3.3 0-6.7-2-10.2z" />
        <circle cx="9" cy="12" r="1.4" />
        <circle cx="15" cy="12" r="1.4" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="black" strokeWidth="1.7">
        <path d="M3 3l7.5 9L3 21h4l5.5-7.3L18.5 21H21l-7.5-9L21 3h-4l-5 6.5L7 3H3z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="black" strokeWidth="1.7">
        <path d="M12 2C6.5 2 2 6.7 2 12.3c0 4.4 2.8 8.2 6.7 9.6.5.1.7-.2.7-.5v-2c-2.7.6-3.3-1.3-3.3-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.3 1.7 1.3 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.2-.3-4.7-1.3-4.7-5.2 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3.1 1.2a10.4 10.4 0 0 1 5.6 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.6.1 2.9.8.8 1.3 1.9 1.3 3.1 0 4-2.5 4.9-4.9 5.2.4.4.8 1 .8 2.1v3c0 .3.2.7.7.5 4-1.4 6.7-5.2 6.7-9.6C22 6.7 17.5 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="black" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1.2" fill="black" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="black" strokeWidth="1.7">
        <path d="M14 3h3v3h-3c-1 0-2 .9-2 2v3h5l-.5 3h-4.5v8h-3v-8H7v-3h2.5v-3c0-2.8 1.6-5 4.5-5z" />
      </svg>
    ),
  },
];
