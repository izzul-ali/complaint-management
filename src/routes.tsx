import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./components/organisms/LoginPage"
import MainContainer from "./components/organisms/Container/Main"
import { AuthProvider } from "./hooks/useAuth"
import DashboardPage from "./components/organisms/DashboardPage"
import ConversationPage from "./components/organisms/ConversationPage"
import TaskPage from "./components/organisms/TaskPage/List"
import SchedulePage from "./components/organisms/SchedulePage"
import UserManagementPage from "./components/organisms/UserManagementPage"
import TaskDetailPage from "./components/organisms/TaskPage/Detail"

export const routes = createBrowserRouter([
  {
    element: <AuthProvider />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <MainContainer />,
        // errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/message",
            element: <ConversationPage />,
          },
          {
            path: "/task",
            element: <TaskPage />,
          },
          {
            path: "/task/:id",
            element: <TaskDetailPage />,
          },
          {
            path: "/schedule",
            element: <SchedulePage />,
          },
          {
            path: "/user-management",
            element: <UserManagementPage />,
          },
          // {
          //   path: "/setting",
          //   element: <SettingPage />,
          // },
        ],
      },
    ],
  },
])
