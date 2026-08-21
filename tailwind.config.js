/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zelda-teal': '#2D5A7A',
        'zelda-light-blue': '#8BB8E8',
        'zelda-gold': '#D4AF37',
        'zelda-dark': '#1A1A1A',
        // Brighter than zelda-light-blue for dense body copy over the teal gradient.
        'zelda-text': '#D6E6F5',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['"Cormorant Garamond"', 'serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'sheikah': '0 0 15px rgba(139, 184, 232, 0.5)',
        'sheikah-strong': '0 0 24px rgba(139, 184, 232, 0.65)',
        'rune-active': '0 0 14px rgba(212, 175, 55, 0.7)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 184, 232, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 184, 232, 0.8)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 6px rgba(212, 175, 55, 0.8)' },
          '50%': { opacity: '0.45', boxShadow: '0 0 2px rgba(212, 175, 55, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
