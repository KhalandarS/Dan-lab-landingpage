export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        meteor: "animate-meteor var(--animation-duration) linear infinite",
      },
      keyframes: {
        "animate-meteor": {
          "0%": {
            opacity: "1",
            transform: "translate(0, 0) translateY(0px) scaleY(1)",
          },
          "70%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-500px, 500px) translateY(-500px) scaleY(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
