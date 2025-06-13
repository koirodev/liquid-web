import { useBurgerStore } from '~/stores/burgerStore';

export default defineNuxtPlugin(() => {
  if (process.client) {
    const burgerStore = useBurgerStore();

    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a') as HTMLAnchorElement | null;

      if (!link) return;
      if (link.target === '_blank') return;
      burgerStore.closeBurger();

      const hrefAttr = link.getAttribute('href');
      if (hrefAttr && hrefAttr.startsWith('#')) {
        return;
      }

      const { origin, pathname } = window.location;
      const linkUrl = new URL(link.href);

      if (linkUrl.origin === origin && linkUrl.pathname === pathname) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
