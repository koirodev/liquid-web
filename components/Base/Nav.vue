<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';
import type { LiquidWebProps } from 'liquid-web/vue';

interface GithubRepoResponse {
  stargazers_count: number;
}

const burgerStore = useBurgerStore();
const { isBurgerOpen } = storeToRefs(burgerStore);
const isMobile: Ref<boolean> = ref(false);

const liquidOptions: LiquidWebProps['options'] = {
  mode: 'standard',
  saturation: 100,
};

const starsCount: Ref<number | string> = ref('(X)');

const { data, error } = await useAsyncData<GithubRepoResponse>(
  'githubStars',
  () =>
    $fetch<GithubRepoResponse>(
      'https://api.github.com/repos/koirodev/liquid-web'
    )
);

if (error.value) {
  console.error('Failed to fetch GitHub stars:', error.value);
}

if (data.value) {
  starsCount.value = data.value.stargazers_count;
}

const close = (): void => {
  if (isBurgerOpen.value) {
    burgerStore.closeBurger();
  }
};

const closeEvent = (e: Event): void => {
  const target = e.target as HTMLElement;
  if (target.closest('.nav')) return;
  if (target.closest('.burger-button')) return;

  close();
};

const checkWindowSize = (): void => {
  if (window.innerWidth > 780) {
    isMobile.value = false;
    return;
  }

  isMobile.value = true;
};

onMounted(() => {
  window.addEventListener('resize', checkWindowSize);
  document.addEventListener('click', (e) => closeEvent(e));
  document.addEventListener('touchstart', (e) => closeEvent(e));
});

onUnmounted(() => {
  window.removeEventListener('resize', checkWindowSize);
  document.removeEventListener('click', (e) => closeEvent(e));
  document.removeEventListener('touchstart', (e) => closeEvent(e));
});
</script>

<template>
  <nav
    :class="[
      'nav',
      { 'pointer-events-auto visible opacity-100': isBurgerOpen },
    ]"
  >
    <ul class="nav__list">
      <li class="nav__item">
        <LiquidWeb :options="liquidOptions">
          <span class="nav__link">Docs</span>
        </LiquidWeb>
        <ul class="nav__list">
          <li class="nav__item">
            <AppLink
              class="nav__link"
              to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#installation"
            >
              <SvgFiRrRocket class="nav__icon icon" />
              Get Started
            </AppLink>
          </li>
          <hr />
          <li class="nav__item">
            <AppLink
              class="nav__link"
              to="https://github.com/koirodev/liquid-web"
            >
              Liquid Web core / API
            </AppLink>
          </li>
          <li class="nav__item">
            <AppLink
              class="nav__link"
              to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#react-example"
              >Liquid Web React</AppLink
            >
          </li>
          <li class="nav__item">
            <AppLink
              class="nav__link"
              to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#vue-example"
              >Liquid Web Vue</AppLink
            >
          </li>
          <hr />
          <li class="nav__item">
            <AppLink
              class="nav__link"
              to="https://github.com/koirodev/liquid-web/blob/main/CHANGELOG.md"
            >
              <SvgFiRrNotebook class="nav__icon icon" />
              Changelog
            </AppLink>
          </li>
        </ul>
      </li>
      <hr />
      <li class="nav__item">
        <LiquidWeb :options="liquidOptions">
          <AppLink
            class="nav__link nav__link_github"
            to="https://github.com/koirodev/prismium/"
          >
            <SvgGithub class="nav__icon icon" />
            {{ starsCount }} stars
          </AppLink>
        </LiquidWeb>
      </li>
    </ul>
  </nav>
</template>
