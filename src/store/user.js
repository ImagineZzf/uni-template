import { SET_AUTH_STATUS, SET_USER_INFO } from './contants'

export default {
  namespaced: true,
  state: {
    authStatus: 0, // 是否授权, 1---授权，其他值---未授权
    userInfo: {} // 用户信息
  },
  getters: {},
  mutations: {
    // 设置授权状态
    [SET_AUTH_STATUS](state, authStatus) {
      state.authStatus = authStatus
    },
    // 设置用户信息
    [SET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {}
}
