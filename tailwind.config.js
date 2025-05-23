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
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'sheikah': '0 0 15px rgba(139, 184, 232, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 184, 232, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 184, 232, 0.8)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.zelda-light-blue'),
            h1: {
              color: theme('colors.zelda-gold'),
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h2: {
              color: theme('colors.zelda-gold'),
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            h3: {
              color: theme('colors.zelda-gold'),
              fontFamily: theme('fontFamily.serif').join(', '),
            },
            strong: {
              color: theme('colors.zelda-gold'),
            },
            a: {
              color: theme('colors.zelda-teal'),
              '&:hover': {
                color: theme('colors.zelda-gold'),
              },
            },
            li: {
              color: theme('colors.zelda-light-blue'),
            },
            ul: {
              li: {
                '&::marker': {
                  color: theme('colors.zelda-gold'),
                },
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 