import { AvatarGroup, Avatar } from "@mui/material"
import BorderLinearProgress from "../../atoms/LinearProgress"
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"
import { useNavigate } from "react-router-dom"

interface Props {
  title: string
  description: string
  date: string
  index: number
  type: "On Going" | "Completed"
  status: "Completed" | "Progress" | "Canceled"
}

export default function TaskItem(props: Readonly<Props>) {
  const navigate = useNavigate()

  const onNavigate = (id: string) => {
    if (props.type === "Completed") {
      navigate("/task/completed/" + id)
    } else {
      navigate("/task/on-going/" + id)
    }
  }

  return (
    <div
      onClick={() => onNavigate(props.index.toString())}
      className="w-[328px] h-[314px] rounded-[10px] cursor-pointer transition-all duration-300 bg-white hover:bg-slate-50 hover:-translate-y-1 p-5 shadow-md shrink-0"
    >
      <img
        src="/images/login.png"
        alt="task"
        className="w-full h-[110px] object-cover rounded-lg"
      />

      <h5 className="font-semibold text-secondary mt-3">{props.title}</h5>

      <p className="text-secondary400 text-xs font-medium mt-1">
        {props.description}
      </p>

      <div className="my-5 flex items-center justify-between">
        <span
          className={`font-medium ${
            props.status === "Completed"
              ? "text-success700"
              : props.status === "Progress"
              ? "text-warning700"
              : "text-error"
          }`}
        >
          {props.status}
        </span>

        <span>
          {props.status === "Completed" ? (
            <TaskAltIcon className="w-7 text-success700" />
          ) : props.status === "Progress" ? (
            <EventRepeatOutlinedIcon className="w-5 text-warning700" />
          ) : (
            <HighlightOffOutlinedIcon className="w-5 text-error" />
          )}
        </span>
      </div>

      <BorderLinearProgress
        color={
          props.status === "Completed"
            ? "#7FB519"
            : props.status === "Progress"
            ? "#DBA32A"
            : "#FF4423"
        }
      />

      <div className="mt-3 flex items-center justify-between">
        <span className="font-medium text-secondary400 text-sm">
          {props.date}
        </span>

        <AvatarGroup spacing="medium">
          <Avatar
            className="text-xs w-7 h-7"
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Avatar
            className="text-xs w-7 h-7"
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
          />
          <Avatar
            className="text-xs w-7 h-7"
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
          />
        </AvatarGroup>
      </div>
    </div>
  )
}
