import { AxiosResponse, InternalAxiosRequestConfig } from './types'
import { ElMessage } from 'element-plus'
import qs from 'qs'
import { SUCCESS_CODE, UNAUTHORIZED_CODE } from '@/constants'
import { useAppStore } from '@/store/modules/app'
import { useStorage } from '@/hooks/web/useStorage'
import request from '@/axios'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/store/modules/auth'

const { getStorage, setStorage } = useStorage()

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  // 处理登录信息相关
  const appStore = useAppStore()
  const token = getStorage(appStore.getToken)
  if (token !== '') {
    ;(config.headers as any)['Authorization'] = token // 让每个请求携带自定义token
  }
  // 处理post请求中的空字符串
  if (
    config.method === 'post' &&
    (config.headers as any)['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  }
  // 处理json中的空字符串
  if (
    (config.method === 'post' || config.method === 'put') &&
    (config.headers as any)['Content-Type'] === 'application/json'
  ) {
    for (const key in config.data) {
      if (config.data[key] === '') {
        config.data[key] = null
      }
    }
  }
  // 处理get请求中的参数内容
  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

const defaultResponseInterceptors = (response: AxiosResponse) => {
  // API约定数据格式
  const code = response.data.code || UNAUTHORIZED_CODE
  const message = response.data.message || '无返回内容'
  const refresh = response.headers['if-refresh']

  if (response?.config?.responseType === 'blob') {
    // 如果是文件流，直接过
    return response
  } else if (code === SUCCESS_CODE) {
    if (refresh === '1') {
      // 刷新token
      refreshToken().then((res) => {
        const appStore = useAppStore()
        setStorage(appStore.getToken, `${res.data.token_type} ${res.data.access_token}`)
        setStorage(appStore.getRefreshToken, res.data.refresh_token)
      })
    }
    return response.data
  } else if (code === UNAUTHORIZED_CODE) {
    // 未登录或者token过期，刷新token
    refreshToken().then((res) => {
      const appStore = useAppStore()
      setStorage(appStore.getToken, `${res.data.token_type} ${res.data.access_token}`)
      setStorage(appStore.getRefreshToken, res.data.refresh_token)
      ElMessage.error('操作失败，请重试')
    })
  } else {
    ElMessage.error(message)
  }
}

const defaultError = (error: AxiosError) => {
  console.log('request err： ', error) // for debug
  return Promise.reject(error)
}

const defaultResponseError = (error: AxiosError) => {
  console.log('response err： ', error) // for debug
  let { message } = error
  const authStore = useAuthStore()
  const status = error.response?.status
  switch (status) {
    case 400:
      message = '请求错误'
      break
    case 401:
      authStore.logout()
      message = '认证已过期，请重新登录'
      break
    case 403:
      authStore.logout()
      message = '没有权限，请联系管理员'
      break
    case 404:
      message = '请求资源不存在'
      break
    case 500:
      message = '服务端错误，请联系管理员'
      break
    case 501:
      message = '服务未实现'
      break
    case 502:
      message = '网关错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网关超时'
      break
    case 505:
      message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  ElMessage.error(message)
  return Promise.reject(error)
}

// 刷新Token
const refreshToken = (): Promise<IResponse> => {
  const appStore = useAppStore()
  const data = getStorage(appStore.getRefreshToken)
  return request.post({ url: '/auth/token/refresh', data })
}

export {
  defaultResponseInterceptors,
  defaultRequestInterceptors,
  defaultError,
  defaultResponseError
}
