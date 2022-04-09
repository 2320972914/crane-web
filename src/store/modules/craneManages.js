import {
  getStandardList,
  addStandard,
  editStandard,
  deleteStandard,
  getCraneInfoList,
  addCrane,
  deleteCrane
} from '@/api/craneManages'

const getDefaultState = () => {
  return {}
}
const state = getDefaultState()
const mutations = {}
const actions = {

  getStandardList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getStandardList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  addStandard({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addStandard(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  editStandard({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      editStandard(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteStandard({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      deleteStandard(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getCraneInfoList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getCraneInfoList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  addCrane({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      addCrane(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteCrane({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      deleteCrane(params)
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
