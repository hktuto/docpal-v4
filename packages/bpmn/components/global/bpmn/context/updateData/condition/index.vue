<script lang="ts" setup>
const condition = defineModel<any>('condition', {required: true})
const {disabled} = defineProps<{    
    disabled:boolean
}>()
const emits = defineEmits(['remove'])

const conditionTypeOption = [
    'Update_Data',
    'Look_Up_User_Group',
    'Look_Up_User',
    // TODO : other type is not implemented yet
    // 'Look_Up_Master_Table',
    // 'Look_Up_Case_info'
]

function remove() {
    emits('remove')
}

function updateCondition(newCondition:any) {
    // condition.value = newCondition
}


</script>

<template>
    <div class="cardContainer">
        <div class="delete">
            <Icon name="lucide:trash" class="el-icon--left" @click="remove" />
        </div>
        <ElForm :model="condition" label-position="top" width="100%">
            <ElFormItem label="Condition Type">
                <ElSelect v-model="condition.attr_type"   :disabled="disabled">
                    <ElOption v-for="item in conditionTypeOption" :key="item" :label="item"  :value="item" />
                </ElSelect>
            </ElFormItem>
            <template v-if="condition.attr_type === 'Update_Data'">
                <BpmnContextUpdateDataConditionNumber v-model:condition="condition" :disabled="disabled" />
            </template>
            <template v-else-if="condition.attr_type === 'Look_Up_User_Group'">
                <BpmnContextUpdateDataConditionUserGroup v-model:condition="condition" :disabled="disabled" />
            </template>
            <template v-else-if="condition.attr_type === 'Look_Up_User'">
                <BpmnContextUpdateDataConditionUser v-model:condition="condition" :disabled="disabled" />
            </template>
            <template v-else-if="condition.attr_type === 'Look_Up_Master_Table'">
            </template>
            <template v-else-if="condition.attr_type === 'Look_Up_Case_info'">  
            </template>
        </ElForm>
        
    </div>
    
</template>

<style lang="scss" scoped>
.cardContainer{
    width: 100%;
    padding: var(--app-space-s);
    border-radius: var(--app-border-radius-m);
    border: 1px solid var(--app-grey-800);
}
</style>
