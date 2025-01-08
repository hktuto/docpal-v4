<template>
<el-card>
    <h3 class="title">{{ $t('master.setting.name') }}</h3>
    <div class="description">{{ $t('master.setting.nameDescription') }}</div>
    <el-input v-model="state.name" :maxlength="61" />
    <el-button :loading="state.loading" type="primary" @click="handleSave">{{ $t('common_save') }}</el-button>
</el-card>
</template>
<script setup lang="ts">
import { ElMessage} from 'element-plus'
import { adminApi } from 'api'; 
const props = defineProps(['table'])
const state = reactive<any>({
    name: '',
    loading: false
})
async function handleSave() {
    state.loading = true
    try {
        await adminApi.api.putMasterTables({
            id: props.table.id,
            name: state.name,

        })
    } catch (error) {
    //     ElMessage.error($i18n.t('dpMsg_error'))
    }
    setTimeout(() => state.loading = false, 500)
}
watch(() => props.table,() => {
    state.name = props.table.name
}, {
    
})
</script>
<style lang="scss" scoped>
.el-input {
    width: 100%;
    padding: var(--app-space-xs) 0;
}
</style>
        