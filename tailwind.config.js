/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#11B98F',
          600: '#0EA5A4',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        navy: {
          50: '#DCE4FF',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#0F172A',
          900: '#0B1220',
        },
        glass: {
          light: 'rgba(248, 250, 252, 0.8)',
          dark: 'rgba(15, 23, 42, 0.8)',
        }
      },
      fontSize: {
        'fluid-h1': 'clamp(2.25rem, 5vw, 4rem)',
        'fluid-h2': 'clamp(1.75rem, 4vw, 2.75rem)',
        'fluid-h3': 'clamp(1.375rem, 3vw, 1.875rem)',
        'fluid-body': 'clamp(1rem, 2vw, 1.125rem)',
      },
      maxWidth: {
        'container': '1200px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(17, 185, 143, 0.25)',
        'glow-lg': '0 0 40px rgba(17, 185, 143, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(17, 185, 143, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(17, 185, 143, 0.4)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundSize: {
        '300%': '300% 300%',
      }
    },
  },
  plugins: [],
}
