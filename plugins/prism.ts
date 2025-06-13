import Prism from 'prismjs';
import 'prism-themes/themes/prism-nord.css';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-scss.js';
import 'prismjs/components/prism-jsx.js';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('highlight', {
    mounted(el) {
      if (!process.client) return;

      const { $stRefresh } = useNuxtApp();

      Prism.highlightAllUnder(el);

      Prism.hooks.add('after-highlight', () => {
        $stRefresh();
      });
    },
    updated(el) {
      Prism.highlightAllUnder(el);
    },
  });
});
