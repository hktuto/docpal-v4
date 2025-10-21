<template>
  <DashboardCard
    v-loading="loading"
    class="o-auto dp-dashboard--card__padding dp-dashboard--card__scroll"
    ref="cardRef"
    :hideSetting="hideSetting"
    :title="$t('dashboard.cmmnBasicInfo')"
    :setting="setting"
    :settingRef="settingRef"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <div class="flex-zoom">
      <div :style="`--field-width: ${item.width}`" class="list-group-item" v-for="item in state.layout">
        <div class="header">{{ state.label[item.id] || renderLabel(item.name) }}</div>
        <div :class="{ content: true, 'content--link': item.linkType }" @click="handleLink(item)">
          {{ displayValue(item) }}
        </div>
      </div>
    </div>
    <DashboardBasicInfoSetting ref="settingRef" :allList="state.data.fields" @delete="handleDelete" @refresh="handleRefresh" />
  </DashboardCard>
</template>
<script lang="ts" setup>
import { useEventBus, EventType } from 'eventbus'

import { set, watchDebounced } from '@vueuse/core'
import { adminApi, clientApi, globalApi } from 'api'
const platform = useAppPlatform()

const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {
      layout: [],
      defaultValue: {},
      label: {}
    },
    hideSetting: false
  }
)

const caseProvider: any = inject(CaseManagementDashboardKey)
const emits = defineEmits(['refreshSetting', 'delete'])
const { t } = useI18n()
const tabProvider = inject(TabManagerKey)
function displayValue(item: any) {
  if (platform.value === 'admin') {
    return state.defaultValue[item.id]
  }
  if (item.type === 'date') {
    return formatDate(item.value)
  }
  if (item.type === 'boolean') {
    // TODO: translate later
    return item.value ? 'Yes' : 'No'
  }
  return item.value || '--'
}
const state = reactive<any>({
  data: {},
  layout: [],
  defaultValue: {},
  label: {},
  mode: 'develop'
})
// #region module: dialog

function handleDelete() {
  emits('delete')
}
function handleRefresh(chartSetting: any) {
  emits('refreshSetting', chartSetting)
}
// #endregion
function handleLink(item: any) {
  if (!item.linkType) return
  const content: any = {}
  switch (item.linkType) {
    case 'case':
      content.caseInstanceId = item.value
      break
    case 'workflow':
      content.processInstanceId = item.value
      break
    case 'document':
      content.documentId = item.value
      break
  }
  notiHandleView({ content }, tabProvider)
}
function renderLabel(label: any) {
  // convert label to titel case
  // return orgin label if secound string is also uppercase
  if (label.toUpperCase() === label) return label
  return label.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}

async function getCDBasciInfo() {
  try {
    // remove this line, cause it will cause refresh data
    // if (state.data?.fields?.length > 0) return state.data
    const id = caseProvider.instanceId?.value || null
    const versionId = caseProvider.versionId?.value || null
    const appPlatform = useAppPlatform()
    if (id) {
      // in client platform
      state.mode = 'normal'
      const { data } = await globalApi.api.getCaseDashboardInstanceCaseidPrimaryformData(id)
      state.data = data
    } else if (versionId) {
      // in admin platform
      state.mode = 'develop'
      const { data: form }: any = await adminApi.api.getCaseDashboardVersionVersionidPrimaryform(versionId)
      form.rows = form.fields.reduce((prev: any, item: any) => {
        let value = item.type
        if (item.type === 'date') value = '2024-01-01'
        else if (item.type === 'number') value = 100
        else value = t(`virtual.${item.type}_${item.name}`)
        prev.push({ ...item, value })
        return prev
      }, [])
      state.data = form
    } else {
      state.data = {
        fields: [],
        rows: []
      }
    }
  } catch (error) {
    console.log('getCDBasciInfo error', error)
    state.data = {
      fields: [],
      rows: []
    }
  } finally {
    return state.data
  }
}
const { settingRef, cardRef, refresh, loading } = useDashboardCard({
  props,
  handleInitCardAction: async (setting: any) => {
    const data = await getCDBasciInfo()
    state.layout = setting.layout.reduce((prev: any, item: any) => {
      const _item = data.rows.find((d: any) => d.id === item.id) // 获取 item.value

      if (_item) {
        if (!item.width) item.width = '50%'
        prev.push({ ...item, ..._item })
      } else {
        prev.push({ ...item })
      }
      return prev
    }, [])
    if (!setting.defaultValue) setting.defaultValue = {}
    state.defaultValue = setting.defaultValue
    state.label = setting.label || {}
  }
})
const refreshBus = useEventBus(EventType.CASE_NEED_REFRESH)
onMounted(() => {
  refreshBus.on(needRefresh)
})
onUnmounted(() => {
  refreshBus.off(needRefresh)
})
function needRefresh(detail: any) {
  const caseId = caseProvider.instanceId?.value || null
  if (detail.caseId === caseId) {
    refresh()
  }
}
</script>
<style lang="scss" scoped>
:deep(.flex-zoom) {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: var(--app-space-xs);
  column-gap: var(--app-space-xs);
  // overflow: auto;
  .list-group-item {
    min-width: 100px;
    height: fit-content;
    gap: var(--app-space-xs);
    background-color: #fff;
    width: calc(var(--field-width, 25%) - var(--app-space-xs));
    --icon-size: 1.14rem;
    .header {
      margin: var(--app-input-padding) 0;
      color: #687a8f;
    }
    .content {
      font-size: var(--app-font-size-l);
      font-weight: 600;
    }
  }
  .content {
    min-height: var(--app-space-s);
  }
}
.o-auto > .el-card__body {
  overflow: auto;
}
.content--link {
  cursor: pointer;
  color: var(--el-color-primary);
  &:hover {
    color: var(--el-color-primary-dark-2);
  }
}
</style>
