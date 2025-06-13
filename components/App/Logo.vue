<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';
import { useNPMStore } from '~/stores/npmStore';

const npmStore = useNPMStore();
</script>

<template>
  <div
    class="relative flex w-fit select-none items-end justify-start gap-2 no-underline max-mm:gap-1"
  >
    <AppLink class="logo-image" to="/">
      <SvgLogoLight class="logo-icon" :fontControlled="false" filled />
    </AppLink>
    <AppLink class="logo-name" to="/"> liquid web </AppLink>

    <LiquidWeb
      class="self-center"
      :options="{ saturation: 100, mode: 'standard' }"
    >
      <AppLink class="logo-version" :to="npmStore.packageUrl">
        {{ `${npmStore.versionPrefix}${npmStore.version}` }}
      </AppLink>
    </LiquidWeb>
  </div>
</template>
