const formatDate = (
  date: Date,
  locale: 'pt-BR' | 'en-US' = 'pt-BR',
): string => {
  const dateOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
  const newDate = new Date(date);
  return Intl.DateTimeFormat(locale, dateOptions).format(newDate);
};

export default formatDate;
