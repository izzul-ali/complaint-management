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
import ProtectedRoute from "./components/organisms/Container/ProtectedRoute"
import {
  dashBoardPermission,
  messagePermission,
  schedulePermission,
  taskNewPermission,
  taskPermission,
  userManagementPermission,
} from "./utils/helper/list"

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
            element: (
              <ProtectedRoute rolesAccess={dashBoardPermission}>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/message",
            element: (
              <ProtectedRoute rolesAccess={messagePermission}>
                <ConversationPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "/task/new",
            element: (
              <ProtectedRoute rolesAccess={taskNewPermission}>
                <TaskPage key="new" type="New" />
              </ProtectedRoute>
            ),
          },
          {
            path: "/task/on-going",
            element: (
              <ProtectedRoute rolesAccess={taskPermission}>
                <TaskPage key="on-going" type="On Going" />,
              </ProtectedRoute>
            ),
          },
          {
            path: "/task/completed",
            element: (
              <ProtectedRoute rolesAccess={taskPermission}>
                <TaskPage key="completed" type="Completed" />,
              </ProtectedRoute>
            ),
          },
          {
            path: "/task/canceled",
            element: (
              <ProtectedRoute rolesAccess={taskPermission}>
                <TaskPage key="canceled" type="Canceled" />,
              </ProtectedRoute>
            ),
          },
          {
            path: "/task/detail/:id",
            element: (
              <ProtectedRoute rolesAccess={taskPermission}>
                <TaskDetailPage />,
              </ProtectedRoute>
            ),
          },
          {
            path: "/schedule",
            element: (
              <ProtectedRoute rolesAccess={schedulePermission}>
                <SchedulePage />,
              </ProtectedRoute>
            ),
          },
          {
            path: "/user-management",
            element: (
              <ProtectedRoute rolesAccess={userManagementPermission}>
                <UserManagementPage />,
              </ProtectedRoute>
            ),
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
