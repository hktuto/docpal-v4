<template>
    <div ref="cardRef" class="co-count co-count-chart">
        <div id="myEcharts" ref="chartRef" class="echart"></div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { useEventListener, watchDebounced } from '@vueuse/core'
import { publicApi } from "api";
const props = withDefaults( defineProps<{
    dates?: any;
    documentType?: string,
    user?: string
}>() , {
    documentType: '',
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
                type: 'category',
                boundaryGap: false,
                data: []
            },
            title: {
                text: t('dashboard.newFiles'),
                left: "left",
            },
            yAxis: {
                type: 'value'
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
            type: 'line',
            smooth: true
        }
    }
}
const state = reactive({
    data: [],
    xAxis: []
})
let options: any = {}

// #region module: set
    function initStyle () {
        const pHeight = cardRef.value.offsetHeight
        const pWidth = cardRef.value.offsetWidth
        // 需要扣除 .el-card 的 padding
        chartRef.value.style = `height: ${pHeight}px; width: ${pWidth - 20}px`
    }
// #endregion
async function initChart() {
    if (echartInstance) echartInstance.clear()
    echartInstance = echarts.init(chartRef.value);
    echartInstance.setOption(options);
}
async function GetCoCountData(params: any, creator?: string) {
    if(creator) return await publicApi.api.postDashboardNewfilesofspecifyusercountbydtypebymonthlycumulation({
        ...params,
        creator
    }).then(res => res.data)
    return await publicApi.api.postDashboardNewfilesofuserscountbydtypebymonthlycumulation(params, {
        baseURL: '/dashboard'
    }).then(res => res.data)
}
function resize() {
    setTimeout(async() => {
        initStyle()
        if(!!echartInstance) echartInstance.resize()
    })
}
// #region module: setting
    async function handleInitChart(documentType) {
        options = { 
            ...setting.defaultSetting.options
        }
        // data
        await getData(documentType)
        options.xAxis.data = state.xAxis
        options.series = {
            ...setting.defaultSetting.series,
            data: state.data
        }
        initChart()
    }
    async function getData(documentType: string) {
        try {
            const params: any = {
                primaryType: documentType,
            }
            if (props.dates) {
                params.isQueryList = true
                params.dateRange = {
                    from: props.dates[0],
                    to: props.dates[1]
                }
            }
            const res: any = await GetCoCountData(params, props.user)
            state.xAxis = []
            const initData = res.group_document_type.buckets[0].group_by_time.buckets
            state.data = initData.reduce((prev,item) => {
                prev.push(item.doc_count)
                state.xAxis.push(item.key_as_string)
                return prev
            }, [])
        } catch (error) {
            state.data = []
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
watchDebounced(props, (newValue, oldValue) => {
    if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        if(!!newValue) handleInitChart(newValue.documentType)
    }
},{ debounce: 200, maxWait: 500, immediate: true })
defineExpose({
    resize
})
</script>

<style lang="scss" scoped>
</style>
