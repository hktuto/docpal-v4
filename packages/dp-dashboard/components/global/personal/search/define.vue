<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ t('search.SearchDefine') }}</h4>
      <Icon
        id="Dashboard__Home__Detail__SearchDefine__Delete"
        v-show="!hideSetting"
        name="material-symbols:delete-rounded"
        class="normal cursor-pointer"
        style="font-size: 20px"
        @click="handleDelete"
      ></Icon>
    </template>
    <el-card v-if="!hideSetting" v-for="item in 2" :key="item" class="detail">
      <el-skeleton :rows="4" />
    </el-card>
    <div
      v-else
      v-for="key in ['records', 'systemRecords']"
      style="margin-bottom: var(--app-space-s)"
    >
      <h3>{{ t(`dpSearch.${key}`) }}</h3>
      <div
        v-for="item in state[key]"
        class="search-bar-record__list__item flex-x-between"
        @dblclick="handleDblclick(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { onMounted } from 'vue'
import { clientApi } from 'api'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const emits = defineEmits(['dblclick', 'search', 'delete'])
const props = withDefaults(
  defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean;
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)
const state = reactive<any>({
  records: [],
  _records: [],
  systemRecords: [],
  _systemRecords: [],
  input: ''
})

function resize() {
}

async function getList() {
  const { data } = (await clientApi.api.getNuxeoSearchQueryNestedSearchLog()) as any
  state.records = [...data]
  state._records = [...state.records]
}

async function getSystemRecords() {
  const { data }: any = await clientApi.api.getNuxeoSfolder()
  state.systemRecords = data.map((item: any) => ({
    label: item.name,
    queryCondition: item.json_value
  }))
  state._systemRecords = [...state.systemRecords]
}

async function handleDelete() {
  const action = await ElMessageBox.confirm(t('msg_confirmWhetherToDelete'))
  if (action !== 'confirm') return
  emits('delete')
}

function handleDblclick(row: any) {
  const query = JSON.parse(row.queryCondition)
  conditionDecorators(query)
  routerProvider?.navigateTo(routeSearch({ searchParams: query }), false)
}

onMounted(() => {
  getList()
  getSystemRecords()
})

defineExpose({
  resize
})
</script>
<style lang="scss" scoped>
.search-bar-record {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);

  &__list {
    overflow: auto;

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
