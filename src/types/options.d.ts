import { LiquidWebEventCallback, LiquidWebEventListeners } from './index';
import LiquidWeb from './core';

export interface LiquidWebOptions {
  el?: string | HTMLElement;
  init?: boolean;
  scale?: number;
  blur?: number | string;
  saturation?: number | string;
  aberration?: number;
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';

  on?: LiquidWebEventListeners;
  events?: LiquidWebEventListeners;
  onAny?: LiquidWebEventCallback;
  [key: string]: any;
}
