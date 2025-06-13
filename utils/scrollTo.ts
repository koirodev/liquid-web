/**
 * @description
 * Скроллит страницу к указанному элементу или позиции.
 * Если элемент находится внутри компонента Prismium, он открывает его.
 * @param {string|HTMLElement|number} target - Целевой элемент или позиция для скролла.
 * Если это строка, она должна быть селектором элемента.
 * Если это число, скроллит на указанное количество пикселей.
 */

interface PrismiumElement extends HTMLElement {
  prismium?: {
    open: () => void;
  };
}

export default function scrollTo(target: string | HTMLElement | number): void {
  if (target === null || target === undefined || target === '') return;

  const { $gsap } = useNuxtApp();

  const style = getComputedStyle(document.body);

  const headerHeight = cssToNumber(
    style.getPropertyValue('--global-header-height') || 0
  );

  let realTarget: unknown;
  if (typeof target === 'string') {
    realTarget = document.querySelector(target);
  } else if (target instanceof HTMLElement || typeof target === 'number') {
    realTarget = target;
  } else {
    console.warn('Invalid target for scrollTo function');
    return;
  }

  if (
    realTarget instanceof HTMLElement &&
    realTarget.closest('[data-prismium]')
  ) {
    const prismiumElement = realTarget.closest(
      '[data-prismium]'
    ) as PrismiumElement | null;
    const prismium = prismiumElement?.prismium;

    if (!prismium) return;
    prismium.open();
  }

  $gsap.to(window, {
    scrollTo: {
      y:
        target instanceof HTMLElement
          ? (() => {
              const href = (target as HTMLElement).getAttribute?.('href');
              return href && href.includes('#')
                ? `#${href.split('#')[1]}`
                : target;
            })()
          : target,
      offsetY: typeof target === 'number' ? 0 : headerHeight + 10,
      autoKill: false,
    },
    duration: 1,
    ease: 'linear',
  });
}
