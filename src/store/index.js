import { createStore } from 'vuex'
import { users } from './showcase/users'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      users
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
