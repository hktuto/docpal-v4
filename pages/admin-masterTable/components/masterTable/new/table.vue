<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig">
      <template #toolbar_buttons>
        <div class="flex-x-start ">
          <span v-if="!state.name" class="color--danger">{{ $t('masterTable.emptyName') }}</span>
          {{ state.name }}
          <Icon name="material-symbols:edit-square" class="normal cursor-pointer" @click="tableDialogRef.handleOpen({ name: state.name})"></Icon>
        </div>
        <div class="flex-x-center">
          <el-dropdown>
              <el-button class="el-icon--left">  {{ $t('masterTable.newSchema') }} </el-button>
              <template #dropdown>
                  <el-dropdown-menu>
                      <el-dropdown-item v-for="item in state.dataTypeList" :key="item.value" 
                          @click="handleSingleSchemaAdd(item)">
                          {{ $t(`marsterTable.type.${item.value}`) }}
                      </el-dropdown-item>
                  </el-dropdown-menu>
              </template>
          </el-dropdown>
          <el-button type="primary" @click="handleSubmit">{{ $t('common_submit') }}</el-button>
        </div>
      </template>
      <template #columnName="{ row }">
        <div class="masterTable-columnName">
            <span>{{ row.fieldName }}</span>
            <div v-if="row.unique && !isDefault(row)" class="column-dynamic" style="--column-color: #0099FF">
                <div class="column-dynamic-point"></div>
                {{ $t('marsterTable.unique') }}
            </div>
            <div v-else-if="row.required && !isDefault(row)" class="column-dynamic" style="--column-color: #7B61FF">
                <div class="column-dynamic-point"></div>
                {{ $t('marsterTable.required') }}
            </div>
        </div>
      </template>
      <template #more="{ row }">
        <Icon v-if="!isDefault(row)" class="closeIcon" name="ic:round-close" @click.stop="handleDelete(row)"></Icon>
      </template>
     </VxeGrid>
  <MasterTableDialog ref="tableDialogRef" @confirm="({name}) => state.name = name"></MasterTableDialog>
  <MasterTableNewSchemaDialog ref="schemaDialogRef" disabledUniqueList="" @add="handleAddSchama"
      @update="handleUpdateSchama"/>
</template>
<script lang="ts" setup>
import { openMasterTablePage } from '~/utils/masterTableProvider'
import {MenuRouterKey} from '#imports'
const routerProvider = inject(MenuRouterKey)
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
const state = reactive<any>({
  name: '',
  dataTypeList: []
})

const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
  id: 'masterTableTableSetting',
  columns:  [
      { id: "10",  field: 'fieldName', title: 'masterTable.columnName', fixed: 'left',
      slots:{
          default:'columnName',
        }},
      { field: 'dataType', title: 'masterTable.dataType',},
      { title: 'dpTable_actions', 
        slots:{
          default:'more',
        }
      }
  ],  
  border: true,
  round: true,
  showOverflow: true,
  height: 'auto',
  loading: false,
  
  toolbarConfig: {
      custom:true,
      slots: {
          buttons: 'toolbar_buttons'
      }
  },
  scrollY: {
    enabled: false,
  },
  optionalConfig: {
    data: [
      { dataType: "timestamp", fieldName: "created_date", required: true, unique: false },
      { dataType: "varchar:255", fieldName: "id", primaryKey: true, required: true, unique: true },
      { dataType: "timestamp", fieldName: "modified_date", required: true, unique: false },
      { dataType: "varchar:255", fieldName: "modified_by", required: true, unique: false },
      { dataType: "varchar:255", fieldName: "created_by", required: true, unique: false },
      { dataType: "boolean", fieldName: "status", required: true, unique: false }
    ],
  }
})
function isDefault(row: any) {
  return ['created_date', 'id', 'modified_date', 'modified_by', 'created_by', 'status'].includes(row.fieldName)
}
const tableDialogRef = ref()
const schemaDialogRef = ref()
function handleSingleSchemaAdd(row: any) {
  schemaDialogRef.value.handleOpen({ unique: row.unique, dataType: row.value }, { disabledUnique: !row.unique })
}
async function handleSubmit() {
  if(!state.name) {
    tableDialogRef.value.handleOpen({ name: state.name})
    return
  }
  if(tableConfig.data.length === 6) {
    ElMessage.error($i18n.t('tip.masterTable.noValidData'))
    handleSingleSchemaAdd(state.dataTypeList[0])
    return
  }
  try {
    await adminApi.masterTableController.postTables({
      name: state.name,
      fields: tableConfig.data
    })
    routerProvider.navigateTo(openMasterTablePage()) 
  } catch (error) {
      
  }
}
function checkDisabledUniqueAndOpenSchemaDialog(row: any, edit: boolean = false) {
  const dataType = state.dataTypeList.find((item: any) => item.value === row.dataType)
  schemaDialogRef.value.handleOpen(row, { edit, disabledUnique: !dataType.unique })
}
async function handleDelete(row: any) {
    const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    const index = tableConfig.data.findIndex(item => item.fieldName === row.fieldName)
    tableConfig.data.splice(index, 1)
}
function handleAddSchama(schema: any) {
    const index = tableConfig.data.findIndex(item => item.fieldName === schema.fieldName)
    if(index !== -1) {
      ElMessage.error($i18n.t('tip.duplicate'))
      setTimeout(() => {
        checkDisabledUniqueAndOpenSchemaDialog(schema)
      }, 1000)
    } else {
      tableConfig.data.push({ ...schema, label: schema.fieldName })
    }
}
function handleUpdateSchama(schema: any) {
    const curIndex =  tableConfig.data.findIndex((item: any) => item.fieldName === state.curRow.fieldName)
    const duplicateIndex =  tableConfig.data.findIndex((item: any, index: number) => item.fieldName === schema.fieldName && index !== curIndex)
    if(duplicateIndex !== -1) {
        ElMessage.error($i18n.t('tip.duplicate'))
        setTimeout(() => {
            checkDisabledUniqueAndOpenSchemaDialog(schema, true)
        }, 1000)
    } else {
      tableConfig.data.splice(curIndex, 1, schema)
    }
}
onMounted(async() => {
  const res = await adminApi.masterTableController.getMapping()
  state.dataTypeList = res.data
  state.dataTypeList.push({
    value: 'relation', label:  $i18n.t(`marsterTable.type.relation`), unique: false
  })
})

</script>
<style lang="scss" scoped></style>
