import { useQuery } from "@tanstack/react-query"
import { IFindUserParams, IUser } from "../../interface/user.interface"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"

export const useGetUsers = (params?: IFindUserParams) => {
  return useQuery({
    queryKey: ["get-users", params],
    queryFn: async () => {
      const resp = await satellite.get<IGlobalResponse<IUser[]>>(
        API_URL + "/users",
        { params }
      )

      return resp.data
    },
  })
}
