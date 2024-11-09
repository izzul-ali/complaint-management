import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"

interface Props {
  label: string
}

export default function InputFile({ label }: Props) {
  return (
    <div>
      <span className="block mb-2 font-medium text-sm text-secondary400">
        {label}
      </span>

      <button className="outline-none bg-transparent border border-primary border-dashed border-spacing-px rounded-md w-full h-[160px] flex flex-col items-center justify-center">
        <CloudUploadOutlinedIcon className="w-8 h-8 text-primary300" />
        <span className="block text-xs text-primary300">
          Drag or Select File here
        </span>
      </button>
    </div>
  )
}
