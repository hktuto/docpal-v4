<template>
<el-card class="o-auto">
  <h3>{{ $t('dashboard.cmmnProcess') }}</h3>
  <div class="card-main">
    <el-card class="process-item" v-for="item in state.layout">
      <div class="title">
        <SvgIcon :style="`--icon-color: ${getIconColor(item.state)}`" :src="`/icons/status/${getIcon(item.state)}.svg`"></SvgIcon>
        {{ item.name }}
      </div>
      <el-progress :percentage="getPercent(item)" />
      <el-divider />
      <div>
        <div class="process-item--sub" v-for="sItem in item.subItems">
          <SvgIcon :style="`--icon-color: ${getIconColor(sItem.state)}`" :src="`/icons/status/${getIcon(sItem.state)}.svg`"></SvgIcon>
          {{ sItem.name }}
        </div>
      </div>
    </el-card>
  </div>
  <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/setting.svg"
    @click="openSetting"/>
  <DashboardProcessSetting ref="settingRef" 
    @delete="handleDelete"
    @refresh="handleRefresh"/>
</el-card>
</template>
<script lang="ts" setup>
import { watchDebounced } from '@vueuse/core'
import { getCDProcessApi, getCDVProcessApi } from 'dp-api'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const emits = defineEmits([
    'refreshSetting', 'delete'
])
const state = reactive<any>({
  data: [],
  layout: []
})
// #region module: dialog
  const settingRef = ref()
  function openSetting() {
    settingRef.value.handleOpen(props.setting, state.data)
  }
  function handleDelete() {
    emits('delete')
  }
  function handleRefresh(chartSetting) {
    emits('refreshSetting', chartSetting)
  }
// #endregion

function getIcon(state) {
  switch (state) {
    case 'active':
      return 'pendding'
    case 'completed':
      return 'finish'
    default:
      return 'pendding'
  }
}
function getIconColor(state) {
  switch (state) {
    case 'completed':
      return '#266CD6'
    default:
      return '#000'
  }
}
function getPercent(process) {
  if (process.subItems && process.subItems.length > 0) {
    let finish = 0,
    total = 0
    process.subItems.forEach(element => {
      if (element.state === 'completed') finish ++
      total ++
    })
    return (finish / total * 100).toFixed(0)
  } else {
    return process.state === 'completed' ? 100 : 0
  }
}
const route = useRoute()

async function getCDProcess() {
  try {
    if (state.data.length > 0) return state.data
    const id = route.query.instanceId
    const caseTypeId = route.query.caseId
    if(id) {
      state.data = await getCDProcessApi(id)
    } else if(caseTypeId) {
      state.data = await getCDVProcessApi(caseTypeId)
    }
  } catch (error) {
    state.data = []
  } finally {
    return state.data
  }
}
async function initLayout() {
  const list = await getCDProcess()
  state.layout = props.setting.layout.reduce((prev, item) => {
    const _item = list.find(d => d.planItemDefinitionId === item.planItemDefinitionId)
    if(_item) {
      _item.state = _item.state ? _item.state : 'NULL'
      prev.push(_item)
    }
    return prev
  }, [])
}
watchDebounced(() => props.setting.layout, (newValue, oldValue) => {
    nextTick(() => {
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
.card-main {
  display: flex;
  gap: var(--app-padding);
  flex-wrap: warp;
  --icon-size: 18px;
}
.process-item {
  min-width: 200px;
  // background-color: #409EFF;
  // color: #fff;
  .title {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--app-padding);
  }
  .el-progress {
    margin-top: var(--app-padding);
  }
  .el-divider--horizontal {
    margin: 12px 0;
  }
  padding: var(--app-padding);
  border-radius: 5px;
  &--sub {
    display: flex;
    gap: var(--app-padding);
  }
  &:last-child {
    flex: 1;
  }
}
.o-auto > .el-card__body {
    overflow: auto;
}
</style>