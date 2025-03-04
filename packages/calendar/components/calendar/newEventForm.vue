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
    
    const form = {
        eventId:"",
        startTime: startTime.value.toISOString(),
        endTime: dayjs(startTime.value).add(15, 'minutes').toISOString(),
        eventName: 'test event',
        description: 'test event description',
        category: "9949630c-b07e-4b83-87c0-b6f522f6207e",
        location:"2e5705eb-f36e-4569-8a4b-3822e9f9d809",
        edited:false,
    }
    console.log("form", form)
    emits('submit', form)
    opened.value = false
}

defineExpose({
  open
})
</script>

<template>
    <ElDialog v-model="opened" append-to-body>
        {{ options }}
        {{ startTime }}
        <ElButton @click="submit">Submit</ElButton>
    </ElDialog>

</template>