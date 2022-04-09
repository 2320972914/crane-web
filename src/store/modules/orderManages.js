import {
  getOrderList,
  operation,
  backDeleteOrder
} from '@/api/orderManages'

const getDefaultState = () => {
  return {}
}
const state = getDefaultState()
const mutations = {}
const actions = {

  getOrderList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getOrderList(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  operation({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      operation(params)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  backDeleteOrder({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getOrderList(params)
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
