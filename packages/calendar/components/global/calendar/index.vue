<script lang="ts" setup>
import dayjs from 'dayjs'
import {clientApi} from 'api'
const { categoriesOption, locationsOption } = useCalendarStore();
import {type CalendarOptions, type DocPalEventType,  convertSiteEventToCalendarEvent} from '../../../utils/calendarHelper'
import CalendarViewer from './viewer.vue'

const viewerRef = ref<InstanceType<typeof CalendarViewer>>()
const {options = {
    editable: false,
    allowCreate: false,
    showWorkflowFilter: false,
    showLocationFilter: false,
    showUserFilter: false,
    showCategoryFilter: false,
    defaultUser: "",
    defaultLocation: "",
    defaultCategory: "",
}} = defineProps<{
    options?: CalendarOptions;
}>();

// #region filter logic
const filter = ref({
    category:"",
    user:"",
    location:"",
    workflow:""
})
const userFiterOptions = ref<any>([])
async function getFilterOptions(){
    try{
        const user = await clientApi.api.postNuxeoIdentityUsers({}).then(res => res.data)
        if(!user) throw new Error("no user")
        userFiterOptions.value = user.map(item => {
            return {
                label: item.username,
                value: item.userId
            }
        })
    }catch(err){
        console.log("no user", err)
    }
}

async function setDefaultFilter(){
    if(options.showCategoryFilter || options.showLocationFilter || options.showUserFilter){
        await getFilterOptions()
    }
    if(options.defaultUser){
        filter.value.user = options.defaultUser
    }
    if(options.defaultLocation){
        filter.value.location = options.defaultLocation
    }
    if(options.defaultCategory){
        filter.value.category = options.defaultCategory
    }
}
// #endregion

function addEvent(newForm:DocPalEventType){
    const ev = convertSiteEventToCalendarEvent(newForm)
    ev._options = {
        disableResize: true,
        disableDND: false,
    }
    viewerRef.value?.calendarApp.eventsService.add(ev)
    
}

onActivated(async () => {
    await setDefaultFilter()
})

defineExpose({
    addEvent
})
</script>

<template>
<div class="calendarViewerContainer">
    <div class="filterContainer">
        <ElForm label-position="top">
        <ElRow :gutter="20">
            <ElCol v-if="options.showLocationFilter" :span="filtetColumnWidth">
                <ElFormItem label="Location">
                    <ElSelect v-model="filter.location" clearable placeholder="Select" @change="getCurrentRangeEvent">
                        <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol v-if="options.showUserFilter" :span="filtetColumnWidth">
                <ElFormItem label="User">
                    <ElSelect v-model="filter.user" clearable placeholder="Select" @change="getCurrentRangeEvent">
                        <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol v-if="options.showCategoryFilter" :span="filtetColumnWidth">
                <ElFormItem label="Category">
                    <ElSelect v-model="filter.category" clearable placeholder="Select" @change="getCurrentRangeEvent">
                        <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id" />
                    </ElSelect>
                </ElFormItem>   
                </ElCol>
        </ElRow>
        </ElForm>
        
    </div>
    <CalendarViewer ref="viewerRef" :options="options" :filter="filters" />
</div>

</template>

<style lang="scss" scoped>
.calendarViewerContainer{
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;
}
</style>