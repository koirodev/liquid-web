/**
 * @description
 * Плагин для инициализации GSAP и его плагинов.
 * Он регистрирует плагины GSAP и создает экземпляр ScrollSmoother.
 * Также он предоставляет функции для управления анимацией и прокруткой.
 */

import { ANIMATION } from '~/config';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase, ScrollTrigger);

const stRefresh = () => {
  ScrollTrigger.refresh();
};

const cubicDefault = CustomEase.create('cubicDefault', ANIMATION.EASE);

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook('page:finish', () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });

      return;
    });
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      CustomEase,
      cubicDefault,
      stRefresh,
    },
  };
});
