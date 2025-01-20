import { useMutation } from "@tanstack/react-query"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"
import {
  ICreateComplaint,
  IUpdateComplaint,
} from "../../interface/complaint.interface"

export const useCreateComplaint = () => {
  return useMutation({
    mutationKey: ["create-complaint"],
    mutationFn: async (body: ICreateComplaint) => {
      const resp = await satellite.post<IGlobalResponse<any>>(
        API_URL + "/complaints",
        body
      )

      return resp.data
    },
  })
}

export const useUpdateComplaint = () => {
  return useMutation({
    mutationKey: ["update-complaint"],
    mutationFn: async (body: IUpdateComplaint) => {
      const resp = await satellite.put<IGlobalResponse<any>>(
        API_URL + "/complaints",
        body
      )

      return resp.data
    },
  })
}

export const useDeleteComplaint = () => {
  return useMutation({
    mutationKey: ["delete-complaint"],
    mutationFn: async (id: string) => {
      const resp = await satellite.delete<IGlobalResponse<any>>(
        API_URL + "/complaints/" + id
      )

      return resp.data
    },
  })
}
