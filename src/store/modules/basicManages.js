import {
  getUserList,
  addUser,
  editUser,
  resetPassword,
  getAuthList,
  addAuth,
  deleteAuth,
  changeAuthStatus,
  getRouterList,
  addRouter,
  editRouter
} from '@/api/basicManages'

const getDefaultState = () => {
  return {}
}
const state = getDefaultState()
const mutations = {}
const actions = {

  getUserList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getUserList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  addUser({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addUser(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  editUser({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      editUser(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  resetPassword({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      resetPassword(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getAuthList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getAuthList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  addAuth({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addAuth(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  changeAuthStatus({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      changeAuthStatus(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteAuth({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      deleteAuth(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getRouterList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getRouterList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  addRouter({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addRouter(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  editRouter({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      editRouter(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
