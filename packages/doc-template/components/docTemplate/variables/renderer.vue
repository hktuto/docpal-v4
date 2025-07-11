<script setup lang="ts">
import EditVariablesDialog from './editVariablesDialog.vue'

const editVariablesDialogRef = ref()
const emits = defineEmits(['update'])
const { t } = useI18n()
const state = reactive({
  variables: []
})

function setVariables(variablesList: any) {
  state.variables = variablesList
}

function handleTableData(cols: any, rows: any) {
  const colKeys: string[] = cols.map((column: any) => column.key)

  const rowList = rows.map(row => {
    return colKeys.reduce((acc, key, index) => {
      acc[key] = row[index]
      return acc
    }, {})
  })

  return rowList
}

function handleVariableData(item: any) {
  editVariablesDialogRef.value.openVariablesDialog(item)
}

function handleUpdate(item: any) {
  const index = state.variables.findIndex((variable: any) => variable.id === item.id)
  if (index !== -1) {
    state.variables[index] = { ...state.variables[index], ...item }
  }
  emits('update', state.variables)
}

defineExpose({ setVariables })
</script>

<template>
  <div class="renderer-container">
    <div v-for="item in state.variables" :key="item.key" class="variable-item" @dblclick="handleVariableData(item)">
      <div v-if="item.type==='text'" class="variable-content">
        {{ $t('docTemplate.variable.name') }}: {{ item.name }}
        <el-form style="margin-top: 5px">
          <el-form-item :label="`${t('docTemplate.variable.value')}:`">
            <el-input v-model="item.value" disabled />
          </el-form-item>
        </el-form>
      </div>

      <div v-if="item.type==='link'" class="variable-content">
        {{ $t('docTemplate.variable.name') }}: {{ item.name }}
        <el-form label-position="top">
          <el-form-item :label="`${t('docTemplate.variable.value')}:`">
            <div class="input-row">
              <span class="label-text">{{ $t('docTemplate.variable.type') + ':' }}</span>
              <el-input v-model="item.value.type" disabled />
            </div>
            <div class="input-row">
              <span class="label-text">{{ $t('table_label') + ':' }}</span>
              <el-input v-model="item.value.label" disabled />
            </div>
            <div class="input-row">
              <span class="label-text">Url:</span>
              <el-input v-model="item.value.url" disabled />
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="item.type==='list'" class="variable-content">
        {{ $t('docTemplate.variable.name') }}: {{ item.name }}
        <el-form label-position="top">
          <el-form-item :label="`${t('docTemplate.variable.value')}:`">
            <ul v-if="item.value.listStyle === 'bullet'" class="ol-ul-container">
              <li v-for="(listItem, index) in item.value.items" :key="index">{{ listItem.label }}</li>
            </ul>
            <ol v-else class="ol-ul-container">
              <li v-for="(listItem, index) in item.value.items" :key="index">{{ listItem.label }}</li>
            </ol>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="item.type==='table'" class="variable-content">
        {{ $t('docTemplate.variable.name') }}: {{ item.name }}
        <br />
        <div class="el-form-item__label">{{ $t('docTemplate.variable.value') + ':' }}</div>
        <el-table :data="handleTableData(item.value.columns,item.value.rows)" :stripe="item.value.striped"
                  style="width: 100%">
          <el-table-column v-for="column in item.value.columns" :prop="column.key" :label="column.name" width="180" />
        </el-table>
      </div>
    </div>
  </div>

  <EditVariablesDialog ref="editVariablesDialogRef" @update="handleUpdate" />
</template>

<style scoped lang="scss">
.renderer-container {
  overflow-y: auto;
  height: 100%;

  .variable-item {
    margin-bottom: 16px;
  }

  .variable-content {
    max-height: 300px;
    overflow-y: auto;
    padding: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fafafa;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .input-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-right: 5px;

    &:last-child {
      margin-bottom: 0;
    }

    .label-text {
      min-width: 60px;
      font-size: 14px;
      color: #606266;
    }
  }

  .variable-content::-webkit-scrollbar {
    width: 6px;
  }

  .variable-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .variable-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a8a8a8;
    }
  }
}

.ol-ul-container {
  margin: 0;
  line-height: 22px
}
</style>
