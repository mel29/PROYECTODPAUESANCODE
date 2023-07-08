export const users = {
  state: () => ({
    isSession: false,
    dataUser: null
  }),

  actions: {
    storeHandleLogin(state, payload) {
      state.commit('login', payload);
    },
    storeHandleLogout(state) {
      state.commit('logout');
    }
  },

  mutations: {
    login(state, payload) {
      state.isSession = true;
      state.dataUser = payload
    },
    logout(state) {
      state.isSession = false;
    }
  },

  getters: {
    getUserData: (state) => state.dataUser
  }
}
