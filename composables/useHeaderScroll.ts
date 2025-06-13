import { MEDIA } from '~/config';

export default function useHeaderScroll(): { isHeaderHidden: Ref<boolean> } {
  const isHeaderHidden = ref<boolean>(false);

  onMounted(() => {
    const header = document.querySelector('header') as HTMLElement | null;
    if (!header) return;

    const headerHeight: number = header.offsetHeight;
    const scrollThreshold: number = headerHeight / 1;
    let lastScrollY: number = window.scrollY;

    const hideHeader = (): void => {
      isHeaderHidden.value = true;
    };

    const showHeader = (): void => {
      isHeaderHidden.value = false;
    };

    const headerProcess = (): void => {
      const currentScrollY: number = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
        return;
      }

      if (currentScrollY < window.innerHeight) {
        showHeader();
        return;
      }

      if (currentScrollY < headerHeight) {
        showHeader();
      }

      if (
        currentScrollY > lastScrollY &&
        currentScrollY > headerHeight &&
        !isHeaderHidden.value
      ) {
        hideHeader();
      } else if (
        currentScrollY < lastScrollY &&
        currentScrollY > headerHeight &&
        isHeaderHidden.value
      ) {
        showHeader();
      }

      lastScrollY = currentScrollY;
    };

    let lastWidth: number = window.innerWidth;
    const handleResize = (): void => {
      if (window.innerWidth !== lastWidth) return;
      lastWidth = window.innerWidth;

      if (window.innerWidth > MEDIA.TABLET) {
        isHeaderHidden.value = false;
        window.removeEventListener('scroll', headerProcess);
      } else {
        window.addEventListener('scroll', headerProcess);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', headerProcess);

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', headerProcess);
    });
  });

  return {
    isHeaderHidden,
  };
}
