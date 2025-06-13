<script setup lang="ts">
useHead(
  processHead({
    title: 'Liquid Glass Effect for Vue.js, React and HTML and JavaScript',
    description:
      'A simple and powerful tool for creating Liquid Glass effect, with support for Vue, React and Vanilla JavaScript. Get started with LiquidWeb today!',
  })
);
</script>

<template>
  <SectionsBanner />

  <LazySectionsDefault
    class="section_padding_top"
    title="<strong>Liquid Web</strong> is available for"
    description="<strong>Liquid Web</strong> is a library that works with any framework supporting Vanilla JS. You can use <strong>Liquid Web</strong> with React, Vue, and other frameworks. Just import the library and use it in your project."
  >
    <div class="grid w-full grid-cols-3 gap-6 max-mt:gap-4 max-mm:gap-2">
      <CardsAvailable
        image="/images/available/js.svg"
        title="JavaScript"
        to="https://github.com/koirodev/liquid-web"
      />
      <CardsAvailable
        image="/images/available/react.svg"
        title="React"
        to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#react-example"
      />
      <CardsAvailable
        image="/images/available/vue.svg"
        title="Vue.js"
        to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#vue-example"
      />
    </div>
  </LazySectionsDefault>

  <LazySectionsDefault
    class="section_padding_top"
    title="Easy to use"
    description="Simple and intuitive API that allows you to <strong>quickly and easily</strong> create accordions. You <strong>don't have to worry</strong> about how it works under the hood, <strong>just use it</strong>."
  >
    <ElementsCodeTabs from="easy-to-use" />
  </LazySectionsDefault>

  <LazySectionsPresentation class="section_padding_top" />

  <LazySectionsDefault
    class="section_center section_padding_top section_padding_bottom"
    title="Start using <strong>Liquid Web</strong> now"
  >
    <div class="flex-center w-full flex-col gap-4">
      <AppTerminal
        class="z-10 m-auto max-w-[300px] max-mt:m-0"
        command="npm install liquid-web"
      />
      <AppButton
        to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#installation"
        icon="fi-rr-rocket"
        >Get Started</AppButton
      >
    </div>
  </LazySectionsDefault>
</template>
