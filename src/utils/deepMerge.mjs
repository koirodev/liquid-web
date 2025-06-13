import { isNode, isObject } from './is.mjs';

/**
 * Deep merge objects
 */
export function deepMerge(...sources) {
  const [target, ...rest] = sources;
  const PROTECTED_KEYS = ['__proto__', 'constructor', 'prototype'];

  if (!target) return {};

  for (const source of rest) {
    if (!source || isNode(source)) continue;

    const keys = Object.keys(Object(source)).filter(
      (key) => !PROTECTED_KEYS.includes(key)
    );

    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (!descriptor || !descriptor.enumerable) continue;

      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        // Handle objects
        if (sourceValue.__liquidweb__) {
          target[key] = sourceValue;
        } else if (isObject(targetValue)) {
          deepMerge(targetValue, sourceValue);
        } else {
          target[key] = deepMerge({}, sourceValue);
        }
      } else {
        target[key] = sourceValue;
      }
    }
  }

  return target;
}
