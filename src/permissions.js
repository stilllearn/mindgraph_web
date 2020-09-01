import router from './router'
import store from './store'
import { getToken } from './utils/auth'
// const whiteList = ['/login', '/auth-redirect', '/registerout', '/registerout/RegisterAnnounceForms', '/registerout/RegisterApply', '/registerout/RegisterInfo'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // 每次切换url都会更新notice
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // await store.dispatch('user/getInfo')
      // const { permissions } = await store.dispatch('user/getInfo')
      // generate accessible routes map based on roles
      next()
    } else {
      // const name= store.getters.getName()
      const permissions = ['all']
      const accessRoutes = await store.dispatch('permission/generateRoutes', permissions)
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)
      console.log('router', router)
      next({ ...to, replace: true })
    }
  } else {
    /* has no token */
    console.log('no_token', to.path)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // await store.dispatch('user/getInfo')
      next()
    } else {
      next('/login')
    }

    // await store.dispatch('user/getInfo')
  }
})
