import { LiquidWebError } from './errors/LiquidWebError.mjs';
import defaultOptions from './options.mjs';

// methods
import eventsEmitter from './methods/events-emitter.mjs';
import actions from './methods/actions.mjs';
import destroy from './methods/destroy.mjs';
import { publicMethods } from './methods/public-api.mjs';

// managers
import { DOMManager } from './managers/DOMManager.mjs';

// utils
import { deepMerge } from '../utils/deepMerge.mjs';
import {
  ShaderDisplacementGenerator,
  fragmentShaders,
} from '../utils/shared.mjs';
import {
  displacementMap,
  polarDisplacementMap,
  prominentDisplacementMap,
} from '../utils/maps.mjs';

// Method prototypes
const prototypes = {
  eventsEmitter,
  actions,
  destroy,
};

class LiquidWeb {
  static __instances__ = new Map();
  static __stylesInjected__ = false;
  static __styleElement__ = null;

  // Public methods as static
  static init = publicMethods.init;
  static getInstance = publicMethods.getInstance;

  constructor(...args) {
    let el, options;

    // Fix for requestAnimationFrame in old browsers
    window.requestAnimationFrame = function (callback) {
      return setTimeout(callback, 0);
    };

    // Анализ аргументов конструктора
    if (
      args.length === 1 &&
      args[0].constructor &&
      Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object'
    ) {
      options = args[0];
    } else {
      [el, options] = args;
    }

    if (!options) {
      options = {};
    }

    options = deepMerge({}, options);

    if (el && !options.el) {
      options.el = el;
    }

    if (!this.$el) {
      this.$el = options.el;
    }

    // Обработка строкового селектора
    if (this.$el && typeof this.$el === 'string') {
      const elements = document.querySelectorAll(this.$el);
      const liquidwebArray = Array.from(elements).map((el) => {
        // Check if instance is already initialized
        if (LiquidWeb.__instances__.has(el)) {
          return LiquidWeb.__instances__.get(el);
        }

        const newOptions = deepMerge({}, options, { el });
        const instance = new LiquidWeb(newOptions);
        LiquidWeb.__instances__.set(el, instance);
        return instance;
      });

      return new Proxy(liquidwebArray, {
        get(target, prop) {
          if (Array.prototype[prop]) {
            return target[prop].bind(target);
          }

          const multiInstanceMethods = [
            'on',
            'once',
            'onAny',
            'off',
            'offAny',
            'emit',
            'init',
            'destroy',
          ];

          if (multiInstanceMethods.includes(prop)) {
            return (...args) => {
              target.map((instance) => {
                return instance[prop].apply(instance, args);
              });
              return target;
            };
          }

          if (typeof target[0][prop] === 'function') {
            return target[0][prop].bind(target[0]);
          }

          return target[0][prop];
        },
      });
    }

    this.options = deepMerge({}, defaultOptions, options);
    this.__liquidweb__ = true;
    this.eventsListeners = {};
    this.eventsAnyListeners = [];

    // Register events
    if (this.options && this.options.on) {
      Object.keys(this.options.on).forEach((eventName) => {
        this.on(eventName, this.options.on[eventName]);
      });
    }
    if (this.options && this.options.onAny) {
      this.onAny(this.options.onAny);
    }

    this.destroyed = false;
    this.initialized = false;

    this.DOMManager = new DOMManager();

    this.state = {
      isHovered: false,
      isActive: false,
      mouseOffset: { x: 0, y: 0 },
      globalMousePos: { x: 0, y: 0 },
      glassSize: { width: 0, height: 0 },
    };

    this.filterId = Math.random().toString(36).substr(2, 9);

    // Внедрение стилей, если это необходимо
    if (!LiquidWeb.__stylesInjected__) {
      LiquidWeb.injectStyles();
    }

    // Сохраняем экземпляр
    if (this.$el instanceof Element) {
      LiquidWeb.__instances__.set(this.$el, this);
      this.$el.liquidweb = this;
    }

    // Инициализация
    if (this.$el && this.$el.parentNode) {
      if (this.options.init) {
        this.init();
      }
    } else {
      console.warn('Element must be in DOM before initialization');
    }
  }

  // Основные методы из исходного класса
  init(el = this.$el) {
    if (this.initialized) {
      return;
    }

    if (!el) {
      throw new LiquidWebError('Element is required');
    }

    if (!(el instanceof Element)) {
      throw new LiquidWebError('Element must be a DOM Element');
    }

    this.destroyed = false;
    this.emit('beforeInit');

    try {
      this.emit('init', this);
      this.DOMManager.setup(this, el);

      this.initialized = true;

      if (this.$content) {
        this.$content.liquidweb = this;
        this.$el.classList.add('liquidweb-initialized');
      }

      // Обновляем запись в instances
      if (this.$el) {
        LiquidWeb.__instances__.set(this.$el, this);
      }

      this.update();
    } catch (error) {
      throw new LiquidWebError('Initialization failed', error);
    }

    this.attachEventListeners();
    this.update();

    this.emit('afterInit');
  }

