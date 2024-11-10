import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

interface Column {
  id: "no" | "name" | "email" | "role" | "address" | "category" | "status"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "name", label: "Nama", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 50 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "address", label: "Alamat", minWidth: 170 },
  { id: "category", label: "Kategori", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 80 },
]

interface Data {
  no: number
  name: string
  email: string
  role: string
  address: string
  category: string
  status: "Active" | "Inactive"
}

function createData(
  no: number,
  name: string,
  email: string,
  role: string,
  address: string,
  category: string,
  status: "Active" | "Inactive"
): Data {
  return { no, name, email, role, address, category, status }
}

const rows = [
  createData(
    1,
    "Izzul Maali",
    "izzul@gmail.com",
    "Super Admin",
    "New York City",
    "-",
    "Active"
  ),
  createData(
    2,
    "Ravinoldy Firza P",
    "ravii@gmail.com",
    "Customer Service",
    "California, Gawok, Indonesia",
    "-",
    "Active"
  ),
  createData(
    3,
    "Hisyam Arsyad Z",
    "hisyamnihdek@gmail.com",
    "Admin",
    "Asrama MTS 2 Surakarta",
    "-",
    "Active"
  ),
  createData(
    4,
    "Kamala Harris",
    "kamala@gmail.com",
    "Technician",
    "Washington, DC, USA",
    "-",
    "Active"
  ),
  createData(
    5,
    "Donald J Trump",
    "trump@gmail.com",
    "Customer",
    "Miami, Florida",
    "broadband",
    "Active"
  ),
]

export default function UserManagementPage() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <section className="h-[90%] w-full relative">
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          padding: "15px",
          backgroundColor: "transparent",
        }}
      >
        <TableContainer sx={{ maxHeight: "87.5%", backgroundColor: "white" }}>
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
                          <TableCell key={column.id} align={column.align}>
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  )
}
