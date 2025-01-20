import { IGlobalParams, IMutationEmployee } from "./global.interface"

export interface IFindComplaintParams extends IGlobalParams {
  start_date?: string
  end_date?: string
  category?: string
  technician_id?: string
  status?: "New" | "On Going" | "Completed" | "Canceled"
}

export interface IComplaint {
  complaint_id: string
  status: string
  description: string | null
  title: string
  client_category: string
  client: {
    user_id: string
    address: string | null
    name: string
    email: string
    phone_number: string | null
  }
  updated_at: Date | null
  updated_by: string | null
  created_at: Date
  created_by: string | null
  total_client_complaint?: number
  schedule: {
    complaint_id: string
    schedule_id: string
    assigned_by: string
    created_at: Date | null
    start_date: Date | null
    end_date: Date | null
    admin?: IMutationEmployee
  } | null
  technicians: IMutationEmployee[]
}

export interface ICreateComplaint {
  client_id: string
  title: string
  status?: string
  category: string
  start_date?: Date
  end_date?: Date
  technician_ids?: string[]
  description?: string
}

export interface IUpdateComplaint {
  complaint_id: string
  title: string
  status?: string
  category: string
  start_date?: Date
  end_date?: Date
  description?: string
}
