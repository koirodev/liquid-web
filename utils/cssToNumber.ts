export default function cssToNumber(value: string | number): number {
  if (typeof value !== 'string') return value;

  if (value.endsWith('rem')) {
    return (
      parseFloat(value) *
      parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  } else if (value.endsWith('vw')) {
    return (parseFloat(value) * 1920) / 100;
  } else if (value.endsWith('px')) {
    return parseFloat(value);
  }

  return parseFloat(value);
}
