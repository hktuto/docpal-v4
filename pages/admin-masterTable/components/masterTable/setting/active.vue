<template>
<el-card>
    <h3 class="title">{{ $t('master.setting.active') }}</h3>
    <div class="description">{{ $t('master.setting.activeDescription') }}</div>
    <el-select v-model="state.isActive" placeholder="Select">
      <el-option :label="$t('actions.active')" value="A"/>
      <el-option :label="$t('actions.inactive')" value="D"/>
    </el-select>
    <el-button type="primary" :loading="state.loading" @click="handleSave">{{ $t('common_save') }}</el-button>
</el-card>
</template>
<script setup lang="ts">
import { ElMessage} from 'element-plus'
import { UpdateMasterTableApi } from 'dp-api'
const props = defineProps(['table'])
const state = reactive<any>({
    isActive: 'D',
    loading: false
})
const route = useRoute()
async function handleSave() {
    state.loading = true
    try {
        await UpdateMasterTableApi({
            id: route.params.id,
            status: state.isActive,

        })
    } catch (error) {
        state.isActive = state.isActive === 'A' ? 'D' : 'A'
    }
    setTimeout(() => state.loading = false, 500)
}
watch(() => props.table,(newVal) => {
    state.isActive = props.table.status
})
</script>
<style lang="scss" scoped>
.el-select {
    width: 100%;
    padding: var(--app-padding) 0;
}
</style>
    