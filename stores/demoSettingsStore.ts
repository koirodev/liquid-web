export const useDemoSettings = defineStore('demoSettings', {
  state: () => ({
    scale: 22 as DemoSettings['scale'],
    blur: 2 as DemoSettings['blur'],
    saturation: 170 as DemoSettings['saturation'],
    aberration: 50 as DemoSettings['aberration'],
    mode: 'standard' as DemoSettings['mode'],
  }),
  actions: {
    setScale(scale: DemoSettings['scale']) {
      this.scale = scale;
    },
    setBlur(blur: DemoSettings['blur']) {
      this.blur = blur;
    },
    setSaturation(saturation: DemoSettings['saturation']) {
      this.saturation = saturation;
    },
    setAberration(aberration: DemoSettings['aberration']) {
      this.aberration = aberration;
    },
    setMode(mode: DemoSettings['mode']) {
      this.mode = mode;
    },
  },
});
