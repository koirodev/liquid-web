<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';

const demoSettings = useDemoSettings();

const scale = reactive({
  value: demoSettings.scale,
  max: 200,
  min: 0,
});

const blur = reactive({
  value: demoSettings.blur,
  max: 50,
  min: 0,
});

const saturation = reactive({
  value: demoSettings.saturation,
  max: 300,
  min: 0,
});

const aberration = reactive({
  value: demoSettings.aberration,
  max: 1000,
  min: 0,
});

const mode: Ref<DemoSettings['mode']> = ref(demoSettings.mode);

import { debounce } from 'lodash-es';

const debouncedSetScale = debounce(
  (v: number) => demoSettings.setScale(v),
  200
);
const debouncedSetBlur = debounce((v: number) => demoSettings.setBlur(v), 200);
const debouncedSetSaturation = debounce(
  (v: number) => demoSettings.setSaturation(v),
  200
);
const debouncedSetAberration = debounce(
  (v: number) => demoSettings.setAberration(v),
  200
);

watch(mode, (v) => demoSettings.setMode(v));
watch(
  () => scale.value,
  (v) => debouncedSetScale(v)
);
watch(
  () => blur.value,
  (v) => debouncedSetBlur(v)
);
watch(
  () => saturation.value,
  (v) => debouncedSetSaturation(v)
);
watch(
  () => aberration.value,
  (v) => debouncedSetAberration(v)
);
</script>

