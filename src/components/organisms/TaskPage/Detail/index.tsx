import { Chip, Divider, Skeleton, Tooltip } from "@mui/material"
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined"
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined"
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined"
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined"
import { useGetDetailComplaint } from "../../../../services/complaint/query"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import { useGetDetailReport } from "../../../../services/report/query"
import ReportForm from "../../../molecules/ReportForm"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export default function TaskDetailPage() {
  let { id } = useParams()

  const { data: complaint, isLoading } = useGetDetailComplaint(id!, !!id)
  const { data: report, isLoading: isLoadingReport } = useGetDetailReport(
    id!,
    !!id
  )

  return (
    <section className="flex gap-5 h-full overflow-hidden p-5">
      <section className="p-5 flex-1 w-full bg-white rounded-md overflow-auto">
        {isLoading ? (
          <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "60%" }} />
        ) : (
          <h1 className="font-semibold text-2xl text-secondary">
            {complaint?.data?.title ?? "-"}
          </h1>
        )}

        <div className="my-5 flex items-center gap-3">
          <PersonPinCircleOutlinedIcon className="text-secondary400 w-5 h-5" />
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem", width: "200px" }}
            />
          ) : (
            <span className="text-sm font-medium text-secondary400 max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
              {complaint?.data?.client?.name}
            </span>
          )}
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          {isLoading ? (
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.8rem", width: "300px" }}
            />
          ) : (
            <span className="text-sm font-medium text-secondary400 max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
              {complaint?.data?.client?.address ?? "-"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Tooltip title="Tiket Complaint dibuat">
            <div className="flex items-center gap-3 cursor-pointer">
              <WatchLaterOutlinedIcon className="text-secondary400 w-5 h-5" />

              {isLoading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "0.8rem", width: "120px" }}
                />
              ) : (
                <span className="text-sm font-medium text-secondary400">
                  {dayjs(complaint?.data?.created_at ?? "").format(
                    "MMM DD,YYYY - HH.MM"
                  )}
                </span>
              )}
            </div>
          </Tooltip>

          <Divider orientation="vertical" variant="fullWidth" flexItem />

          {isLoading ? (
            <Skeleton variant="text" sx={{ height: "30px", width: "50px" }} />
          ) : (
            <Chip
              size="small"
              label={complaint?.data.status}
              color={
                complaint?.data.status === "New"
                  ? "primary"
                  : complaint?.data.status === "On Going"
                  ? "warning"
                  : complaint?.data.status === "Completed"
                  ? "success"
                  : "error"
              }
              className="text-white"
              variant="filled"
            />
          )}
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Tooltip title="Perkiraan waktu mulai service">
            <div className="flex items-center gap-3 cursor-pointer">
              <ManageHistoryOutlinedIcon className="text-warning700 w-5 h-5" />

              <span className="text-sm font-medium text-secondary400">
                {complaint?.data?.schedule?.start_date
                  ? dayjs(complaint.data.schedule.start_date).format(
                      "MMM DD,YYYY"
                    )
                  : "-"}
              </span>
            </div>
          </Tooltip>

          <Divider orientation="vertical" variant="fullWidth" flexItem />

          <Tooltip title="Perkiraan waktu service selesai">
            <div className="flex items-center gap-3 cursor-pointer">
              <VerifiedOutlinedIcon className="text-success w-5 h-5" />

              <span className="text-sm font-medium text-secondary400">
                {complaint?.data?.schedule?.end_date
                  ? dayjs(complaint.data.schedule.end_date).format(
                      "MMM DD,YYYY"
                    )
                  : "-"}
              </span>
            </div>
          </Tooltip>
        </div>

        <h2 className="mt-10 font-semibold text-xl text-secondary">
          Description
        </h2>

        {isLoading ? (
          <>
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "20px" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "1.5px" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "1.5px" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "1.5px" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "1.5px" }} />
          </>
        ) : (
          <p className="mt-5 text-sm text-secondary leading-6 hyphens-auto tracking-wide min-h-[200px] whitespace-pre-wrap">
            {complaint?.data?.description}
          </p>
        )}
      </section>
      <section className="p-5 w-[372px] h-full overflow-auto bg-white rounded-md">
        <h1 className="font-semibold text-xl text-secondary">
          Laporan Hasil Kerja Teknisi
        </h1>

        {/* Technician */}
        {isLoading ? (
          <>
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "12px" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.8rem", mt: "12px" }} />
          </>
        ) : (
          complaint?.data?.technicians?.map((it) => (
            <div className="flex items-center gap-2 mt-3">
              <EngineeringOutlinedIcon className="text-secondary400 w-4 h-4" />

              <span className="block text-sm font-medium text-secondary400">
                {it.name} - {it?.phone_number ?? it.email}
              </span>
            </div>
          ))
        )}

        {/* Detail Customer */}
        <h2 className="mt-8 font-semibold text-lg text-secondary">
          Detail Customer
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Nama Customer
            </span>

            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {complaint?.data?.client?.name}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Phone/Email
            </span>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {complaint?.data?.client?.phone_number ??
                  complaint?.data?.client?.email}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">Type</span>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {complaint?.data?.client_category}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Jumlah Complaint
            </span>
            {isLoading ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {complaint?.data?.total_client_complaint ?? 0}
              </span>
            )}
          </div>
        </div>

        {/* Report */}
        <h2 className="mt-8 mb-5 font-semibold text-lg text-secondary">
          Laporan
        </h2>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Submitted By
            </span>

            {isLoadingReport ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {report?.data?.technician_created?.name ?? "-"}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Submitted At
            </span>

            {isLoadingReport ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {report?.data?.created_at
                  ? dayjs(report.data.created_at).format("MMM DD,YYYY - HH:MM")
                  : "-"}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Updated By
            </span>

            {isLoadingReport ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {report?.data?.technician_updated?.name ?? "-"}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Updated At
            </span>

            {isLoadingReport ? (
              <Skeleton
                variant="text"
                sx={{ fontSize: "0.8rem", width: "100px" }}
              />
            ) : (
              <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
                {report?.data?.updated_at
                  ? dayjs
                      .utc(report.data.updated_at)
                      .tz("Asia/Jakarta")
                      .format("MMM DD,YYYY - HH:MM")
                  : "-"}
              </span>
            )}
          </div>
        </div>

        <ReportForm
          complaint_id={complaint?.data?.complaint_id}
          schedule_id={complaint?.data?.schedule?.schedule_id}
          report={report?.data}
        />
      </section>
    </section>
  )
}
