import {
  getAdList,
  addAdment,
  editAdment,
  deleteAdment
} from '@/api/adManages'

const getDefaultState = () => {
  return {}
}
const state = getDefaultState()
const mutations = {}
const actions = {

  getAdList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getAdList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  addAdment({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addAdment(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  editAdment({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      editAdment(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteAdment({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      deleteAdment(params)
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
