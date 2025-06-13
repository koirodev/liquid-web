import { LiquidWeb } from './components/LiquidWeb.mjs';

export { LiquidWeb };

export default {
  install(app) {
    app.component('LiquidWeb', LiquidWeb);
  },
};
