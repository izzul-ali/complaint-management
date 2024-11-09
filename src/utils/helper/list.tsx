import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"

export const navigationList = [
  {
    name: "Overview",
    url: "/",
    icon: <GridViewOutlinedIcon />,
  },
  {
    name: "Message",
    url: "/message",
    icon: <SmsOutlinedIcon />,
  },
  {
    name: "Task",
    url: "/task",
    icon: <MenuBookOutlinedIcon />,
  },
  {
    name: "Schedule",
    url: "/schedule",
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    name: "User Management",
    url: "/user-management",
    icon: <BadgeOutlinedIcon />,
  },
  // {
  //   name: "Setting",
  //   url: "/setting",
  //   icon: <SettingsOutlinedIcon />,
  // },
]
