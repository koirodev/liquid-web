export as namespace LiquidWeb;

export type LiquidWebEventName =
  | 'beforeInit'
  | 'init'
  | 'afterInit'
  | 'beforeDestroy'
  | 'destroy'
  | 'afterDestroy'
  | 'beforeUpdate'
  | 'update'
  | 'afterUpdate'
  | 'beforeUpdateEffects'
  | 'updateEffects'
  | 'afterUpdateEffects'
  | 'mouseEnter'
  | 'mouseLeave'
  | 'mouseMove'
  | 'mouseDown'
  | 'mouseUp'
  | 'click';

export type LiquidWebEventCallback = (instance?: LiquidWeb) => void;

export type LiquidWebEventListener = {
  [event: string]: LiquidWebEventCallback | LiquidWebEventCallback[];
};
