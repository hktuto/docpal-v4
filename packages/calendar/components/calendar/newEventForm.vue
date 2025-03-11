<script lang="ts" setup>
import dayjs from 'dayjs'
import {ElMessage} from 'element-plus'
import { clientApi } from 'api'
const opened = ref(false);
const {options, newEventId, checkValid} = defineProps<{
    options: CalendarOptions,
    newEventId:string,
    checkValid?:Function
}>()
const { t} = useI18n()
const formRef = ref()
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
    isAllDay: false,
    detail: {}
})
const userId = useUserId();
async function getFilterOptions(){
    const user = await clientApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
    userFiterOptions.value = user.map(item => {
        return {
            label: item.username,
            value: item.userId
        }
    })
}
async function open(selectedDateTime: string, filter:any, data:any) {
    await getFilterOptions()
    const startDay = dayjs(selectedDateTime)
    opened.value = true;
    startTime.value = dayjs(selectedDateTime)
    form.value.detail = data
    form.value.startTime = snapDownTo15Minutes(startDay).toISOString(),
    form.value.endTime = snapDownTo15Minutes(startDay.add(15, 'minutes')).toISOString()
    form.value.location = filter.location
    form.value.category = filter.category || options.defaultCategory
    form.value.user = filter.user === 'currentUser' ? userId.value : filter.user
    // form.value.workflow = filter.workflow
}

function startTimeChange(val){
    const startDay = dayjs(val)
    if(startDay.isBefore(dayjs())) {
        ElMessage.error("Start time cannot be earlier than today");
    }
    form.value.startTime = snapDownTo15Minutes(startDay).toISOString()
    form.value.endTime= snapDownTo15Minutes(startDay.add(15, 'minutes')).toISOString()
}
function endTimeChange(val){
    const endTime = dayjs(val)
    if(endTime.isBefore(dayjs())) {
        ElMessage.error("End time cannot be earlier than today");
    }
    form.value.endTime = snapDownTo15Minutes(endTime).toISOString()
    form.value.startTime = snapDownTo15Minutes(endTime.subtract(15, 'minutes')).toISOString()
}
function snapDownTo15Minutes(time) {
  const minutes = time.minute();
  const snappedMinutes = Math.floor(minutes / 15) * 15;
  return time.minute(snappedMinutes).second(0);
}
const rules = reactive({
    startTime: [{
        required: true,
        message: t('msg_pleaseSelectStartTime'),
        trigger: 'blur'
    }],
    endTime:[ {
        required: true,
        message: t('msg_pleaseSelectEndTime'),
        trigger: 'blur'
    }],
    location: [{
        required: true,
        message: t('msg_pleaseSelectLocation'),
        trigger: 'blur'
    }],
    user: [{
        required: true,
        message: t('msg_pleaseSelectUser'),
        trigger: 'blur'
    }],
})
async function submit(){
    
    // check location and user
    try{
        const valid = await formRef.value.validate()
        // const okToSubmit = checkValid(form.value)
        if(!valid) return
        const data = {
            id: newEventId,
            eventId:"",
            startTime: dayjs(form.value.startTime).toISOString(),
            endTime: dayjs(form.value.endTime).toISOString(),
            eventName: form.value.user,
            title: form.value.user,
            category: form.value.category || options.defaultCategory,
            location: form.value.location,
            isAllDay: form.value.isAllDay,
            user: form.value.user,
        }
        if(checkValid) {
            const valid = await checkValid(data)
           console.log(valid)
        }
        emits('submit', data)
        opened.value = false
    }catch(err){
        console.log(err)
    }
}

defineExpose({
  open
})
</script>

<template>
    <ElDialog v-model="opened" append-to-body>
        <ElForm ref="formRef" label-position="top" :model="form" :rules="rules">
                <ElRow :gutter="20">
                    <ElCol  :span="12">
                        <ElFormItem :label="options.locationLabel || 'Location'" prop="location" required>
                            <ElSelect v-model="form.location" clearable placeholder="Select" >
                                <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol  :span="12">
                        <ElFormItem :label="options.userLabel || 'User'" prop="user" required>
                            <ElSelect v-model="form.user" clearable placeholder="Select" >
                                <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                            </ElSelect>
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span='12'>
                        <ElFormItem label="Start Time" prop="startTime" required>
                            <ElDatePicker v-model="form.startTime" type="datetime" placeholder="Select date and time" format="YYYY-MM-DD HH:mm" @change="startTimeChange" />
                        </ElFormItem>
                    </ElCol>
                    <ElCol :span='12'>
                        <ElFormItem label="End Time" prop="endTime" required>
                            <ElDatePicker v-model="form.endTime" type="datetime" placeholder="Select date and time" format="YYYY-MM-DD HH:mm" @change="endTimeChange" />
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