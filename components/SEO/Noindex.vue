<script setup lang="ts">
withDefaults(
  defineProps<{
    isNoindexEl?: boolean;
  }>(),
  {
    isNoindexEl: true,
  }
);

function isSearchBot(): boolean {
  if (process.server) {
    const headers: {
      'user-agent'?: string | undefined;
    } = useRequestHeaders(['user-agent']);
    const userAgent: string = headers?.['user-agent']?.toLowerCase() || '';

    const botPatterns: string[] = [
      'googlebot',
      'yandexbot',
      'yandex.com/bots',
      'bingbot',
      'baiduspider',
      'duckduckbot',
      'yahoo! slurp',
      'mail.ru_bot',
      'applebot',
      'seznambot',
      'ahrefs',
      'semrushbot',
      'mj12bot',
      'exabot',
      'sogou',
    ];

    // Более точный способ определения ботов
    const isBotByExactMatch: boolean = botPatterns.some((pattern) =>
      userAgent.includes(pattern)
    );

    // Проверка на общие признаки ботов, но только если не обнаружен реальный браузер
    const hasRealBrowserMarkers: boolean =
      userAgent.includes('chrome') ||
      userAgent.includes('safari') ||
      userAgent.includes('firefox') ||
      userAgent.includes('edg') ||
      userAgent.includes('yabrowser');

    // Общие признаки ботов используем только если нет признаков реального браузера
    const isGenericBot: boolean =
      !hasRealBrowserMarkers &&
      (userAgent.includes('crawler') ||
        userAgent.includes('spider') ||
        userAgent.includes('bot') ||
        userAgent.includes('headlesschrome') ||
        userAgent.includes('facebookexternalhit') ||
        userAgent.includes('qwantify'));

    return isBotByExactMatch || isGenericBot;
  }

  return false;
}

const showContent = computed(() => {
  return process.server ? !isSearchBot() : true;
});
</script>

<template>
  <component :is="'noindex'" v-if="showContent && isNoindexEl">
    <slot></slot>
  </component>

  <slot v-if="showContent && !isNoindexEl"></slot>
</template>
