import { ChangeEvent, useRef } from "react"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"
import { IconButton } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { IReportFile } from "../../../interface/report.interface"

interface Props {
  label: string
  selectedFile?: any
  onSelectFile: (file?: File | IReportFile) => void
}

export default function InputFile({
  label,
  selectedFile,
  onSelectFile,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOpenFilePicker = () => {
    // Programmatically click the hidden file input
    fileInputRef?.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || event.target.files.length < 1) return

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]

      if (file) {
        if (file.size > 1024 * 1024 * 3) {
          // setErrorUploadFile('File size is too large')
          // clearErrorUploadFile()
          return
        }

        onSelectFile(file)
      }
    }
  }

  const onDeleteFile = () => {
    onSelectFile(undefined)
  }

  return (
    <div>
      <span className="block mb-2 font-medium text-sm text-secondary400">
        {label}
      </span>

      {selectedFile ? (
        <div className="bg-slate-200 rounded-md p-1 pl-2 flex items-center gap-2 text-sm">
          <span className="flex-1 block">
            {selectedFile?.name ?? selectedFile?.file_name}
          </span>

          <IconButton onClick={() => onDeleteFile()}>
            <CloseOutlinedIcon className="w-4 h-4" />
          </IconButton>
        </div>
      ) : (
        <button
          onClick={() => handleOpenFilePicker()}
          type="button"
          className="outline-none bg-transparent border border-primary border-dashed border-spacing-px rounded-md w-full h-[160px] flex flex-col items-center justify-center"
        >
          <CloudUploadOutlinedIcon className="w-8 h-8 text-primary300" />
          <span className="block text-xs text-primary300">
            Click here to Select File
          </span>
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf, image/*"
        onClick={(event) => {
          event.currentTarget.value = ""
        }}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  )
}
