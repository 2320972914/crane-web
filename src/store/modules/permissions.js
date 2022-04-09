import { asyncRoutes, constantRoutes, errorRoutes } from '@/router'
import { getRouterList } from '@/api/basicManages'
import Layout from '@/layout'
import { loadView } from '@/router/loadView'

// 权限拦截、

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, addRoutes) => {
    state.addRoutes = addRoutes.concat(errorRoutes)
    state.routes = constantRoutes.concat(addRoutes)
    // router.options.routes = state.routes
    console.log(state.addRoutes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      console.log(accessedRoutes)
      // router.addRoute(accessedRoutes)
      // console.log(router)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  getMenu({ commit, state }, roles) {
    return new Promise((resolve, reject) => {
      getRouterList()
        .then(res => {
          const newRouter = []
          refactoringTree(newRouter, res.rows)
          console.log(newRouter)
          const accessedRoutes = filterAsyncRoutes(newRouter, roles)
          console.log(accessedRoutes)
          commit('SET_ROUTES', accessedRoutes)
          resolve(newRouter)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
function refactoringTree(oldTree, newTree) {
  for (const obj of newTree) {
    const newobj = {}
    newobj.path = obj.path
    newobj.name = obj.routerName
    newobj.children = []
    newobj.meta = {
      title: obj.routerTitle,
      icon: obj.icon ? 'el-icon-' + obj.icon : 'el-icon-s-help',
      roles: obj.authType == 1 ? ['admin', 'user'] : ['admin']
    }
    if (obj.parentId == 0) {
      newobj.component = Layout
    } else {
      newobj.component = loadView(obj.path)
    }
    if (obj.children.length > 0) {
      refactoringTree(newobj.children, obj.children)
      // newobj.redirect = '/' + obj.children[0].sourceUrl
    }
    oldTree.push(newobj)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

