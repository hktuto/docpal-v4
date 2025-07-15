// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    ssr: false,
    modules: ['@nuxt/test-utils/module'],
    extends: [
        "../../packages/icon",
        '../../packages/authApp',
        '../../packages/rbac',
        "../../pages/client-browse",
        "../../pages/client-search",
        "../../pages/client-master-table",
        "../../pages/client-folder-cabinet",
        "../../pages/client-workflow",
        "../../packages/dp-dashboard",
        "../../pages/client-ai-upload",
        "../../pages/client-share",
        "../../pages/client-trash",
        "../../pages/client-dashboard",
        "../../pages/client-file-policies",
        "../../packages/dp-cmmn-x6",
        "../../pages/client-case-manage",
        "../../pages/client-easy-form",
        "../../pages/client-rbac",
        "../../pages/client-user-setting",
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
