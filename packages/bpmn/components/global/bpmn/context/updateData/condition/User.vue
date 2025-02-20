<script lang="ts" setup>
import { adminApi } from 'api'
const condition = defineModel<any>('condition', {required: true})
const {disabled} = defineProps<{    
    disabled:boolean
}>()

const graphProvider = inject(BPMN_PROVIDER)
if(!graphProvider){
    throw new Error('Missing provider')
}

const userList = ref<any[]>([])

async function getUserList(){
    const {data} = await adminApi.api.postNuxeoIdentityUsers()
    console.log(data)
    userList.value = data
}

const allFields = computed(() => {
    return Object.keys(graphProvider.allFormField.value).map((key:string) => {
    return graphProvider.allFormField.value[key]
  })
})

onMounted(() => {
    getUserList()
})

</script>

<template>
    <ElFormItem label="Form Info">
        <ElSelect v-model="condition.attr_updateFieldName" placeholder="Form Info" :disabled="disabled">
            <ElOption v-for="item in allFields" :key="item.attr_id" :label="item.attr_name" :value="item.attr_id" />
        </ElSelect>
    </ElFormItem>
    <ElFormItem label="User Group">
        <ElSelect v-model="condition.attr_value" placeholder="User Group" :disabled="disabled">
            <ElOption v-for="item in userList" :key="item.id" :label="item.username" :value="item.userId" />
        </ElSelect>
    </ElFormItem>
</template>