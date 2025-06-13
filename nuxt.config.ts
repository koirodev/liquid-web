import tailwindConfig from './tailwind.config';

export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: true, vscode: { enabled: false } },

  modules: [
    '@vueuse/nuxt',
    'nuxt-svgo',
    'nuxt-typed-router',
    '@pinia/nuxt',
    '@vuestic/nuxt',
  ],

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },

  imports: {
    autoImport: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://liquid.prismify.in',
      gitApi: 'https://api.github.com/repos/koirodev/liquid-web',
      latestVersion: 'https://registry.npmjs.org/liquid-web/latest',
    },
  },

  svgo: {
    autoImportPath: '~/assets/svg',
    componentPrefix: 'svg',
    defaultImport: 'componentext',
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon/favicon-96x96.png',
          sizes: '96x96',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicon/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'nuxt.dev0' },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  router: { options: { scrollBehaviorType: 'auto' } },

  css: ['normalize.css', '~/assets/styles/index.scss'],

  vite: {
    build: { rollupOptions: { output: { manualChunks: undefined } } },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '~/assets/styles/mixins/hover' as *;
            @use '~/assets/styles/mixins/media' as *;
            @use '~/assets/styles/mixins/mini' as *;
            @use '~/assets/styles/mixins/pseudo' as *;
            @use '~/assets/styles/mixins/scrollbar' as *;
          `,
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
      devSourcemap: true,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      'postcss-media-minmax': {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-05-24',
});
