import {
  getUserList
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
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
