import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: true,
    isMobile: false
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
    },
    mobileOn (state) {
      state.isMobile = true
    },
    mobileOff (state) {
      state.isMobile = false
    }
  },
  actions: {
    toggleDarkMode ({ commit }) {
      commit('toggleDarkMode')
    },
    mobileOn ({ commit }) {
      commit('mobileOn')
    },
    mobileOff ({ commit }) {
      commit('mobileOff')
    }
  },
  getters: {
    isDarkModeOn: state => state.darkMode,
    isMobileOn: state => state.isMobile
  }
})
