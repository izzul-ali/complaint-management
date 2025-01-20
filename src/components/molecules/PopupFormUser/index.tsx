import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { useCreateUser, useUpdateUser } from "../../../services/user/mutation"
import BootstrapDialog from "../../atoms/CustomDialog"
import CloseIcon from "@mui/icons-material/Close"
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from "../../../interface/user.interface"
import { useState } from "react"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"
import { useGetRoles } from "../../../services/role/query"
import { toast } from "react-toastify"

interface Props {
  handleClose: (isRefresh?: boolean) => void
  userData?: IUser
}

export default function PopupFormUser({
  userData,
  handleClose,
}: Readonly<Props>) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const roles = useGetRoles()

  const onSubmit = (data: ICreateUser) => {
    if (userData) {
      const updateUserData: IUpdateUser = {
        id: userData.user_id,
        ...data,
      }

      updateUser.mutate(updateUserData, {
        onSuccess: () => {
          toast.success("Successfully updated user data")
          handleClose(true)
        },
      })

      return
    }
    createUser.mutate(data, {
      onSuccess: () => {
        toast.success("Successfully created a new complaint")
        handleClose(true)
      },
    })
  }

  const isEdit = userData!!
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
          ) as ICreateUser

          onSubmit(formJson)
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {isEdit ? "Update User" : "Create User"}
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
      <DialogContent dividers>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="name"
          size="small"
          fullWidth
          defaultValue={userData?.name}
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          size="small"
          fullWidth
          defaultValue={userData?.email}
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          size="small"
          margin="dense"
          id="phone_number"
          name="phone_number"
          label="Phone Number"
          type="phone_number"
          fullWidth
          defaultValue={userData?.phone_number}
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="address"
          size="small"
          name="address"
          label="Address"
          type="address"
          fullWidth
          defaultValue={userData?.address}
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="category"
          name="category"
          label="Category"
          size="small"
          type="category"
          fullWidth
          defaultValue={userData?.category}
          variant="outlined"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="password"
          size="small"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="description for action"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          defaultValue={userData?.password}
          variant="outlined"
        />

        <FormControl sx={{ width: "100%", mt: 1 }} size="small">
          <InputLabel id="demo-select-small-label">Role</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="role_id"
            name="role_id"
            label="Role"
            defaultValue={userData?.role_id}
            required
          >
            {roles.data?.data?.map((it) => (
              <MenuItem value={it.role_id}>{it.role_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          disabled={createUser.isPending || updateUser.isPending}
        >
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}
