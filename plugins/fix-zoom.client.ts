/**
 * @description
 * Блокирует возможность зума на мобильных устройствах.
 * Этот плагин добавляет атрибут maximum-scale=1.0 к мета-тегу viewport,
 * чтобы предотвратить масштабирование страницы на мобильных устройствах.
 * Это может быть полезно для предотвращения проблем с отображением на мобильных устройствах,
 * когда пользователь пытается увеличить масштаб страницы.
 */

export default defineNuxtPlugin(async () => {
  const metaViewport = document.querySelector('meta[name=viewport]');

  if (!metaViewport) {
    console.warn('Meta viewport not found');
    return;
  }

  metaViewport.setAttribute(
    'content',
    `${metaViewport.getAttribute('content')}, maximum-scale=1.0`
  );
});
