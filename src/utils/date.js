import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const weekDays = i18n.t('sys.weekDays')

export function getWeekDays(firstDayOfWeek) {
  return weekDays.slice(firstDayOfWeek, 7).concat(weekDays.slice(0, firstDayOfWeek))
}

export function getWeekDates(date, firstDayOfWeek) {
  const currentDate = new Date(date)
  const currentDay = currentDate.getDay()
  const weekDates = []
  for (let i = 0; i < 7; i++) {
    const dayOffset = (i + firstDayOfWeek) % 7
    const weekDate = new Date(currentDate)
    weekDate.setDate(currentDate.getDate() - currentDay + dayOffset)
    weekDates.push(weekDate)
  }
  return weekDates
}

export function getMonthDates(year, month, firstDayOfWeek) {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const monthDates = []
  let i = firstDayOfMonth.getDate()
  while (i <= lastDayOfMonth.getDate() % 7) {
    const weekDates = getCurrentWeekDates(new Date(year, month, i), firstDayOfWeek)
    monthDates.push(weekDates)
    i++
  }
  return monthDates
}
