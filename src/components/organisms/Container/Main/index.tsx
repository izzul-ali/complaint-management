import { Outlet } from "react-router-dom"
import Header from "../../../molecules/Header"
import Sidebar from "../../../molecules/Sidebar"
import { useAuth } from "../../../../hooks/useAuth"

export default function MainContainer() {
  const auth = useAuth()

  if (!auth?.user) {
    return <></>
  }

  return (
    <div className="flex bg-[#FAFAFA] w-full gap-2 h-screen">
      <Sidebar />

      <div className="h-full flex-1 w-full overflow-x-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
