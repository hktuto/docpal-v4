<script lang="ts" setup>

const condition = defineModel<any>('condition', {required: true})
const {disabled} = defineProps<{    
    disabled:boolean
}>()

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider){
    throw new Error('Missing provider')
}
const functionOptions = [
    'Increase_By',
    'Decrease_By',
    'Set_Value',
]

function functionChange(newFn) {
    if(newFn === 'Set_Value') {
        delete condition.value.attr_step
    }else{
        delete condition.value.attr_value
    }
}

const allFields = computed(() => {
    return Object.keys(graphProvider.allFormField.value).map((key:string) => {
    return graphProvider.allFormField.value[key]
  })
})



</script>


<template>
    <ElFormItem label="Form Info">
        {{ disabled }}
        <ElSelect v-model="condition.attr_updateFieldName" placeholder="Form Info" :disabled="disabled">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
        </ElSelect>
    </ElFormItem>
    <ElFormItem label="Function">
        <ElSelect v-model="condition.attr_function" placeholder="Function" @change="functionChange" :disabled="disabled">
            <ElOption v-for="item in functionOptions" :key="item" :label="item" :value="item" />
        </ElSelect>
    </ElFormItem>
    <ElFormItem v-if="condition.attr_function !== 'Set_Value'" label="Step">
        <ElInputNumber v-model="condition.attr_step" step="1" :disabled="disabled" controls-position="right" style="width: 100%" />
    </ElFormItem>
    <ElFormItem v-else label="Value">
        <ElInputNumber v-model="condition.attr_value" step="1" :disabled="disabled" controls-position="right" style="width: 100%" />
    </ElFormItem>
    
</template>