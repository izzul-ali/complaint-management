import { LinearProgress, linearProgressClasses } from "@mui/material"

interface Props {
  color?: string
}

export default function BorderLinearProgress({ color }: Props) {
  return (
    <LinearProgress
      variant="determinate"
      value={100}
      sx={(theme) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[200],
          ...theme.applyStyles("dark", {
            backgroundColor: theme.palette.grey[800],
          }),
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: color ?? theme.palette.primary.main,
          ...theme.applyStyles("dark", {
            backgroundColor: color ?? theme.palette.primary.main,
          }),
        },
      })}
    />
  )
}
