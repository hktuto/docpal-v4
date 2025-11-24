<script setup lang="ts">
import draggable from 'vuedraggable'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const emits = defineEmits(['refresh'])

const showDialog = ref(false)
const loading = ref(false)

const setting = ref({
  uniqueIdentifier: '',
  category: 'case',
  startDate: '',
  endDate: '',
  columns: []
})

const formRef = ref()

const categoryFields = ref([
  { id: 'case', name: 'Case' },
  { id: 'masterTable', name: 'Master Table' }
])

function disabledDate(date: Date) {
  return date.getTime() > Date.now()
}

const newColumnName = ref('')

function handleAddColumns() {
  if (!newColumnName.value || '' == newColumnName.value) {
    return
  }

  const index = setting.value.columns.findIndex((item: any) => item.id === newColumnName.value)
  if (index !== -1) {
    ElMessage.error('Column name already exists')
    return
  }

  setting.value.columns.push({
    id: newColumnName.value,
    width: 300
  })

  newColumnName.value = ''
}

function handleDeleteColumn(index: number) {
  setting.value.columns.splice(index, 1)
}

function handleSubmit() {
  if (setting.value.uniqueIdentifier == '') {
    return
  }

  // if (setting.value.columns.length < 1) {
  //   ElMessage.error('At least one column is required')
  //   return
  // }

  if (!!setting.value.endDate && '' !== setting.value.endDate) {
    setting.value.endDate = `${setting.value.endDate} 23:59:59`
  }
  showDialog.value = false
  emits('refresh', setting.value)
}

function handleOpen(setting: any) {
  console.log("handleOpen",setting)
  showDialog.value = true

  setting.value = {
    uniqueIdentifier: setting.uniqueIdentifier,
    category: setting.category,
    startDate: setting.startDate,
    endDate: setting.endDate,
    columns: setting.columns
  }
}

defineExpose({ handleOpen })
</script>

<template>
  <el-dialog v-model="showDialog" :title="$t('dashboard.setting')" class="scroll-dialog processSetting-dialog big"
             append-to-body :close-on-click-modal="false">
    <el-form ref="formRef" :model="setting" label-position="top">
      <el-form-item label="Unique Identifier" required>
        <el-input v-model="setting.uniqueIdentifier" />
      </el-form-item>
      <el-form-item label="Category">
        <el-select v-model="setting.category" :placeholder="t('common_selectedIsRequiredMsg')">
          <el-option v-for="item in categoryFields" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Date">
        <el-date-picker
          v-model="setting.startDate"
          placeholder="Start Date"
          :disabled-date="disabledDate"
          value-format="YYYY-MM-DD HH:mm:ss"
        />&nbsp;&nbsp;-&nbsp;&nbsp;
        <el-date-picker
          v-model="setting.endDate"
          placeholder="End Date"
          :disabled-date="disabledDate"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>

    <div style="max-height: 550px">
      <h3>{{ $t('caseManage.fieldsLayout') }}</h3>
      <div style="width: 100%; display: flex;  align-items: center;">
        <el-input v-model="newColumnName" />
        <el-button type="primary" @click="handleAddColumns">Add Column</el-button>
      </div>

      <draggable class="list-group" :list="setting.columns" group="people" itemKey="id">
        <template #item="{ element, index }">
          <div class="list-group-item">
            <div class="topRow">
              <SvgIcon class="handle-icon" src="/icons/drag.svg" />
              {{ element.id }}
              <SvgIcon class="handle-icon" src="/icons/close.svg" @click="handleDeleteColumn(index)" />
            </div>
            <el-form label-position="top" class="row" size="small">
              <el-form-item label="Label">
                <el-input v-model="element.label" />
              </el-form-item>
              <el-form-item label="width">
                <el-input-number v-model="element.width" :min="20" :max="1000" />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </draggable>
    </div>

    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="loading" @click="handleSubmit">{{ $t('common_submit') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.list-group {
  min-height: 100px;
  overflow: auto;
}

.list-group-item {
  display: flex;
  flex-flow: column nowrap;
  // grid-template-columns: min-content 1fr min-content;
  background-color: #fff;
  padding: var(--app-space-xs);
  margin-bottom: var(--app-space-xs);

  .el-input {
    width: 100%;
  }

  .topRow {
    width: 100%;
    display: grid;
    grid-template-columns: min-content 1fr min-content;
  }
}

.list-group-item--right {
  flex-flow: row nowrap;
  align-items: center;
}

.flex-zoom {
  display: grid;
  align-content: flex-start;
  row-gap: var(--app-space-xs);
  column-gap: var(--app-space-xs);

  .list-group-item {
    min-width: 100px;
    height: fit-content;
    gap: var(--app-space-xs);
    width: calc(var(--field-width, 50%) - var(--app-space-xs));
    --icon-size: 1.14rem;
    margin-bottom: unset;
  }
}

.processSetting-dialog {

}
</style>
