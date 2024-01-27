import request from '@/axios'
import type { UserLoginType, UserType } from './types'

interface RoleParams {
  roleName: string
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/mock/user/loginOut' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/mock/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/mock/role/list2', params })
}

export const loginApi = (data: UserLoginType): Promise<IResponse> => {
  return request.post({ url: '/mock/user/login', data })
}

export const getRoleMenusApi = (): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/admin/menu/list' })
}

export const postSMSCodeApi = (params: any): Promise<IResponse> => {
  return request.post({ url: '/mock/system/sms/send', params })
}
