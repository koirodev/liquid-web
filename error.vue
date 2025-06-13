<script setup>
const error = useError();

const headTitle = computed(() => {
  if (!error.value) return 'Unknown Error';
  if (error.value.statusCode === 404) return 'Page Not Found';
  if (error.value.statusCode === 500) return 'Internal Server Error';
  return `Error ${error.value.statusCode}`;
});

onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});

useHead({
  title: headTitle.value,
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow',
    },
  ],
});

definePageMeta({
  layout: 'default',
});
</script>

<template>
  <NuxtLayout #default>
    <section
      class="section relative flex min-h-screen flex-col justify-center border-b border-stroke-light max-mt:min-h-fit max-mt:justify-start"
    >
      <div
        class="background pointer-events-none absolute left-0 top-0 z-10 flex size-full"
      ></div>
      <div class="container grid grid-cols-2 gap-6 max-mt:flex max-mt:flex-col">
        <div
          class="local-logo w-ful flex-start z-10 flex-col gap-6"
          v-if="!error || error?.statusCode === 404"
        >
          <h1 class="flex-start gap h1 flex-col gap-2 text-primary">
            Error 404.
            <span class="text_xl font-secondary font-medium text-light">
              Page Not Found
            </span>
          </h1>
          <div class="flex-start flex-col gap-2">
            <p class="text_base text-light/80">
              Try refreshing the page or return to the homepage. If you believe
              this is a mistake, please let us know.
            </p>
          </div>
          <AppButton to="/" icon="fi-rr-home">Go Home</AppButton>
        </div>

        <div
          class="local-logo w-ful flex-start z-10 flex-col gap-6"
          v-else-if="!error || error?.statusCode === 500"
        >
          <h1 class="flex-start gap h1 flex-col gap-2 text-primary">
            Error 500.
            <span class="text_xl font-secondary font-medium text-light">
              Internal Server Error
            </span>
          </h1>
          <div class="flex-start flex-col gap-2">
            <p class="text_base text-light/80">
              An internal server error has occurred. We are working to resolve
              it as soon as possible. Please try refreshing the page later.
            </p>
          </div>
          <AppButton to="/" icon="fi-rr-home">Go Home</AppButton>
        </div>

        <div class="local-logo w-ful flex-start z-10 flex-col gap-6" v-else>
          <h1 class="flex-start gap h1 flex-col gap-2 text-primary">
            Error {{ error?.statusCode || 500 }}.
            <span class="text_xl font-secondary font-medium text-light">
              Something Went Wrong
            </span>
          </h1>
          <div class="flex-start flex-col gap-2">
            <p class="text_base text-light/80">
              An unexpected error has occurred. Please try refreshing the page
              or return to the homepage.
            </p>
          </div>
          <AppButton to="/" icon="fi-rr-home">Go Home</AppButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
