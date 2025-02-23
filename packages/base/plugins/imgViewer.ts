import VueViewer from 'v-viewer'


export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(VueViewer)
})
