/**
 * @description
 * Плагин для инициализации Fancybox.
 * Этот плагин инициализирует Fancybox для работы с изображениями и видео.
 */

import { ANIMATION } from '~/config';
import * as fancyapps from '@fancyapps/ui';

const { Fancybox } = fancyapps;

export default defineNuxtPlugin(async () => {
  Fancybox.bind('[data-fancybox]', {
    Thumbs: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ['close'],
      },
    },
    Carousel: {
      infinite: true,
      transition: 'slide',
      transitionDuration: ANIMATION.SWIPER,
    },
  });

  return {
    provide: {
      Fancybox,
    },
  };
});
