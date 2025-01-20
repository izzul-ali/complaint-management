import axios, { isAxiosError } from "axios"
import { ILogin, ILoginResponse } from "../../interface/auth.interface"
import { API_URL } from "../../utils/config/environtment"
import { IGlobalResponse } from "../../interface/global.interface"

export const apiLogin = async (
  data: ILogin
): Promise<ILoginResponse | string> => {
  try {
    const resp = await axios.post<IGlobalResponse<ILoginResponse>>(
      API_URL + "/auth/login",
      data
    )

    return resp.data.data
  } catch (error) {
    if (isAxiosError(error)) {
      return error?.response?.data?.message ?? "Failed to login"
    }

    return "Failed to login"
  }
}
