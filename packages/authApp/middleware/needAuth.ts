import {defineNuxtRouteMiddleware, usePublicPageState, abortNavigation, useAuth} from '#imports'
export default defineNuxtRouteMiddleware(async(to, from) => {
    const publicPage = usePublicPageState()
    const { loggedIn, fetch } = useAuth()
    if(!publicPage.value.includes(to.path)) {

      if(!loggedIn.value) {
        await fetch()
        abortNavigation()
      }
    }
  })