<template>
<div class="search-group-bar-filter">
  <div class="flex-x-end">
    <el-icon :class="[mode === 'edit' ? 'rotateLast' : 'rotateFirst', 'cursorPointer']" @click="handleUp"><ArrowUp /></el-icon>
  </div>
  <div v-show="mode === 'edit'">
    <div v-for="(item, index) in qItem.matchs" :key="index">
      <FormRenderer :ref="el => FormRendererRef[item.id] = el" :form-json="formJson" 
        @selectClear="(fieldName) => handleDelete(item, fieldName)"
        @formChange="(data) => handleFormChange(data, item)">
          <template v-slot:metadataSlot>
            <FormVariablesRenderer :ref="el => FormVariablesRendererRef[item.id] = el" @formChange="handleMetaChange"></FormVariablesRenderer>
          </template>
      </FormRenderer>
      <el-divider v-if="index !== qItem.matchs.length - 1">
        {{ $t(`logic.${qItem.condition}`)  }}
      </el-divider>
    </div>
    <div class="flex-x-center">
      <el-dropdown type="primary" size="small" split-button  @click="handleAddFilter" @command="handleCommand">
        {{ $t(`logic.${qItem.condition}`)  }}
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="and">{{ $t('logic.and') }}</el-dropdown-item>
            <el-dropdown-item command="or">{{ $t('logic.or') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <div v-show="mode === 'view'">
    <el-tag v-for="(item, index) in qItem.matchs" :key="index" class="el-tag--ellipsis" closable 
      @close="handleDelete(item)">
      <template v-if="item.queryType !== 'metadata'">
        {{ item.queryType }}: {{ item.value }}
      </template>
      <template v-else>
        {{ item.value.key }}: {{ item.value.value }}
      </template>
    </el-tag>
  </div>
</div>
</template>
<script lang="ts" setup>
import type { searchGroup, searchGroupQuery, searchGroupQQ } from '~/typing/search'
import { Delete, ArrowUp } from '@element-plus/icons-vue'
const props = defineProps(['qItem'])
const emits = defineEmits(['delete', 'deleteChild', 'add', 'command', 'update', 'formChange'])
const FormRendererRef = ref({})
const FormVariablesRendererRef = ref({}) 
import formJson from './searchGroupForm.vform.json' 
const mode = ref('edit')
function handleAddFilter() {
  emits('add')
}
function handleCommand(command: string) {
  emits('command', command)
}
function handleMetaChange(data) {
  emits('formChange')
}
async function handleUp() {
  if(mode.value === 'edit') {
    const data = await getData()
    emits('update', data)
  }
  mode.value = mode.value === 'edit' ? 'view' : 'edit'
}
function handleFormChange({fieldName, newValue, oldValue, formModel}, item: searchGroupQQ) {
  if(!newValue && !oldValue) return
  try {
    const id = item.id
    if(fieldName === 'metadataKey' && newValue) {
      const widget = FormRendererRef.value[id].vFormRenderRef.getWidgetRef(fieldName)
      const options = widget.getOptionItems()
      const metadata = options.find((item: any) => item.value === newValue)
      const valueItem =  {
        name: 'metadataValue',
        label: 'search.metadataValue',
        type: metadata.type === 'date'? 'date-range' : 'string',
        required: true,
        options: {
          size: "small"
        }
      }
      item.metadataType = metadata.type 
      FormVariablesRendererRef.value[id].createJson([valueItem])
    } else {
      FormVariablesRendererRef.value[id].createJson([])
    }
  } catch (error) {
    
  } finally {
    if(!['queryType', 'metadataKey'].includes(fieldName)) emits('formChange')
  }
}
function handleDelete(item: searchGroupQQ, fieldName?: string) {
  if(!fieldName || fieldName === 'queryType') {
    if(props.qItem.matchs.length === 1) {
      emits('delete')
    } else {
      emits('deleteChild', item.id, props.qItem.matchs)
    }
  }
}


async function getData() {
  const pList: any = []
  props.qItem.matchs.forEach(async(item) => {
    pList.push(getFormData(item) )
  })
  const data = await Promise.all(pList)
  const result = data.reduce((pre, cur) => {
    const item:any = {}
    let rItem:any = {}
    Object.keys(cur).forEach(key => {
      if (String(cur[key])  === 'false' || String(cur[key])  === '0' || !!cur[key]) {
        if (cur[key] instanceof Array && cur[key].length === 0) return
        item[key] = cur[key]
      }
    })
    rItem = {
      queryType: item.queryType,
      value: item[item.queryType]
    }
    if(item.queryType === 'keyword') {
      rItem.option = {
        // matchCase: item.matchCase,
        fullMatch: item.fullMatch,
        synonyms: item.synonyms,
        includeLanguages: item.includeLanguages ? item.includeLanguages : []
      }
    }
    if(item.queryType === 'metadata') {
      rItem.value = {
        key: item.metadataKey,
        value: item.metadataValue
      }
      rItem.option = {
        // matchCase: item.matchCase,
        fullMatch: item.fullMatch
      }
    }
    pre.push(rItem)
    return pre
  }, [])
  return result
}
async function getFormData (item: any) {
  const id = item.id
  const data = await FormRendererRef.value[id].vFormRenderRef.getFormData(true)
  const data2 = await FormVariablesRendererRef.value[id].getData(true)
  if (item.metadataType === 'array' && data2.metadataValue) data2.metadataValue = data2.metadataValue.split(',')
  return { ...data, ...data2 }
}
async function setFormData(qItem: searchGroupQQ) {
  await new Promise(resolve => setTimeout(async () => {
    setTimeout(async() => {
        FormRendererRef.value[qItem.id].vFormRenderRef.setFormData({ ...qItem, ...qItem.option })
        if(qItem.queryType === 'metadata') {
          const metadataOptions = await getMetadataOptions()
          const metadata = metadataOptions.find((item: any) => item.value === qItem.metadataKey)
          console.log('metadata',qItem, metadata)
          const valueItem =  {
            name: 'metadataValue',
            label: 'search.metadataValue',
            type: metadata.type === 'date'? 'date-range' : 'string',
            required: true,
            options: {
              size: "small",
              defaultValue: qItem.metadataValue
            }
          }
          FormVariablesRendererRef.value[qItem.id].createJson([valueItem])
        }
        resolve()
    })
  }, 500))
  
}

let metadataList:any[] = []
async function setMetadataOptions(){
  if(metadataList.length > 0) return metadataList
  const list = await getMetadataOptions()
  metadataList = list
  return list;
}
onActivated(async() => {
  setMetadataOptions()
})
defineExpose({
  setFormData, getData
})
</script>
<style lang="scss" scoped>
.search-group-bar-filter {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  padding: var(--app-space-xs);
  :deep .container-wrapper {
    min-width: unset;
  }
  :deep {
    .static-content-item {
      min-height: unset;
    }
  }
  :deep .el-form .el-row {
    padding: unset;
  }
}
.rotateFirst {
  transform: rotate(180deg);
  transition: all 0.5s;
}
.rotateLast {
  transition: all 0.5s;
}
.el-tag {
  margin-right: var(--app-space-xs);
  margin-bottom: var(--app-space-xs);
}
</style>