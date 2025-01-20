import { useQuery } from "@tanstack/react-query"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"
import {
  IComplaint,
  IFindComplaintParams,
} from "../../interface/complaint.interface"

export const useGetComplaints = (params?: IFindComplaintParams) => {
  return useQuery({
    queryKey: ["get-complaints", params],
    queryFn: async () => {
      const resp = await satellite.get<IGlobalResponse<IComplaint[]>>(
        API_URL + "/complaints",
        { params }
      )

      return resp.data
    },
  })
}

export const useGetDetailComplaint = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["get-complaint", id],
    queryFn: async () => {
      const resp = await satellite.get<IGlobalResponse<IComplaint>>(
        API_URL + "/complaints/" + id
      )

      return resp.data
    },
    enabled,
  })
}
