import axios from "axios"
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import useUserStore from "@/store/module/user.ts"

const request: AxiosInstance = axios.create({
    baseURL: "http://localhost:5173/api",
    timeout: 5000
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    config.headers["Authorization"] = userStore.token
    return config
}, (error): Promise<Error> => {
    return Promise.reject(error)
})

request.interceptors.response.use((response: AxiosResponse) => {
    return response.data
}, (error): Promise<Error> => {
    return Promise.reject(error)
})

export default request