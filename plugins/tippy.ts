import { ANIMATION } from '~/config';

import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/backdrop.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tippy', {
    mounted(el, binding) {
      if (!process.client) return;
      if (typeof window === 'undefined') return;

      nextTick(() => {
        tippy(el, {
          content: binding.value || el.getAttribute('aria-label'),
          duration: 300,
          theme: 'light',
          followCursor: true,
          animation: 'scale',
          arrow: false,
          delay: [0, 0],
          placement: 'auto',
          plugins: [followCursor],
          hideOnClick: false,
          moveTransition: `transform 0.3s cubic-bezier(${ANIMATION.EASE})`,
          offset: [0, 20],
        });
      });
    },
    updated(el, binding) {
      if (el._tippy) {
        el._tippy.setContent(binding.value || el.getAttribute('aria-label'));
      }
    },
  });
});
