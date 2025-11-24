<script lang="ts" setup>
import dayjs from 'dayjs'
const defaultTime = ref<[Date, Date]>([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
const model = defineModel()
const shortcuts = [
  {
    text: 'This month',
    value: () => {
      const start = dayjs().startOf('month').format('YYYY-MM-DDT00:00:00')
      const end = dayjs().endOf('month').format('YYYY-MM-DDT23:59:59')
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const start = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DDT00:00:00')
      const end = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DDT23:59:59')
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const start = dayjs().subtract(3, 'month').startOf('month').format('YYYY-MM-DDT00:00:00')
      const end = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DDT23:59:59')
      return [start, end]
    }
  },
  {
    text: 'This year',
    value: () => {
      const start = dayjs().startOf('year').format('YYYY-MM-DDT00:00:00')
      const end = dayjs().endOf('year').format('YYYY-MM-DDT23:59:59')
      return [start, end]
    }
  },
  {
    text: 'Last year',
    value: () => {
      const start = dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DDT00:00:00')
      const end = dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DDT23:59:59')
      return [start, end]
    }
  }
]
function handleChange(value: [string, string]) {
  emit('change', value)
}
</script>
<template>
  <el-date-picker
    v-model="model"
    type="daterange"
    :shortcuts="shortcuts"
    start-placeholder="Start date"
    end-placeholder="End date"
    value-format="YYYY-MM-DD HH:mm:ss"
    :default-time="defaultTime"
  />
</template>
<style lang="scss" scoped></style>
