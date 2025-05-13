import { useEventListener, watchDebounced } from '@vueuse/core'
import * as echarts from 'echarts'
export type useDashboardCardParams = {
  initStyleAction?: () => void
  initStyleActionExtend?: (pHeight: number, pWidth: number) => void
  resizeAction?: () => void
  resizeActionExtend?: () => void
  getOptions?: (chartSetting) => any
  options?: any
  props: any
}
export const useDashboardCard = (params: useDashboardCardParams) => {
  const props = params.props
  let echartInstance
  const chartRef = ref()
  const cardRef = ref()
  const settingRef = ref()

  const initStyle = params.initStyleAction
    ? params.initStyleAction
    : () => {
        const pHeight = cardRef.value.$el.offsetHeight - 30
        const pWidth = cardRef.value.$el.offsetWidth - 40
        chartRef.value.style = `height: ${pHeight}px; width: ${pWidth}px`
        if (params.initStyleActionExtend) params.initStyleActionExtend(pHeight, pWidth)
      }

  const initChart = (_options) => {
    if (echartInstance) echartInstance.clear()
    echartInstance = echarts.init(chartRef.value)
    echartInstance.setOption(_options)
  }
  const handleInitChart = async (chartSetting) => {
    console.log('handleInitChart')
    const options = params.getOptions ? await params.getOptions(chartSetting) : params.options ? params.options : {}
    console.log(options)

    initChart(options)
  }
  const resize = () => {
    setTimeout(() => {
      initStyle()
      echartInstance.resize()
    })
  }
 
  onMounted(async () => {
    console.log('????onMounted?????')
    setTimeout(async () => {
      initStyle()
      // 随着屏幕大小调节图表
      useEventListener(window, 'resize', resize)
    })
  })
  onUnmounted(() => {
    if (!!echartInstance) echartInstance.dispose()
  })
  watchDebounced(
    () => [props.setting, props.dates],
    (newValue, oldValue) => {
      console.log(newValue, oldValue)

      if (!props.setting) return
      if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        handleInitChart(props.setting)
      }
    },
    { debounce: 200, maxWait: 500, immediate: true }
  )

  return {
    chartRef,
    cardRef,
    settingRef,
    initChart,
    resize
  }
}
