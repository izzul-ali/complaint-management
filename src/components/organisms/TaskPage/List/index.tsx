import InputSearch from "../../../atoms/Search"
import TaskItem from "../../../molecules/TaskItem"

export default function TaskPage() {
  return (
    <section className="pb-5">
      <div className="px-8 py-5 bg-white flex items-center justify-between">
        <div className="w-[400px]">
          <InputSearch placeholder="Search  Task" />
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-secondary font-semibold text-2xl">New Task</h3>

        <div className="mt-3 flex gap-3 w-full overflow-auto px-1 py-5">
          {[...Array(3)].map((_, idx) => (
            <TaskItem
              key={idx}
              index={idx + 1}
              title={`Task ${idx + 1}`}
              date={`${idx + 1} November 2024`}
              description="Web Developer"
              status="Progress"
            />
          ))}
        </div>
      </div>

      <div className="px-8">
        <h3 className="text-secondary font-semibold text-2xl">History</h3>

        <div className="mt-3 flex gap-3 w-full overflow-auto px-1 py-5">
          {[...Array(10)].map((_, idx) => (
            <TaskItem
              key={idx}
              index={idx + 1}
              title={`Task ${idx + 1}`}
              date={`${idx + 1} November 2024`}
              description="Web Developer"
              status="Completed"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
