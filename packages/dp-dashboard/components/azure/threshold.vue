<template>
    <el-card class="dashboard-item dashboard-item-main">
        <h4>{{props.setting.scanType}} {{$t('dashboard.threshold')}}
            <!-- <div>{{formatDate(state.cutOffTime, 'YYYY-MM-DD')}}</div>
            {{formatDate(state.cutOffDates.startDate, 'YYYY-MM-DD')}} ~ 
                {{formatDate(state.cutOffDates.endDate, 'YYYY-MM-DD')}} -->
        </h4>
        <el-progress :percentage="state.percentage" :show-text="false" 
            :status="state.initData.currentCount > state.initData.thresholdCount ? 'exception' : ''"/>

        <h3>{{state.initData.currentCount}} / {{state.initData.thresholdCount}}</h3>
        <SvgIcon v-if="!hideSetting" class="setting-man-made" src="/icons/setting.svg" @click="openSetting"/>

        <DashboardSetting ref="settingRef"
            :formJson="formJson" 
            @delete="handleDelete"
            @refresh="handleRefresh">
            <template v-if="state.cutOffDates && state.cutOffDates.startDate">
                {{formatDate(state.cutOffDates.startDate)}} ~ 
                {{formatDate(state.cutOffDates.endDate)}}
            </template>
        </DashboardSetting>
    </el-card>  
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { publicApi } from 'api'
import { watchDebounced } from '@vueuse/core'
import formJson from './threshold.vform.json'

dayjs.extend(isBetween);
const props = defineProps([
    'setting', 'dates', 'hideSetting'
])
const emits = defineEmits([
    'refreshSetting', 'delete'
])
const state = reactive<any>({
    initData: {},
    percentage: 0,
    cutOffTime: null,
    cutOffDates: {}
})
function resize() {}
async function getData(scanType: string) {
    try {
        let params: any = { scanType }
        const dates = await getDates()
        state.cutOffDates = dates
        if (dates) params = { ...params, ...dates }
        // const da
        const counts: any = await publicApi.api.postOcrQueryOcrThreshold(params).then(res => res.data)
        state.initData = counts
        state.percentage = (counts.currentCount / counts.thresholdCount * 100).toFixed(2)
    } catch (error) {
    }
}
async function getDates() {
    try {
        const currentDate = new Date()
        const setting: any = await publicApi.api.getAzureOcrQueryazureocrsetting().then(res => res.data)
        state.cutOffTime = setting.cutOffTime
        // state.cutOffTime = '2023-05-10'
        // state.cutOffTime = '2024-05-10'
        // state.cutOffTime = '2025-05-10'
        // state.cutOffTime = '2023-05-11'
        // state.cutOffTime = '2024-05-11'
        // state.cutOffTime = '2025-05-11'
        // state.cutOffTime = '2023-05-12'
        // state.cutOffTime = '2024-05-12'
        // state.cutOffTime = '2025-05-12'
        // state.cutOffTime = '2023-05-13'
        // state.cutOffTime = '2024-05-13'
        // state.cutOffTime = '2025-05-13'
        const diffYear = dayjs(currentDate).diff(state.cutOffTime,'year')
        let base = getBaseDiffYear(state.cutOffTime, currentDate)
        let startDate = dayjs(state.cutOffTime).add(diffYear + base, 'year').format('YYYY-MM-DD')
        let endDate = dayjs(state.cutOffTime).add(diffYear + base + 1, 'year').subtract(1, 'day').format('YYYY-MM-DD')
        
        while (!dayjs(currentDate).isBetween(startDate, endDate, 'day', '[]')) {
            base++
            startDate = dayjs(state.cutOffTime ).add(diffYear + base, 'year').format('YYYY-MM-DD')
            endDate = dayjs(state.cutOffTime ).add(diffYear + base + 1, 'year').subtract(1, 'day').format('YYYY-MM-DD')
        }
        return { startDate, endDate }
    } catch (error) {
        return null
    }
    function getBaseDiffYear(date1, date2) {
        const _date1 = new Date(date1)
        const _date1Month = _date1.getMonth()
        const _date1Date = _date1.getDate()
        const _date2 = new Date(date2)
        const _date2Month = _date2.getMonth()
        const _date2Date = _date2.getDate()
        return _date1Month === _date2Month && _date1Date === _date2Date ? -2 : -1
    }
}
// #region module: setting
    const settingRef = ref()
    function openSetting() {
        settingRef.value.handleOpen(props.setting)
    }
    function handleDelete() {
        emits('delete')
    }
    function handleRefresh(chartSetting) {
        emits('refreshSetting', chartSetting)
    }
// #endregion
watchDebounced(() => [props.setting, props.dates], (newValue, oldValue) => {
    if (!props.setting) return
    if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        getData(props.setting.scanType)
    }
},{ debounce: 200, maxWait: 500, immediate: true, deep: true })
defineExpose({
    resize
})
</script>
<style lang="scss" scoped>
</style>