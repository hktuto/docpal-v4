<script lang="ts" setup>
import dayjs from 'dayjs'
import { clientApi } from 'api'
const opened = ref(false);
const {options} = defineProps<{
    options: CalendarOptions,
}>()
const { categoriesOption, locationsOption } = useCalendarStore();
const userFiterOptions = ref<any>([])
const emits = defineEmits(['submit'])
const startTime = ref<any>()
const form = ref({
    startTime: '',
    endTime: '',
    eventName: '',
    description: '',
    category: "",
    user:"",
    location: "",
    edited:false,
    data: {}
})
async function getFilterOptions(){
    const user = await clientApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
    userFiterOptions.value = user.map(item => {
        return {
            label: item.username,
            value: item.userId
        }
    })
}
function open(selectedDateTime: string, filter:any, data:any) {
    getFilterOptions()
    const startDay = dayjs(selectedDateTime)
    opened.value = true;
    startTime.value = dayjs(selectedDateTime)
    form.value.data = data
    form.value.startTime = snapDownTo15Minutes(startDay).toISOString(),
    form.value.endTime= snapDownTo15Minutes(startDay.add(15, 'minutes')).toISOString()
    form.value.location = filter.location
    form.value.category = filter.category
    form.value.user = filter.user
    // form.value.workflow = filter.workflow
}
function snapDownTo15Minutes(time) {
  const minutes = time.minute();
  const snappedMinutes = Math.floor(minutes / 15) * 15;
  return time.minute(snappedMinutes).second(0);
}
function submit(){
    const form = {
        eventId:"",
        startTime: snapDownTo15Minutes(dayjs(startTime.value)).to,
        endTime: dayjs(startTime.value).add(15, 'minutes').toISOString(),
        eventName: 'test event',
        description: 'test event description',
        category: "9949630c-b07e-4b83-87c0-b6f522f6207e",
        location:"2e5705eb-f36e-4569-8a4b-3822e9f9d809",
        edited:false,
    }
    emits('submit', form)
    opened.value = false
}

defineExpose({
  open
})
</script>

<template>
    <ElDialog v-model="opened" append-to-body>
        <ElForm label-position="top">
                <ElRow :gutter="20">
                    <ElCol  :span="12">
                        <ElFormItem label="Location">
                            <ElSelect v-model="form.location" clearable placeholder="Select" @change="getCurrentRangeEvent">
                                <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol  :span="12">
                        <ElFormItem label="User">
                            <ElSelect v-model="form.user" clearable placeholder="Select" @change="getCurrentRangeEvent">
                                <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span='12'>
                        <ElFormItem label="Start Time">
                            <ElDatePicker v-model="form.startTime" type="datetime" placeholder="Select date and time" format="YYYY-MM-DD HH:mm"  />
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span='12'>
                        <ElFormItem label="End Time">
                            <ElDatePicker v-model="form.endTime" type="datetime" placeholder="Select date and time" format="YYYY-MM-DD HH:mm"  />
                        </ElFormItem>
                    </ElCol>
                    <!-- <ElCol :span="12">
                        <ElFormItem label="Category">
                            <ElSelect v-model="form.category" clearable placeholder="Select" @change="getCurrentRangeEvent">
                                <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id" />
                            </ElSelect>
                        </ElFormItem>   
                        </ElCol> -->
                </ElRow>
                </ElForm>
        <ElButton @click="submit">Submit</ElButton>
    </ElDialog>

</template>