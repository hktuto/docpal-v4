import { adminApi, clientApi } from 'api'

// TODO：名稱之後需要重新定義
const createEventWorkflow = 'create calendar event'
const updateEventWorkflow = 'update calendar event'
const cancelEventWorkflow = 'cancel calendar event'
const deleteEventWorkflow = 'delete calendar event'
const rejectEventSendNotificationWorkflow = 'reject calendar event'

async function initWorkflowForm(name: string) {
  try {
    categories.value = categoriesOption.value.find((item: any) => item.id === state.workflowId)
    if (!categories.value || !categories.value.flows || categories.value.flows.length === 0) {
      state.workflowId = ''
      return
    }
    const flow = categories.value.flows.find((item: any) => {
      if (item.name.toLowerCase().includes(name)) {
        return item
      }
    })
    if (!flow) return
    state.workflowKey = flow.key
    if (!!categories.value.location && categories.value.location.value.length > 0) {
      state.location = categories.value.location.value.map((item) => item.id).join(',')
    }

    const appPlatform = useAppPlatform()
    const api = appPlatform.value === 'admin' ? adminApi : clientApi
    const workflow = await api.api.getWorkflowVersionKeyProcessdefinitionkey(flow.key).then((r) => r.data)
    if (!workflow) return
    state.formJson = await formJsonGet(workflow.processDefinitionKey, workflow.id)
  } catch (e) {
    console.log(e)
    state.loading = false
  } finally {
    state.loading = false
  }
}
