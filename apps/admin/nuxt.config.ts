// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr:false,
  modules: ['@nuxt/test-utils/module'],
  extends:[
    '../../packages/authApp',
    "../../pages/admin-workflow-editor",
    "../../pages/admin-user",
    "../../pages/admin-acl",
    "../../pages/admin-setting",
    "../../pages/admin-audit",
    "../../pages/admin-azure",
    "../../pages/admin-masterTable",
    "../../pages/admin-easy-form",
    "../../pages/super-workflow-form",
    "../../pages/admin-bulk-import",
    "../../pages/admin-dam",
    // "../../pages/admin-document-template",
    "../../pages/admin-case-management",
    "../../pages/admin-file-policies",
    "../../pages/admin-docker-log",
    "../../pages/admin-dashboard",
    '../../pages/admin-message-queue',
    "../../pages/admin-internal-share",
    "../../pages/admin-external-connection",
    "../../pages/admin-workflow",
    "../../pages/admin-document-type",          

    "../../pages/admin-log-manage",
    "../../pages/admin-calendar-setting",
  ],
  features:{
    inlineStyles: true,
  },
  runtimeConfig:{
    public:{
      plarform:'admin'
    }
  },
  nitro:{
    devProxy:{
      '/public-api/report/v1/api':{
        target: process.env.DASHBOARD_PROXY,
        changeOrigin: true,
        prependPath: true
      },
      '/api':{
        target: process.env.ADMIN_PROXY,
        changeOrigin: true,
        prependPath: true
      },
      
    }
  }
  
})
