import { FormEvent, useEffect, useState } from "react"
import InputFile from "../../atoms/Input/InputFile"
import { IReport, IReportFile } from "../../../interface/report.interface"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { toast } from "react-toastify"
import {
  useCreateReport,
  useUpdateReport,
} from "../../../services/report/mutation"
import { queryClient } from "../../../utils/config/react-query"

interface Props {
  complaint_id?: string
  schedule_id?: string
  report?: IReport
}

export default function ReportForm({
  report,
  complaint_id,
  schedule_id,
}: Readonly<Props>) {
  const [selectedFile, setSelectedFile] = useState<
    File | IReportFile | undefined
  >()

  const createReport = useCreateReport()
  const updateReport = useUpdateReport()

  useEffect(() => {
    if (report?.file) setSelectedFile(report.file)
  }, [report])

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append("complaint_id", complaint_id!)
    formData.append("schedule_id", schedule_id!)

    if (selectedFile instanceof File) {
      formData.append("file", selectedFile!)
    }

    if (report) {
      formData.append("report_id", report.report_id)
      formData.append("file_path", report.file?.file_path!)

      updateReport.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-complaint"],
          })
          queryClient.invalidateQueries({
            queryKey: ["get-report"],
          })
          toast.success("Successfully updated report data")
        },
      })

      return
    }

    createReport.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-complaint"],
        })
        queryClient.invalidateQueries({
          queryKey: ["get-report"],
        })
        toast.success("Successfully created a new report")
      },
    })
  }

  return (
    <form className="space-y-3 mt-5 block" onSubmit={handleSumbit}>
      <InputFile
        label="File"
        selectedFile={selectedFile}
        onSelectFile={setSelectedFile}
      />

      <FormControl sx={{ width: "100%" }} size="small">
        <InputLabel id="demo-select-small-label">Status</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="status"
          name="status"
          defaultValue={report?.status_update ?? undefined}
          label="Status"
          required
        >
          <MenuItem value="On Going">Progress</MenuItem>
          <MenuItem value="Completed">Done</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="note"
        name="note"
        size="small"
        type="text"
        label="Note"
        defaultValue={report?.notes}
        fullWidth
        required
        multiline
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          htmlInput: {
            maxLength: 5000,
          },
        }}
        maxRows={5}
        minRows={5}
        variant="outlined"
      />

      <Button
        disabled={
          createReport.isPending ||
          updateReport.isPending ||
          !selectedFile ||
          !complaint_id ||
          !schedule_id
        }
        type="submit"
        className="w-full py-2.5"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  )
}
