/**
 * Выполняются перед redirects.global.js
 */
export default defineNuxtRouteMiddleware(({ path, query, hash }) => {
  const redirects = [
    {
      from: '/old-path',
      to: '/new-path/',
    },
    {
      from: '/second-old-path',
      to: '/second-new-path/',
    },
  ];

  for (const redirect of redirects) {
    if (path === redirect.from) {
      return navigateTo(
        {
          path: redirect.to,
          query,
          hash,
        },
        { redirectCode: 301 }
      );
    }
  }
});
