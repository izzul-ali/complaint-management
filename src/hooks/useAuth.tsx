import { createContext, useContext, useEffect, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { IUser } from "../interface/user.interface"
import { useLocalStorage } from "./useLocalStorage"
import { ILogin } from "../interface/auth.interface"
import { apiLogin } from "../services/auth/api"

type THookAuth = {
  user: IUser | null
  login: (user: ILogin) => Promise<string | undefined>
  logout: () => void
}

const AuthContext = createContext<THookAuth | null>(null)

export const AuthProvider = () => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage("user", null)

  const login = async (data: ILogin): Promise<string | undefined> => {
    const resp = await apiLogin(data)

    // Failed to login
    if (typeof resp === "string") {
      return resp
    }

    window.localStorage.setItem("token", resp.token)

    setUser({ ...resp, token: undefined })

    navigate("/")
  }

  const logout = () => {
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
    // navigate("/login", { replace: true })
    window.location.replace("/login")
  }

  useEffect(() => {
    const isNavigateToLoginPage = window.location.pathname.includes("/login")

    if (!user && !isNavigateToLoginPage) {
      // user is not authenticated
      navigate("/login", { replace: true })
    }

    if (user && isNavigateToLoginPage) {
      navigate("/", { replace: true })
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
