<template>
    <div>
        loading
    </div>
</template>


<script lang="ts" setup>
// TODO : add custom router control
const route = useRoute()
const router =useRouter()
onMounted(() => {
    // step1 normalize route path by removing trailing slash
    const path = route.path.replace(/\/$/, '')
    switch(path){
        case '/browse':
            const path = ((route.query.id || route.query.path) || '/') as string
            const newTab = createBrowseListPageParams({
                idOrPath: decodeURI(path)
            })
            console.log("newTab", newTab)
            router.push({
                path: '/',
                query: {
                    navigateTab: btoa(JSON.stringify(newTab))
                }
            })
            break;
        case '/workflow':
            // TODO: add workflow page
            break;
        default:
            router.push('/')
    }
})
</script>