<script setup lang="ts">
const articleRef = ref<HTMLElement | null>(null);

const removeDiv = (article: HTMLElement): void => {
  if (article.children.length === 1 && article.children[0].tagName === 'DIV') {
    const container = article.children[0];
    while (container.firstChild) {
      article.appendChild(container.firstChild);
    }

    article.removeChild(container);
  }
};

const removeBlankElements = (article: HTMLElement): void => {
  if (!article) return;

  const children = Array.from(article.children);
  children?.forEach((el) => {
    const excludedTags = ['BR', 'HR', 'SVG', 'INPUT', 'SOURCE', 'IMG'];
    if (
      (el.tagName !== 'IMG' || !(el as HTMLImageElement).src) &&
      !excludedTags.includes(el.tagName)
    ) {
      if ((el as HTMLElement)?.innerHTML === '') {
        el.remove();
      }
    }
  });
};

const processLink = (article: HTMLElement): void => {
  article.querySelectorAll('a').forEach((el) => {
    processUserLink(el);
  });
};

const processTable = (article: HTMLElement): void => {
  article.querySelectorAll('table').forEach((el) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('table');
    if (el.parentNode) {
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    }
  });
};

onMounted(() => {
  const article = articleRef.value;
  if (!article) return;

  removeDiv(article);
  removeBlankElements(article);
  processLink(article);
  processTable(article);
});
</script>

<template>
  <article class="article" ref="articleRef">
    <slot></slot>
  </article>
</template>
