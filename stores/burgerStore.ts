export const useBurgerStore = defineStore('burger', () => {
  const isBurgerOpen = ref(false);

  const toggleBurger = () => {
    isBurgerOpen.value = !isBurgerOpen.value;
  };

  const openBurger = () => {
    isBurgerOpen.value = true;
  };

  const closeBurger = () => {
    isBurgerOpen.value = false;
  };

  watch(isBurgerOpen, (isOpen) => {
    useDisabledScroll(isOpen);
  });

  return {
    isBurgerOpen,
    toggleBurger,
    openBurger,
    closeBurger,
  };
});
