import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  useTheme,
} from "@mui/material"
import BootstrapDialog from "../../atoms/CustomDialog"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react"
import {
  IComplaint,
  ICreateComplaint,
  IUpdateComplaint,
} from "../../../interface/complaint.interface"
import {
  useCreateComplaint,
  useUpdateComplaint,
} from "../../../services/complaint/mutation"
import { useGetUsers } from "../../../services/user/query"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useAuth } from "../../../hooks/useAuth"
import { ERole } from "../../../interface/global.interface"
import { toast } from "react-toastify"

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  }
}

interface Props {
  handleClose: (isRefresh?: boolean) => void
  complaintData?: IComplaint
  type: "New" | "On Going" | "Completed" | "Canceled"
}

export default function PopupFormComplaint({
  complaintData,
  handleClose,
  type,
}: Readonly<Props>) {
  const theme = useTheme()
  const auth = useAuth()

  // not customer service
  const isAdmin = auth?.user?.role_name !== ERole.CUSTOMER_SERVICE

  const [technicianName, setTechnicianName] = useState<string[]>([])

  useEffect(() => {
    if (complaintData) {
      setTechnicianName(
        complaintData?.technicians?.map((it) => it.user_id) ?? []
      )
    }
  }, [complaintData])

  const handleChange = (event: SelectChangeEvent<typeof technicianName>) => {
    const {
      target: { value },
    } = event
    setTechnicianName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const createComplaint = useCreateComplaint()
  const updateComplaint = useUpdateComplaint()

  const users = useGetUsers({ role: "7215d8f5-7ae1-4823-bf8c-d60e949bf343" })
  const technicians = useGetUsers({
    role: "3cd54ad3-9f5a-4143-9931-33d51ffc888d",
  })

  const onSubmit = (data: ICreateComplaint) => {
    if (complaintData) {
      const updateComplaintData: IUpdateComplaint = {
        complaint_id: complaintData.complaint_id,
        ...data,
      }

      updateComplaint.mutate(updateComplaintData, {
        onSuccess: () => {
          toast.success("Successfully updated complaint data")
          handleClose(true)
        },
      })

      return
    }
    createComplaint.mutate(data, {
      onSuccess: () => {
        toast.success("Successfully created a new complaint")
        handleClose(true)
      },
    })
  }

  const isEdit = complaintData!!

  return (
    <BootstrapDialog
      onClose={() => handleClose()}
      aria-labelledby="customized-dialog-title"
      open
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          const formJson = Object.fromEntries(
            (formData as any).entries()
          ) as ICreateComplaint

          const insertData = {
            ...formJson,
            technician_ids: isAdmin
              ? (formJson.technician_ids as unknown as string).split(",")
              : undefined,
          }

          onSubmit(insertData)
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {isEdit ? "Update Complaint" : "Create Complaint"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose()}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers className="space-y-5">
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          size="small"
          slotProps={{
            htmlInput: {
              maxLength: 150,
            },
          }}
          fullWidth
          defaultValue={complaintData?.title}
          variant="outlined"
        />

        <TextField
          id="description"
          name="description"
          size="small"
          type="text"
          label="Description"
          defaultValue={complaintData?.description}
          fullWidth
          required
          multiline
          slotProps={{
            htmlInput: {
              maxLength: 5000,
            },
          }}
          maxRows={4}
          minRows={4}
          variant="outlined"
        />

        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id="demo-select-small-label">Customer</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="client_id"
            name="client_id"
            label="Customer"
            defaultValue={complaintData?.client?.user_id}
            required
            disabled={users.isLoading}
          >
            {users.data?.data?.map((it) => (
              <MenuItem value={it.user_id}>{it.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {isAdmin && (
          <>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Technician</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="technician_ids"
                name="technician_ids"
                multiple
                size="small"
                fullWidth
                required
                disabled={technicians.isLoading}
                value={technicianName}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Technician" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          technicians.data?.data?.find(
                            (tec) => tec.user_id === value
                          )?.name ?? "-"
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {technicians.data?.data?.map((it) => (
                  <MenuItem
                    key={it.user_id}
                    value={it.user_id}
                    style={getStyles(it.user_id, technicianName, theme)}
                  >
                    {it.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="status"
                name="status"
                defaultValue={complaintData?.status ?? "New"}
                label="Status"
                required
                disabled={type === "On Going"}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="On Going">On Going</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        <FormControl sx={{ width: "100%" }} size="small">
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="category"
            name="category"
            defaultValue={complaintData?.client_category}
            label="Category"
            required
          >
            <MenuItem value="Broadband">Broadband</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
          </Select>
        </FormControl>

        {isAdmin && (
          <div className="flex gap-2">
            <DatePicker
              defaultValue={
                complaintData?.schedule?.start_date
                  ? dayjs(complaintData?.schedule?.start_date)
                  : undefined
              }
              className="flex-1"
              label="Start Date"
              name="start_date"
            />
            <DatePicker
              defaultValue={
                complaintData?.schedule?.end_date
                  ? dayjs(complaintData?.schedule?.end_date)
                  : undefined
              }
              className="flex-1"
              label="End Date"
              name="end_date"
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          className="w-full py-2"
          variant="outlined"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        <Button
          autoFocus
          className="w-full py-2"
          variant="contained"
          type="submit"
          disabled={createComplaint.isPending || updateComplaint.isPending}
        >
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}
