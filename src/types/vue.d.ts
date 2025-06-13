import { LiquidWebOptions } from './options';
import LiquidWeb from './core';
import { DefineComponent, InjectionKey, Ref } from 'vue';

export interface LiquidWebInjection {
  liquidRef: Ref<HTMLElement | null>;
  instance: Ref<LiquidWeb | null>;
}

export const LIQUIDWEB_INJECTION_KEY: InjectionKey<LiquidWebInjection>;

export interface LiquidWebProps {
  options?: LiquidWebOptions;
  selector?: string;
  attributes?: Record<string, any>;
}

export const LiquidWeb: DefineComponent<LiquidWebProps>;

export default {
  install(app: any): void {},
};
