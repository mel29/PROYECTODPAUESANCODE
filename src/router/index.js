import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const $store = useStore()
    const $q = useQuasar()
    const value = $q.localStorage.getItem('dataUser')

    if (to.matched.some(route => route.meta.requiresAuth)) {
      if(! value) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  })

  return Router
})
