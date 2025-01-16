
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    vite:{
        optimizeDeps:{
            exclude: ['@antv/x6']
        }
    },
    extends:[ 
        '../../packages/dp-masterTable'
    ]
})
