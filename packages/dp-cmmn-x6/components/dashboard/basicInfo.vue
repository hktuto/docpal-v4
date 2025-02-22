<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnBasicInfo') }}</h3>
  <div class="flex-zoom">
    <div :style="`--field-width: ${item.width}`" class="list-group-item" v-for="item in state.layout">
      <div class="header">{{ item.name }}</div>
      <div class="content">{{ 
        state.mode === 'normal' ? item.value : state.defaultValue[item.id] }} 
      </div>
    </div>
  </div>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/setting.svg"
    @click="openSetting"/>
  <DashboardBasicInfoSetting ref="settingRef" 
    @delete="handleDelete"
    @refresh="handleRefresh"/>
</el-card>
</template>
<script lang="ts" setup>
import { set, watchDebounced } from '@vueuse/core'
import {adminApi } from 'api'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})

const caseProvider = inject(CaseManagementDashboardKey)
const emits = defineEmits([
  'refreshSetting', 'delete'
])

const state = reactive<any>({
  data: {},
  layout: [],
  defaultValue: {},
  mode: 'develop'
})
// #region module: dialog
  const settingRef = ref()
  function openSetting() {
    settingRef.value.handleOpen(props.setting, state.data.fields)
  }
  function handleDelete() {
    emits('delete')
  }
  function handleRefresh(chartSetting) {
    emits('refreshSetting', chartSetting)
  }
// #endregion


async function getCDBasciInfo() {
  try {
    if (state.data?.fields?.length > 0) return state.data
    const id = caseProvider.instanceId?.value || null;
    const caseVersionId = caseProvider.caseVersionId?.value || null;

    if(id) {
      state.mode = 'normal'
      const { data } = await adminApi.api.getCaseDashboardInstanceCaseidPrimaryformData(id)
      state.data = data
    } else if(caseVersionId) {
      state.mode = 'develop'
      const {data:form} = await adminApi.api.getCaseDashboardVersionVersionidPrimaryform(caseVersionId)
      form.rows = form.fields.reduce((prev, item) => {
        let value = item.type
        if (item.type === 'date') value = '2024-01-01'
        else if (item.type === 'number') value = 100
        else value = $i18n.t(`virtual.${item.type}_${item.name}`)
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
    console.log(error)
    state.data = {
      fields: [],
      rows: []
    }
  } finally {
    return state.data
  }
} 
async function initLayout() {
 
  const data = await getCDBasciInfo()
  state.layout = props.setting.layout.reduce((prev, item) => {
    const _item = data.rows.find(d => d.id === item.id)
    
    if(_item) {
      if(!item.width) item.width = '50%'
      prev.push({...item, ..._item })
    }else{
      prev.push({...item})
    }
    return prev
  }, [])
  if(!props.setting.defaultValue) props.setting.defaultValue = {}
  state.defaultValue = props.setting.defaultValue
}

watchDebounced(() => props.setting.layout, (newValue, oldValue) => {
    setTimeout(() => {
      console.log("initLayout", newValue)
      if(!!newValue) {
        // if(oldValue && JSON.stringify(newValue) === JSON.stringify(oldValue)) return
        initLayout()
      }
    })
}, {
    debounce: 200, 
    maxWait: 500,
    deep: true,
    immediate: true
})
</script>
<style lang="scss" scoped>
:deep .flex-zoom {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  row-gap: var(--app-space-xs);
  column-gap: var(--app-space-xs);
  overflow: auto;
  .list-group-item {
    min-width: 100px;
    height: fit-content;
    gap: var(--app-space-xs);
    background-color: #fff;
    width: calc(var(--field-width, 25%) - var(--app-space-xs));
    --icon-size: 1.14rem;
    .header {
      margin: var(--app-input-padding) 0;
      color: #687A8F;
    }
    .content {
      font-size: 18px;
      font-weight: 600;
    }
  }
}
.o-auto > .el-card__body {
  overflow: auto;
}
</style>