import { LiquidWebOptions } from './options';
import LiquidWeb from './core';
import * as React from 'react';

export interface LiquidWebProps {
  options?: LiquidWebOptions;
  children?: React.ReactNode;
  selector?: string;

  onBeforeInit?: (instance: LiquidWeb) => void;
  onInit?: (instance: LiquidWeb) => void;
  onAfterInit?: (instance: LiquidWeb) => void;
  onBeforeDestroy?: (instance: LiquidWeb) => void;
  onDestroy?: (instance: LiquidWeb) => void;
  onAfterDestroy?: (instance: LiquidWeb) => void;
  onBeforeUpdate?: (instance: LiquidWeb) => void;
  onUpdate?: (instance: LiquidWeb) => void;
  onAfterUpdate?: (instance: LiquidWeb) => void;
  onBeforeUpdateEffects?: (instance: LiquidWeb) => void;
  onUpdateEffects?: (instance: LiquidWeb) => void;
  onAfterUpdateEffects?: (instance: LiquidWeb) => void;
  onMouseEnter?: (instance: LiquidWeb) => void;
  onMouseLeave?: (instance: LiquidWeb) => void;
  onMouseMove?: (instance: LiquidWeb) => void;
  onMouseDown?: (instance: LiquidWeb) => void;
  onMouseUp?: (instance: LiquidWeb) => void;
  onClick?: (instance: LiquidWeb) => void;
  onError?: (instance: LiquidWeb) => void;

  [key: string]: any;
}

export const LiquidWeb: React.FC<LiquidWebProps>;
