<script lang="ts" setup>
const props = defineProps<{
    allFields:any[],
    allCabinetFile:any[]
    editItem:any,
}>()
const emits = defineEmits(['submit'])
const formEl = ref()
const form = ref({
    attr_formProperty:"",
    attr_metadata:""
})

const rules = {
    attr_formProperty: [
        { required: true, message: 'Please input form property', trigger: 'blur' },
    ],
    attr_metadata: [
        { required: true, message: 'Please input Folder Cabinet Item', trigger: 'blur' },
    ]
}


function submit(){
    formEl.value.validate(async (valid, fields) => {
        if (valid) {
            emits('submit', form.value)
        } 
    })
}

onMounted(() => {
    form.value = props.editItem
})

</script>

<template>
    <div class="newFormContainer">
        
    
    <ElForm ref="formEl" :model="form" :rules="rules" label-position="top" @submit.native.prevent>
        <ElFormItem label="Form File Field" prop="attr_formProperty" required>
            <ElSelect v-model="form.attr_formProperty" placeholder="Form Property" clearable filterable>
                <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_field_label" :value="item.attr_id" />
            </ElSelect>
        </ElFormItem>
        <ElFormItem label="Folder Cabinet Item" prop="attr_metadata" required>
            <ElSelect v-model="form.attr_metadata" placeholder="Metadata" clearable filterable>
                <ElOption v-for="item in allCabinetFile" :key="item.id" :label="item.title" :value="item.id" />
            </ElSelect>
        </ElFormItem>
        <ElFormItem>
            <ElButton type="primary" @click="submit">save</ElButton>
        </ElFormItem>
    </ElForm>
    </div>
</template>

<style scoped lang="scss">
.newFormContainer{
    width:100%;
    :deep{
        .el-select{
            width:100%;
        }
    }
}
</style>