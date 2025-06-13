export function useWindowWidthResize(callback: () => void) {
  let previousWidth = 0;

  const handleResize = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== previousWidth) {
      previousWidth = currentWidth;
      callback();
    }
  };

  onMounted(() => {
    previousWidth = window.innerWidth;
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
}
