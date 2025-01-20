import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Page Not Found</h2>

      <Button onClick={() => navigate(-1)} variant="contained">
        Back
      </Button>
    </div>
  )
}
