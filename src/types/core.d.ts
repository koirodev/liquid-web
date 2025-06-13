import {
  LiquidWebEventCallback,
  LiquidWebEventListeners,
  LiquidWebTheme,
} from './index';
import { LiquidWebOptions } from './options';
import { LiquidWebState } from './state';

declare class LiquidWeb {
  static __instances__: Map<Element, LiquidWeb>;

  static init(el: HTMLElement): LiquidWeb;
  static getInstance(el: HTMLElement | string): LiquidWeb | null;

  constructor(
    el?: HTMLElement | string | LiquidWebOptions,
    options?: LiquidWebOptions
  );

  $el: HTMLElement;
  $content: HTMLElement;
  $svg: SVGElement;

  destroyed: boolean;
  initialized: boolean;
  filterId: string;

  eventsAnyListeners: LiquidWebEventCallback[];
  eventsListeners: LiquidWebEventListeners;

  options: LiquidWebOptions;
  state: LiquidWebState;

  __liquidweb__: boolean;
  _observer: MutationObserver | null;
}
