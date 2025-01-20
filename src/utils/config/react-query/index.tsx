import { isAxiosError } from "axios"
import { IGlobalResponse } from "../../../interface/global.interface"
import { toast } from "react-toastify"
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

async function onError(err: any) {
  console.log("t-log", err)

  if (isAxiosError(err)) {
    const errData = err.response?.data as IGlobalResponse<any>

    if (errData?.status === 401 || err?.response?.status === 401) {
      toast.error(errData.message)

      window.localStorage.removeItem("user")
      window.location.replace("/login")

      return
    }

    toast.error(err.message ?? "Something wrong happend!")

    return
  }

  if (err?.status === 401) {
    toast.error(err?.message)

    window.localStorage.removeItem("user")
    window.location.replace("/login")

    return
  }

  toast.error(err?.message ?? "Something wrong happend!")
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
  // handle errors globally by displaying a toast containing the error message
  queryCache: new QueryCache({
    onError: onError,
  }),
  mutationCache: new MutationCache({
    onError: onError,
  }),
})