<template>
  <section class="section" ref="sectionRef">
    <div class="container">
      <div class="section__head">
        <h2 class="h2 w-full max-w-[1300px]">
          Let's see how it looks <strong>in real life</strong>!
        </h2>
        <p class="text_base w-full max-w-[1300px] text-light/70">
          You can change the settings to understand how the
          <strong>liquid glass effect</strong>
          works, as well as to select the settings you need.
        </p>
      </div>
      <SEONoindex>
        <div class="section__content flex-start relative flex-col gap-3">
          <div class="settings-wrapper">
            <LiquidWeb
              class="settings"
              :options="{
                scale: demoSettings.scale,
                blur: demoSettings.blur,
                saturation: demoSettings.saturation,
                aberration: demoSettings.aberration,
                mode: demoSettings.mode,
              }"
              :key="
                demoSettings.mode +
                demoSettings.scale +
                demoSettings.blur +
                demoSettings.saturation +
                demoSettings.aberration
              "
            >
              <div
                class="scroll flex size-full flex-col gap-4 rounded border border-stroke-light bg-dark2/30 p-6 shadow-lg"
              >
                <div class="flex flex-col gap-3">
                  <div class="flex-start flex-col gap-1">
                    <span class="text_base">Mode</span>
                    <VaSelect
                      class="w-full"
                      v-model="mode"
                      :options="['standard', 'polar', 'prominent', 'shader']"
                    />
                  </div>
                  <div class="flex-start flex-col gap-1">
                    <span class="text_base">Scale</span>
                    <VaSlider
                      class="w-full"
                      track-label-visible
                      v-model="scale.value"
                      :min="scale.min"
                      :max="scale.max"
                    />
                    <span class="flex w-full items-center justify-between">
                      <span class="text_xs font-secondary">{{
                        scale.min
                      }}</span>
                      <span class="text_xs font-secondary">{{
                        scale.max
                      }}</span>
                    </span>
                  </div>
                  <div class="flex-start flex-col gap-1">
                    <span class="text_base">Blur</span>
                    <VaSlider
                      class="w-full"
                      track-label-visible
                      v-model="blur.value"
                      :min="blur.min"
                      :max="blur.max"
                    />
                    <span class="flex w-full items-center justify-between">
                      <span class="text_xs font-secondary">{{ blur.min }}</span>
                      <span class="text_xs font-secondary">{{ blur.max }}</span>
                    </span>
                  </div>
                  <div class="flex-start flex-col gap-1">
                    <span class="text_base">Saturation</span>
                    <VaSlider
                      class="w-full"
                      track-label-visible
                      v-model="saturation.value"
                      :min="saturation.min"
                      :max="saturation.max"
                    />
                    <span class="flex w-full items-center justify-between">
                      <span class="text_xs font-secondary">{{
                        saturation.min
                      }}</span>
                      <span class="text_xs font-secondary">{{
                        saturation.max
                      }}</span>
                    </span>
                  </div>
                  <div class="flex-start flex-col gap-1">
                    <span class="text_base">Aberration</span>
                    <VaSlider
                      class="w-full"
                      track-label-visible
                      v-model="aberration.value"
                      :min="aberration.min"
                      :max="aberration.max"
                    />
                    <span class="flex w-full items-center justify-between">
                      <span class="text_xs font-secondary">{{
                        aberration.min
                      }}</span>
                      <span class="text_xs font-secondary">{{
                        aberration.max
                      }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </LiquidWeb>
          </div>
          <img
            class="local-image"
            src="/images/presentation/4.webp"
            alt="image 1"
          />
          <ul class="list">
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
              nulla sequi dignissimos quas adipisci nemo error enim. Perferendis
              numquam quis corrupti nobis! Error praesentium laborum odio
              ducimus repudiandae, possimus perferendis!
            </li>
            <li>
              Quaerat ex, earum aspernatur nostrum reiciendis enim cupiditate
              sunt ea, expedita id unde veritatis molestiae quibusdam
              perferendis quisquam incidunt distinctio sit mollitia! Praesentium
              corporis ea sed, tempore aperiam suscipit delectus!
            </li>
            <li>
              Quas vitae quasi animi. Ullam aut molestias laudantium doloribus
              rerum accusantium earum? Esse quas eaque, explicabo debitis
              nostrum distinctio eius placeat eos aperiam, laudantium rerum
              reiciendis, qui consequuntur corporis facilis.
            </li>
            <li>
              Laudantium natus corporis, quisquam ipsa nostrum, molestias
              asperiores repellat consectetur odit eum voluptatum consequuntur
              commodi dolorem neque repudiandae illo quasi praesentium ab
              perferendis adipisci accusantium minima? Porro mollitia quod
              fugit.
            </li>
          </ul>
          <img
            class="local-image"
            src="/images/presentation/3.webp"
            alt="image 2"
          />
          <p class="h3">
            Lorem ipsum dolor sit amet <strong>consectetur</strong>
          </p>
          <p class="text_base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel et
            error laboriosam reprehenderit illo vero eos sequi perferendis
            perspiciatis atque debitis aut iusto ullam, inventore totam
            doloribus eaque eveniet odit.
          </p>
          <p class="text_base">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum non
            qui harum eum veritatis temporibus!
          </p>
          <img
            class="local-image"
            src="/images/presentation/6.webp"
            alt="image 3"
          />
          <p class="h2">Lorem ipsum <strong>dolor sit.</strong></p>
          <p class="text_base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, cumque facere perspiciatis sapiente obcaecati voluptas
            odio doloremque ab, fuga quaerat dicta voluptate culpa dolore
            aspernatur debitis magnam quae, tempore ipsum?
          </p>
          <p class="text_base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, cumque facere perspiciatis sapiente obcaecati voluptas
            odio doloremque ab, fuga quaerat dicta voluptate culpa dolore
            aspernatur debitis magnam quae, tempore ipsum?
          </p>
          <img
            class="local-image"
            src="/images/presentation/5.webp"
            alt="image 4"
          />
        </div>
      </SEONoindex>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.local-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: center;

  border-radius: theme('borderRadius.DEFAULT');

  pointer-events: none;
  user-select: none;
}

.settings-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  padding: 30px 0;

  pointer-events: none;
}

.settings {
  position: sticky;
  top: calc(var(--global-header-height) + 10px);
  z-index: 10;
  margin-right: auto;
  margin-left: auto;

  width: 100%;
  max-width: 500px;
  height: fit-content;
  max-height: calc(100% - var(--global-header-height) * 2 - 20px);

  pointer-events: all;

  strong {
    font-weight: 600;
  }

  .scroll {
    max-height: 100%;

    overflow-y: auto;
  }
}
</style>
