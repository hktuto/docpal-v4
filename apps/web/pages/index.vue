<script lang="ts" setup>

import { clientApi } from 'api'

async function getToken() {
    try{
        const response = await clientApi.api.getApplication1()
        console.log("test", response)
    }catch(err) {
        console.log('test error', err)
    }
}

</script>

<template>
    <NuxtLayout>
        <ElButton @click="getToken" > refresh</ElButton>
    </NuxtLayout>
</template>




