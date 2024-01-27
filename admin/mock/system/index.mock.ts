import { config } from './base'

const timeout = 1000
export default [
  {
    url: '/admin/system/settings/base/config',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: 200,
        data: config
      }
    }
  }
]
