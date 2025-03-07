
import { adminApi } from '../../../libraries/api/src/index';
import { onMounted } from "vue";
import { viewName } from '../utils/calendarHelper';
export const useCalendarSetting = () => useState<any>('calendarSetting');
export const useCategoriesColumn = () => useState<any[]>('categoriesColumn');
export const useCalenarCategories = () => useState<any[]>('calendarCategories', () =>([]));

export const useCalendarStore = () => {
    const setting = useCalendarSetting();

    const calendarViewOptions = viewName
    
    const weekDayOptions = [
        "MONDAY",
        "SUNDAY",
    ]

    const categoriesColumn = useCategoriesColumn()
    async function getCatergoriesColumn(){
        const {data} = await adminApi.api.getMasterTablesId(setting.value.category.master_table) as any
        categoriesColumn.value = data.fields;
    }

    async function getCalendarMasterTable(){
        const {data} = await adminApi.api.getCalendarsSettingTables() as any
        return data
    }

    const categoriesOption = useState<any>('categoriesOption', () => ([]))
    async function getCategories(){
        const { data } = await adminApi.api.postMasterTablesRecords({
            id: setting.value.category.master_table
        });
        categoriesOption.value = data || []
    }

    const locationsOption = useState<any>('locationsOption', () => ([]))
    async function getLocations(){
        
        const data = await adminApi.api.postMasterTablesRecords({
            id: setting.value.location.master_table
        }).then(res => res.data);
        locationsOption.value = data || []
    }

    async function getCalendarsSetting(){
        const masterTable = await getCalendarMasterTable()
        const { data } = await adminApi.api.getCalendarsSetting() as any;
        const { public: { platform } } = useRuntimeConfig();

        setting.value = {
            basic: {
                default_view : calendarViewOptions.includes(data.basic.default_view) ? data.basic.default_view : "MONTH",
                default_first_week : weekDayOptions.includes(data.basic.default_first_week) ? data.basic.default_first_week : "MONDAY",
                default_slot : typeof data.basic.default_slot === 'number' ? data.basic.default_slot : 15,
                allow_custom_slot : data.basic.allow_custom_slot !== undefined ? data.basic.allow_custom_slot : false
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
        locationsOption
    }

}