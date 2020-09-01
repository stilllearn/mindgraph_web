import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import header from './Layout/header'
// import UserCreate from './users/UserCreate'
// import UserLogin from './users/UserLogin'
// import HelloWorld from './components/HelloWorld'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('./users/UserLogin'),
    redirect: '/'
  },
  {
    path: '/',
    redirect: '/user/home'
  }
]
export const asyncRoutes = [
  {
    path: '/user',
    component: header,
    name: '首页',
    meta: {
      roles: []
    },
    children: [
      {
        path: '/home',
        component: () => import('@/components/HelloWorld'),
        name: '首页',
        meta: {
          roles: []
        }
      }
    ]
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
