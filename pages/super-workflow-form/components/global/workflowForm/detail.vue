<script lang="ts" setup>
import { adminApi } from 'api'
import type { ProcessDefinitionDTO } from 'api/src/generate/admin'
import { ArrowDown } from '@element-plus/icons-vue'
const { t } = useI18n()
const { taskId, processKey } = defineProps<{
  taskId: string;
  processKey: string;
}>();

const state = reactive<State>({
    loading: false,
    submitLoading: false,
    activeTaskId: '',
    workflowDetail: {},
    fieldListApi: {}
})
let workflowList: ProcessDefinitionDTO[] | undefined = []
function handleCommand(command: string){
  init(command)
}

const GetWorkflowDetail = async(_processKey: string) => {
  if(!workflowList || workflowList.length === 0) {
    workflowList = await adminApi.api.getWorkflowProcessGetprocessdefinitionlist().then(res => res.data)
  }
  const workflowDetail = workflowList?.find((item: any) => item.key === _processKey)
  state.workflowDetail = workflowDetail
}
const FormDesignerRef = ref()
async function init(_taskId: string) {
  state.activeTaskId = _taskId

  // state.loading = true
  console.log(_taskId)
  await GetWorkflowDetail(processKey)
  // get prop and label list
  let taskDetail = state.workflowDetail.userTasks.find((item: any) => item.id === _taskId)
  state.fieldListApi = {
      labelKey: 'id',
      nameKey: 'id',
      data: taskDetail.formProperties ? taskDetail.formProperties : state.workflowDetail.userTasks[0].formProperties
  }

  // get json
  const taskFormJsons = await adminApi.api.getRelationQuery({
    processKey: processKey,
    userTaskId: _taskId,
  }).then(res => res.data)
  const taskFormJson = {
    ...taskFormJsons[0],
    json: JSON.parse(taskFormJsons[0].jsonValue),
  }
  setTimeout(() => {
    FormDesignerRef.value.setFormJson(taskFormJson?.json)
  }, 100)
  // state.loading = false
}

async function handleSubmit() {
  const json = FormDesignerRef.value.getFormJson()
  const param = {
    processKey,
    userTaskId: state.activeTaskId,
    jsonValue: JSON.stringify(json)
  }
  state.submitLoading = true
  try {
    const res = await adminApi.api.postRelationSave(param)
    if(!!res)  ElMessage.success(t('msg_successfullyModified'))
  } catch (error) {
  }
  state.submitLoading = false
}
onActivated(async() => {
  init(taskId)
})

</script>
<template>
<div class="pageContainer--padding">
  <div class="header">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
          <div class="ellipsis">{{state.workflowDetail.name}}</div>
          <el-icon class="el-icon--right"> <ArrowDown /> </el-icon>
      </span>
      <template #dropdown>
          <el-dropdown-menu>
              <el-dropdown-item :class="{'current': item.id === state.activeTaskId}" v-for="item in state.workflowDetail.userTasks" :command="item.id">
                  {{item.name}}
              </el-dropdown-item>
          </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div style="overflow: hidden;">
    <FormDesigner ref="FormDesignerRef" :fieldListApi="state.fieldListApi">
      <template #submit>
        <el-button type="text" :loading="state.submitLoading" @click="handleSubmit">{{$t('submit')}}</el-button>
      </template>
    </FormDesigner>
  </div>
</div>
</template>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  .ellipsis {
    max-width: 30vw;
  }
}
:deep(.current) {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}
.pageContainer--padding {
  display: grid;
  grid-template-rows: min-content 1fr;
  .header {
    background-color: var(--app-grey-850);
    padding: var(--app-space-s);
    border-radius: 3px;
  }
}
</style>