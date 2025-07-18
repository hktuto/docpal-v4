import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { SharePage } from '#components'
import { VxeGrid } from 'vxe-table'
import { clientApi } from './mock/api'

describe('[client-share-external]SharePage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(SharePage, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
  })

  it('should handleFilterFormChange the component correctly', async () => {
    const filterModel = { isDesc: false }
    await wrapper.vm.handleFilterFormChange(filterModel)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.extraParams).toEqual(filterModel)
  })

  it('should handleSubmit the component correctly', async () => {
    const shareInfo = {
      shareID: 'ecc33439-392d-4cd8-b9da-7c7d7d964b05',
      easyShareList: [
        {
          id: '79462f35-0d6d-4479-a7b7-5373fac60091',
          path: '/default-domain/Test-Joshua/test-file-1.52817762666061',
          watermarkTemplateId: '',
          watermarkStatus: null,
          readOnly: true
        },
        {
          id: 'bc68ad8a-69d8-46d7-82b1-e975e44c0b70',
          path: '/default-domain/Test-Joshua/test-file-1',
          watermarkTemplateId: '',
          watermarkStatus: null,
          readOnly: true
        }
      ],
      emailList: [
        'by.Moonlit@hotmail.com',
        'joshua.zheng@wclsolution.com',
        'Joshua'
      ],
      documentSize: 2,
      created: '2025-04-29T01:10:55.705+00:00',
      expiredDate: '2025-05-29T01:15:10.937+00:00',
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdWJsaWMiLCJpc3MiOiJKb3NodWEiLCJzaGFyZUlkIjoiZWNjMzM0MzktMzkyZC00Y2Q4LWI5ZGEtN2M3ZDdkOTY0YjA1IiwiZXhwIjoxNzQ4NDgxMzEwfQ.RLqQQtzOqegLDXiIR5bQVtwwO0Aiv8k7Yv39RNJ_X8E',
      password: 'qwe123',
      _X_ROW_KEY: 'row_80'
    }
    const mockResponse = { data: { success: true } }
    vi.spyOn(clientApi.api, 'patchNuxeoShare').mockResolvedValue({ data: mockResponse })

    await wrapper.vm.handleSubmit(shareInfo)
    await wrapper.vm.$nextTick()

    expect(clientApi.api.patchNuxeoShare).toHaveBeenCalled
  })

  it('should getFilter the component correctly', async () => {
    wrapper.vm.ResponsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }

    await wrapper.vm.getFilter()
    await wrapper.vm.$nextTick()
    expect(clientApi.api.postNuxeoSharePage).toHaveBeenCalled()
  })

})
