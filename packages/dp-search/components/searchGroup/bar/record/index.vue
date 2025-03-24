<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { clientApi } from "api";
import { CirclePlusFilled, Search } from "@element-plus/icons-vue";
import { conditionDecorators } from '~/utils/searchFormHelper'
const emits = defineEmits(['edit', 'dblclick'])
const state = reactive<any>({
  records: [],
  systemRecords: [],
  input: ''
});
const { t } = useI18n()
async function getList() {
  const { data } = (await clientApi.api.getNuxeoSearchQueryNestedSearchLog()) as any;
  // state.searchList = await GetSearchApi()
  state.records = [...data];
  console.log();
}
async function getSystemRecords() {
  const { data } = await clientApi.api.getNuxeoSfolder()
  state.systemRecords = data.map(item => ({
    label: item.name,
    queryCondition: item.json_value
  }))
}
const addRef = ref()
function handleAdd() {
  addRef.value.handleOpen()
}
function handleEdit(row) {
  const query = JSON.parse(row.queryCondition)
  conditionDecorators(query)
  emits('edit', query)
}
function handleDblclick(row) {
  console.log(row);
  const query = JSON.parse(row.queryCondition)
  conditionDecorators(query)
  emits('dblclick', query)
}
async function handleDelete() {
  const action = await ElMessageBox.confirm(t('msg_confirmWhetherToDelete'))
  if (action !== "confirm") throw new Error("cancel");
  await clientApi.api.deleteNuxeoSearchDeleteNestedSearchLogId(item.id)
  getList()
}
function handleSearch() {}
onMounted(() => {
  getSystemRecords()
  getList();
});
defineExpose({ getList });
</script>
<template>
  <div class="search-bar-record">
    <div class="flex-x-between">
      <el-input
        v-model="state.input"
        :placeholder="$t('dpTable_label')"
        :prev-icon="Search"
        clearable
        @input="handleSearch"
      ></el-input>
      <SvgIcon
        src="/icons/add-circle-fill.svg"
        style="--icon-color: var(--app-primary-color)"
        class="el-icon--right" @click="handleAdd"
      ></SvgIcon>
    </div>
    <div class="search-bar-record__list">
      <div v-for="key in ['records', 'systemRecords']">
        <div class="search-bar-record__list__title">{{ $t(`dpSearch.${key}`) }}</div>
        <div v-for="item in state[key]" class="search-bar-record__list__item flex-x-between"
          @dblclick="handleDblclick(item)">
          {{ item.label }}
          <div v-if="key === 'records'" class="flex-x-between" style="--icon-color: var(--app-grey-500)">
            <SvgIcon src="/icons/edit.svg" class="el-icon--right"
              @click="handleEdit(item)"/>
            <SvgIcon src="/icons/delete.svg" class="el-icon--right"
              @click="handleDelete"/>
          </div>
        </div>
      </div>
    </div>
    <SearchGroupBarRecordAddDialog
      ref="addRef"
      @save="(data: any) => emits('save', data)"
    ></SearchGroupBarRecordAddDialog>
  </div>
</template>
<style lang="scss" scoped>
.search-bar-record {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
  &__list {
    overflow: auto;
    &__title {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1.125rem;
      line-height: 1.375rem;
      color: var(--app-grey-300);
      padding: var(--app-space-xs) 0;
    }
    &__item {
      cursor: pointer;
      font-size: 1rem;
      padding: var(--app-space-xs);
      border-radius: var(--app-border-radius-s);
      &:hover {
        background-color: var(--app-grey-800);
      }
    }
  }
}
</style>
