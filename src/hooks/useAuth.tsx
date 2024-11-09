import { createContext, useContext, useEffect, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { User } from "../interface/user"
import { useLocalStorage } from "./useLocalStorage"

type THookAuth = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<THookAuth | null>(null)

export const AuthProvider = () => {
  const navigate = useNavigate()
  const [user, setUser] = useLocalStorage("user", null)

  const login = async (data: User) => {
    setUser(data)
    navigate("/")
  }

  const logout = () => {
    setUser(null)
    navigate("/login", { replace: true })
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
