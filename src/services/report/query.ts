import { useQuery } from "@tanstack/react-query"
import { IGlobalResponse } from "../../interface/global.interface"
import { API_URL } from "../../utils/config/environtment"
import satellite from "../../utils/config/axios"
import { IReport } from "../../interface/report.interface"

export const useGetDetailReport = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["get-report", id],
    queryFn: async () => {
      const resp = await satellite.get<IGlobalResponse<IReport>>(
        API_URL + "/reports/" + id
      )

      return resp.data
    },
    enabled,
  })
}
