<script lang="ts" setup>
import { publicApi } from 'api'
const routerProvider = inject(MenuRouterKey)
if(!routerProvider) {
    throw createError('MenuRouterKey is not provided')
}


onMounted(async() => {
    const data = await publicApi.api.postUserDashboardPage({})
})

</script>


<template>

    <div class="pageContainer">
        docker log
    </div>
</template>