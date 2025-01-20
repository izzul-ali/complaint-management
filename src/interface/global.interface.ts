export interface IGlobalParams {
  search?: string
  page?: number
  limit?: number
}

export interface IGlobalResponse<T> {
  status: number
  message: string
  data: T
  pagination?: IPaginationResponse
}

export interface IPaginationResponse {
  current_page?: number
  total_pages?: number
  total_items?: number
  limit?: number
  next_page?: number
  previous_page?: number | null
}

// Detail employee
export interface IMutationEmployee {
  user_id: string
  name: string
  email: string
  phone_number: string | null
}

export enum ERole {
  CUSTOMER_SERVICE = "Customer Service",
  SUPER_ADMIN = "Super Admin",
  TECHNICIAN = "Technician",
  CLIENT = "Client",
  ADMIN = "Admin",
}

export interface IMenu {
  name: string
  url: string
  icon?: any
  roles: ERole[]
  submenu?: IMenu[]
}
