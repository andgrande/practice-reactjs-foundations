const formatValue = (
  value: number,
  locale: 'en-US' | 'pt-BR' = 'pt-BR',
): string =>
  Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export default formatValue;
