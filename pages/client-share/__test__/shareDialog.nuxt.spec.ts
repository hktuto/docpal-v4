import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShareDialog } from '#components'

describe('[client-share-external]ShareDialog', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(ShareDialog, {
      global: {
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        }
      }

    })
  })

  it('should handleOpen the component correctly', async () => {
    const row = {
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
      password: 'cXdlMTIz',
      _X_ROW_KEY: 'row_80'
    }
    await wrapper.vm.handleOpen(row)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.state.shareId).toBe(row.shareID)
    expect(wrapper.vm.dialogVisible).toBe(true)
  })

  it('should initFormatItem the component correctly', async () => {
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
    await wrapper.vm.initFormatItem(shareInfo)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.form.emailList).toStrictEqual(shareInfo.emailList)
    expect(wrapper.vm.form.password).toBe('qwe123')
    expect(wrapper.vm.form.dueDate).toBe(shareInfo.expiredDate)
    expect(wrapper.vm.state.shareLink).toBe(`undefined/share?token=${shareInfo.accessToken}`)
  })

  it('should call handleSubmit with the correct', async () => {
    wrapper.vm.formRef = {
      validate: vi.fn().mockReturnValue(true)
    }

    await wrapper.vm.handleSubmit()
    expect(wrapper.vm.dialogVisible).toEqual(false)
  })

})
