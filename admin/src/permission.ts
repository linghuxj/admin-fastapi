import router from './router'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useAppStoreWithOut } from '@/store/modules/app'
import { RouteRecordRaw } from 'vue-router'
import { NO_REDIRECT_WHITE_LIST } from '@/constants'
import { useTitle } from '@vueuse/core'
import { useAuthStoreWithOut } from '@/store/modules/auth'
import { useStorage } from '@/hooks/web/useStorage'
import { getRoleMenusApi } from '@/api/login'

const permissionStore = usePermissionStoreWithOut()
const appStore = useAppStoreWithOut()
const authStore = useAuthStoreWithOut()

const { getStorage, setStorage } = useStorage()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (getStorage(appStore.getToken)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else if (to.path === '/reset/password') {
      next()
    } else {
      if (!authStore.getIsUser) {
        await authStore.setUserInfo()
      }
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }

      // 可根据实际情况进行修改
      const res = await getRoleMenusApi()
      const routers = res.data || []
      setStorage('roleRouters', routers)
      await permissionStore.generateRoutes(routers).catch(() => {})

      permissionStore.getAddRouters.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
      })
      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    }
  } else {
    if (NO_REDIRECT_WHITE_LIST.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done()
  loadDone()
})
