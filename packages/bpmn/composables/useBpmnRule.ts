import { adminApi } from 'api'
const mockRules = [
  {
    id: 'testOyDate',
    name: 'testOyDate',
    validationRule: {
      validationRuleName: 'date',
      dateOrDateTime: 'date',
      format: 'YYYY-MM-DDTHH:mm:ss.000Z',
      defaultValue: 'tomorrow',
      isMultiple: false
    }
  }
]
/**
 * 一个 workflow 只有一个 rule list, 全局通用
 * 一个 workflow 有 多个 workflowTask
 * 一个 workflowTask 可以引用多个 rule list 中的 rule
 * @param ruleId
 */
export const useBpmnRule = ({ versionDraftId, version, taskName, draftId, workflowDetail }: { versionDraftId: string; version: number; taskName: string; draftId: string; workflowDetail: any }) => {
  const bpmnGlobalRules = ref<any>([])
  let isNew = false
  async function getBpmnRules() {
    try {
      const rule = await adminApi.api
        .getValidationRulesVersiondraftid(versionDraftId, {
          headers: {
            noThrowError: 'true'
          }
        })
        .then((res) => res.data)
      bpmnGlobalRules.value = rule?.validationRules || []
    } catch (error) {
      console.log('error', error)
      isNew = true
    }
  }
  async function addBpmnRule(rule: any) {
    try {
      bpmnGlobalRules.value.push(rule)
      const params: any = {
        versionDraftId,
        version,
        nodeName: taskName,
        draftId,
        validationRules: bpmnGlobalRules.value
      }
      const res = await adminApi.api.postValidationRules(params)
      isNew = false
    } catch (error) {
      console.log('error', error)
    }
  }
  async function updateBpmnRule(rule: any, nodes: any) {
    try {
      const index = bpmnGlobalRules.value.findIndex((item: any) => item.id === rule.id)
      if (index !== -1) {
        bpmnGlobalRules.value[index] = rule
      } else {
        bpmnGlobalRules.value.push(rule)
      }

      const params: any = {
        versionDraftId,
        version,
        nodeName: taskName,
        draftId,
        validationRules: bpmnGlobalRules.value
      }
      const res = await adminApi.api.putValidationRulesVersiondraftid(versionDraftId, params)
      if (index !== -1) {
        nodes.forEach((node: any) => {
          if (node.data?.data?.extensionElements?.['flowable:formProperty']) {
            const formItems = node.data.data.extensionElements['flowable:formProperty']
            const updateFormItem = formItems.find((item: any) => item.attr_id === rule.id)
            if (updateFormItem) {
              updateFormItem.attr_name = rule.name
              updateFormItem.attr_type = getBpmnRuleType(rule.type)
            }
            setNodeData(node, formItems)
          }
        })
        if (workflowDetail) {
          workflowDetail.saveDraft()
        }
      }
    } catch (error) {}
  }
  function setBpmnRules(newRule: any, nodes: any) {
    const rule = {
      id: newRule.id,
      name: newRule.name,
      validationRule: {
        ...newRule
      }
    }
    delete rule.validationRule.id
    delete rule.validationRule.name
    if (isNew) {
      addBpmnRule(rule)
    } else {
      updateBpmnRule(rule, nodes)
    }
  }
  function getBpmnRuleType(ruleType: string) {
    switch (ruleType) {
      case 'date':
        return 'date'
      case 'boolean':
        return 'boolean'
      case 'number':
        return 'long'
      default:
        return 'string'
    }
  }
  function getTaskFieldRules(taskFields: any[]) {
    return taskFields.map((item: any) => {
      const rule = bpmnGlobalRules.value.find((rule: any) => rule.id === item.attr_id)
      return {
        ...rule
      }
    })
  }
  async function deleteBpmnRule(deleteRule: any, nodes: any) {
    bpmnGlobalRules.value = bpmnGlobalRules.value.filter((item: any) => item.id !== deleteRule.id)
    const params: any = {
      versionDraftId,
      version,
      nodeName: taskName,
      draftId,
      validationRules: bpmnGlobalRules.value
    }
    await adminApi.api.putValidationRulesVersiondraftid(versionDraftId, params)
    nodes.forEach((node: any) => {
      if (node.data?.data?.extensionElements?.['flowable:formProperty']) {
        const formItems = node.data.data.extensionElements['flowable:formProperty']
        const newFormItems = formItems.filter((item: any) => item.attr_id !== deleteRule.id)
        setNodeData(node, newFormItems)
      }
    })
    if (workflowDetail) {
      workflowDetail.saveDraft()
    }
    console.log('deleteBpmnRule', nodes)
  }

  onMounted(() => {
    console.log('onMounted', versionDraftId, version, taskName, draftId)
    getBpmnRules()
  })
  return {
    bpmnGlobalRules,
    getBpmnRules,
    setBpmnRules,
    getBpmnRuleType,
    getTaskFieldRules,
    deleteBpmnRule
  }
}
export function setNodeData(node: any, formPropertys: any) {
  const newData = {
    ...node.data,
    version: (node.data.version || 0) + 1,
    data: {
      ...node.data.data,
      extensionElements: {
        ...node.data.data.extensionElements,
        'flowable:formProperty': JSON.parse(JSON.stringify(formPropertys))
      }
    }
  }
  node.setData(newData, { overwrite: true, deep: true, silent: false })
}
