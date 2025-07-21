// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/test-utils/module'],
  extends: [
    '../../packages/icon',
    '../../packages/authApp',
    '../../packages/rbac',
    '../../pages/admin-workflow-editor',
    '../../pages/admin-user',
    '../../pages/admin-acl',
    '../../pages/admin-setting',
    '../../pages/admin-audit',
    '../../pages/admin-azure',
    '../../pages/admin-masterTable',
    '../../pages/admin-easy-form',
    '../../pages/super-workflow-form',
    '../../pages/admin-bulk-import',
    '../../pages/admin-dam',
    '../../pages/admin-document-template',
    '../../pages/admin-docTemplate',
    '../../pages/admin-case-management',
    '../../pages/admin-file-policies',
    '../../pages/admin-docker-log',
    '../../pages/admin-dashboard',
    '../../pages/admin-message-queue',
    '../../pages/admin-share',
    '../../pages/admin-external-connection',
    '../../pages/admin-workflow',
    '../../pages/admin-document-type',

    '../../pages/admin-log-manage',
    '../../pages/admin-calendar-setting',
    '../../pages/admin-folder-cabinet',
    '../../pages/admin-email-template',
    '../../pages/admin-watermark',
    '../../pages/admin-message-template',
    '../../pages/admin-unique-id-generator',
    // "../../pages/admin-share",
    '../../pages/admin-rbac',
    '../../pages/admin-password-policy',
    '../../pages/admin-company-profile'
  ],
  features: {
    inlineStyles: true
  },
  runtimeConfig: {
    public: {
      platform: 'admin',
      defaultTab: {
        id: 'admin-user',
        name: 'admin-user-list',
        label: 'adminMenu.User',
        icon: 'lucide:user',
        component: 'LazyAdminUserList',
        props: {}
      }
    }
  },
  nitro: {
    devProxy: {
      '/open-api/template': {
        target: process.env.OPEN_PROXY,
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
