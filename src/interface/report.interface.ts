import { IMutationEmployee } from "./global.interface"

export interface IReport {
  complaint_id: string
  report_id: string
  schedule_id: string
  notes: string
  file: IReportFile | null
  status_update: string
  technician_created: IMutationEmployee | null
  created_at: string
  technician_updated: IMutationEmployee | null
  updated_at: string | null
}

export interface IReportFile {
  file_id: string
  file_path: string
  file_public_url: string
  file_name: string
}
