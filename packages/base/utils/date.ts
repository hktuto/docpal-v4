import dayjs from 'dayjs'
export function formatDate(date: string | number | Date, format: string) {
  if (!date) return '-'
  if (!format) format = userDisplayTimeSetting()

  return dayjs(date).format(format)
}
