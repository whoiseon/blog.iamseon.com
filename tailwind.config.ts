import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: ['text-prism-code8-light', 'text-prism-code8-dark'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        code: 'Fira Mono, source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
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
          bg: {
            white: '#eeeeee',
          },
        },
        editor: {
          green: {
            selection: 'rgba(74, 222, 118, 0.3)',
          },
        },
        prism: {
          text: {
            light: '#24292e',
            dark: '#e0e6f1',
          },
          selection: {
            light: 'rgba(0, 0, 0, 0.15)',
            dark: '#383e49',
          },
          code1: {
            light: '#969896',
            dark: '#7c858d',
          },
          code2: {
            light: '#24292e',
            dark: '#abb2bf',
          },
          code3: {
            light: '#a626a4',
            dark: '#e06c75',
          },
          code4: {
            light: '#63a35c',
            dark: '#d19a66',
          },
          code5: {
            light: '#0184bc',
            dark: '#98c379',
          },
          code6: {
            light: '#50a14f',
            dark: '#56b6c2',
          },
          code7: {
            light: '#a626a4',
            dark: '#c678dd',
          },
          code8: {
            light: '#005cc5',
            dark: '#61afef',
          },
          code9: {
            light: '#a626a4',
            dark: '#c678dd',
          },
          line_number: {
            light: '#585c63',
            dark: '#5c6370',
          },
        },
      },
      boxShadow: {
        r: '4px 0 40px rgba(0, 0, 0, 0.03)',
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
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeInSlideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeOutSlideUp: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        fullSlideUp: 'fullSlideUp 0.25s ease-in',
        fullSlideDown: 'fullSlideDown 0.25s ease-out forwards',
        fadeIn: 'fadeIn 0.25s ease-in',
        fadeInSlideDown: 'fadeInSlideDown 0.125s ease-in',
        fadeOutSlideUp: 'fadeOutSlideUp 0.125s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
