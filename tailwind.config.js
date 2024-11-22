// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        'gang-purple': {
          900: '#2D1B69',
          800: '#382280',
          700: '#442996',
          600: '#5031AD',
          500: '#5C38C3',
          400: '#6940DA',
          300: '#7547F0',
          200: '#8154FF',
          100: '#8D61FF',
        },
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'slide-out': 'slideOut 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-out': 'fadeOut 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            textShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
          },
          '50%': {
            textShadow: '0 0 40px rgba(167, 139, 250, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)',
          },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // Add custom plugin for glow effects
    function({ addUtilities }) {
      const newUtilities = {
        '.glow-sm': {
          boxShadow: '0 0 10px rgba(167, 139, 250, 0.3)',
        },
        '.glow-md': {
          boxShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
        },
        '.glow-lg': {
          boxShadow: '0 0 30px rgba(167, 139, 250, 0.5)',
        },
        '.text-glow-sm': {
          textShadow: '0 0 10px rgba(167, 139, 250, 0.3)',
        },
        '.text-glow-md': {
          textShadow: '0 0 20px rgba(167, 139, 250, 0.4)',
        },
        '.text-glow-lg': {
          textShadow: '0 0 30px rgba(167, 139, 250, 0.5)',
        },
      };
      addUtilities(newUtilities, ['hover', 'focus']);
    },
  ],
};