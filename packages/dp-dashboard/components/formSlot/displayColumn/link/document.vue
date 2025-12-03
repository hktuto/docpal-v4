<script setup lang="ts">
import { clientApi } from 'api'
const props = defineProps<{
  docId: string
}>()


const tabProvider = inject(TabManagerKey)
if (!tabProvider) {
  throw new Error('TabManagerKey not found')
}

const docDetail = ref<any>(null)
const loading = ref(false)


async function getDocDetail() {
  loading.value = true
  try {
    const { data } = await clientApi.api.postNuxeoDocument({idOrPath: props.docId})
    docDetail.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function openDoc() {
  const newItem = createBrowseListPageParams({
    idOrPath: props.docId
  })
  tabProvider?.openTab(newItem, true)
}

onMounted(() => {
  getDocDetail()
})
</script>

<template>
  <div v-loading="loading">
    <div v-if="docDetail" @click="openDoc" class="cursor-pointer">
      {{ docDetail.name }}
    </div>
  </div>
</template>


<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
