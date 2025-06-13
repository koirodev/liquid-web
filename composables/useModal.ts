/**
 * @description
 * Функция для открытия модальных окон с использованием Vue и Fancybox.
 * Она динамически импортирует компонент модального окна по его имени и создает его экземпляр.
 * Затем она использует Fancybox для отображения модального окна.
 * Также предоставляется функция для закрытия всех модальных окон.
 * @example
 * const { openModal } = useModal();
 * openModal('MyModal', { prop1: 'value1', prop2: 'value2' });
 */

import { createApp } from 'vue';
import type { Fancybox as FancyboxType } from '@fancyapps/ui';

declare module '#app' {
  interface NuxtApp {
    $Fancybox: typeof FancyboxType;
  }
}

const { $Fancybox } = useNuxtApp();

export default function () {
  function openModal(modalName: string, props = {}) {
    import(`~/components/Modals/${modalName}.vue`).then((module) => {
      const ModalComponent = module.default;
      const container = document.createElement('div');
      document.body.appendChild(container);
      const app = createApp(ModalComponent, props);
      app.mount(container);

      $Fancybox.show([{ src: container, type: 'inline' }], {
        autoFocus: false,
        on: {
          destroy: () => {
            app.unmount();
            container.parentNode && container.parentNode.removeChild(container);
          },
        },
      });
    });
  }

  function closeAllModals() {
    $Fancybox.close('all');
  }

  return { openModal, closeAllModals };
}
