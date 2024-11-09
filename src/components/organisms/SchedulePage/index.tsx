import { useMemo } from "react"
import React, { ReactElement } from "react"
import dayjs from "dayjs"
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = dayjsLocalizer(dayjs)

const ColoredDateCellWrapper = ({ children }: { children: ReactElement }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "#98ABFF",
    },
  })

const events = [
  {
    id: 1,
    title: "Perbaikan Wifi Rumah Pak Anton",
    start: new Date(2024, 10, 6),
    end: new Date(2024, 10, 6),
  },
  {
    id: 1.1,
    title: "Maintenance Wifi SMK Warga",
    start: new Date(2024, 10, 6),
    end: new Date(2024, 10, 6),
  },
  {
    id: 2,
    title: "Perbaikan Wifi PT. Konimex",
    start: new Date(2024, 10, 8),
    end: new Date(2024, 10, 10),
  },
  {
    id: 3,
    title: "Instalasi Wifi UDB",
    start: new Date(2024, 10, 20),
    end: new Date(2024, 10, 22),
  },
]

export default function SchedulePage() {
  const { components, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      views: Object.keys(Views).map((k) => (Views as any)[k]),
    }),
    []
  )

  return (
    <section className="p-5 h-[90%] w-full">
      <Calendar
        components={components as any}
        defaultDate={new Date()}
        views={views}
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      />
    </section>
  )
}
