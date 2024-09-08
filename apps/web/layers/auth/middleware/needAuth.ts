import {defineNuxtRouteMiddleware, usePublicPageState} from '#imports'
export default defineNuxtRouteMiddleware((to, from) => {
    const publicPage = usePublicPageState()
  })