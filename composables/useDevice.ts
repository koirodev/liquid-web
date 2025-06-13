interface IsMobile {
  Android: () => boolean;
  BlackBerry: () => boolean;
  iOS: () => boolean;
  Opera: () => boolean;
  Windows: () => boolean;
  any: () => boolean;
}

/**
 * @description Композибл для определения мобильного устройства.
 * @example
 * const { isMobile } = useDevice();
 * if (isMobile.value.any()) {
 *   // do something for mobile
 * }
 */
export function useDevice() {
  const isMobile: Ref<IsMobile | null> = ref(null);

  onMounted(() => {
    const mobile: IsMobile = {
      Android: function () {
        return /Android/i.test(navigator.userAgent);
      },
      BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent);
      },
      iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
      },
      Opera: function () {
        return /Opera Mini/i.test(navigator.userAgent);
      },
      Windows: function () {
        return /IEMobile/i.test(navigator.userAgent);
      },
      any: function () {
        return (
          this.Android() ||
          this.BlackBerry() ||
          this.iOS() ||
          this.Opera() ||
          this.Windows()
        );
      },
    };
    isMobile.value = mobile;
  });

  return { isMobile };
}
