// function loadView(view) {
//   return () => import(/* webpackChunkName: "[request]" */ `@/views${view}`)
// }

// export { loadView }
export const loadView = (view) => {
  return (resolve) => require([`@/views${view}`], resolve)
}
