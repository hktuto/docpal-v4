import { useEventListener, watchDebounced } from '@vueuse/core'
import * as echarts from 'echarts'
export type useDashboardCardParams = {
  initStyleAction?: (cardRef: any, chartRef: any) => void
  initStyleActionExtend?: (pHeight: number, pWidth: number) => void
  resizeAction?: (instance: any) => void
  resizeActionExtend?: () => void
  onClick?: (instance: any) => void

  handleInitCardAction?: (chartSetting: any) => void
  handleRefreshAction?: (chartSetting: any) => void
  getOptions?: (chartSetting: any) => any
  options?: any

  props: any
}
export const useDashboardCard = (params: useDashboardCardParams) => {
  const props = params.props
  let echartInstance: any
  const chartRef = ref<any>()
  const cardRef = ref<any>()
  const settingRef = ref<any>()
  const loading = ref(false)

  const initStyle = () => {
    if (params.initStyleAction) {
      params.initStyleAction(cardRef, chartRef)
    } else {
      // TODO: cardRef 可能为空
      if(!cardRef.value) return
      const pHeight = cardRef.value.$el.offsetHeight - 36 // - header
      const pWidth = cardRef.value.$el.offsetWidth - 20
      if (chartRef.value) chartRef.value.style = `height: ${pHeight}px; width: ${pWidth}px`
      if (params.initStyleActionExtend) params.initStyleActionExtend(pHeight, pWidth)
    }
  }

  const initChart = (_options: any) => {
    if (echartInstance) echartInstance.clear()
    if (chartRef.value && _options) {
      echartInstance = echarts.init(chartRef.value)
      echartInstance.setOption(_options)
      echartInstance.resize()
    }
  }

  // refresh: handleRefreshAction || handleInitCard
  const refresh = async (chartSetting ?:any) => {
    if (params.handleRefreshAction) {
      try {
        loading.value = true
        await params.handleRefreshAction(chartSetting)
      } catch (error: any) {
        console.error(error)
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 300))
        loading.value = false
      }
    } else handleInitCard(chartSetting)
  }
  const handleInitCard = async (chartSetting?:any) => {
    try {
      loading.value = true
      if (!params.handleInitCardAction) {
        const options = params.getOptions ? await params.getOptions(chartSetting) : params.options ? params.options : null
        initChart(options)
      } else {
        params.handleInitCardAction(chartSetting)
      }
    } catch (error: any) {
      console.error(error)
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 300))
      loading.value = false
    }
    if (params.onClick) params.onClick(echartInstance)
  }
  const getInstance = () => {
    return echartInstance
  }
  const resize = () => {
    setTimeout(() => {
      if (params.resizeAction) {
        params.resizeAction(echartInstance)
      } else {
        initStyle()
        if (echartInstance) echartInstance.resize()
      }
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

      if (!props.setting) return
      if (!oldValue || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        handleInitCard(props.setting)
      }
    },
    { debounce: 200, maxWait: 500, immediate: true }
  )

  return {
    loading,
    chartRef,
    cardRef,
    settingRef,
    initChart,
    resize,
    refresh,
    handleInitCard,
    getInstance
  }
}
