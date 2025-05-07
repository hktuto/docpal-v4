// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  ssr:false,
  extends:[
    "../",
    "../../../packages/icon",
    '../../../packages/authApp',
  ],
  features: {
    inlineStyles: true,
  },
  runtimeConfig: {
      public: {
          platform: 'client',
          defaultTab: {
              id:'client-work-panel',
              name : 'client-work-panel',
              label: "adminMenu.workPanel",
              hoverIcon : 'material-symbols:dashboard-customize-outline-rounded',
              component: "LazyHomePage",
              props:{}
          }
      }
  },
  nitro: {
    devProxy: {
        '/public-api/report/v1/api': {
            target: process.env.DASHBOARD_PROXY,
            changeOrigin: true,
            prependPath: true
        },
        '/api': {
            target: process.env.CLIENT_PROXY,
            changeOrigin: true,
            prependPath: true
        },

    }
}
})
