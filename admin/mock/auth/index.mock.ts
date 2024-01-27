import { info } from './user'
import { menus } from './menu'

const timeout = 1000
export default [
  {
    url: '/admin/auth/user/admin/current/info',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 0,
        message: '',
        data: info
      }
    }
  },
  {
    url: '/admin/menu/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 0,
        data: menus
      }
    }
  }
]