  // Статический метод для внедрения стилей
  static injectStyles() {
    if (LiquidWeb.__stylesInjected__ || typeof document === 'undefined') {
      return;
    }

    const css = `
      .liquidweb {
        position: relative;
        display: block;
      }
      .liquidweb__backdrop {
        inset: 0;
        position: absolute;
        z-index: 0;
      }
      .liquidweb__content {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
      }
    `;

    LiquidWeb.__styleElement__ = document.createElement('style');
    LiquidWeb.__styleElement__.type = 'text/css';
    LiquidWeb.__styleElement__.appendChild(document.createTextNode(css));
    document.head.appendChild(LiquidWeb.__styleElement__);
    LiquidWeb.__stylesInjected__ = true;
  }

  createSVGFilter() {
    const filter = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'filter'
    );
    filter.setAttribute('id', this.filterId);
    filter.setAttribute('x', '-35%');
    filter.setAttribute('y', '-35%');
    filter.setAttribute('width', '170%');
    filter.setAttribute('height', '170%');
    filter.setAttribute('colorInterpolationFilters', 'sRGB');

    // Добавляем все необходимые эффекты фильтра
    let mapUrl = this.getDisplacementMap();

    const feImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feImage'
    );
    feImage.setAttribute('x', '0');
    feImage.setAttribute('y', '0');
    feImage.setAttribute('width', '100%');
    feImage.setAttribute('height', '100%');
    feImage.setAttribute('result', 'DISPLACEMENT_MAP');
    feImage.setAttribute('href', mapUrl);
    feImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    filter.appendChild(feImage);
    this.setupFilterEffects(filter);

    return filter;
  }

  setupFilterEffects(filter) {
    // Создание маски краев
    const edgeMatrix = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feColorMatrix'
    );
    edgeMatrix.setAttribute('in', 'DISPLACEMENT_MAP');
    edgeMatrix.setAttribute('type', 'matrix');
    edgeMatrix.setAttribute(
      'values',
      '0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0'
    );
    edgeMatrix.setAttribute('result', 'EDGE_INTENSITY');

    const edgeMask = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feComponentTransfer'
    );
    edgeMask.setAttribute('in', 'EDGE_INTENSITY');
    edgeMask.setAttribute('result', 'EDGE_MASK');

    const funcA = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feFuncA'
    );
    funcA.setAttribute('type', 'discrete');
    funcA.setAttribute('tableValues', `0 ${this.options.aberration * 0.05} 1`);
    edgeMask.appendChild(funcA);

    // Добавляем все эффекты в фильтр
    filter.appendChild(edgeMatrix);
    filter.appendChild(edgeMask);

    // Добавляем эффекты смещения для RGB каналов
    this.addChannelDisplacement(filter, 'RED');
    this.addChannelDisplacement(filter, 'GREEN');
    this.addChannelDisplacement(filter, 'BLUE');

    // Комбинируем каналы
    this.combineChannels(filter);
  }

  addChannelDisplacement(filter, channel) {
    const scale =
      this.options.scale * (this.options.mode === 'shader' ? 1 : -1);
    const offset = channel === 'RED' ? 0 : channel === 'GREEN' ? 0.05 : 0.1;

    const displacement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feDisplacementMap'
    );
    displacement.setAttribute('in', 'SourceGraphic');
    displacement.setAttribute('in2', 'DISPLACEMENT_MAP');
    displacement.setAttribute(
      'scale',
      scale - this.options.aberration * offset
    );
    displacement.setAttribute('xChannelSelector', 'R');
    displacement.setAttribute('yChannelSelector', 'B');
    displacement.setAttribute('result', `${channel}_DISPLACED`);

    const colorMatrix = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feColorMatrix'
    );
    colorMatrix.setAttribute('in', `${channel}_DISPLACED`);
    colorMatrix.setAttribute('type', 'matrix');

    const values = new Array(20).fill(0);
    if (channel === 'RED') values[0] = 1;
    if (channel === 'GREEN') values[6] = 1;
    if (channel === 'BLUE') values[12] = 1;
    values[18] = 1;

    colorMatrix.setAttribute('values', values.join(' '));
    colorMatrix.setAttribute('result', `${channel}_CHANNEL`);

    filter.appendChild(displacement);
    filter.appendChild(colorMatrix);
  }

  combineChannels(filter) {
    const blendGB = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feBlend'
    );
    blendGB.setAttribute('in', 'GREEN_CHANNEL');
    blendGB.setAttribute('in2', 'BLUE_CHANNEL');
    blendGB.setAttribute('mode', 'screen');
    blendGB.setAttribute('result', 'GB_COMBINED');

    const blendRGB = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feBlend'
    );
    blendRGB.setAttribute('in', 'RED_CHANNEL');
    blendRGB.setAttribute('in2', 'GB_COMBINED');
    blendRGB.setAttribute('mode', 'screen');
    blendRGB.setAttribute('result', 'RGB_COMBINED');

    const blur = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'feGaussianBlur'
    );
    blur.setAttribute('in', 'RGB_COMBINED');
    blur.setAttribute(
      'stdDeviation',
      Math.max(0.1, 0.5 - Number(this.options.aberration) * 0.1)
    );
    blur.setAttribute('result', 'ABERRATED_BLURRED');

    filter.appendChild(blendGB);
    filter.appendChild(blendRGB);
    filter.appendChild(blur);
  }

  getDisplacementMap() {
    switch (this.options.mode) {
      case 'standard':
        return displacementMap;
      case 'polar':
        return polarDisplacementMap;
      case 'prominent':
        return prominentDisplacementMap;
      case 'shader':
        return this.generateShaderDisplacementMap();
      default:
        return this.generateShaderDisplacementMap();
    }
  }

  generateShaderDisplacementMap() {
    if (!this.$el) {
      throw new LiquidWebError('Element must be in DOM to generate shader map');
    }

    const { width, height } = this.$el.getBoundingClientRect();

    const generator = new ShaderDisplacementGenerator({
      width,
      height,
      fragment: fragmentShaders.liquidGlass,
    });

    const dataUrl = generator.updateShader();
    generator.destroy();
    return dataUrl;
  }

  attachEventListeners() {
    if (!this.$el) return;

    this.$el.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
    this.$el.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
    this.$el.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.$el.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.$el.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.$el.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('resize', () => this.handleResize());

    this.setupMutationObserver();
  }

  /**
   * Настраивает MutationObserver для отслеживания изменений в стилях content
   */
  setupMutationObserver() {
    if (!this.$content || typeof MutationObserver === 'undefined') return;

    // Создаем наблюдатель, который будет следить за изменениями атрибутов
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;

      // Проверяем, были ли изменения в style или class атрибутах
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'style' ||
            mutation.attributeName === 'class')
        ) {
          shouldUpdate = true;
          break;
        }
      }

      if (shouldUpdate) {
        this.updateBackdropBorderRadius();
      }
    });

    // Начинаем наблюдение за content элементом
    observer.observe(this.$content, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    // Сохраняем ссылку на observer для возможности отключения
    this._observer = observer;
  }

  updateBackdropBorderRadius() {
    if (!this.$content || !this.$backdrop) return;

    // Получаем вычисленные стили content элемента
    const computedStyle = window.getComputedStyle(this.$content);

    // Получаем значения border-radius для каждого угла
    const topLeft = computedStyle.borderTopLeftRadius;
    const topRight = computedStyle.borderTopRightRadius;
    const bottomRight = computedStyle.borderBottomRightRadius;
    const bottomLeft = computedStyle.borderBottomLeftRadius;

    // Применяем значения к backdrop с небольшим отступом
    // Чтобы учесть padding и другие факторы
    const padding = 2; // px

    // Функция для преобразования значения border-radius с учетом отступа
    const adjustRadius = (value) => {
      if (!value) return '0px';

      // Извлекаем числовое значение и единицу измерения
      const match = value.match(/^([\d.]+)(.*)$/);
      if (!match) return value;

      const [, num, unit] = match;
      const adjustedNum = Math.max(0, parseFloat(num) - padding);
      return `${adjustedNum}${unit}`;
    };

    // Применяем скорректированные значения
    this.$backdrop.style.borderTopLeftRadius = adjustRadius(topLeft);
    this.$backdrop.style.borderTopRightRadius = adjustRadius(topRight);
    this.$backdrop.style.borderBottomRightRadius = adjustRadius(bottomRight);
    this.$backdrop.style.borderBottomLeftRadius = adjustRadius(bottomLeft);
  }

  update() {
    this.emit('beforeUpdate');

    if (!this.$el) {
      throw new LiquidWebError('Container element not found');
    }

    const rect = this.$el.getBoundingClientRect();

    this.state.glassSize = {
      width: rect.width,
      height: rect.height,
    };

    this.emit('update', this);

    window.requestAnimationFrame(() => {
      this.updateBackdropBorderRadius();
      this.updateEffects();

      this.emit('afterUpdate', this);
    });
  }

  updateEffects() {
    this.emit('beforeUpdateEffects');

    // Обновляем фильтры и эффекты
    if (this.$backdrop) {
      const blur =
        typeof this.options.blur === 'number'
          ? `${this.options.blur}px`
          : this.options.blur;

      const saturation =
        typeof this.options.saturation === 'number'
          ? `${this.options.saturation}%`
          : this.options.saturation;

      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
      this.$backdrop.style.filter = isFirefox ? '' : `url(#${this.filterId})`;
      this.$backdrop.style.backdropFilter = `blur(${blur}) saturate(${saturation})`;

      this.emit('updateEffects', this);
      this.emit('afterUpdateEffects', this);
    }
  }
}

// Add methods to prototype
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    LiquidWeb.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});

export default LiquidWeb;
