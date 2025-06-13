export const publicMethods = {
  getInstance(el) {
    const instance = new this(undefined, { init: false });
    return instance.getInstance(el);
  },

  init(el) {
    const instance = new this(undefined, { init: false });
    return instance.init(el);
  },
};
