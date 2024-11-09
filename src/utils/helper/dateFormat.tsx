import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import weekday from "dayjs/plugin/weekday"

dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(weekday)

export function dateFormat(date: string) {
  const today = dayjs()
  const inputDate = dayjs(date)

  if (inputDate.isSame(today, "day")) {
    return inputDate.fromNow()
  }

  if (inputDate.isSame(today.subtract(1, "day"), "day")) {
    return "Yesterday"
  }

  if (inputDate.isSameOrAfter(today.subtract(7, "day"), "day")) {
    return inputDate.format("dddd")
  }

  return inputDate.format("DD/MM/YYYY")
}
