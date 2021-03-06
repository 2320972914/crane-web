const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  routes: state => state.permissions.routes,
  addRoutes: state => state.permissions.addRoutes,
  cachedViews: state => state.tagsView.cachedViews,
  visitedViews: state => state.tagsView.visitedViews
}
export default getters
