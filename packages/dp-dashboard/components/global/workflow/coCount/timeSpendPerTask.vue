<template>
    <div ref="cardRef" class="co-count co-count-chart">
        <div id="myEcharts" ref="chartRef" class="echart"></div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { publicApi } from 'api';

import { useEventListener } from '@vueuse/core'
const props = withDefaults( defineProps<{
    dates?: any,
    workflow?: string,
    user?: string
}>() , {
    workflow: '',
    user: ''
})
const { t } = useI18n()

type EChartsOption = echarts.EChartsOption;
const chartRef = ref()
const cardRef = ref()
let echartInstance
const emits = defineEmits([
    'refreshSetting', 'delete'
])
const setting = {
    defaultSetting: {
        options: {
            xAxis: {
                type: 'value',
            },
            title: {
                text: t('dashboard.WorkflowTimeSpendPerTask'),
                left: "left",
            },
            yAxis: {
                type: 'category',
                data: [],
                // show: false,
            },
            tooltip: {
                appendToBody: true,
                trigger: 'item'
            },
            legend: {
                bottom: '5%',
                left: 'center',
                itemWidth: 10,
                itemHeight: 10,
            }
        },
        series: {
            type: 'bar',
        }
    }
}
const state = reactive({
    data: [],
    Axis: []
})
let options: any = {}

// #region module: set
    function initStyle () {
        const pHeight = cardRef.value.offsetHeight
        const pWidth = cardRef.value.offsetWidth
        console.log(pHeight,pWidth)
        // 需要扣除 .el-card 的 padding
        chartRef.value.style = `height: ${pHeight}px; width: ${pWidth - 20}px`
    }
// #endregion
async function initChart() {
    initStyle()
    if (echartInstance) echartInstance.clear()
    echartInstance = echarts.init(chartRef.value);
    echartInstance.setOption(options);
}
function resize() {
    setTimeout(async() => {
        initStyle()
        if(!!echartInstance) echartInstance.resize()
    },10)
}
// #region module: setting
    async function handleInitChart(workflow) {
        options = { 
            ...setting.defaultSetting.options
        }
        // data
        await getData(workflow)
        options.yAxis.data = state.Axis
        options.series = state.data
        initChart()
    }
    async function getData(workflow: string) {
        try {
            const params: any = {
                workflowId: workflow, 
                userId: props.user 
            }
            if(props.dates) {
                params.gteDate = props.dates[0]
                params.lteDate = props.dates[1]
                // params.isQueryList = true
                // params.dateRange = {
                //     from: props.dates[0],
                //     to: props.dates[1]
                // }
            }
            const initData = await publicApi.api.postDashboardWorkflowactivatetaskspendtime(params).then(res => res.data)
            if(!initData) return
            state.data = Object.keys(initData).reduce((prev: any,key: any) => {
                prev.push({
                    ...setting.defaultSetting.series,
                    name: key,
                    data: [initData[key]]
                })
                return prev
            }, [])
        } catch (error) {
        }
    }
// #endregion
// #region module: 
// #endregion
onMounted(async() => {
    nextTick(async() => {
        initStyle()
        // 随着屏幕大小调节图表
        useEventListener(window, 'resize', resize)
    })
})
onUnmounted(() => {
    if(!!echartInstance) echartInstance.dispose()
})
watch(() => props, (newValue) => {
    handleInitChart(props.workflow)
}, {
    immediate: true,
    deep: true
})
defineExpose({
    resize
})
</script>

<style lang="scss" scoped>
</style>
