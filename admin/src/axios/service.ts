import axios from 'axios'
import {
  defaultError,
  defaultRequestInterceptors,
  defaultResponseError,
  defaultResponseInterceptors
} from './config'

import { AxiosInstance, InternalAxiosRequestConfig, RequestConfig, AxiosResponse } from './types'
import { REQUEST_TIMEOUT } from '@/constants'

export const PATH_URL = import.meta.env.VITE_API_BASE_PATH

const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT, // 请求超时时间
  baseURL: PATH_URL, // 请求基础路径
  headers: {} // 请求头信息
})

axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController()
  const url = res.url || ''
  res.signal = controller.signal
  abortControllerMap.set(url, controller)
  return res
})

axiosInstance.interceptors.response.use((res: AxiosResponse) => {
  const url = res.config.url || ''
  abortControllerMap.delete(url)
  // 这里不能做任何处理，否则后面的 interceptors 拿不到完整的上下文了
  return res
})

axiosInstance.interceptors.request.use(defaultRequestInterceptors, defaultError)
axiosInstance.interceptors.response.use(defaultResponseInterceptors, defaultResponseError)

const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any)
      }

      axiosInstance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    for (const [_, controller] of abortControllerMap) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service
