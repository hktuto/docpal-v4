<script lang="ts" setup>
import { adminApi } from 'api'
const props = defineProps<{
  document: any
}>()

const { document } = toRefs(props)

const { tableConfig, tableEvent, tableRef, reload} = useVxeTable({
  id: 'rbac-resource-document-permission-table',
  api: async (pageParams: any) => {
    const data = await adminApi.api.getAclResourcePermissionsResourceResourceid(document.value.id).then((res) => res)
    console.log(data)
    // const data = await getChildApi(id.value || 'root')
    return data
  },
  columns:[

  ]
})

const detailDialogRef = ref()

function handleAdd() {
  detailDialogRef.value?.open(null, document.value.id)
}

watch(document, async() => {
  reload()
}, {
  immediate: true
})


</script>

<template>
  <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    <template #toolbar_buttons>
        <el-button type="primary" @click="handleAdd">添加</el-button>
    </template>
  </VxeGrid>
  <ResourceDocumentPermissionDetailDialog ref="detailDialogRef" />
</template>
