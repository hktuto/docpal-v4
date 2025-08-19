
import { adminApi, clientApi } from 'api';
import { onMounted } from "vue";
import { viewName } from '../utils/calendarHelper';

type CalendarVieweCalendar = {
    colorName: string,
      lightColors: {
        main: string,
        container: string,
        onContainer: string,
      },
      darkColors: {
        main: string,
        onContainer: string,
        container: string,
      },
}
type CalendarVieweCalendarSetting = {
    [key: string]: CalendarVieweCalendar
    
}

export const useCalendarSetting = () => useState<any>('calendarSetting');
export const useCategoriesColumn = () => useState<any[]>('categoriesColumn');
export const useCalenarCategories = () => useState<any[]>('calendarCategories', () =>([]));
export const useCalenarLocation = () => useState<any[]>('calendarLocations', () =>([]));
export const useCalendarViewerCategories = () => useState<CalendarVieweCalendarSetting>('calendarViewerCategories');

export const useCalendarStore = () => {
    const setting = useCalendarSetting();
    
    const calendarViewOptions = viewName
    
    const weekDayOptions = [
        "MONDAY",
        "SUNDAY",
    ]

    
    const timeSelecteStep = computed(() => {
        return '00:' + setting.value.basic.default_slot
    })

    const timeSelectLimit = computed(() => {
        return {
            start: setting.value.basic.office_start_time || '00:00',
            end: setting.value.basic.office_end_time || '24:00',
        }
    })

    const categoriesColumn = useCategoriesColumn()
    async function getCatergoriesColumn(){
        const appPlatform = useAppPlatform()
        const api = appPlatform.value === 'admin' ? adminApi : clientApi
        const {data} = await api.api.getMasterTablesId(setting.value.category.master_table) as any
        categoriesColumn.value = data.fields;
    }

    async function getCalendarMasterTable(){
        const appPlatform = useAppPlatform()
        const api = appPlatform.value === 'admin' ? adminApi : clientApi
        console.log("api", api.instance.defaults.baseURL)
        const {data} = await api.api.getCalendarsSettingTables() as any
        return data
    }

    const categoriesOption = useCalenarCategories()
    const calendarViewerCategories = useCalendarViewerCategories()
    async function getCategories(){
        const appPlatform = useAppPlatform()
        const api = appPlatform.value === 'admin' ? adminApi : clientApi
        const { data } = await api.api.postMasterTablesRecords({
            id: setting.value.category.master_table
        }) as any
        categoriesOption.value = data || []
        // create calendar viewer calendar
        calendarViewerCategories.value = data.reduce((result:CalendarVieweCalendarSetting, item:any) => {
            const calendar: CalendarVieweCalendar = {
                colorName: item.name,
                lightColors: {
                    main: item.color || '#409EFF',
                    container: item.Container_Color || '#409EFF',
                    onContainer: item.onContainer || '#fff',
                },
                darkColors: {
                    main: item.color || '#409EFF',
                    container: item.Container_Color || '#409EFF',
                    onContainer: item.onContainer || '#fff',
                },
            }
            result[item.id] = calendar
            return result
        },{})
    }

    const locationsOption = useCalenarLocation()
    async function getLocations(){
      const appPlatform = useAppPlatform()
      const api = appPlatform.value === 'admin' ? adminApi : clientApi
        const data = await api.api.postMasterTablesRecords({
            id: setting.value.location.master_table
        }).then(res => res.data) as any;
        locationsOption.value = (data || []).filter(i => i.status).sort((a,b) => a.name.localeCompare(b.name))
    }

    async function getCalendarsSetting(){
        const masterTable = await getCalendarMasterTable()
        const appPlatform = useAppPlatform()
        const api = appPlatform.value === 'admin' ? adminApi : clientApi
        const { data } = await api.api.getCalendarsSetting() as any;
        const { public: { platform } } = useRuntimeConfig();

        setting.value = {
            basic: {
                default_view : !data.basic?.default_view ? "MONTH" : calendarViewOptions.includes(data.basic.default_view) ? data.basic.default_view : "MONTH",
                default_first_week : !data.basic?.default_first_week ? "MONDAY" : weekDayOptions.includes(data.basic.default_first_week) ? data.basic.default_first_week : "MONDAY",
                default_slot : !data.basic?.default_slot ? 15 : typeof data.basic.default_slot === 'number' ? data.basic.default_slot : 15,
                allow_custom_slot : !data.basic?.allow_custom_slot ? false : data.basic.allow_custom_slot !== undefined ? data.basic.allow_custom_slot : false,
                office_start_time: data.basic?.office_start_time || '08:00',
                office_end_time: data.basic?.office_end_time || '20:00',
            },
            location: {
                master_table : masterTable['Event Location'],
                allow_custom: data?.location?.allow_custom !== undefined ? data.location.allow_custom : false,
                allow_empty: data?.location?.allow_empty !== undefined ? data.location.allow_empty : false,
            },
            category: {
                master_table: masterTable['Event Categories'] ,
            }
        };
        // get master table detail of event location and event categories
        if(setting.value.category.master_table){
            
            await getCategories()
            if(platform === 'admin') {
                await getCatergoriesColumn()
            }
        }

        if(setting.value.location.master_table) {
            await getLocations()
        }
        
    }

    onMounted(async () => {
        if(!setting.value){

            await getCalendarsSetting()
        }
    })

    return {
        setting,
        getCalendarsSetting,
        calendarViewOptions,
        weekDayOptions,
        categoriesOption,
        locationsOption,
        calendarViewerCategories,
        timeSelecteStep,
        timeSelectLimit
    }

}
