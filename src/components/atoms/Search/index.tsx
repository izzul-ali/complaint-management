import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

interface Props {
  placeholder?: string
}

export default function InputSearch({ placeholder }: Props) {
  return (
    <TextField
      placeholder={placeholder ?? "Search"}
      variant="outlined"
      fullWidth
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "8px",
          fontSize: "14px",
          height: "48px",
          border: "1px solid #F5F5F7",
          width: "100%",
        },
        "& .MuiFormHelperText-root": {
          margin: 0,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "#404040", fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  )
}
