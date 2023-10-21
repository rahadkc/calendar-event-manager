import formatISO from 'date-fns/formatISO'

export const dateToISOStringLocal = (date: Date | number) => formatISO(date).slice(0, 16)

// export const userLocale =
//   navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language
