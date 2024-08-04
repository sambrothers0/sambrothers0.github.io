import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: true
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
    }
  },
  actions: {
    toggleDarkMode ({ commit }) {
      commit('toggleDarkMode')
    }
  },
  getters: {
    isDarkModeOn: state => state.darkMode
  }
})
