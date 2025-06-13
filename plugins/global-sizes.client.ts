/**
 * @description
 * Плагин для получения высоты глобального хедера и хлебных крошек.
 * Также вычисляет разницу между высотой 100vh и 100dvh.
 * Это необходимо для корректного отображения элементов на мобильных устройствах.
 * Плагин обновляет значения при изменении размера окна.
 */

type GlobalSizes = {
  getGlobalHeaderHeight: (selector?: string) => number;
  setGlobalHeaderHeight: () => void;
  getGlobalBreadcrumbsHeight: () => number;
  setGlobalBreadcrumbsHeight: () => void;
  getGlobalDVHDiff: () => number;
  setGlobalDVHDiff: () => void;
  updateAllSizes: () => void;
};

export const getGlobalHeaderHeight = (selector: string = 'header'): number => {
  const header = document.querySelector<HTMLElement>(selector);
  return header ? header.clientHeight : 0;
};

export const setGlobalHeaderHeight = (): void => {
  const height = getGlobalHeaderHeight();
  document.body.style.setProperty('--global-header-height', `${height}px`);
};

export const getGlobalBreadcrumbsHeight = (): number => {
  const breadcrumbs = document.querySelector<HTMLElement>('.breadcrumbs');
  return breadcrumbs ? breadcrumbs.clientHeight : 0;
};

export const setGlobalBreadcrumbsHeight = (): void => {
  const height = getGlobalBreadcrumbsHeight();
  document.body.style.setProperty('--global-breadcrumbs-height', `${height}px`);
};

export const getGlobalDVHDiff = (): number => {
  let a: number, b: number;
  document.body.style.setProperty('height', '100dvh');
  a = document.body.clientHeight;
  document.body.style.setProperty('height', '100vh');
  b = document.body.clientHeight;
  document.body.style.removeProperty('height');
  return b - a;
};

export const setGlobalDVHDiff = (): void => {
  const diff = getGlobalDVHDiff();
  if (diff > 0) {
    document.body.style.setProperty('--global-dvh-diff', `${diff}px`);
  } else {
    document.body.style.removeProperty('--global-dvh-diff');
  }
};

export const updateAllSizes = (): void => {
  setGlobalHeaderHeight();
  setGlobalBreadcrumbsHeight();
  setGlobalDVHDiff();
};

export default defineNuxtPlugin(() => {
  let lastWidth: number = window.innerWidth;

  if (process.client) {
    updateAllSizes();

    const handleResize = (): void => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        updateAllSizes();
      }
    };

    window.addEventListener('resize', handleResize);
  }

  return {
    provide: {
      globalSizes: {
        getGlobalHeaderHeight,
        setGlobalHeaderHeight,
        getGlobalBreadcrumbsHeight,
        setGlobalBreadcrumbsHeight,
        getGlobalDVHDiff,
        setGlobalDVHDiff,
        updateAllSizes,
      } as GlobalSizes,
    },
  };
});
