import { IUser } from "./user.interface"

export interface ILogin {
  email_phone: string
  password: string
}

export interface ILoginResponse extends IUser {
  role_name: string
  token: string
}
