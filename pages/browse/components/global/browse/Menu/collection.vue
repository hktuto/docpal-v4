<script lang="ts" setup>
import { TabManagerKey } from '#imports'
import { clientApi } from 'api'
const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const query = ref({
    currentPageIndex: 0,
    pageSize: 10,
})
const { data, refresh, pending } = useAsyncData('collection-menu', () => clientApi.collectionNuxeo.getCollection({
    currentPageIndex: 0,
    pageSize: 20,
}))

const entryList = computed(() => {
    return data.value?.data?.entryList || []
})


</script>

<template>
<div class="inlineListCOntainer">
    <div v-for="item in entryList" :key="item.id" class="item">
        {{ item.name}}
    </div>
</div>
</template>

