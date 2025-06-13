<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';

interface AppCodeProps {
  lang?: string;
  small?: boolean;
  smallClear?: boolean;
  backtick?: boolean;
  maxHeight?: string;
}

withDefaults(defineProps<AppCodeProps>(), {
  lang: 'js',
  small: false,
  smallClear: false,
  backtick: false,
  maxHeight: '70vh',
});

const isCopied = ref(false);
const $slots = useSlots();

const copyCommand = () => {
  const slotNodes = $slots.default ? $slots.default() : [];
  const textContent = slotNodes
    .map((node) => {
      return typeof node.children === 'string' ? node.children : '';
    })
    .join('');

  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    navigator.clipboard
      .writeText(textContent)
      .then(() => {
        isCopied.value = true;
        setTimeout(() => {
          isCopied.value = false;
        }, 5000);
      })
      .catch(() => {});
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = textContent;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 5000);
    } catch (e) {}
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <div
    v-if="!small"
    class="code-block relative h-fit w-full overflow-hidden rounded border border-stroke"
    v-highlight
  >
    <button
      class="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded bg-dark2/20 backdrop-blur-sm"
      type="button"
      :aria-label="!isCopied ? 'Copy' : 'Copied!'"
      @click="copyCommand"
      v-tippy
    >
      <SvgFiRrCopy class="icon" v-if="!isCopied" />
      <SvgFiRrCheck class="icon" v-else />
    </button>
    <div
      class="w-full overflow-auto"
      :style="{ maxHeight: maxHeight }"
      v-scrollbar="{ scrollbars: { autoHide: 'leave' } }"
    >
      <pre><code :class="`language-${lang}`"><slot></slot></code></pre>
    </div>
  </div>

  <code
    class="small"
    :aria-label="!isCopied ? 'Copy' : 'Copied!'"
    @click="copyCommand"
    v-tippy
    v-else
    ><slot></slot
  ></code>
</template>

<style lang="scss" scoped>
pre {
  @apply text_md m-0 w-full min-w-fit overflow-auto bg-dark2 !font-mono backdrop-blur-sm;
}

.small {
  font: inherit;

  @apply cursor-pointer rounded border border-stroke bg-dark2 px-2 py-[0.15rem] !font-mono text-light;

  pre {
    font: inherit;
  }
}

.icon {
  --icon-color: theme('colors.white');
  --icon-size: 60%;
}
</style>
