import { createBrowserRouter } from "react-router-dom"
import LoginPage from "./components/organisms/LoginPage"
import MainContainer from "./components/organisms/Container/Main"
import { AuthProvider } from "./hooks/useAuth"

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
        path: "/",
        element: <MainContainer />,
        // errorElement: <ErrorPage />,
        children: [],
      },
    ],
  },
])
