/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0A',
        cyber: '#121212',
        surface: '#1A1A1A',
        volt: '#CCFF00',
        crimson: '#FF3E3E',
        cyanGlow: '#00F0FF',
        goldVip: '#FFD700',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'volt-glow': '0 0 25px rgba(204, 255, 0, 0.35)',
        'crimson-glow': '0 0 25px rgba(255, 62, 62, 0.35)',
        'cyan-glow': '0 0 25px rgba(0, 240, 255, 0.35)',
      },
    },
  },
  plugins: [],
}
