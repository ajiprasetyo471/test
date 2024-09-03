// 👉 IsEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined || value === '') return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export const isObject = (obj) =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)

// 👉 IsToday
export const isToday = (date) => {
  const today = new Date()

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const createImageURL = (image) => {
  return URL.createObjectURL(image[0])
}

export const truncateString = (string, maxLength) => {
  // get the index of space after maxLength
  const index = string.indexOf(' ', maxLength)
  return index === -1 ? string : string.substring(0, index) + '...'
}

export const formatPhoneNumber = (value) => {
  let cleaned = ('' + value).replace(/\D/g, '');
  var phone = cleaned.replace(/\D*(\d{4})\D*(\d{4})\D*(\d{4})\D*/, '$1 $2 $3');
  return phone
}