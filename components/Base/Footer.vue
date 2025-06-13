<template>
  <footer class="mt-auto border-t border-stroke-light py-5 max-mm:py-4">
    <div class="container flex items-end justify-between">
      <span class="text-s font-secondary max-mm:text-sm">
        © liquid web {{ new Date().getFullYear() }}
      </span>
      <AppLink
        class="icon-wrapper flex size-10 max-mm:size-8"
        to="https://github.com/koirodev/liquid-web/"
        title="GitHub"
      >
        <SvgGithub class="icon" />
      </AppLink>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.icon-wrapper {
  @include hover {
    .icon {
      --icon-color: theme('colors.light.secondary');
    }
  }

  .icon {
    --icon-color: theme('colors.light.DEFAULT');
    --icon-size: 100%;
  }
}
</style>
