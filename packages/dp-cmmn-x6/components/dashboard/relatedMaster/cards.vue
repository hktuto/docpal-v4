<script lang="ts" setup>
import { clientApi } from 'api'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const platform = useAppPlatform()
const { name, detail, relatedField } = defineProps<{
  name: string
  detail: any
  relatedField: any
}>()

const CMDProvider = inject(CaseManagementDashboardKey)
const caseId = CMDProvider?.instanceId?.value || null
let where = ref({})
const { t } = useI18n()
const emits = defineEmits(['filter-change', 'refresh'])
const routerProvider = inject(MenuRouterKey)

const caseEvents = ref<any>([])
const pageParams: any = {
  pageNum: 0,
  pageSize: 20,
  orderBy: 'created_date',
  isDesc: true
}
const extraParams: any = {
  where: {
    [relatedField]: caseId
  }
}
const list = ref<any>([])
async function getList() {
if (platform.value === 'admin') {
    list.value = []
    return
  }
  const { data } = await clientApi.api.postMasterTablesRecordPageNonpermission({
    name: name,
    ...pageParams,
    ...extraParams
  })
  list.value = data || []
}
const columnsSetting = ref<any>([])
async function reorderColumn(fields: any) {
  try {
    const columns: any = []
    if (fields.length > 0) {
      const columneFromSetting = fields.reduce((prev: any, item: any) => {
        console.log('columneFromSetting item', item)
        const newItem: any = {
          field: item.id,
          title: item.name.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase()),
          minWidth: 200
        }
        if (item.formatter) {
          newItem.formatter = item.formatter
        }
        prev.push(newItem)
        return prev
      }, [])
      columns.splice(0, 0, ...columneFromSetting)
    }
    columnsSetting.value = columns
  } catch (e) {
    console.error('error', e)
  }
}

function reload() {
  getList()
}

function query() {
  getList()
}

onMounted(() => {
  getList()
})

  defineExpose({ reorderColumn, reload, query })
</script>
<template>
  <div class="cardListContainer">
    <div v-for="item in list" :key="item.id" class="card">
      <template v-for="column in columnsSetting" :key="column.field">
        <div class="card-item-label">{{ column.title }}</div>
        <!-- value -->
        <div class="card-item-value">{{ item[column.field] }}</div>
    </template>
  </div>
</div>
</template>
<style lang="scss" scoped>
.cardListContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  overflow: auto;
}
.card{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--app-space-xs);
}
.card-item-label{
  font-size: var(--app-font-size-s);
  color: var(--app-grey-600);
}
.card-item-value{
  font-size: var(--app-font-size-m);
  color: var(--app-grey-300);
}
.card + .card {
  padding-top: var(--app-space-xs);
  border-top: 1px solid var(--el-border-color-light);
}
</style>
