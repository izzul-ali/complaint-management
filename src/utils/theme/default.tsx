import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#546FFF",
    },
    secondary: {
      main: "#141522",
    },
    success: {
      main: "#9CD323",
    },
    warning: {
      main: "#FFC73A",
    },
    error: {
      main: "#FF4423",
    },
  },
  typography: {
    fontFamily: `"Plus Jakarta Sans Variable", "sans-serif"`,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textPrimary: "#141522",
        contained: {
          color: "white",
        },
        root: {
          borderRadius: "8px",
          fontSize: "14px",
          padding: "6px 16px",
          color: "#141522",
        },
      },
    },
  },
})
