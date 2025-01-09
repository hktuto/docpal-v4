<template>
    <div ref="cardRef" class="dashboard-item">
        <div id="myEcharts" ref="chartRef" class="echart"></div>
    </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { useEventListener, watchDebounced } from '@vueuse/core'
import dayjs from 'dayjs'
import { getYearMonthDates } from '../../../utils/tool'
import { publicApi } from 'api'
const props = withDefaults( defineProps<{
    dataType?: string,
    dates?: any
}>() , {
    dataType: 'workflow',
})
const dateFormat = userDisplayTimeSetting()
const chartRef = ref()
const cardRef = ref()
let echartInstance
const emits = defineEmits([
    'refreshSetting', 'delete', 'drillDown'
])
const state = reactive<any>({
    curXName: '',
    curSeriesName: ''
})
const setting = {
    defaultSetting: {
        options: {
            xAxis: {
                type: 'category',
                axisPointer: {
                    type: 'shadow'
                }
            },
            yAxis: { type: 'value', name: 'Page' },
            tooltip: {
                appendToBody: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            legend: {
                bottom: '5%',
                left: 'center',
                itemWidth: 10,
                itemHeight: 10,
            },
            toolbox: {
                feature: {
                    // dataView: { show: true, readOnly: false },
                    // magicType: { show: true, type: ['line', 'bar'] },
                    // restore: { show: true },
                    // saveAsImage: { show: true }
                }
            }
        },
        series: []
    },
    defaultSeriesBarSetting: {
        type: 'bar',
        tooltip: {
            appendToBody: true,
            valueFormatter: function (value) {
                return value
            }
        },
        itemStyle: {
            normal: {
                label:{ show:true },
            }
        },
        emphasis: {
            focus: 'series'
        },
    },
    defaultSeriesLineSetting: {
        type: 'line',
        tooltip: {
            appendToBody: true,
            valueFormatter: function (value) {
                return value
            }
        }
    }
}

let options:any = {}

// #region module: set
    function initStyle () {
        const pHeight = cardRef.value.offsetHeight
        const pWidth = cardRef.value.offsetWidth
        // 需要扣除 .el-card 的 padding
        chartRef.value.style = `height: ${pHeight}px; width: ${pWidth - 20}px`
    }
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
// #endregion
// #region module: setting
    async function handleInitChart(dataType: string) {
        options = { 
            ...setting.defaultSetting.options
        }
        const { xAxis, series } = await getData(dataType)
        options.xAxis.data = xAxis
        options.series = series
        initChart()
        echartInstance.on('click', (event: any) => drillDown(event))
    }
    function drillDown(params) {
        const month = dayjs(props.dates[0]).diff(props.dates[1], 'month')
        if (month === 0) return 
        // 只更新被点击的柱子的样式  
        var curSeriesIndex = params.seriesIndex; // 获取被点击的系列索引  
        var curDataIndex = params.dataIndex; // 获取被点击的数据项索引  
        setHighlight(curSeriesIndex, curDataIndex) 
        const drillDownParams: any = {
            startDate: dayjs(params.name).format(dateFormat),
            endDate: dayjs(params.name).endOf('month').format(dateFormat),
            [props.dataType]: params.seriesName
        }
        emits('drillDown', drillDownParams)
    }
    const GetOcrProcessApi = async({dataType, mode, startDate, endDate}: any) => {
        if (dataType == 'workflow') {
            if (mode === 'date') 
                return await publicApi.api.postOcrQueryDailyWorkflowInfo({
                    startDate, endDate
                }).then(res => res.data) 
            else 
                return await publicApi.api.postOcrQueryWorkflowInfo({
                    startDate, endDate
                }).then(res => res.data) 
        } else {
            if (mode === 'date') 
                return await publicApi.api.postOcrQueryDailyScanTypeInfo({
                    startDate, endDate
                }).then(res => res.data) 
            else 
                return await publicApi.api.postOcrQueryScanTypeInfo({
                    startDate, endDate
                }).then(res => res.data) 
        }
    }
    function setHighlight(curSeriesIndex = -1, curDataIndex: -1) {
        const currentOption = echartInstance.getOption();  
        currentOption.series.forEach((seriesItem, seriesIndex) => {
            if(seriesItem.data) {
                seriesItem.data.forEach((dataItem, dataIndex) => {
                    if(curSeriesIndex === seriesIndex && curDataIndex === dataIndex && dataItem.value) {
                        dataItem.itemStyle = {
                            borderColor: 'red',
                            borderWidth: 2,
                        }
                    } else if(dataItem.value) {
                        dataItem.itemStyle = {}
                    }
                });
            }
        });
        // 使用更新后的配置项重新渲染图表  
        echartInstance.setOption(currentOption, true); 
    }
    async function getData(dataType: string) {
        try {
            const month = dayjs(props.dates[0]).diff(props.dates[1], 'month')
            const mode = month === 0 ? 'date' : 'yearMonth'
            const initData = await GetOcrProcessApi({ 
                dataType, 
                mode, 
                startDate: props.dates[0],
                endDate: props.dates[1]
            })
            const { xAxis, totalData, yData } = getXAxisAndFillZeroData(initData, mode)
            const series: any = [
                {
                    name: 'Total',
                    data: totalData,
                    ...setting.defaultSeriesLineSetting
                }
            ]
            Object.keys(yData).forEach(key => {
                series.push({
                    name: key,
                    type: 'bar',
                    data: yData[key].map(item => ({
                        value: item.pageCount
                    })),
                    ...setting.defaultSeriesBarSetting
                })
            })
            return {
                xAxis,
                series
            }
        } catch (error) {
        }
        
    }
    function getXAxisAndFillZeroData (data, mode) {
        const yData: any = {}
        const xData: any = {}
        const xAxis: any = getYearMonthDates(props.dates[0], props.dates[1], mode)
        data.forEach((item: any) => {
            if(!yData[item.name]) yData[item.name] = []
            if(!xData[item[mode]]) xData[item[mode]] = []
            yData[item.name].push(item)
            xData[item[mode]].push(item.pageCount)
        })
        
        Object.keys(yData).forEach(name => {
            xAxis.forEach(x => {
                if(!yData[name].find(item => item.date + '' === x || item.yearMonth + '' === x)) {
                    yData[name].push({
                        [mode]: x,
                        pageCount: 0,
                        name
                    })
                }
            });
            yData[name] = yData[name].sort((a, b) => a[mode] - b[mode])
        })
        
        const totalData = xAxis.reduce((prev,key) => {
            if(!xData[key]) prev.push(0)
            else {
                const count = xData[key].reduce((acc, cur) => {
                    acc += cur
                    return acc
                }, 0)
                prev.push(count)
            }
            return prev
        }, []); 
        return {
            xAxis,
            yData,
            xData,
            totalData
        }
    }
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
watchDebounced(() => props, (newValue, oldValue) => {
    if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        nextTick(() => {
            handleInitChart(props.dataType)

        })
    }
}, {
    debounce: 200, 
    maxWait: 500,
    immediate: true,
    deep: true
})
defineExpose({
    resize, setHighlight 
})
</script>
<style lang="scss" scoped>
.dashboard-item {
    height: 100%;
}
</style>
