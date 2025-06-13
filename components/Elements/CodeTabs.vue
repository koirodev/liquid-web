<script setup lang="ts">
interface ElementsCodeTabsProps {
  from: string;
}

const props = defineProps<ElementsCodeTabsProps>();

const activeContent = ref<string>('');
const activeLanguage = ref<'core' | 'react' | 'vue'>('core');

let codeCore: string | undefined;
let codeReact: string | undefined;
let codeVue: string | undefined;

const loadCodes = async (): Promise<void> => {
  const modules = import.meta.glob('~/examples/**/index.*', {
    query: '?raw',
    import: 'default',
  }) as Record<string, () => Promise<unknown>>;
  const htmlKey = Object.keys(modules).find((key) =>
    key.includes(`/${props.from}/index.html`)
  );
  if (htmlKey) {
    const result = await modules[htmlKey]();
    codeCore =
      typeof result === 'string'
        ? result
        : await (result as () => Promise<string>)();
  }
  const jsxKey = Object.keys(modules).find((key) =>
    key.includes(`/${props.from}/index.jsx`)
  );
  if (jsxKey) {
    const result = await modules[jsxKey]();
    codeReact =
      typeof result === 'string'
        ? result
        : await (result as () => Promise<string>)();
  }
  const vueKey = Object.keys(modules).find((key) =>
    key.includes(`/${props.from}/index.vue`)
  );
  if (vueKey) {
    const result = await modules[vueKey]();
    codeVue =
      typeof result === 'string'
        ? result
        : await (result as () => Promise<string>)();
  }

  activeContent.value = codeCore ?? '';
  activeLanguage.value = 'core';
};
onMounted(loadCodes);

const toggle = (lang: 'core' | 'react' | 'vue'): void => {
  switch (lang) {
    case 'core':
      activeContent.value = codeCore ?? '';
      activeLanguage.value = 'core';
      break;
    case 'react':
      activeContent.value = codeReact ?? '';
      activeLanguage.value = 'react';
      break;
    case 'vue':
      activeContent.value = codeVue ?? '';
      activeLanguage.value = 'vue';
      break;
  }
};
</script>

<template>
  <div class="flex-start flex-col gap-4">
    <div class="flex-start w-full flex-wrap gap-2">
      <AppTab
        :active="activeLanguage === 'core'"
        @click.prevent="toggle('core')"
        >Core</AppTab
      >
      <AppTab
        :active="activeLanguage === 'react'"
        @click.prevent="toggle('react')"
        >React</AppTab
      >
      <AppTab :active="activeLanguage === 'vue'" @click.prevent="toggle('vue')"
        >Vue.js</AppTab
      >
    </div>
    <div class="w-full">
      <AppCode lang="html" v-if="activeLanguage === 'core'">{{
        activeContent
      }}</AppCode>
      <AppCode lang="jsx" v-if="activeLanguage === 'react'">{{
        activeContent
      }}</AppCode>
      <AppCode lang="html" v-if="activeLanguage === 'vue'">{{
        activeContent
      }}</AppCode>
    </div>
  </div>
</template>
