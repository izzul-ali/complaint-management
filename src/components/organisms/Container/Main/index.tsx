import { Outlet, useNavigate } from "react-router-dom"
import Header from "../../../molecules/Header"
import Sidebar from "../../../molecules/Sidebar"
import { useAuth } from "../../../../hooks/useAuth"
import { QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { queryClient } from "../../../../utils/config/react-query"

export default function MainContainer() {
  const navigate = useNavigate()
  const auth = useAuth()

  if (!auth?.user) {
    navigate("/login", { replace: true })
    return
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex bg-[#FAFAFA] w-full gap-2 h-screen">
          <Sidebar />

          <div className="h-full flex-1 w-full overflow-x-hidden">
            <Header />
            <Outlet />
          </div>
        </div>
      </LocalizationProvider>
      <ToastContainer />
    </QueryClientProvider>
  )
}
