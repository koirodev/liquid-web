import React, { useRef, useEffect } from 'react';
import LiquidWebCore from '../../core/core.mjs';
import { LiquidWebError } from '../../core/errors/LiquidWebError.mjs';

export const LIQUIDWEB_INJECTION_KEY = 'liquidweb';

export const LiquidWeb = ({
  options = {},
  selector = 'div',
  attributes = {},
  children,

  // События
  onBeforeInit,
  onInit,
  onAfterInit,
  onBeforeDestroy,
  onDestroy,
  onAfterDestroy,
  onBeforeUpdate,
  onUpdate,
  onAfterUpdate,
  onBeforeUpdateEffects,
  onUpdateEffects,
  onAfterUpdateEffects,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onMouseDown,
  onMouseUp,
  onClick,
  onError,
  ...rest
}) => {
  const localRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const node = localRef.current;
    if (!node) return;

    const defaultEvents = {
      beforeInit: () => onBeforeInit?.(instanceRef.current),
      init: () => onInit?.(instanceRef.current),
      afterInit: () => onAfterInit?.(instanceRef.current),

      beforeDestroy: () => onBeforeDestroy?.(instanceRef.current),
      destroy: () => onDestroy?.(instanceRef.current),
      afterDestroy: () => onAfterDestroy?.(instanceRef.current),

      beforeUpdate: () => onBeforeUpdate?.(instanceRef.current),
      update: () => onUpdate?.(instanceRef.current),
      afterUpdate: () => onAfterUpdate?.(instanceRef.current),

      beforeUpdateEffects: () => onBeforeUpdateEffects?.(instanceRef.current),
      updateEffects: () => onUpdateEffects?.(instanceRef.current),
      afterUpdateEffects: () => onAfterUpdateEffects?.(instanceRef.current),

      mouseEnter: () => onMouseEnter?.(instanceRef.current),
      mouseLeave: () => onMouseLeave?.(instanceRef.current),
      mouseMove: () => onMouseMove?.(instanceRef.current),
      mouseDown: () => onMouseDown?.(instanceRef.current),
      mouseUp: () => onMouseUp?.(instanceRef.current),
      click: () => onClick?.(instanceRef.current),
    };

    const providedEvents = {
      ...options?.on,
      ...options?.events,
    };
    const combineEvents = { ...defaultEvents, ...providedEvents };
    const finalOptions = { ...options, on: combineEvents };

    try {
      instanceRef.current = new LiquidWebCore(node, finalOptions);
    } catch (error) {
      if (typeof onError === 'function') {
        onError(error);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          throw new LiquidWebError('Failed to initialize LiquidWeb', error);
        }
      }
    }

    return () => {
      try {
        const inst = instanceRef.current;
        if (inst && !inst.destroyed && typeof inst.destroy === 'function') {
          inst.destroy();
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('Failed to destroy LiquidWeb instance:', error);
        }
      } finally {
        instanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.createElement(
    selector,
    {
      ref: localRef,
      'data-liquid': '',
      ...rest,
      ...attributes,
    },
    children
  );
};
