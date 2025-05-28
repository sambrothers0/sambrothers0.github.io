import { createStore } from 'vuex'

export default createStore({
  state: {
    darkMode: true,
    isMobile: false
  },
  mutations: {
    toggleDarkMode (state) {
      state.darkMode = !state.darkMode
      console.log('Dark mode toggled:', state.darkMode)
    },
    mobileOn (state) {
      state.isMobile = true
      console.log('Mobile mode on')
    },
    mobileOff (state) {
      state.isMobile = false
      console.log('Mobile mode off')
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
