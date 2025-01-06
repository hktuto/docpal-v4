<script lang="ts" setup>
import { adminApi } from 'api';


const form = ref({
    attr_name: "",
    attr_accesstype : "start"
})
const formEl = ref<any>(null)
const accesstypeOptions = [
    {label:'Start', value:'start'},
    { label:'View', value: 'view'}
]
const userGroups = ref<any[]>([]);
const validationRules = {
    attr_name: [
        { required: true, message: 'Please select user group', trigger: 'change' },
    ],
    attr_accesstype: [
        { required: true, message: 'Please select right', trigger: 'change' },
    ]
}
async function gertUserGroupList() {
    const response = await adminApi.api.postNuxeoIdentityGroups()
    if(!response.data){
        throw new Error("获取用户组列表失败")
    }
    userGroups.value = response.data 
}


const emits = defineEmits(['submit','cancel'])
function submit(){
    // validate
    formEl.value.validate((valid) => {
        if (valid) {
            emits('submit',form.value)
        }
    })
}

onMounted(() => {
    gertUserGroupList()
})

</script>

<template>
    <ElForm ref="formEl"  :model="form" :rules="validationRules" label-position="top">
        <ElFormItem prop="attr_name"  label="User Group" required>
            <ElSelect v-model="form.attr_name" searchable>
                <ElOption v-for="item in userGroups" :key="item.id" :label="item.name" :value="item.id" />
            </ElSelect>
        </ElFormItem>
        <ElFormItem prop="attr_accesstype" label="Right" required>
            <ElSelect v-model="form.attr_accesstype" >
                <ElOption v-for="option in accesstypeOptions" :key="option.value" :label="option.label" :value="option.value" />
            </ElSelect>
        </ElFormItem>
        <ElFormItem>
            <ElButton type="primary" @click="submit">Save</ElButton>
        </ElFormItem>
    </ElForm>
</template>