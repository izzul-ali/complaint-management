import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined"
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined"
import { ERole, IMenu } from "../../interface/global.interface"

export const dashBoardPermission: ERole[] = [
  ERole.ADMIN,
  ERole.SUPER_ADMIN,
  ERole.TECHNICIAN,
  ERole.CUSTOMER_SERVICE,
  ERole.CLIENT,
]
export const messagePermission: ERole[] = [
  ERole.ADMIN,
  ERole.SUPER_ADMIN,
  ERole.CLIENT,
  ERole.CUSTOMER_SERVICE,
]
export const taskPermission: ERole[] = [
  ERole.ADMIN,
  ERole.SUPER_ADMIN,
  ERole.CUSTOMER_SERVICE,
  ERole.TECHNICIAN,
]
export const taskNewPermission: ERole[] = [
  ERole.ADMIN,
  ERole.SUPER_ADMIN,
  ERole.CUSTOMER_SERVICE,
]
export const schedulePermission: ERole[] = [
  ERole.ADMIN,
  ERole.SUPER_ADMIN,
  ERole.TECHNICIAN,
  ERole.CUSTOMER_SERVICE,
  ERole.CLIENT,
]
export const userManagementPermission: ERole[] = [
  ERole.ADMIN,
  ERole.SUPER_ADMIN,
]

export const navigationList: IMenu[] = [
  {
    name: "Overview",
    url: "/",
    icon: <GridViewOutlinedIcon />,
    roles: dashBoardPermission,
  },
  {
    name: "Message",
    url: "/message",
    icon: <SmsOutlinedIcon />,
    roles: messagePermission,
  },
  {
    name: "Task",
    url: "/task",
    icon: <MenuBookOutlinedIcon />,
    roles: taskPermission,
    submenu: [
      {
        name: "New",
        url: "/task/new",
        roles: taskNewPermission,
      },
      {
        name: "On Going",
        url: "/task/on-going",
        roles: taskPermission,
      },
      {
        name: "Completed",
        url: "/task/completed",
        roles: taskPermission,
      },
      {
        name: "Canceled",
        url: "/task/canceled",
        roles: taskPermission,
      },
    ],
  },
  {
    name: "Schedule",
    url: "/schedule",
    icon: <CalendarMonthOutlinedIcon />,
    roles: schedulePermission,
  },
  {
    name: "User Management",
    url: "/user-management",
    icon: <BadgeOutlinedIcon />,
    roles: userManagementPermission,
  },
  // {
  //   name: "Setting",
  //   url: "/setting",
  //   icon: <SettingsOutlinedIcon />,
  // },
]
