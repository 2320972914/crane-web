// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  // const hasKey = this.$te(`route.${title}`)

  // if (hasKey) {
  //   // $t :this method from vue-i18n, inject in @/lang/index.js
  //   const translatedTitle = this.$t(`route.${title}`)

  //   return translatedTitle
  // }
  return title
}

/**
 *
 * @param {*} en_name
 * @param {*} zh_name
 */
export function generateNameMapTitle(en_name, zh_name) {
  const hasKey = this.$te(`route.${en_name}`)
  if (hasKey && !zh_name) {
    const translatedTitle = this.$t(`route.${en_name}`)
    return translatedTitle
  }
  return zh_name
}
