<script lang="ts" setup>
import { adminApi } from 'api'
const props = defineProps<{
  document: any
}>()

const { document } = toRefs(props)

const { tableConfig, tableEvent, tableRef, reload} = useVxeTable({
  id: 'rbac-resource-document-permission-table',
  api: async (pageParams: any) => {
    const data = await adminApi.api.getAclResourcePermissionsResourceid(document.value.id).then((res) => res.data)
    // const data = await getChildApi(id.value || 'root')
    return data
  },
  columns:[

  ]
})

watch(document, async() => {
  reload()
}, {
  immediate: true
})


</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
    </template>
  </VxeGrid>
</template>
