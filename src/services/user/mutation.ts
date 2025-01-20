import { useMutation } from "@tanstack/react-query"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"
import { ICreateUser, IUpdateUser } from "../../interface/user.interface"

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (body: ICreateUser) => {
      const resp = await satellite.post<IGlobalResponse<any>>(
        API_URL + "/users",
        body
      )

      return resp.data
    },
  })
}

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (body: IUpdateUser) => {
      const resp = await satellite.put<IGlobalResponse<any>>(
        API_URL + "/users",
        body
      )

      return resp.data
    },
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: string) => {
      const resp = await satellite.delete<IGlobalResponse<any>>(
        API_URL + "/users/" + id
      )

      return resp.data
    },
  })
}
