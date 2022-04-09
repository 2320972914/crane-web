import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permissions from './modules/permissions'
import tagsView from './modules/tagsView'
import basicManages from './modules/basicManages'
import craneManages from './modules/craneManages'
import adManages from './modules/adManages'
import orderManages from './modules/orderManages'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permissions,
    tagsView,
    basicManages,
    craneManages,
    adManages,
    orderManages
  },
  getters
})

export default store
