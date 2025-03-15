<script lang="ts" setup>
import type {VxeGridProps} from 'vxe-table'

const {fields} = defineProps<{
    fields:any[]
}>()
const opened = ref(false);
const newFieldRef = ref();
const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider) {
    throw createError('graph provider not found')
}
const emits = defineEmits(['change'])
const allFieldOptions = computed(() => {
    if(!graphProvider.allFormField.value) return []
    const allFieldToArray = Object.keys(graphProvider.allFormField.value).map((key) => graphProvider.allFormField.value[key])
    return allFieldToArray
})

const filteredFieldOptions = computed(() => {
    return Object.keys(graphProvider.allFormField.value).map((key) => graphProvider.allFormField.value[key])
})

function open(){
    opened.value = true
}

function openNewFieldDialog(){
    if(!newFieldRef.value || !newFieldRef.value.open) {
        throw createError('new field ref not found')
    }
    newFieldRef.value?.open()
}

const selectedField = computed(() => {
    return fields.map((item) => item.attr_id)
})

function fieldUpdate(value:string[]) {
    // check if last item is new item
    const lastItem = value[value.length - 1]
    const notNewITem = filteredFieldOptions.value.find(item => item.attr_id === lastItem)
    if(!notNewITem && value.length > 0) {
        newFieldRef.value?.open(lastItem)
        return;
    }
    emits('change', filteredFieldOptions.value.filter((item:any) => value.includes(item.attr_id)))
}

function newFieldCreated(value:any) {
    fields.push(value);
    emits('change', fields)
}
const fieldTableRef = ref()
const fieldMappingTableSetting:VxeGridProps = {
    id: 'workflowEditorFieldMappingSetting',
    height: 300,
    toolbarConfig:{
        custom:false,
        slots: {
            buttons: 'toolbar_buttons'
        },
    },
    columnConfig: {
            resizable: true,
        },
    columns: [
        { title: 'Name', field: 'attr_name' },
        { title: 'Type', field: 'attr_type' },
    ],
    proxyConfig:{
        ajax: {
            query: ({ page, sorts }:any) => {
                return Promise.resolve([...fields])
            }
        }
    }
}

watch(() => fields, ()=> {
    fieldTableRef.value?.commitProxy('reload')
},{
    deep: true
})

defineExpose({
    open
})

</script>

<template>
    <ElDialog v-model="opened" width="80%" draggable append-to-body>
        <template #header>
            Edit Field
        </template>
        
        <template #default>
            <div class="selecteAndCreateContainer">
                <ElSelect v-model="selectedField" multiple allow-create filterable default-first-option @change="fieldUpdate">
                    <ElOption v-for="item in allFieldOptions" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
                </ElSelect>
                <ElButton type="primary" @click="openNewFieldDialog">Add Field</ElButton>
            </div>
            <ElDivider />
            <div class="tableSection">
                <VxeGrid ref="fieldTableRef" v-bind="fieldMappingTableSetting" >
                    <template #toolbar_buttons>
                        <div>Form Fields</div>
                    </template>
                </VxeGrid>
            </div>
        </template>
        
    </ElDialog>
    <BpmnNewField ref="newFieldRef" @created="newFieldCreated"/>
</template>

<style lang="scss" scoped>
.selecteAndCreateContainer{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xs);
}
</style>