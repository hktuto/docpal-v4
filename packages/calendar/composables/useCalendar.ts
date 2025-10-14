import { adminApi, clientApi } from 'api'
import { onMounted } from 'vue'
import { viewName } from '../utils/calendarHelper'


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

export const useCalendarSetting = () => useState<any>('calendarSetting')
export const useCategoriesColumn = () => useState<any[]>('categoriesColumn')
export const useCalenarCategories = () => useState<any[]>('calendarCategories', () => ([]))
export const useCalenarLocation = () => useState<any[]>('calendarLocations', () => ([]))
export const useCalendarViewerCategories = () => useState<CalendarVieweCalendarSetting>('calendarViewerCategories')

export const useCalendarStore = () => {
  const setting = useCalendarSetting()

  const calendarViewOptions = viewName

  const weekDayOptions = [
    'MONDAY',
    'SUNDAY'
  ]

  const timeSelecteStep = computed(() => {
    return '00:' + setting.value.basic.default_slot
  })

  const timeSelectLimit = computed(() => {
    return {
      start: setting.value.basic.office_start_time || '00:00',
      end: setting.value.basic.office_end_time || '24:00'
    }
  })

  async function getCalendarMasterTable() {
    const appPlatform = useAppPlatform()
    const api = appPlatform.value === 'admin' ? adminApi : clientApi
    console.log('api', api.instance.defaults.baseURL)
    const { data } = await api.api.getCalendarsSettingTables() as any
    return data
  }

  const categoriesOption = useCalenarCategories()
  const calendarViewerCategories = useCalendarViewerCategories()

  async function getCategories() {
    const appPlatform = useAppPlatform()
    const api = appPlatform.value === 'admin' ? adminApi : clientApi
    const data = await api.api.postMasterTablesRecords({
      id: setting.value.category.master_table
    }).then(res => res.data) as any

    categoriesOption.value = (data || []).filter(i => i.status).sort((a, b) => a.name.localeCompare(b.name))
  }

  const locationsOption = useCalenarLocation()

  async function getLocations() {
    const appPlatform = useAppPlatform()
    const api = appPlatform.value === 'admin' ? adminApi : clientApi
    const data = await api.api.postMasterTablesRecords({
      id: setting.value.location.master_table
    }).then(res => res.data) as any
    locationsOption.value = (data || []).filter(i => i.status).sort((a, b) => a.name.localeCompare(b.name))
  }

  async function getCalendarsSetting() {
    const masterTable = await getCalendarMasterTable()
    const appPlatform = useAppPlatform()
    const api = appPlatform.value === 'admin' ? adminApi : clientApi
    const { data } = await api.api.getCalendarsSetting() as any
    const { public: { platform } } = useRuntimeConfig()

    setting.value = {
      basic: {
        default_view: !data.basic?.default_view ? 'MONTH' : calendarViewOptions.includes(data.basic.default_view) ? data.basic.default_view : 'MONTH',
        default_first_week: !data.basic?.default_first_week ? 'MONDAY' : weekDayOptions.includes(data.basic.default_first_week) ? data.basic.default_first_week : 'MONDAY',
        default_slot: !data.basic?.default_slot ? 15 : typeof data.basic.default_slot === 'number' ? data.basic.default_slot : 15,
        allow_custom_slot: !data.basic?.allow_custom_slot ? false : data.basic.allow_custom_slot !== undefined ? data.basic.allow_custom_slot : false,
        office_start_time: data.basic?.office_start_time || '08:00',
        office_end_time: data.basic?.office_end_time || '20:00'
      },
      location: {
        master_table: masterTable['Event Location'],
        allow_custom: data?.location?.allow_custom !== undefined ? data.location.allow_custom : false,
        allow_empty: data?.location?.allow_empty !== undefined ? data.location.allow_empty : false
      },
      category: {
        master_table: masterTable['Event Categories']
      }
    }
    // get master table detail of event location and event categories
    if (setting.value.category.master_table) {
      await getCategories()
    }

    if (setting.value.location.master_table) {
      await getLocations()
    }
  }


  async function getFormJson(processKey: string, versionId: string) {
    const response: any = await clientApi.api.getRelationQuery({
      userTaskId: 'start',
      processKey,
      versionId
    }).then((res: any) => res.data)
    if (!response[0] || (response[0] && !response[0].jsonValue)) return {}
    return JSON.parse(response[0].jsonValue)
  }

  type EventFormData = {
    eventId?: string;
    eventName: string;
    eventDescription: string;
    eventCategory: string;
    eventLocation: string;
    startTime: string;
    endTime: string;
    eventUser: string;
    isAllDay: boolean;
    sendMessageToCreator: boolean;
    recipient?: string;
    eventMessage?: string;
  }

  async function initWorkflowForm(name: string, workflowId: string) {
    const data = {}

    if (0 == categoriesOption.value.length) {
      throw new Error('categoriesOption is null')
    }

    const categories = categoriesOption.value.find((item: any) => item.id === workflowId)
    if (!categories.value || !categories.value.flows || categories.value.flows.length === 0) {
      console.log('categories is null', categories)
      return
    }

    const flow = categories.value.flows.find((item: any) => item.name.toLowerCase().includes(name))
    if (!flow) {
      throw new Error('flow is empty', flow)
    }
    data.workflowKey = flow.key

    if (!!categories.value.location && categories.value.location.value.length > 0) {
      data.location = categories.value.location.value.map((item) => item.id).join(',')
    }

    const appPlatform = useAppPlatform()
    const api = appPlatform.value === 'admin' ? adminApi : clientApi
    const workflow = await api.api.getWorkflowVersionKeyProcessdefinitionkey(flow.key).then((r) => r.data)
    if (!workflow) {
      throw new Error('workflow is empty')
    }

    data.formJson = await getFormJson(workflow.processDefinitionKey, workflow.id)
    return data
  }

  // TODO：名稱之後需要重新定義
  const createEventWorkflow = 'create calendar event'
  const updateEventWorkflow = 'update calendar event'
  const cancelEventWorkflow = 'cancel calendar event'
  const deleteEventWorkflow = 'delete calendar event'

  async function runWorkflow(workflowKey: string, event: EventFormData) {
    const form = {
      processKey: workflowKey,
      businessKey: '',
      properties: Object.entries(event).reduce((newObj, [key, val]) => {
        if (val || val === false || val == '0') newObj[key] = val
        return newObj
      }, {})
    }

    try {
      await clientApi.api.postWorkflowProcessStart(form, { async: false }).then((res) => res.data)
    } catch (e) {
      console.error(e)
    }
  }

  onMounted(async () => {
    if (!setting.value) {
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
    timeSelectLimit,
    EventFormData,
    initWorkflowForm,
    createEventWorkflow,
    updateEventWorkflow,
    cancelEventWorkflow,
    deleteEventWorkflow,
    runWorkflow
  }
}
