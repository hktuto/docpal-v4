<template>
  <div class="pageContainer--padding">
    {{ detail }}
    <ContactListTable ref="ContactListTableRef" :id="id" :detail="detail" />
    <!-- <ContactListTable2 :id="id" :detail="detail" /> -->
  </div>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
import { routeContactList } from '~/utils/routerHelper'
const tableColumnRender = reactive({
  name: 'TableColumnRender'
})

const props = defineProps<{
  id: string
}>()
const detail = ref()
const ContactListTableRef = ref()
async function init() {
  const res = await adminApi.api.getContactgroupId(props.id).then((res) => res.data)
  detail.value = res
  ContactListTableRef.value.init()
}
provide('contactBookDetail', detail)
onMounted(() => {
  init()
})
</script>
<style lang="scss" scoped>
:deep(.vxe-buttons--wrapper) {
  display: flex;
  justify-content: space-between;
}

.responsive-container {
  width: 70%;
  :deep(.el-input) {
    width: 200px;
  }
}
</style>
