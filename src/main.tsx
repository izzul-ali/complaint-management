import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { routes } from "./routes.tsx"
import { ThemeProvider } from "@mui/material"
import { theme } from "./utils/theme/default.tsx"
import "./assets/styles/global.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  </StrictMode>
)
