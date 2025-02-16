<template>
    <el-date-picker
        v-model="model"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        :shortcuts="shortcuts"
        :clearable="false"
        value-format="YYYY-MM-DD"
        @change="handleChange"
      />
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
const model = defineModel()
const shortcuts = [
    {
        text: 'This month',
        value: () => {
            const start = dayjs().startOf('month').format('YYYY-MM-DD');
            const end = new Date()
            return [start, end]
        },
    },
    {
        text: 'Last month',
        value: () => {
            const start = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
            const end = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
            return [start, end]
        },
    },
    {
        text: 'Last 3 months',
        value: () => {
            const start = dayjs().subtract(3, 'month').startOf('month').format('YYYY-MM-DD');
            const end = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
            return [start, end]
        },
    },
    {
        text: 'This year',
        value: () => {
            const start = dayjs().startOf('year').format('YYYY-MM-DD');
            const end = new Date()
            return [start, end]
        },
    },
    {
        text: 'Last year',
        value: () => {
            const start = dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');
            const end = dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');
            return [start, end]
        },
    },
]

</script>
<style lang="scss" scoped>
</style>
