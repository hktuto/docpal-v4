<script lang="ts" setup>
import dayjs from 'dayjs'
const opened = ref(false);
const { setting } = useCalendarStore();
const {options} = defineProps<{
    options: CalendarOptions,
}>()
const emits = defineEmits(['submit'])
const startTime = ref<any>()
const form = ref({
})
function open(selectedDateTime: string, filter:any) {
    opened.value = true;
    startTime.value = dayjs(selectedDateTime)
}

function submit(){
    emits('submit', form.value)
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