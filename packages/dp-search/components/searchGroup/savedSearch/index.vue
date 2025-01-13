<template>
<el-popover
  ref="popoverRef"
  :width="200"
  size="small"
  trigger="click"
>
  <el-input v-model="state.input1" placeholder="Please Input" clearable :suffix-icon="Search" 
    @input="handleChange"></el-input>

  <div class="list">
    <div v-for="item in state._searchList" :key="item.id" class="log-item flex-x-between" @click="handleSearch(item)">
      <div>{{ item.label }}</div>
      <SvgIcon style="--icon-size: 16px;--icon-color:var(--app-grey-400);"src="/icons/menu/trash.svg" 
        @click.stop="handleDelete(item)"></SvgIcon>
    </div>
  </div>
  <el-button type="primary" text @click="handleAdd">{{$t('button.add')}}</el-button>
  <SearchGroupSavedSearchAdd ref="addRef" ></SearchGroupSavedSearchAdd>
  <template #reference>
    <SvgIcon src="/icons/tools/save1.svg" class="mr-2" ></SvgIcon>
  </template>
</el-popover>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import {clientApi} from 'api'
import { conditionDecorators } from '~/utils/searchFormHelper'
import { SearchListProviderKey } from '~/utils/searchProviderHelper'

const searchProvider = inject(SearchListProviderKey)

const state = reactive<any>({
  input1: '',
  searchList: [],
  _searchList: []
})
const { t} = useI18n()
// const emits = defineEmits(['search', 'save'])
const popoverRef = ref()
function hidePopover () {
    popoverRef.value.hide()
}
function handleChange(value: string) {
  state._searchList = state.searchList.filter((item: any) => {
    return (!item.label || 
            item.label.toLowerCase().includes(value.toLowerCase())) 
  })
}
const addRef = ref()
function handleAdd() {
  addRef.value.handleOpen()
  hidePopover()
}
async function handleSearch(item: any) {
  const query = JSON.parse(item.queryCondition)
  conditionDecorators(query)
  await searchProvider?.search(query)
  // emits('search', query)
  popoverRef.value.hide()
}
async function getList() {
  const {data} = await clientApi.api.getNuxeoSearchQueryNestedSearchLog() as any
  state.searchList = data
  state._searchList = [ ...state.searchList ]
}

async function handleDelete(item: any) {
  const action = await ElMessageBox.confirm(t('msg_confirmWhetherToDelete'))
  if (action !== "confirm") throw new Error("cancel");
  await clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId(item.id)
  getList()
}
onActivated(() => {
  getList()
})
defineExpose({
  getList
})
</script>
<style lang="scss" scoped>
.log-item {
  padding: var(--app-space-xs);
  cursor: pointer;
  &:hover {
    background: var(--el-color-primary-light-9);
  }
}
.list {
  max-height: 300px;
  overflow: auto;
}
</style>