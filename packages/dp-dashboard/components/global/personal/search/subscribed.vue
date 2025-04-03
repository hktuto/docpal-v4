<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ t('search.Subscribed') }}</h4>
      <Icon
        id="Dashboard__Home__Detail__Subscribed__Delete"
        v-show="!hideSetting"
        name="material-symbols:delete-rounded"
        class="normal cursor-pointer"
        style="font-size: 20px"
        @click="handleDelete"
      ></Icon>
    </template>
    <el-card v-if="!hideSetting" class="detail">
      <el-skeleton :rows="4" />
    </el-card>
    <VxeGrid v-else ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    </VxeGrid>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { MenuRouterKey } from '#imports'

const { t } = useI18n()
const routerProvider = inject(MenuRouterKey)

const props = withDefaults(defineProps<{
  dates?: any;
  setting?: any;
  hideSetting?: boolean,
}>(), {
  setting: {},
  hideSetting: false
})

const emits = defineEmits(['delete'])
const pageParams = reactive({
  pageNum: -1,
  pageSize: 10
})
const state = reactive<any>({
  loading: false,
  scrollNoMore: false,
  recentDocuments: []
})

const { tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows } = useVxeTable({
  id: 'subscribed',
  zoom: false,
  saveColumnOrder: false,
  api: (pageParams: any) =>
    clientApi.api.getNotificationSubscriberSubscriberFolders(pageParams),
  columns: [
    { field: 'name', title: 'tableHeader.folderName', fixed: 'left' },
    { field: 'path', title: 'tableHeader_path' },
    { field: 'contributors', title: 'search.contributors' },
    { field: 'creatorBy', title: 'role.creator' },
    {
      field: 'fileModifiedDate',
      title: 'tableHeader_modifiedDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    }
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handleDblclick(row)
  }
})

function handleDblclick(row: any) {
  routerProvider?.navigateTo(
    createBrowseListPageParams({ idOrPath: row.id }),
    false
  )
}

function resize() {
}

async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  emits('delete')
}

defineExpose({ resize })
</script>
<style lang="scss" scoped>

</style>
