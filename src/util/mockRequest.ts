import axios from "axios"
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

const mockRequest: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5173/mock",
    timeout: 5000
})

mockRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config
}, (error): Promise<Error> => {
    return Promise.reject(error)
})

mockRequest.interceptors.response.use((response: AxiosResponse) => {
    return response.data
}, (error): Promise<Error> => {
    return Promise.reject(error)
})

export default mockRequest