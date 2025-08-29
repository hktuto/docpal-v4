<template>
  <div>
    <template v-for="(item, key) in aggregation" :key="key">
      <div v-if="item.length > 0">
        <h3>{{ $t('searchGroup.' + key) }}</h3>
        <div style="margin-bottom: 5px" v-if="item.length > 9">
          <el-input
            v-model="state.input1"
            placeholder="Please Input"
            clearable
            :suffix-icon="Search"
            @input="(value: string) => handleInputChange(value, key)"
          ></el-input>
        </div>
        <div class="check-list">
          <el-checkbox-group v-model="state.filters[key]" :max="signleAgg.includes(key) ? 1 : '-'" @change="handleFiltersChange">
            <el-checkbox v-for="(agg, index) in state._aggregation[key]" :key="index" :value="agg.key">
              {{ getI18n(agg.value || agg.key, key) }} ({{ agg.count }})
            </el-checkbox>
          </el-checkbox-group>
          <!-- <el-tag v-for="(agg, index) in state._aggregation[key]" effect="plain" :key="key" @click="handleChange(key, agg)">
         
        </el-tag> -->
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
const props = defineProps(['aggregation'])
const emits = defineEmits(['filters'])
const state = reactive<any>({
  filters: {},
  defaultFilter: {},
  _aggregation: {},
  aggProps: {}
})
const signleAgg = ['modified', 'createdDate']
const { t } = useI18n()
function clear() {
  state.filters = {}
  // setDefaultFilter({})
}
function getData() {
  const params = Object.keys(state.filters).reduce((prev: any, key: string) => {
    const item = state.filters[key]
    if (item.length > 0) {
      prev[key] = signleAgg.includes(key) ? item[0] : [...item]
    }
    return prev
  }, {})
  return params
}
function handleFiltersChange() {
  const params = getData()
  emits('filters', params)
}
function setDefaultFilter(filter: any) {
  state.defaultFilter = filter
}
const dateFileds = ['modified', 'createdDate']
function getI18n(value: any, key: string) {
  if (!value) return '-'
  if (dateFileds.includes(key)) return t(`searchType.${value}`)
  return value
}
function handleInputChange(value: string, key: string) {
  state._aggregation[key] = props.aggregation[key].filter((item: any) => {
    return !item.key || item.key.toLowerCase().includes(value.toLowerCase()) || (!!item.value && item.value.toLowerCase().includes(value.toLowerCase()))
  })
}
watch(
  () => props.aggregation,
  (newValue: any, oldValue) => {
    if (!newValue) {
      state._aggregation = {}
      return
    }
    if (oldValue && JSON.stringify(newValue) === JSON.stringify(oldValue)) return
    state._aggregation = JSON.parse(JSON.stringify(newValue))
    Object.keys(state._aggregation).forEach((key) => {
      state.filters[key] = []
      if (state.defaultFilter && state.defaultFilter[key]) {
        state.filters[key] = signleAgg.includes(key) ? [state.defaultFilter[key]] : state.defaultFilter[key]
      }
    })
  },
  {
    immediate: true
  }
)
defineExpose({
  clear,
  getData,
  setDefaultFilter
})
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 0 var(--app-input-padding) var(--app-input-padding) 0;
}
.check-list {
  max-height: 300px;
  overflow-y: auto;
  .el-checkbox {
    width: 100%;
    overflow-x: hidden;
    margin-right: unset;
    :deep .el-checkbox__label {
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 32px;
    }
  }
}
</style>
