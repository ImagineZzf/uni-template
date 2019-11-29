import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
Vue.use(Vuex)

const state = {}

const getters = {}

const mutations = {}

const actions = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  }
})

export default store
