<script lang="ts" setup>
import dayjs from 'dayjs'
const opened = ref(false);
const { setting } = useCalendarStore();
const {options} = defineProps<{
    options: CalendarOptions,
}>()
const startTime = ref<any>()
function open(selectedDateTime: string) {
    opened.value = true;
    startTime.value = dayjs(selectedDateTime)
}

defineExpose({
  open
})
</script>

<template>
    <ElDialog v-model="opened" append-to-body>
        {{ options }}
        {{ startTime }}
    </ElDialog>

</template>