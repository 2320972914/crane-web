import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permissions from './modules/permissions'
import tagsView from './modules/tagsView'
import basicManages from './modules/basicManages'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permissions,
    tagsView,
    basicManages
  },
  getters
})

export default store
