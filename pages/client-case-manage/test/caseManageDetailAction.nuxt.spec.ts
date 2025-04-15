import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { CaseAddCaseDialog } from '#components'
import { clientApi } from './mock/api'

describe('CaseManageDetailPage', () => {
  let wrapper: any
  const id = '93587467-959d-4b9d-96f0-1967673f28d8'
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

  it('should handleSubmit by "isWorkflowForm" value is false the component correctly', async () => {
    wrapper.vm.isWorkflowForm = false
    wrapper.vm.state.id = 'abc'
    wrapper.vm.state.visible = true
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
    console.log('MasterTableVariableFormRef', wrapper.vm.MasterTableVariableFormRef)
    wrapper.vm.MasterTableVariableFormRef = {
      getData: vi.fn().mockReturnValue(request)
    }

    await wrapper.vm.handleSubmit()
    await wrapper.vm.$nextTick()

    expect(clientApi.api.postCaseInstanceStart).toHaveBeenCalled()
    expect(wrapper.vm.state.visible).toBe(false)
  })

})
