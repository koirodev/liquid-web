import LiquidWeb from '../core.mjs';

export default {
  destroy() {
    if (this.destroyed) return;

    this.emit('beforeDestroy');

    // Удаляем слушатели событий
    this.$el.removeEventListener('mouseenter', this.handleMouseEnter);
    this.$el.removeEventListener('mouseleave', this.handleMouseLeave);
    this.$el.removeEventListener('mousedown', this.handleMouseDown);
    this.$el.removeEventListener('mouseup', this.handleMouseUp);
    this.$el.removeEventListener('click', this.handleClick);
    document.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);

    this.$svg?.remove();
    this.$svg = null;
    this.$backdrop?.remove();
    this.$backdrop = null;
    console.log(this);
    this.$el?.appendChild?.(this.$content);
    this.$el?.querySelector('.liquidweb__content')?.remove();
    this.$el?.classList.remove('liquidweb');
    this.$el?.classList.remove('liquidweb-initialized');

    // Отключаем MutationObserver
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }

    this.emit('destroy');

    // Очищаем экземпляр
    if (this.$el) {
      LiquidWeb.__instances__.delete(this.$el);
      delete this.$el.liquidweb;
    }

    this.eventsListeners = {};
    this.eventsAnyListeners = [];
    this.destroyed = true;

    this.emit('afterDestroy');

    return null;
  },
};
