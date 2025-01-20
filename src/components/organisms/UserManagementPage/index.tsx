import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import { Button, CircularProgress, IconButton } from "@mui/material"
import { useGetUsers } from "../../../services/user/query"
import { useMemo } from "react"
import { useDeleteUser } from "../../../services/user/mutation"
import { toast } from "react-toastify"
import PopupFormUser from "../../molecules/PopupFormUser"
import { IUser } from "../../../interface/user.interface"

interface Column {
  id:
    | "no"
    | "name"
    | "email"
    | "phone_number"
    | "role"
    | "address"
    | "category"
    | "action"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 50 },
  { id: "phone_number", label: "Phone Number", minWidth: 50 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "address", label: "Alamat", minWidth: 170 },
  { id: "category", label: "Kategori", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 80 },
]

interface Data {
  no: number
  name: string
  email: string
  phone_number: string
  role: string
  address: string
  category: string
  action: React.ReactNode
}

/**
 *
 * @param no
 * @param name
 * @param email
 * @param phone_number
 * @param role
 * @param address
 * @param category
 * @param action
 * @returns
 */
function createData(
  no: number,
  name: string,
  email: string,
  phone_number: string,
  role: string,
  address: string,
  category: string,
  action: React.ReactNode
): Data {
  return { no, name, email, phone_number, role, address, category, action }
}

export default function UserManagementPage() {
  const [page, setPage] = React.useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10)
  const [openPopup, setOpenPopup] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(
    undefined
  )

  const users = useGetUsers()
  const deleteUser = useDeleteUser()

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClosePopup = (isRefresh?: boolean) => {
    if (isRefresh) users.refetch()

    setOpenPopup(false)
    setSelectedUser(undefined)
  }

  const onDeleteUser = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        toast.success("Success delete user")
        users.refetch()
      },
    })
  }

  const rows = useMemo(
    () =>
      users.data?.data?.map((it, idx) =>
        createData(
          idx + 1,
          it.name,
          it.email,
          it.phone_number ?? "-",
          it.role_name,
          it?.address ?? "-",
          it?.category ?? "-",
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => {
                setSelectedUser(it)
                setOpenPopup(true)
              }}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              disabled={deleteUser.isPending}
              onClick={() => onDeleteUser(it.user_id)}
            >
              <DeleteOutlineOutlinedIcon className="text-red-500" />
            </IconButton>
          </div>
        )
      ) ?? [],
    [users.data?.data, deleteUser.isPending]
  )

  return (
    <section className="h-[90%] w-full relative pb-20">
      {(users.isLoading || users.isPending) && (
        <div className="absolute inset-1 bg-gray-900/30 z-50 flex items-center justify-center">
          <CircularProgress size={70} />
        </div>
      )}

      <Paper
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          padding: "15px",
          backgroundColor: "transparent",
        }}
      >
        <div className="flex justify-end mb-2 mt-5 px-5">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={() => setOpenPopup(true)}
            className="rounded-md p-3 py-2 w-fit"
          >
            + Add User
          </Button>
        </div>

        <TableContainer
          sx={{
            maxHeight: "87.5%",
            backgroundColor: "white",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="whitespace-nowrap"
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        className="absolute bottom-0 px-5 py-3 w-full border-t bg-white"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => handleChangePage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openPopup && (
        <PopupFormUser handleClose={handleClosePopup} userData={selectedUser} />
      )}
    </section>
  )
}
