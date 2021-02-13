import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  actions: {
    asyncAdd({ commit }) {
      setTimeout(() => {
        commit("add")
      }, 2000)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  modules: {
  }
})
