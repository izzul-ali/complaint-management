import { IGlobalParams } from "./global.interface"

export interface IFindUserParams extends IGlobalParams {
  role?: string
}

export interface IUser {
  user_id: string
  email: string
  phone_number: string | null
  address: string | null
  category: string | null
  name: string
  role_id: string
  role_name: string
  password: string
  created_at: string
  updated_at: string | null
}

export interface ICreateUser {
  email: string
  phone_number?: string
  name: string
  address?: string
  category?: string
  password: string
  role_id: string
}

export interface IUpdateUser extends ICreateUser {
  id: string
}
