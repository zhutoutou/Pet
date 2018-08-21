import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    codelist: []
  },
  mutations: {
    valuechanged: (state, arr) => {
      state.codelist = arr
    }
  }
})

export default {
  store
}
