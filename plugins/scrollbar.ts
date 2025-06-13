import { OverlayScrollbars } from 'overlayscrollbars';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch) return;
    import('overlayscrollbars/overlayscrollbars.css');

    OverlayScrollbars(document.body, {
      scrollbars: {
        autoHide: 'scroll',
      },
    });
  }

  nuxtApp.vueApp.directive('scrollbar', {
    mounted(el, binding) {
      if (!process.client) return;

      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch) return;

      OverlayScrollbars(el, binding.value || {});
    },
    unmounted(el) {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (isTouch) return;

      const osInstance = OverlayScrollbars(el);
      osInstance?.destroy();
    },
  });
});
