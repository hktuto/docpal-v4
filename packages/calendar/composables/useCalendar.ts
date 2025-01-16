import { get } from '@vueuse/core';
import { adminApi } from '../../../libraries/api/src/index';
import { onMounted } from "vue";

export const useCalendarSetting = () => useState('calendarSetting');

export const useCalendarStore = () => {
    const setting = useCalendarSetting();

    const calendarViewOptions = [
        "MONTH",
        "WEEK",
        "DAY"
    ]
    
    const weekDayOptions = [
        "MONDAY",
        "SUNDAY",
    ]

    async function getCalendarMasterTable(){
        const {data} = await adminApi.api.getCalendarsSettingTables() as any
        console.log("getCalendarMasterTable", data)
        return data
    }

    async function getCalendarsSetting(){
        const masterTable = await getCalendarMasterTable()
        const { data } = await adminApi.api.getCalendarsSetting() as any;
        setting.value = {
            basic: {
                default_view : calendarViewOptions.includes(data.basic.default_view) ? data.basic.default_view : "MONTH",
                default_first_week : weekDayOptions.includes(data.basic.default_first_week) ? data.basic.default_first_week : "MONDAY",
                default_slot : typeof data.basic.default_slot === 'number' ? data.basic.default_slot : 15,
                allow_custom_slot : data.basic.allow_custom_slot !== undefined ? data.basic.allow_custom_slot : false
            },
            location: {
                master_table : masterTable['Event Locations'],
                allow_custom: data?.location?.allow_custom !== undefined ? data.location.allow_custom : false,
                allow_empty: data?.location?.allow_empty !== undefined ? data.location.allow_empty : false,
            },
            category: {
                master_table: masterTable['Event Categories'] ,
            }
        };
    }

    onMounted(() => {
        getCalendarsSetting()
    })

    return {
        setting,
        getCalendarsSetting
    }

}