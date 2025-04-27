import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CaseAddCaseDialog } from '#components'
import { clientApi } from './mock/api'

describe('[client-case]CaseManageDetailPage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(CaseAddCaseDialog, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })

  it('should handleOpen the component correctly', async () => {
    const id = '93587467-959d-4b9d-96f0-1967673f28d8'
    const caseDetail = {
      id: '93587467-959d-4b9d-96f0-1967673f28d8',
      name: 'test-cabinet',
      caseDefinitionKey: 'test_cabinet',
      productionVersionId: '5:34e59466-266d-4c46-9265-c5ce63ae18f6'
    }
    const startForm = [
      {
        key: 'humanTask1741576569916',
        name: 'humanTask',
        type: 'humantask',
        parent: 'test_cabinetPlanModel',
        criterion: {},
        rules: {
          isStartingTask: true
        },
        subItems: [],
        fields: [
          {
            id: 'fileName',
            name: 'fileName',
            type: 'short_text',
            masterTable: '',
            documentType: '',
            displayField: '',
            vocabulary: '',
            require: 'false',
            readOnly: 'false'
          },
          {
            id: 'rootName',
            name: 'rootName',
            type: 'short_text',
            masterTable: '',
            documentType: '',
            displayField: '',
            vocabulary: '',
            require: 'false',
            readOnly: 'false'
          }
        ]
      }
    ]
    wrapper.vm.primaryForm = startForm
    wrapper.vm.startForm = startForm
    vi.spyOn(clientApi.api, 'getCaseInstanceCasetypeidStarttask').mockResolvedValue({ data:  startForm  })

    const form = {
      code: 200,
      data: [],
      message: 'success',
      result: true
    }
    vi.spyOn(clientApi.api, 'getRelationQuery').mockResolvedValue(form)

    await wrapper.vm.handleOpen(id, caseDetail)
    await wrapper.vm.$nextTick()
    expect(clientApi.api.getCaseInstanceCasetypeidStarttask).toHaveBeenCalled()
    expect(clientApi.api.getRelationQuery).toHaveBeenCalled()

    const fields = [
      {
        id: 'fileName',
        name: 'fileName',
        type: 'short_text',
        masterTable: '',
        documentType: '',
        displayField: '',
        vocabulary: '',
        require: 'false',
        readOnly: 'false',
        label: 'fileName',
        required: false,
        dataType: 'short_text'
      },
      {
        id: 'rootName',
        name: 'rootName',
        type: 'short_text',
        masterTable: '',
        documentType: '',
        displayField: '',
        vocabulary: '',
        require: 'false',
        readOnly: 'false',
        label: 'rootName',
        required: false,
        dataType: 'short_text'
      }
    ]
    const initData: any = {}
    wrapper.vm.MasterTableVariableFormRef.init(fields, initData)

    expect(wrapper.vm.state.visible).toBe(true)
  })

  it('should handleSubmit the component correctly', async () => {
    wrapper.vm.isWorkflowForm = false
    wrapper.vm.state.id = 'abc'
    wrapper.vm.MasterTableVariableFormRef = {
      init: vi.fn()
    }
    const fields = [
      {
        id: 'fileName',
        name: 'fileName',
        type: 'short_text',
        masterTable: '',
        documentType: '',
        displayField: '',
        vocabulary: '',
        require: 'false',
        readOnly: 'false',
        label: 'fileName',
        required: false,
        dataType: 'short_text'
      },
      {
        id: 'rootName',
        name: 'rootName',
        type: 'short_text',
        masterTable: '',
        documentType: '',
        displayField: '',
        vocabulary: '',
        require: 'false',
        readOnly: 'false',
        label: 'rootName',
        required: false,
        dataType: 'short_text'
      }
    ]
    const initData: any = {}
    wrapper.vm.MasterTableVariableFormRef.init(fields, initData)
    await wrapper.vm.$nextTick()

    const request = {
      caseTypeId: wrapper.vm.state.id,
      parameters: {
        key1: '1',
        key2: '2'
      }
    }
    wrapper.vm.MasterTableVariableFormRef = {
      getData: vi.fn().mockReturnValue(request)
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(clientApi.api.postCaseInstanceStart).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
  })

})
