<script setup lang="ts">
interface AppLinkProps {
  to: string | undefined;
}

const props = withDefaults(defineProps<AppLinkProps>(), {
  to: undefined,
});

const { component, linkProps } = useAppLink(props);
</script>

<template>
  <component :is="component" v-bind="linkProps">
    <slot></slot>
  </component>
</template>
