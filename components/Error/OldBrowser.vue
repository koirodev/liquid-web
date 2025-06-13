<script setup lang="ts">
const isOldBrowser = useState('isOldBrowser');
const { $oldBrowserCookie } = useNuxtApp();

const ignore = (): void => {
  $oldBrowserCookie.value = true;
};

const close = (): void => {
  isOldBrowser.value = false;
};
</script>

<template>
  <teleport to="#teleports">
    <div
      class="flex-center fixed bottom-0 left-0 right-0 top-0 z-[99999]"
      v-if="isOldBrowser && !$oldBrowserCookie"
    >
      <div
        class="absolute bottom-0 left-0 right-0 top-0 cursor-pointer bg-dark2/20 backdrop-blur-sm"
        @click.prevent="close"
      ></div>
      <div
        class="flex-start relative z-10 max-w-[80%] flex-col gap-5 rounded border border-stroke-light bg-dark2/50 p-6 backdrop-blur-sm"
      >
        <button
          class="absolute right-4 top-4 size-4 cursor-pointer rounded-none bg-transparent"
        >
          <svg
            class="size-full fill-light"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click.prevent="close"
          >
            <path
              d="M23.7068 0.292786C23.5193 0.105315 23.2649 0 22.9998 0C22.7346 0 22.4803 0.105315 22.2928 0.292786L11.9998 10.5858L1.70679 0.292786C1.51926 0.105315 1.26495 0 0.999786 0C0.734622 0 0.480314 0.105315 0.292786 0.292786C0.105315 0.480314 0 0.734622 0 0.999786C0 1.26495 0.105315 1.51926 0.292786 1.70679L10.5858 11.9998L0.292786 22.2928C0.105315 22.4803 0 22.7346 0 22.9998C0 23.2649 0.105315 23.5193 0.292786 23.7068C0.480314 23.8943 0.734622 23.9996 0.999786 23.9996C1.26495 23.9996 1.51926 23.8943 1.70679 23.7068L11.9998 13.4138L22.2928 23.7068C22.4803 23.8943 22.7346 23.9996 22.9998 23.9996C23.2649 23.9996 23.5193 23.8943 23.7068 23.7068C23.8943 23.5193 23.9996 23.2649 23.9996 22.9998C23.9996 22.7346 23.8943 22.4803 23.7068 22.2928L13.4138 11.9998L23.7068 1.70679C23.8943 1.51926 23.9996 1.26495 23.9996 0.999786C23.9996 0.734622 23.8943 0.480314 23.7068 0.292786Z"
            />
          </svg>
        </button>
        <div class="flex-start w-full flex-col gap-3">
          <div class="title text-light">Your browser is poorly supported</div>
          <div class="text text-light">
            The site may not display correctly in your browser.
            <br />
            You can not see the effect of liquid glass. We recommend switching
            to Google Chrome.
          </div>
        </div>
        <AppButton @click="ignore">Not show</AppButton>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.title {
  font: 450 54px / 1.2 var(--font-primary);

  @media (width <= 2100px) {
    font-size: 44px;
  }

  @media (width <= 1600px) {
    font-size: 38px;
  }

  @media (width <= 1160px) {
    font-size: 28px;
  }

  @media (width <= 600px) {
    font-size: 22px;
  }
}

.text {
  font: 400 22px / 1.5 var(--font-primary);

  @media (width <= 2100px) {
    font-size: 18px;
  }

  @media (width <= 1600px) {
    font-size: 16px;
  }

  @media (width <= 1160px) {
    font-size: 14px;
  }
}
</style>
