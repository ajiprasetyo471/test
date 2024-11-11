import moment from 'moment'

export const apiImage = import.meta.env.VITE_API_BASE_URL_IMG || process.env.VITE_API_BASE_URL_IMG

export function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export function formatDateTime(date) {
  return moment(date).format('YYYY-DD-MM HH:mm:ss')
}

export function formatNumber(value) {
  if (!value) return '0'
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const calculateTotalPrice = (items) => {
  const result = items.reduce((total, item) => {
    return item.selected ? total + item.price : total
  }, 0)
  return formatNumber(result)
}

export const reverseFormatTime = (formattedTime) => {
  const [hours, minutes] = formattedTime.split(':').map(Number) // Memisahkan jam dan menit, lalu mengubahnya menjadi angka
  return {
    hours: hours,
    minutes: minutes,
    seconds: 0
  }
}

export const formatTime = (time) => {
  const hours = String(time.hours).padStart(2, '0')
  const minutes = String(time.minutes).padStart(2, '0')
  return `${hours}:${minutes}`
}

export function formatTimeWithoutSeconds(timeString) {
  // Split the string by colon
  const [hours, minutes] = timeString.split(':')

  // Return the time in 'HH:MM' format
  return `${hours}:${minutes}`
}

export const todaySchedule = (currentDay, venue) => {
  switch (currentDay) {
    case 'monday':
      return venue?.monday
    case 'tuesday':
      return venue?.tuesday
    case 'wednesday':
      return venue?.wednesday
    case 'thursday':
      return venue?.thursday
    case 'friday':
      return venue?.friday
    case 'saturday':
      return venue?.saturday
    case 'sunday':
      return venue?.sunday
    default:
      return 'Closed'
  }
}

export const statusItems = [
  { value: null, label: 'All' },
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' }
]

export const statusTransactionItems = [
  { value: null, label: 'All' },
  { value: 'success', label: 'Success' },
  { value: 'failed', label: 'Failed' }
]

export const typeItems = [
  { value: null, label: 'All' },
  { value: 'education', label: 'Education' },
  { value: 'property', label: 'Property' }
]

export const typeDepositItems = [
  { value: null, label: 'All' },
  { value: 'topup', label: 'Topup' },
  { value: 'correction', label: 'Correction' }
]

// Array of month names in English
export const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

export const getMonthName = (monthNumber) => {
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error('Invalid month number. Must be between 1 and 12.')
  }
  return monthNames[monthNumber - 1]
}

export function formatDateToIndo(dateString) {
  return moment(dateString).locale('id').format('dddd, DD MMMM YYYY')
}
