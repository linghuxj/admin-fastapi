import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const List: {
  telephone: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}[] = [
  {
    telephone: 'admin',
    password: 'admin',
    role: 'admin',
    roleId: '1',
    permissions: ['*.*.*']
  },
  {
    telephone: 'test',
    password: 'test',
    role: 'test',
    roleId: '2',
    permissions: ['example:dialog:create', 'example:dialog:delete']
  }
]

export default [
  // 列表接口
  {
    url: '/mock/user/list',
    method: 'get',
    response: ({ query }) => {
      const { telephone, pageIndex, pageSize } = query

      const mockList = List.filter((item) => {
        return !(telephone && item.telephone.indexOf(telephone) < 0)
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

      return {
        code: SUCCESS_CODE,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 登录接口
  {
    url: '/mock/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.telephone === data.telephone && user.password === data.password) {
          hasUser = true
          return {
            code: SUCCESS_CODE,
            data: {
              access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMzMxMjM0MTIzNCIsImlzX3JlZnJlc2giOmZhbHNlLCJleHAiOjE3MDY0MDU2Mjh9.zV5cFoe5RaB3HHwhk0ufaSX-DJU4aaQbzn2aF1pVCMM',
              refresh_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMzMxMjM0MTIzNCIsImlzX3JlZnJlc2giOnRydWUsImV4cCI6MTcwNjQ5MjAyOH0.KFpPLwf6evHUprhg0qt0U6pSvpfo90k7vcSQuhp3ElQ',
              token_type: 'bearer',
              is_reset_password: true,
              is_wx_server_openid: false
            }
          }
        }
      }
      if (!hasUser) {
        return {
          code: 500,
          message: '账号或密码错误'
        }
      }
    }
  },
  // 退出接口
  {
    url: '/mock/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: null
      }
    }
  }
]
