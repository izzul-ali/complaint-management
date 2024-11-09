/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans Variable", "sans-serif"],
      },
      colors: {
        primary: "#546FFF", // Default 500
        primary100: "#DCE4FF",
        primary200: "#BAC8FF",
        primary300: "#98ABFF",
        primary400: "#9F84FD",
        primary600: "#3D53DB",
        primary700: "#2A3BB7",
        primary800: "#1A2793",
        primary900: "#10197A",
        success: "#9CD323", // Default 500
        success100: "#F5FCD2",
        success200: "#E8FAA6",
        success300: "#D3F178",
        success400: "#BCE455",
        success600: "#7FB519",
        success700: "#659711",
        success800: "#4C7A0B",
        success900: "#3B6506",
        error: "#FF4423", // Default 500
        error100: "#FFE7D3",
        error200: "#FFC8A6",
        error300: "#FFA37A",
        error400: "#FF7F59",
        error600: "#DB2719",
        error700: "#B71112",
        error800: "#930B16",
        error900: "#7A0619",
        warning: "#FFC73A", // Default 500
        warning100: "#FFF8D7",
        warning200: "#FFEFB0",
        warning300: "#FFE488",
        warning400: "#FFD96B",
        warning600: "#DBA32A",
        warning700: "#B7821D",
        warning800: "#936312",
        warning900: "#7A4D0B",
        information: "#54A6FF", // Default 500
        information100: "#DCF3FF",
        information200: "#BAE5FF",
        information300: "#98D3FF",
        information400: "#7EC2FF",
        information600: "#3D81DB",
        information700: "#2A60B7",
        information800: "#1A4393",
        information900: "#102E7A",
        secondary: "#141522", // Default 500
        secondary100: "#DFE1F3",
        secondary200: "#C2C6E8",
        secondary300: "#8E92BC",
        secondary400: "#54577A",
        secondary600: "#0E0F1D",
        secondary700: "#0A0A18",
        secondary800: "#060713",
        secondary900: "#040815",
      },
    },
  },
  plugins: [],
}
