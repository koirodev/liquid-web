module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
