import {defineNuxtRouteMiddleware, usePublicPageState, abortNavigation, useAuth} from '#imports'
export default defineNuxtRouteMiddleware(async(to, from) => {
    const publicPage = usePublicPageState()
    const { loggedIn, fetch } = useAuth()
    console.log("middle ware run")
    if(!publicPage.value.includes(to.path)) {

      if(!loggedIn.value) {
        await fetch()
        abortNavigation()
      }
    }
  })