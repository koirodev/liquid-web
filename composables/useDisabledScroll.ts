/**
 * @description Композибл для управления прокруткой страницы.
 */

export default function (disabled = false) {
  document.body.style.overflow = disabled ? 'hidden' : '';
}
