import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

const satellite = axios.create()

satellite.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = window.localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = "Bearer " + token
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

satellite.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error: AxiosError) {
    return Promise.reject(error?.response?.data || error)
  }
)

export default satellite
