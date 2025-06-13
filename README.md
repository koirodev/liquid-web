<div style="width: 100%; display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
  <a href="https://github.com/koirodev/liquid-web/actions/workflows/build.yml">
    <img src="https://github.com/koirodev/liquid-web/workflows/Build/badge.svg" alt="Build">
  </a>
  <a href="https://www.npmjs.com/package/liquid-web">
    <img src="https://img.shields.io/npm/dt/liquid-web?style=flat-square&color=red" alt="npm downloads">
  </a>
  <a href="https://www.npmjs.com/package/liquid-web">
    <img src="https://img.shields.io/npm/dw/liquid-web?style=flat-square&color=blue" alt="npm downloads">
  </a>
</div>

# Liquid Web

Liquid Web is a modern JavaScript library for easy creation of Apple liquid glass effect for Vue, React, Vanilla JS

Simply plug it into your project and get a modern liquid glass effect.

![Liquid Glass Card](https://github.com/koirodev/liquid-web/tree/main/images/card.png)
![Liquid Glass Button](https://github.com/koirodev/liquid-web/tree/main/images/button.png)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [VanillaJS example](#vanillajs-example)
  - [Vue example](#vue-example)
  - [React example](#react-example)
- [Options](#options)
- [Events](#events)
- [Static Methods](#static-methods)
- [My other works](#my-other-works)

## Installation

```bash
npm install liquid-web
```

or connect via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/liquid-web/liquid-core.min.js"></script>
```

## Usage

### VanillaJS example

```javascript
import { LiquidWeb } from 'liquid-web';

new LiquidWeb('[data-liquid]', {
  /* ...options */
});
```

```html
<div data-liquid>
  <button>I am liquid button!</button>
</div>
```

### Vue example

```html
<script setup lang="ts">
  import { LiquidWeb } from 'liquid-web/vue';
</script>

<template>
  <LiquidWeb
    :options="{ /* ...options */ }"
    :selector="div"
    @click="(instance) => console.log('Clicked!', instance)"
    @mouseEnter="(instance) => console.log('Mouse entered!', instance)"
    @mouseLeave="(instance) => console.log('Mouse left!', instance)"
  >
    <button>I am liquid button!</button>
  </LiquidWeb>
</template>
```

### React example

```jsx
import { LiquidWeb } from './dist/react/index.mjs';

export default () => {
  return (
    <div>
      <LiquidWeb
        options={{ ...options }}
        selector="div"
        onClick={(instance) => console.log('Clicked!', instance)}
        onMouseEnter={(instance) => console.log('Mouse entered!', instance)}
        onMouseLeave={(instance) => console.log('Mouse left!', instance)}
      >
        <button>I am liquid button!</button>
      </LiquidWeb>
    </div>
  );
};
```

## Options

| Option        | Type                                             | Default  | Description                                       |
| ------------- | ------------------------------------------------ | -------- | ------------------------------------------------- |
| `el?`         | `string \| HTMLElement`                          | -        | Element selector to apply liquid effect.          |
| `init?`       | `boolean`                                        | `true`   | Whether to initialize the effect on load.         |
| `scale?`      | `number`                                         | `22`     | Changes the intensity of the displacement effect. |
| `blur?`       | `number \| string`                               | `2`      | Changes the intensity of the blur effect.         |
| `saturation?` | `number \| string`                               | `170`    | Changes the intensity of the saturation effect.   |
| `aberration?` | `number`                                         | `50`     | Changes the intensity of the aberration effect.   |
| `mode?`       | 'standard' \| 'polar' \| 'prominent' \| 'shader' | `shader` | Toggles the glass effect.                         |
| `on?`         | `LiquidWebEventListeners`                        | -        | Event listeners for the liquid effect.            |
| `events?`     | `LiquidWebEventListeners`                        | -        | Event listeners for the liquid effect.            |
| `onAny?`      | `LiquidWebEventCallback`                         | -        | Callback for any event.                           |

## Events

LiquidWeb has a lot of useful events that you can listen to. Events can be assigned in two ways:

1. Using on parameter on initialization:

```javascript
const liquidweb = new LiquidWeb('[data-liquid]', {
  on: {
    init: (liquidweb) => {
      console.log('LiquidWeb initialized', liquidweb);
    },
    mouseEnter: (liquidweb) => {
      console.log('Mouse entered', liquidweb);
    },
  },
});
```

2. Using the `on` method after initialization:

```javascript
const liquidweb = new LiquidWeb('[data-liquid]', {
  init: false, // Disable auto-init
});

liquidweb.on('init', (liquidweb) => {
  console.log('LiquidWeb initialized', liquidweb);
});

liquidweb.on('mouseEnter', (liquidweb) => {
  console.log('Mouse entered', liquidweb);
});

liquidweb.init(); // Manually initialize the effect
```

| Event                 | Arguments    | Description                                                               |
| --------------------- | ------------ | ------------------------------------------------------------------------- |
| `beforeInit`          | (liquidweb ) | Event will be fired before the effect is initialized.                     |
| `init`                | (liquidweb ) | Event will be fired when the effect is initialized. READ MORE BELOW!!!    |
| `afterInit`           | (liquidweb ) | Event will be fired after the effect is initialized.                      |
| `beforeDestroy`       | (liquidweb ) | Event will be fired before the effect is destroyed.                       |
| `destroy`             | (liquidweb ) | Event will be fired when the effect is destroyed.                         |
| `afterDestroy`        | (liquidweb ) | Event will be fired after the effect is destroyed.                        |
| `beforeUpdate`        | (liquidweb ) | Event will be fired before the effect is updated.                         |
| `update`              | (liquidweb ) | Event will be fired when the effect is updated.                           |
| `afterUpdate`         | (liquidweb ) | Event will be fired after the effect is updated.                          |
| `beforeUpdateEffects` | (liquidweb ) | Event will be fired before the effects are updated.                       |
| `updateEffects`       | (liquidweb ) | Event will be fired when the effects are updated.                         |
| `afterUpdateEffects`  | (liquidweb ) | Event will be fired after the effects are updated.                        |
| `mouseEnter`          | (liquidweb ) | Event will be fired when the mouse enters the element.                    |
| `mouseLeave`          | (liquidweb ) | Event will be fired when the mouse leaves the element.                    |
| `mouseMove`           | (liquidweb ) | Event will be fired when the mouse moves over the element.                |
| `mouseDown`           | (liquidweb ) | Event will be fired when the mouse button is pressed down on the element. |
| `mouseUp`             | (liquidweb ) | Event will be fired when the mouse button is released over the element.   |
| `click`               | (liquidweb ) | Event will be fired when the element is clicked.                          |

> Note that with `liquidweb.on('init')` syntax it will work only in case you set `init: false` parameter.

```javascript
const liquidweb = new LiquidWeb('[data-liquid]', {
  init: false,
});

liquidweb.on('init', (liquidweb) => {
  console.log('LiquidWeb initialized', liquidweb);
});

liquidweb.init();
```

or

```javascript
const liquidweb = new LiquidWeb('[data-liquid]', {
  on: {
    init: (liquidweb) => {
      console.log('LiquidWeb initialized', liquidweb);
    },
  },
});
```

## Static Methods

| Static Method   | Arguments                 | Description                                                                                                                                                     |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__instances__` | -                         | Returns an array of all LiquidWeb instances.                                                                                                                    |
| `init`          | el: HTMLElement           | Initializes the LiquidWeb effect on a given element.                                                                                                            |
| `getInstance`   | el: HTMLElement \| string | Retrieves the LiquidWeb instance for a given element or selector.<br> You can also get a copy as follows: `document.querySelector('[data-liquid]')?.liquidWeb;` |

## My other works

[Prismium](https://prismify.in) - A modern JavaScript accordion library with smooth animations. Easily integrates with React, Vue, and vanilla JavaScript.
