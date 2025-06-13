class LiquidWebError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'LiquidWebError';
    this.originalError = originalError;
  }
}

export class DOMManager {
  setup(instance, el) {
    this.instance = instance;
    this.validateElement(el);
    this.createStructure(el);

    // Сохраняем созданные элементы в экземпляре LiquidWeb
    instance.$content = this.$content;
    instance.$backdrop = this.$backdrop;
    instance.$svg = this.$svg;

    return this;
  }

  validateElement(el) {
    if (!el) {
      throw new LiquidWebError('Element is required');
    }

    if (!(el instanceof Element)) {
      throw new LiquidWebError('Invalid element type. Expected HTMLElement');
    }
  }

  createStructure(el) {
    this.$el = el;
    if (this.$el.children.length > 1) {
      throw new LiquidWebError(
        'Liquid container must have exactly one child element'
      );
    }

    if (this.$el.children.length === 0) {
      throw new LiquidWebError(
        'Liquid container must have at least one child element'
      );
    }

    this.$content = this.$el.children[0];

    // Создаем SVG фильтр
    this.$svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.$svg.style.position = 'absolute';
    this.$svg.style.width = '100%';
    this.$svg.style.height = '100%';
    this.$svg.setAttribute('aria-hidden', 'true');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = this.instance.createSVGFilter();
    defs.appendChild(filter);
    this.$svg.appendChild(defs);

    // Создаем контейнер на основе существующего элемента с data-liquid
    this.$el.classList.add('liquidweb');
    this.$el.style.borderRadius = `${this.instance.options.cornerRadius}px`;

    // Очищаем контейнер от всего содержимого
    while (this.$el.firstChild) {
      this.$el.removeChild(this.$el.firstChild);
    }

    // Создаем внутренние элементы
    this.$backdrop = document.createElement('span');
    this.$backdrop.className = 'liquidweb__backdrop';

    const content = document.createElement('div');
    content.className = 'liquidweb__content';

    // Перемещаем элемент с data-liquid-content в glass__content
    content.appendChild(this.$content);

    this.$el.appendChild(this.$svg);
    this.$el.appendChild(this.$backdrop);
    this.$el.appendChild(content);
  }
}
