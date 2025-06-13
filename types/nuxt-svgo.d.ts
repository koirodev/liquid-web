import 'nuxt/schema';

declare module 'nuxt/schema' {
  interface NuxtConfig {
    svgo?: {
      autoImportPath?: string;
      componentPrefix?: string;
      defaultImport?: string;
    };
  }
}
