<template>
  <div class="case-card-view" >
    <div class="card-container">
      <el-card v-for="item in state.data" :key="`p${item.id}`">
        <div class="flex-x-start" >
          <el-checkbox :label="item.case_id" :value="item.id" />
        </div>
        <div class="row" v-for="f in fields" :key="`c${f.id}`">
          <div class="title">{{ f.name }}</div>
          <div class="content">{{ item[f.id] || '-' }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCaseInstansePageApi } from 'dp-api'
const props = defineProps(['fields'])

const route = useRoute()
const state = reactive<any>({
  data: [],
  totalSize: 0,
  selectRow: [],
  fields: []
})
async function getList(params) {
  const res = await getCaseInstansePageApi(route.params.id, params)
  state.data = res.entryList
  state.totalSize = res.totalSize
}
function initFields(fields) {
  state.fields = fields
  console.log(state.fields, 'init');
  
}
onMounted(() => {
  getList({
    pageNum: 0,
    pageSize: 50
  })
})
defineExpose({ initFields })
</script>
<style lang="scss" scoped>
.case-card-view {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr min-content;
  .el-card {
    min-width: 200px;
  }
  .placeholder {
    width: 16px;
    height: 16px;
    background-color: #f5f7fa;
    border-radius: 3px;
    content: ' '
  }
  .row {
    margin-bottom: var(--app-padding);
    .title {
      color: #687a8f;
    }
  }
}
.card-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  flex-wrap: wrap;
  gap: var(--app-padding);
  overflow: auto;
  // height: 100%;
}
</style>
