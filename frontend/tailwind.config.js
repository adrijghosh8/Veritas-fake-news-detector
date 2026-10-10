/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F4EE",
        paper: "#FBF9F5",
        ink: "#1A1A1A",
        mute: "#5C5A55",
        line: "#D9D5CC",
        lavender: {
          DEFAULT: "#B9B6E4",
          soft: "#E4E2F5",
        },
        ok: { fg: "#2F6B3F", bg: "#DDEBDD" },
        bad: { fg: "#9A2F2F", bg: "#F3DADA" },
        warn: { fg: "#8A5A10", bg: "#F3E6C9" },
        neutral: { fg: "#4A4843", bg: "#E8E5DD" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
