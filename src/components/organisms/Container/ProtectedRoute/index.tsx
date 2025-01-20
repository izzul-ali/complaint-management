import { ReactNode } from "react"
import { ERole } from "../../../../interface/global.interface"
import { useAuth } from "../../../../hooks/useAuth"
import { hasPermssion } from "../../../../utils/helper/permission"
import NotFoundPage from "../../NotFoundPage"

export default function ProtectedRoute({
  children,
  rolesAccess,
}: Readonly<{ children: ReactNode; rolesAccess: ERole[] }>) {
  const auth = useAuth()

  if (!hasPermssion(rolesAccess, (auth?.user?.role_name ?? "") as ERole)) {
    return <NotFoundPage />
  }

  return <>{children}</>
}
