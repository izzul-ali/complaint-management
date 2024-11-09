import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import { Avatar, Badge, IconButton } from "@mui/material"
import { useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation()

  function formatPathToTitle(): string {
    if (location.pathname === "/") return "Overview"

    if (location.pathname.startsWith("/task")) return "Task"

    const lastSegment = location?.pathname?.split("/")?.slice(0, 3)?.pop() || ""

    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <header className="flex items-center justify-between px-8 h-[70px] bg-white z-50 shadow-sm sticky top-0">
      <h2 className="text-lg font-semibold">{formatPathToTitle()}</h2>

      <div className="flex items-center gap-3">
        <IconButton sx={{ border: "1px solid #F5F5F7" }}>
          <Badge color="error" variant="dot" invisible={false}>
            <NotificationsNoneOutlinedIcon className="w-6 h-6" />
          </Badge>
        </IconButton>

        <IconButton>
          <Avatar
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
            className="w-9 h-9"
          />
        </IconButton>
      </div>
    </header>
  )
}
