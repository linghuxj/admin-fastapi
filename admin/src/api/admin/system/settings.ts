import request from '@/axios'

// 获取系统基础配置，每次进入系统时使用
export const getSystemBaseConfigApi = (): Promise<IResponse> => {
  return request.get({ url: '/admin/system/settings/base/config' })
}
