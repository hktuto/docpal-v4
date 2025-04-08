<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t('search.recentDocument') }}</h4>
      <Icon
        id="Dashboard__Home__Detail__RecentDocument__Delete"
        v-show="!hideSetting"
        name="material-symbols:delete-rounded"
        class="normal cursor-pointer"
        style="font-size: 20px"
        @click="handleDelete"
      ></Icon>
    </template>
    <el-skeleton v-if="!hideSetting" :rows="5" />
    <VxeGrid v-else ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
    </VxeGrid>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { clientApi } from 'api'
import { MenuRouterKey } from '#imports'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()

const props = withDefaults(defineProps<{
  dates?: any;
  setting?: any;
  hideSetting?: boolean,
}>(), {
  setting: {},
  hideSetting: false
})

const { public: { endPoint } } = useRuntimeConfig()

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
    clientApi.api.postLogsRecentDocumentPage(pageParams),
  columns: [
    { field: 'name', title: 'table_fileName', fixed: 'left' },
    {
      field: 'mimeType',
      title: 'search.mimeTypes',
      formatter: ({ cellValue }: any) => {
        return mimeTypeToExtension(cellValue)
      }
    },
    { field: 'documentType', title: 'dpDocument_fileType' },
    { field: 'path', title: 'tableHeader_path' },
    { field: 'contributors', title: 'search.contributors' },
    // { field: 'creatorBy', title: 'role.creator' },
    {
      field: 'modifiedDate',
      title: 'tableHeader_modifiedDate',
      formatter({ cellValue }: any) {
        return formatDate(cellValue)
      }
    }
  ],
  dblClickAction: ({ row, column, event }: any) => {
    handlePreview(row)
  }
})

function handlePreview(row: any) {
  routerProvider?.navigateTo(
    createDetailPageParams({
      docName: row.name,
      idOrPath: row.id,
      showHeaderAction: true
    }),
    false
  )
}

async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  emits('delete')
}

function resize() {
}

defineExpose({ resize })
</script>
<style lang="scss" scoped>
</style>
