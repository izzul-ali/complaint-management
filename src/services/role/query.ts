import { useQuery } from "@tanstack/react-query"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"
import { IRole } from "../../interface/role.interface"

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["get-roles"],
    queryFn: async () => {
      const resp = await satellite.get<IGlobalResponse<IRole[]>>(
        API_URL + "/roles"
      )

      return resp.data
    },
  })
}
