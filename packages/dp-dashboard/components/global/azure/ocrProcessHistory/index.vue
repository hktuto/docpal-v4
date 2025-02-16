<template>
    <el-card :class="['dashboard-item', 'dashboard-item-main', { 'dashboard-item-drillDown': state.showDrillDown}]" >
        <template #header="{ close, titleId, titleClass }">
            <h4>{{$t('dashboard.azureOcrProcessedHistory')}}</h4>
            <Icon  v-show="!hideSetting" name="material-symbols:delete-rounded" class="normal cursor-pointer"  @click="handleDelete"></Icon>
        </template>
        <AzureOcrProcessHistoryTable ref="tableRef" :dates="dates"/>
    </el-card>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { watchDebounced } from '@vueuse/core'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const { t } = useI18n()
const emits = defineEmits([
    'refreshSetting', 'delete'
])
const state = reactive({
})
const tableRef = ref()

// #region module: setting
    function resize () {}
    async function handleDelete() {
        const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
        if(action !== 'confirm') return
        emits('delete')
    }
// #endregion
onMounted(() => {
    // tableRef.value.getData()
})
watchDebounced(() => props.dates, (newValue, oldValue) => {
    if (!props.dates) return
    if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        // setTimeout(() => tableRef.value.getData() )
    }
},{ debounce: 200, maxWait: 500, immediate: true, deep: true })
defineExpose({
    resize
})
</script>

<style lang="scss" scoped>
.dashboard-item-main {
    display: grid;
    grid-template-rows: min-content 1fr;
    overflow: hidden;
    background-color: var(--setting-color, #fff);
}
.dashboard-item-main :deep(.el-card__body) {
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
}
.dashboard-item-main :deep(.el-card__header) {
    display: flex;
    justify-content: space-between;
    border-bottom: unset;
    padding: var(--app-space-xs);
    h4 {
        padding: unset;
        margin: unset;
        color: #464646;
        font-size: 18px;
        font-family: Arial;
    }
}
</style>
