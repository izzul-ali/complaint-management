import React, { useMemo, useState } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material"
import { toast } from "react-toastify"
import { useGetComplaints } from "../../../../services/complaint/query"
import { useUpdateComplaint } from "../../../../services/complaint/mutation"
import {
  IComplaint,
  IFindComplaintParams,
  IUpdateComplaint,
} from "../../../../interface/complaint.interface"
import { Link } from "react-router-dom"
import PopupFormComplaint from "../../../molecules/PopupFormComplaint"
import dayjs from "dayjs"
import { useAuth } from "../../../../hooks/useAuth"
import { ERole } from "../../../../interface/global.interface"

interface Props {
  type: "New" | "On Going" | "Completed" | "Canceled"
}

interface Column {
  id:
    | "no"
    | "title"
    | "category"
    | "status"
    | "start_date"
    | "end_date"
    | "complained_by"
    | "handled_by"
    | "action"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: "no", label: "No", minWidth: 50 },
  { id: "title", label: "Title", minWidth: 120 },
  { id: "complained_by", label: "Complained By", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 50 },
  { id: "start_date", label: "Start Date", minWidth: 100 },
  { id: "end_date", label: "End Date", minWidth: 170 },
  { id: "handled_by", label: "Repaired By", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 80 },
]

interface Data {
  no: number
  title: React.ReactNode
  complained_by: string
  category: string
  status: React.ReactNode
  start_date: string
  end_date: string
  handled_by: React.ReactNode
  action: React.ReactNode
}

/**
 *
 * @param no
 * @param title
 * @param category
 * @param status
 * @param start_date
 * @param end_date
 * @param complained_by
 * @param handled_by
 * @param action
 * @returns
 */
function createData(
  no: number,
  title: React.ReactNode,
  complained_by: string,
  category: string,
  status: React.ReactNode,
  start_date: string,
  end_date: string,
  handled_by: React.ReactNode,
  action?: React.ReactNode
): Data {
  return {
    no,
    complained_by,
    end_date,
    handled_by,
    start_date,
    status,
    title,
    category,
    action,
  }
}

export default function UserManagementPage({ type }: Readonly<Props>) {
  const auth = useAuth()

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [selectedComplaint, setSelectedComplaint] = useState<
    IComplaint | undefined
  >(undefined)
  const [complaintParams] = useState<IFindComplaintParams | undefined>({
    status: type,
    technician_id:
      auth?.user?.role_name === ERole.TECHNICIAN
        ? auth?.user?.user_id
        : undefined,
  })

  const complaints = useGetComplaints(complaintParams)
  const updateComplaint = useUpdateComplaint()

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
    if (isRefresh) complaints.refetch()

    setOpenPopup(false)
    setSelectedComplaint(undefined)
  }

  const onUpdateReportComplaintStatus = (data: IComplaint) => {
    const updateComplaintData: IUpdateComplaint = {
      complaint_id: data.complaint_id,
      category: data.client_category,
      title: data.title,
      description: data?.description ?? undefined,
      status: "Canceled",
    }

    updateComplaint.mutate(updateComplaintData, {
      onSuccess: () => {
        complaints.refetch()
        toast.success("Successfully cancel complaint data")
      },
    })
  }

  const rows = useMemo(
    () =>
      complaints.data?.data?.map((it, idx) =>
        createData(
          idx + 1,
          <Tooltip title={it.title}>
            <Link
              to={"/task/detail/" + it.complaint_id}
              className="hover:text-purple-900 max-w-[300px] overflow-hidden text-ellipsis block"
            >
              {it.title}
            </Link>
          </Tooltip>,
          it?.client?.name ?? "-",
          it.client_category,
          <Chip
            size="small"
            label={it.status}
            color={
              it.status === "New"
                ? "primary"
                : it.status === "On Going"
                ? "warning"
                : it.status === "Completed"
                ? "success"
                : "error"
            }
            className="text-white"
            variant="filled"
          />,
          it.schedule?.start_date
            ? dayjs(it.schedule.start_date).format("DD-MM-YYYY")
            : "-",
          it?.schedule?.end_date
            ? dayjs(it.schedule.end_date).format("DD-MM-YYYY")
            : "-",

          <div className="flex flex-start">
            <AvatarGroup spacing="medium">
              {it.technicians.map((tec) => (
                <Tooltip key={tec.user_id} title={tec.name}>
                  <Avatar
                    className="text-xs w-7 h-7 cursor-pointer"
                    alt={tec.name}
                    src="/static/images/avatar/1.jpg"
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          </div>,
          type === "Completed" || type === "Canceled" ? undefined : (
            <div className="flex items-center gap-2">
              {/* Admin */}
              {auth?.user?.role_id !== "00e12d98-42ef-41c6-b321-a7446192fe12" &&
                type === "New" && (
                  <Button
                    onClick={() => {
                      setSelectedComplaint(it)
                      setOpenPopup(true)
                    }}
                    variant="contained"
                    type="button"
                    color="primary"
                    className="py-1"
                  >
                    Approve
                  </Button>
                )}
              <Button
                variant="contained"
                color="error"
                disabled={updateComplaint.isPending}
                onClick={() => onUpdateReportComplaintStatus(it)}
              >
                {auth?.user?.role_name !== ERole.CUSTOMER_SERVICE
                  ? "Reject"
                  : "Cancel"}
              </Button>
              <IconButton
                onClick={() => {
                  setSelectedComplaint(it)
                  setOpenPopup(true)
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
            </div>
          )
        )
      ) ?? [],
    [complaints.data?.data, updateComplaint.isPending, auth?.user, type]
  )

  return (
    <section className="h-[90%] w-full relative pb-20">
      {(complaints.isLoading || complaints.isPending) && (
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
        {type === "New" && (
          <div className="flex justify-end mb-2 mt-5 px-5">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => setOpenPopup(true)}
              className="rounded-md p-3 py-2 w-fit"
            >
              + Add Complaint
            </Button>
          </div>
        )}

        <TableContainer sx={{ maxHeight: "87.5%", backgroundColor: "white" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns
                  .filter((it) =>
                    type === "Completed" || type === "Canceled"
                      ? it.id !== "action"
                      : true
                  )
                  .map((column) => (
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
        <PopupFormComplaint
          type={type}
          handleClose={handleClosePopup}
          complaintData={selectedComplaint}
        />
      )}
    </section>
  )
}
