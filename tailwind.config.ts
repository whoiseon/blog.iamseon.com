import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      minHeight: {
        headerHeight: '50px',
      },
      colors: {
        tag: {
          green: {
            alpha: {
              300: 'rgba(134, 239, 172, 0.25)',
              400: 'rgba(74, 222, 118, 0.2)',
              500: 'rgba(34, 197, 94, 0.15)',
              600: 'rgba(22, 163, 74, 0.2)',
            },
          },
        },
        editor: {
          green: {
            selection: 'rgba(74, 222, 118, 0.3)',
          },
        },
      },
      keyframes: {
        fullSlideUp: {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        fullSlideDown: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
      },
      animation: {
        fullSlideUp: 'fullSlideUp 0.25s ease-in',
        fullSlideDown: 'fullSlideDown 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
