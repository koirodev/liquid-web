const admin = {
  front: '/manager',
  back: '/manager',
};

export default defineNuxtRouteMiddleware(({ path, query, hash }) => {
  if (path === '/') return;

  // Редирект на админ панель
  if (path === admin.front) {
    const config = useRuntimeConfig();
    return navigateTo(`${config.public.apiBase}${admin.back}`, {
      external: true,
    });
  }

  // Редирект множественных слэшей на одинарный
  if (/^\/{2,}$/.test(path)) {
    return navigateTo({ path: '/', query, hash }, { redirectCode: 301 });
  }

  let normalizedPath = path.replace(/\/{2,}/g, '/');

  // Удаление index.php, index.html и т. д.
  normalizedPath = normalizedPath.replace(
    /\/?(index\.(php|html|htm|asp|aspx))$/i,
    ''
  );

  // Редирект с .html на URL без расширения
  if (normalizedPath.endsWith('.html')) {
    return navigateTo(
      {
        path: normalizedPath.slice(0, -5),
        query,
        hash,
      },
      { redirectCode: 301 }
    );
  }

  // Если путь изменился — редиректим
  if (normalizedPath !== path) {
    return navigateTo(
      { path: normalizedPath || '/', query, hash },
      { redirectCode: 301 }
    );
  }

  // Добавление завершающего `/`, если его нет
  if (normalizedPath !== '/' && !normalizedPath.endsWith('/')) {
    return navigateTo(
      {
        path: normalizedPath + '/',
        query,
        hash,
      },
      { redirectCode: 301 }
    );
  }

  // // Удаление завершающего `/`, если он есть
  // if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
  //   return navigateTo(
  //     {
  //       path: normalizedPath.slice(0, -1),
  //       query,
  //       hash,
  //     },
  //     { redirectCode: 301 }
  //   );
  // }
});
