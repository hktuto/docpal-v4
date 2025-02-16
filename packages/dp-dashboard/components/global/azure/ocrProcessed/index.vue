<template>
    <el-card :class="['dashboard-item', 'dashboard-item-main', { 'dashboard-item-drillDown': state.showDrillDown}]" >
        <template #header="{ close, titleId, titleClass }">
            <h4>{{$t('dashboard.azure.ocrProcessPage')}}({{$t(`azureDashboard.${setting.dataType}`)}})</h4>
            <SvgIcon v-if="!hideSetting" src="/icons/setting.svg" style="--icon-size: 1.14rem; --icon-color: #8796A4"
                @click="openSetting"/>
        </template>
        <div>
            <AzureOcrProcessedChart ref="chartRef" :dataType="setting.dataType" :dates="dates" @drillDown="handleDrillDown"/>
        </div>
        <div v-if="state.showDrillDown" style="max-height: 400px;">
            <h3 class="flex-x-start">
                {{state.dashboardParams.workflow || state.dashboardParams.scanType}} ({{formatDate(state.dashboardParams.startDate, 'YYYY-MM')}})
                <SvgIcon class="el-icon--right" src="/icons/close.svg" @click="closeDrillDown"/>
            </h3>
            <AzureOcrProcessHistoryTable ref="tableRef" />
        </div>
        <DashboardSetting ref="settingRef"
            :formJson="formJson" 
            @delete="handleDelete"
            @refresh="handleRefresh"/>
    </el-card>
</template>

<script lang="ts" setup>
import formJson from '../ocrProcessed.vform.json'
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
const emits = defineEmits([
    'refreshSetting', 'delete'
])
const state = reactive({
    dashboardParams: {
        startDate: '',
        endDate: '',
        creator: '',
    },
    showDrillDown: false,
})
// #region module: handleDrillDown
    const tableRef = ref()
    function handleDrillDown(params) {
        state.showDrillDown = true
        state.dashboardParams = params
        setTimeout(() => {
            // tableRef.value.getData(params) 
            chartRef.value.resize()
        })
    }
    function closeDrillDown () {
        state.showDrillDown = false
        chartRef.value.setHighlight()
        setTimeout(() => {
            chartRef.value.resize()
        })
    }
// #endregion

// #region module: setting
    const settingRef = ref()
    function openSetting() {
        console.log(props.setting);
        settingRef.value.handleOpen(props.setting)
    }
    function handleDelete() {
        emits('delete')
    }
    function handleRefresh(chartSetting) {
        emits('refreshSetting', chartSetting)
    }

    const chartRef = ref()
    function resize() {
        if(chartRef.value) chartRef.value.resize()
    }
// #endregion


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
    overflow-y: auto;
    overflow-x: hidden;
    display: grid;
    grid-template-rows: 1fr min-content;
}
.dashboard-item-drillDown :deep(.el-card__body){
    grid-template-rows: 300px 1fr;
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
