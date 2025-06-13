import {
  h,
  defineComponent,
  ref,
  provide,
  onMounted,
  onUnmounted,
  toRaw,
} from 'vue';
import LiquidWebCore from '../../core/core.mjs';
import { LiquidWebError } from '../../core/errors/LiquidWebError.mjs';

export const LIQUIDWEB_INJECTION_KEY = 'liquidweb';

export const LiquidWeb = defineComponent({
  name: 'LiquidWeb',
  inheritAttrs: false,
  emits: [
    'before-init',
    'init',
    'after-init',
    'before-destroy',
    'destroy',
    'after-destroy',
    'before-update',
    'update',
    'after-update',
    'before-update-effects',
    'update-effects',
    'after-update-effects',
    'mouse-enter',
    'mouse-leave',
    'mouse-move',
    'mouse-down',
    'mouse-up',
    'click',
  ],
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },

    selector: {
      type: String,
      default: 'div',
    },

    attributes: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { slots, emit, attrs }) {
    const liquidwebRef = ref(null);
    const instance = ref(null);

    provide(LIQUIDWEB_INJECTION_KEY, {
      liquidwebRef,
      instance,
    });

    onMounted(() => {
      if (liquidwebRef.value) {
        const defaultEvents = {
          beforeInit: () => emit('before-init', instance.value),
          init: () => emit('init', instance.value),
          afterInit: () => emit('after-init', instance.value),

          beforeDestroy: () => emit('before-destroy', instance.value),
          destroy: () => emit('destroy', instance.value),
          afterDestroy: () => emit('after-destroy', instance.value),

          beforeUpdate: () => emit('before-update', instance.value),
          update: () => emit('update', instance.value),
          afterUpdate: () => emit('after-update', instance.value),

          beforeUpdateEffects: () =>
            emit('before-update-effects', instance.value),
          updateEffects: () => emit('update-effects', instance.value),
          afterUpdateEffects: () =>
            emit('after-update-effects', instance.value),

          mouseEnter: () => emit('mouse-enter', instance.value),
          mouseLeave: () => emit('mouse-leave', instance.value),
          mouseMove: () => emit('mouse-move', instance.value),
          mouseDown: () => emit('mouse-down', instance.value),
          mouseUp: () => emit('mouse-up', instance.value),
          click: () => emit('click', instance.value),
        };

        const providedEvents = {
          ...props.options?.on,
          ...props.options?.events,
        };
        const combineEvents = { ...defaultEvents, ...providedEvents };
        const finalOptions = { ...props.options, on: combineEvents };

        try {
          instance.value = new LiquidWebCore(liquidwebRef.value, finalOptions);
        } catch (error) {
          throw new LiquidWebError(
            `Failed to initialize LiquidWeb: ${error.message}`,
            error
          );
        }
      }
    });

    onUnmounted(() => {
      try {
        const rawInstance = instance.value ? toRaw(instance.value) : null;
        if (rawInstance && !rawInstance.destroyed && rawInstance.destroy) {
          rawInstance.destroy();
        }
      } catch (error) {
        throw new LiquidWebError(
          `Failed to destroy LiquidWeb instance: ${error.message}`,
          error
        );
      } finally {
        instance.value = null;
        liquidwebRef.value = null;
      }
    });

    return () => {
      const defaultSlot = slots.default?.();
      if (defaultSlot && defaultSlot.length > 1) {
        throw new LiquidWebError(
          'The default slot should only contain a single root element.'
        );
      }

      return h(
        props.selector,
        {
          ref: liquidwebRef,
          'data-liquid': '',
          ...attrs,
          ...props.attributes,
        },
        slots.default?.()
      );
    };
  },
});
