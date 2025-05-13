<template>
  <div ref="cardRef" class="co-count co-count-meta">
    <div id="myEcharts" ref="chartRef" class="echart"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
const emits = defineEmits(['drillDown'])
const props = withDefaults(
  defineProps<{
    meta?: string
    documentType?: string
    user?: string
    data?: any
  }>(),
  {
    meta: '',
    documentType: '',
    user: ''
  }
)
const { t } = useI18n()
let { chartRef, cardRef, resize, handleInitCard } = useDashboardCard({
  props,
  initStyleAction: () => {
    initStyle()
  },
  getOptions: async (data) => {
    const resultOptions: any = {
      title: {
        text: t('dashboard.fileSizes'),
        left: 'left'
      },
      tooltip: {
        appendToBody: true,
        trigger: 'item',
        position: 'right'
      },
      legend: {
        top: '20px',
        right: '0px',
        type: 'scroll',
        orient: 'vertical',
        itemWidth: 10,
        itemHeight: 10,
        tooltip: {
          appendToBody: true,
          show: true
        },
        formatter: function (name) {
          return echarts.format.truncateText(name, 50, '12px Microsoft Yahei', '…')
        }
      }
    }
    // data
    const formatData = await getData(data)
    resultOptions.title.text = `${t('rightDetail_meta')}/${t(props.meta)}`
    resultOptions.series = {
      name: `${t('rightDetail_meta')}/${t(props.meta)}`,
      type: 'pie',
      center: ['32%', '50%'],
      avoidLabelOverlap: true,
      label: {
        normal: {
          position: 'inside', // 在内部显示，outseide 是在外部显示
          show: true,
          formatter: '{d}%'
        }
      },
      data: formatData
    }
    console.log({ resultOptions })

    return resultOptions
  },
  onClick: (instance) => {
    instance.on('click', (event) => {
      emits('drillDown', { meta: props.meta, key: event.data.key })
    })
  }
})
// #region module: set
function initStyle() {
  const pHeight = cardRef.value.offsetHeight
  const pWidth = cardRef.value.offsetWidth
  // 需要扣除 .el-card 的 padding
  chartRef.value.style = `height: ${pHeight}px; width: ${pWidth - 10}px`
}
// #endregion

async function getData(data) {
  let formatData = []
  try {
    formatData = data.buckets.reduce((prev, item) => {
      prev.push({
        value: item.doc_count,
        name: item.key_as_string ? formatDate(item.key_as_string) : item.key,
        key: item.key
      })
      return prev
    }, [])
  } catch (error) {
    throw new Error(error)
  } finally {
    return formatData
  }
}
watch(
  () => props.data,
  (newData) => {
    handleInitCard(newData)
  },
  { immediate: true, deep: true }
)
defineExpose({
  resize
})
</script>

<style lang="scss" scoped>
.co-count-meta {
  width: 100%;
  height: 100%;
  min-height: 180px;
}
</style>
