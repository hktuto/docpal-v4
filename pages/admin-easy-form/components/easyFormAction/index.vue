<template>
<el-card  style="--icon-size: 1.2rem;">
  <h3 class="title">{{ $t("easyForm.actions") }}</h3>
  <div v-for="item in detail.formResult" :key="item.id" :class="['action', `action_${item.status}`]" @dblclick="handleAdd(item)">
    <div class="flex-x-start">
      <SvgIcon class="el-icon--left el-icon--right" :src="iconMap[item.actionType]" />
      {{ item.actionName }}
    </div>
    <el-dropdown  @command="(command) => handleAction(command, item)">
      <SvgIcon src="/icons/dots.svg" @click.stop />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="edit"> {{ $t('common_edit') }} </el-dropdown-item>
          <el-dropdown-item command="delete"> {{ $t('common_delete') }} </el-dropdown-item>
          <el-dropdown-item v-if="item.status === 'D'" command="active"> {{ $t('actions.active') }} </el-dropdown-item>
          <el-dropdown-item v-else command="inactive"> {{ $t('actions.inactive') }} </el-dropdown-item>
          <!-- <el-dropdown-item v-if="item.actionType === 'Email' && item.actionKey" command="configEmail"> {{ $t('actions.configEmail') }} </el-dropdown-item> -->
          <!-- <el-dropdown-item v-else-if="item.actionType === 'CaseType' && item.actionKey" command="configCase"> {{ $t('actions.configCase') }} </el-dropdown-item> -->
          <!-- <el-dropdown-item v-else-if="item.actionType === 'Workflow' && item.actionKey" command="configWorkflow"> {{ $t('actions.configEmail') }} </el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div style="text-align: center">
    <el-button type="text" @click="handleAdd()">{{ $t('easyForm.actionsAdd') }}</el-button>
  </div>
  <EasyFormActionDialog ref="dialogRef" :detail="detail" @refresh="(action) => emits('refresh', action)" />
</el-card>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ElMessageBox } from 'element-plus'
import type { EasyFormResult } from 'api/src/generate/admin'
const props = defineProps(["detail"]);
const emits = defineEmits(['refresh', 'delete'])
const { t } = useI18n()
const iconMap = {
  Workflow: "/icons/easyForm/workflow.svg",
  CaseType: "/icons/menu/briefcase.svg",  
  Email: "/icons/easyForm/email.svg"
}
const dialogRef = ref()
function handleAdd(row: EasyFormResult = {}) {
  dialogRef.value.handleOpen(row)
}
function handleAction(command: string, row: EasyFormResult) {
  switch (command) {
    case 'delete':
      handleDelete(row.id)
      break;
    case 'edit':
      handleAdd(row)
      break
    case 'active':
    case 'inactive':
      handleActive(row)
      break
    // case 'configEmail':
    //   router.push(`/emailTemplate/${row.actionKey}`)
    //   break
    // case 'configWorkflow':
    //   router.push(`/workflowEditor/${row.actionKey}`)
    //   break
    // case 'configCase':
    //   router.push(`/caseManage/${row.actionKey}`)
    //   break
    default:
      break;
  }
}
async function handleActive(row: EasyFormResult) {
  console.log("row", row);
  
  try {
    const action = await adminApi.api.postFormDesignSaveFormresultAppend({
      id: props.detail.id,
      formResult: {
        ...row, 
        status: row.status === 'D' ? 'A' : 'D'
      }
    }).then(res => res.data)
    emits('refresh', action)
  } catch (error) {
    
  }
}
async function handleDelete(id: string | undefined) {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if(action !== 'confirm') return
  // const index = list.value.findIndex(item => item.id === id)
  // list.value.splice(index, 1)
  try {
    await adminApi.api.deleteFormDesignDraftidFormresultFormresultid(props.detail.id, id)
    emits('delete', id)
  } catch (error) {
    
  }
}
</script>
<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // gap: var(--app-space-xs);
  padding: var(--app-space-xs);
  background-color: var(--app-grey-875);
  margin-bottom: var(--app-space-xs);
  border-radius: 4px;
}
.action_D {
  background-color: var(--app-grey-300);
}
</style>