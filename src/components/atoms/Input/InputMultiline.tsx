import { TextField } from "@mui/material"

interface Props {
  label: string
}

export default function InputMultiline({ label }: Props) {
  return (
    <div>
      <span className="block mb-2 font-medium text-sm text-secondary400">
        {label}
      </span>

      <TextField multiline rows={4} sx={{ width: "100%" }} />
    </div>
  )
}
