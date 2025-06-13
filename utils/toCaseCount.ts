/**
 * @description
 * Утилита для определения правильного склонения слова в зависимости от числа.
 * Используется для правильного отображения слов в зависимости от количества.
 * Например: "1 яблоко", "2 яблока", "5 яблок".
 * @param {number} number - Число, от которого зависит склонение слова.
 * @param {Array<string>} forms - Массив из трех строк, представляющих формы слова:
 * 1. форма (ед. число)
 * 2. форма (мн. число)
 * 3. форма (число от 2 до 4)
 * @returns {string} - Правильная форма слова в зависимости от числа.
 * @example
 * const forms = ['яблоко', 'яблок', 'яблока'];
 * toCaseCount(1, forms);
 * // возвращает 'яблоко'
 * toCaseCount(2, forms);
 * // возвращает 'яблока'
 * toCaseCount(28, forms);
 * // возвращает 'яблок'
 */

export default function toCaseCount(number: number, forms: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const mod100 = number % 100;
  const mod10 = number % 10;

  if (mod100 > 4 && mod100 < 20) {
    return forms[2];
  }

  return forms[cases[Math.min(mod10, 5)]];
}
