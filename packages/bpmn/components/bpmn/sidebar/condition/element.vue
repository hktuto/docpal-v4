<script lang="ts" setup>
import { adminApi } from 'api';
import { ElFormItem } from 'element-plus';
import {CONDITION_PROVIDER} from '#imports'
const {element} = defineProps<{
    element:any
}>()
const graphProvider = inject(BPMN_PROVIDER)
const editorProvider = inject(EDITOR_PROVIDER);
const conditionProvider = inject(CONDITION_PROVIDER)
if(!graphProvider || !editorProvider || !conditionProvider) {
    throw createError('provider not found')
}

const typeOptions = computed(() => {
    if(!editorProvider.conditionSetting.value) return []
    return editorProvider.conditionSetting.value.map((item:any) => {
        return {
            label: item.type,
            value: item.type
        }
    })
})


const emits = defineEmits(['delete', 'update'])

const form = ref<{
    attr_type:string,
    attr_source:string,
    attr_fieldName:string,
    attr_condition:string,
    attr_target:string,
    attr_targetValue:any
    validataInfo?:string
    compareValue?:any
}>({
    attr_type:"",
    attr_source:"form",
    attr_fieldName:"",
    attr_condition:"",
    attr_target:"",
    attr_targetValue:""
})

const rules = reactive({
    attr_type:[
        { required: true, message: 'Please select a type', trigger: 'change' }
    ],
    attr_fieldName:[
        { required: true, message: 'Please input field name', trigger: 'change' }
    ],
    attr_condition:[
        { required: true, message: 'Please select a condition', trigger: 'change' }
    ],
    attr_targetValue:[
        { required: true, message: 'Please input target value', trigger: 'change' }
    ]
})

const selectedType = computed(() => {
    if(!form.value.attr_type || !editorProvider.conditionSetting) return null;
    return editorProvider.conditionSetting.value.find((item:any) => item.type === form.value.attr_type)
})

const conditionOption = computed(() => {
    if(!selectedType.value) return [];
    return selectedType.value.validation
}) 

function typeChange(value:string) {
    if(selectedType.value){
        form.value.attr_condition = selectedType.value.validation[0].value
        if(selectedType.value.target.type === 'boolean'){

            form.value.attr_targetValue = true;
        }else{
            form.value.attr_targetValue = "";
        }
        // ignore masterTable and cast to change attr_target
        if(!['masterTable', 'caseTable'].includes(selectedType.value.target.type)) {
            form.value.attr_target = selectedType.value.target.type
        }else{
            form.value.attr_target = "";
        }
    }
}

const allFieldOptions = computed(() => {
    if(!graphProvider.allFormField.value) return []
    return Object.keys(graphProvider.allFormField.value).map((key) => {
    return {
      label: graphProvider.allFormField.value[key].attr_name,
      value: graphProvider.allFormField.value[key].attr_id
    }
  })
});

const selectedMasterTableOption = ref<any[]>([])
async function masterTableChange(masterTableId:string) {
    const data = await adminApi.masterTableController.getTables1(masterTableId);
    if(data.data && data.data.fields){
        selectedMasterTableOption.value = data.data.fields
    }else{
        selectedMasterTableOption.value = []
    }
}


watch(() => element, () => {
    form.value =  JSON.parse(JSON.stringify(element))
},{
    immediate: true,
    deep: true
})

watch(form, () => {
    // if form and different from element, emit update
    if(JSON.stringify(form.value) !== JSON.stringify(element)) {
        console.log("form changed", form.value, element)
        emits('update', JSON.parse(JSON.stringify(form.value)))
    }
},{
    deep:true
})


</script>

<template>
    <div class="elementContainer">
        <div class="removeConditionContainer">
            <Icon name="lucide:trash" @click="$emit('delete')" />
        </div>
        <ElForm :model="form" :rules="rules" label-position="top" size="small" @submit.stop>
            <ElFormItem label="Type" prop="attr_type">
                <ElSelect v-model="form.attr_type" placeholder="Select form field" filterable clearable @change="typeChange">
                    <ElOption v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></ElOption>
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="Field" prop="attr_fieldName">
                <ElSelect v-model="form.attr_fieldName" placeholder="Select form field" filterable clearable>
                    <ElOption v-for="item in allFieldOptions" :key="item.value" :label="item.label" :value="item.value"></ElOption>
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="Condition" prop="attr_condition">
                <ElSelect v-model="form.attr_condition" placeholder="Select form field" filterable clearable>
                    <ElOption v-for="condition in conditionOption" :key="condition.value" :label="condition.label" :value="condition.value"></ElOption>
                </ElSelect>
            </ElFormItem>
            <template v-if="selectedType">
                <template v-if="selectedType.target.type === 'boolean'" >
                    <ElFormItem  label="Condition Value" prop="attr_targetValue">
                        <ElSwitch v-model="form.attr_targetValue" active-text="True" inactive-text="False" />
                    </ElFormItem>
                </template>
                <template v-else-if="selectedType.target.type === 'string'">
                    <ElFormItem  label="Condition Value" prop="attr_targetValue">
                        <ElInput v-model="form.attr_targetValue" />
                    </ElFormItem>
                </template>
                <template v-else-if="selectedType.target.type === 'number'">
                    <ElFormItem  label="Condition Value" prop="attr_targetValue">
                        <ElInputNumber v-model="form.attr_targetValue" />
                    </ElFormItem>
                </template>
                <template v-else-if="selectedType.target.type === 'userGroup'">
                    <ElFormItem  label="User Group" prop="attr_targetValue">
                        <ElSelect v-model="form.attr_targetValue" filterable placeholder="Select">
                            <ElOption v-for="item in conditionProvider.userGroupOption.value" :key="item.id" :label="item.name" :value="item.id" />
                        </ElSelect>
                    </ElFormItem>
                </template>
                <template v-else-if="selectedType.target.type === 'masterTable'">
                    <ElFormItem  label="Master Table" prop="attr_target">
                        <ElSelect v-model="form.attr_target" filterable placeholder="Select" @change="masterTableChange">
                            <ElOption v-for="item in conditionProvider.masterTableOption.value" :key="item.id" :label="item.name" :value="item.id" />
                        </ElSelect>
                    </ElFormItem>
                    <ElFormItem label="Master Table Column" prop="attr_targetValue">
                        <ElSelect v-model="form.attr_targetValue" filterable placeholder="Select">
                                <ElOption v-for="item in selectedMasterTableOption" :key="item.columnName" :label="item.columnName" :value="item.columnName" />
                            </ElSelect>
                    </ElFormItem>
                </template>
            </template>
            
                
        </ElForm>
    </div>

</template>

<style scoped lang="scss">
.elementContainer{
    width: 100%;
    position: relative;
}
:deep(.el-form-item--small){
    margin-bottom: var(--app-space-xs);
}
:deep(.el-form-item__label){
    margin-bottom: var(--app-font-size-xxs);
}
.removeConditionContainer{
    position: absolute;
    top: var(--app-space-xs);
    right: var(--app-space-xs);
    cursor: pointer;
    font-size: var(--app-font-size-s);
}
</style>