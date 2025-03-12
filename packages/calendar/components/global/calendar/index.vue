<script lang="ts" setup>
    import dayjs from 'dayjs'
    import {clientApi} from 'api'
    import type { CalendarEventExternal } from '@schedule-x/calendar'

    const { setting: calendarSettiing, categoriesOption, locationsOption } = useCalendarStore();
    import {type CalendarOptions, type DocPalEventType,  convertSiteEventToCalendarEvent} from '../../../utils/calendarHelper'
    import CalendarViewer from './viewer.vue'
    import CalendarDetailDialog from './detailDialog.vue'

    const viewerRef = ref<InstanceType<typeof CalendarViewer>>()
    const detailDialogRef = ref<InstanceType<typeof CalendarDetailDialog>>()
    const {options = {
        allowCreate: false,
        editable: false,
        showWorkflowFilter: false,
        showLocationFilter: false,
        showUserFilter: false,
        showCategoryFilter: false,
        defaultUser: "",
        defaultLocation: "",
        defaultCategory: "",
        locationLabel:"",
        categoryLabel:"",
        userLabel:"",
        
    },addtionalCheckBeforeEventUpdate} = defineProps<{
        options?: CalendarOptions;
        addtionalCheckBeforeEventUpdate: (oldEvent:any, editedEvent:any) => boolean
    }>();

    const displayOption = ref<CalendarOptions>({
        ...options,
    })

    const emits = defineEmits(['createEvent','filterChange','openDetail','onEventUpdate'])
    const newEventFromRef = ref();
    function addEvent(newEvent:CalendarEventExternal){
        viewerRef.value?.addEvent(newEvent)
    }

    function getEvent(id:string){
        return viewerRef.value?.getEvent(id)
    }

    function updateEvent(newEvent:CalendarEventExternal){
        viewerRef.value?.updateEvent(newEvent)
    }
        
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
            userFiterOptions.value.unshift({
                label: "Current User",
                value: "currentUser"
            })
        }catch(err){
            console.log("no user", err)
        }
    }

    async function setDefaultFilter(){
        console.log("setDefaultFilter", options)
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
        if(!options.view){
            displayOption.value.view = calendarSettiing.value?.basic.default_view
        }
        if(!options.firstDayOfWeek){
            displayOption.value.firstDayOfWeek = calendarSettiing.value?.basic.default_first_week
        }
    }
    // #endregion

    function openDetail(event:CalendarEventExternal){
        detailDialogRef.value?.open(event)
    }

    // calendar Event
    const calendarEvents = {
        onEventClick: (args:any) => {
            console.log("onEventClick", args, options)
            if(options.editable) {
                emits('openDetail', args)
            }else {
                detailDialogRef.value?.open(args)
            }
        },
        onClickDate: (args:string) => {
            console.log('onClickDate', args)
        },
        onClickDateTime: (args:string) => {
            if(!options.allowCreate) return
            emits('createEvent', args)
        },
        onClickAgendaDate: (args) => {
            console.log('onClickAgendaDate', args)
        },
        onClickPlusEvents: (args) => {
            console.log('onClickPlusEvents', args)
        },
        onEventUpdate: (args:any) => {
            console.log("onEventUpdate", args)
        }
    }
    function filterChange(){
        emits('filterChange', filter.value)
        viewerRef.value?.getList()
    }

    const filtetColumnWidth = computed(() => {
        let item = 0;
        if(options.showCategoryFilter) {
            item++
        }
        if(options.showUserFilter) {
            item++
        }
        if(options.showLocationFilter) {
            item++
        }
        return 24 / item
    })

    onMounted(async () => {
        await setDefaultFilter()
    })

    const eventList = computed( () => viewerRef.value?.eventList || [])

    defineExpose({
        addEvent,
        getEvent,
        updateEvent,
        filter,
        openDetail,
        eventList
    })
</script>

<template>
<div class="calendarViewerContainer">
    <div class="filterContainer">
        <ElForm label-position="top">
        <ElRow :gutter="20">
            <ElCol v-if="options.showLocationFilter" :span="filtetColumnWidth">
                <ElFormItem :label="options.locationLabel || 'Location'">
                    <ElSelect v-model="filter.location" clearable placeholder="Select" @change="filterChange">
                        <ElOption v-for="item in locationsOption" :key="item.id" :label="item.name" :value="item.id" />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol v-if="options.showUserFilter" :span="filtetColumnWidth">
                <ElFormItem :label="options.userLabel || 'User'">
                    <ElSelect v-model="filter.user" clearable placeholder="Select" @change="filterChange">
                        <ElOption v-for="item in userFiterOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol v-if="options.showCategoryFilter" :span="filtetColumnWidth">
                <ElFormItem :label="options.categoryLabel || 'Category'">
                    <ElSelect v-model="filter.category" clearable placeholder="Select" @change="filterChange">
                        <ElOption v-for="item in categoriesOption" :key="item.id" :label="item.name" :value="item.id" />
                    </ElSelect>
                </ElFormItem>   
                </ElCol>
        </ElRow>
        </ElForm>
        
    </div>
    <CalendarDetailDialog ref="detailDialogRef" :options="options" :addtionalCheckBeforeEventUpdate="addtionalCheckBeforeEventUpdate"/>
    <CalendarViewer ref="viewerRef" :options="options" :filter="filter" v-on="calendarEvents" />
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