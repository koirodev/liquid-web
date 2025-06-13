import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { ANIMATION, MEDIA } from './config';

export default <Partial<Config>>{
  content: [
    './pages/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
    './error.vue',
  ],
  theme: {
    extend: {
      screens: {
        mm: `${MEDIA.MOBILE}px`,
        mt: `${MEDIA.TABLET}px`,
        ml: `${MEDIA.LAPTOP}px`,
        md: `${MEDIA.DESKTOP}px`,
      },
      fontFamily: {
        primary: ['Montserrat', 'Arial', 'Helvetica Neue', 'sans-serif'],
        secondary: ['RockStar', 'Arial', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        theme: {
          bg: "theme('colors.dark')",
          text: "theme('colors.light.DEFAULT')",
          accent: "theme('colors.primary.DEFAULT')",
        },
        white: '#ffffff',
        light: {
          DEFAULT: '#fafafa',
          secondary: '#fafafa5d',
        },
        dark: '#02021a',
        dark2: '#09071d',
        primary: {
          DEFAULT: '#89ffff',
          default: '#89ffff',
          hover: '#3effff',
          transparent: '#89ffff83',
        },
        secondary: {
          DEFAULT: '#fbf1f4',
          hover: '#ff3366',
        },
        stroke: {
          DEFAULT: '#8b8c8e71',
          light: '#8b8c8e71',
          dark: '#1b2f3f4d',
        },
        system: {
          error: '#89ffff',
          validation: '#ffc225',
          success: '#2ab6a5',
        },
        disabled: {
          DEFAULT: '#ffffff4d',
          light: '#ffffff4d',
          dark: '#0000004d',
        },
        icon: '#02021a',
      },
      transitionDuration: {
        default: `${ANIMATION.DEFAULT}s`,
        short: `${ANIMATION.SHORT}s`,
        medium: `${ANIMATION.MEDIUM}s`,
        long: `${ANIMATION.LONG}s`,
        swiper: `${ANIMATION.SWIPER}s`,
      },
      transitionTimingFunction: {
        default: `cubic-bezier(${ANIMATION.EASE})`,
      },
      transitionProperty: {
        default: 'all',
        color: 'color',
      },
      borderRadius: {
        DEFAULT: '1.5rem',
        infinity: '100rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('any-hover', '@media (any-hover: hover) { &:hover }');
    }),
  ],
};
