import { useMutation } from "@tanstack/react-query"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"

export const useCreateReport = () => {
  return useMutation({
    mutationKey: ["create-report"],
    mutationFn: async (body: FormData) => {
      const resp = await satellite.post<IGlobalResponse<any>>(
        API_URL + "/reports",
        body,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      return resp.data
    },
  })
}

export const useUpdateReport = () => {
  return useMutation({
    mutationKey: ["update-report"],
    mutationFn: async (body: FormData) => {
      const resp = await satellite.put<IGlobalResponse<any>>(
        API_URL + "/reports",
        body,
        { headers: { "Content-Type": "multipart/form-data" } }
      )

      return resp.data
    },
  })
}
