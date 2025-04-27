import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ResponsiveFilter, UniqueIdGeneratorPage } from '#components'
import { VxeGrid } from 'vxe-table'
import { mockRouterProvider } from './util'
import { ElMessageBox } from 'element-plus'
import { routeUniqueIdGeneratorDetail } from '~/utils/routerHelper'
import { adminApi } from './mock/api'

vi.mock('element-plus', () => ({
  ElMessageBox: {
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

describe('[admin-unique-id-generator]UniqueIdGenerator', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(UniqueIdGeneratorPage, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          routeUniqueIdGeneratorDetail: 'routeUniqueIdGeneratorDetail'
        }
      },
      props: {
        entryList: [
          {
            'id': '1418e91d-840c-4ce2-9e53-a813eb614372',
            'name': 'test2',
            'idDigit': 4,
            'startNumber': 1,
            'lastIdValue': null,
            'prefix': [
              {
                'index': 0,
                'expression': 'Prefix-',
                'type': 'string',
                'value': 'Prefix-'
              },
              {
                'index': 1,
                'expression': '{date(yyyy/MM/dd HH:mm:ss)}',
                'type': 'date',
                'value': 'yyyy/MM/dd HH:mm:ss'
              },
              {
                'index': 2,
                'expression': '-',
                'type': 'string',
                'value': '-'
              },
              {
                'index': 3,
                'expression': '{var(name)}',
                'type': 'variable',
                'value': 'HKHS'
              },
              {
                'index': 4,
                'expression': '-',
                'type': 'string',
                'value': '-'
              }
            ],
            'suffix': [
              {
                'index': 0,
                'expression': '-PJD',
                'type': 'string',
                'value': '-PJD'
              },
              {
                'index': 1,
                'expression': '-',
                'type': 'string',
                'value': '-'
              },
              {
                'index': 2,
                'expression': '{var(session)}',
                'type': 'variable',
                'value': 'PMS'
              }
            ],
            'enabled': true,
            'createdBy': 'Joshua',
            'modifiedBy': 'Joshua',
            'createdDate': '2025-04-23T06:43:47Z',
            'modifiedDate': '2025-04-23T07:44:19Z',
            'createdByName': 'Joshua',
            'modifiedByName': 'Joshua'
          },
          {
            'id': '71f73a02-886d-411c-8ec7-e4bdadc7fb26',
            'name': 'test3',
            'idDigit': 2,
            'startNumber': 100,
            'lastIdValue': null,
            'prefix': [
              {
                'index': 0,
                'expression': '{var(qwe)}',
                'type': 'variable',
                'value': 'ewq'
              },
              {
                'index': 1,
                'expression': '{date(yyyy-MM-dd HH:mm)}',
                'type': 'date',
                'value': 'yyyy-MM-dd HH:mm'
              }
            ],
            'suffix': [],
            'enabled': true,
            'createdBy': 'Joshua',
            'modifiedBy': 'Joshua',
            'createdDate': '2025-04-25T01:42:53Z',
            'modifiedDate': '2025-04-25T01:49:15Z',
            'createdByName': 'Joshua',
            'modifiedByName': 'Joshua'
          }
        ]
      }
    })
  })

  it('should render the component correctly', async () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
    wrapper.vm.responsiveFilterRef = {
      init: vi.fn().mockResolvedValue('true')
    }
    await wrapper.vm.$nextTick()
    wrapper.vm.getFilter()
    expect(wrapper.vm.responsiveFilterRef.init).toHaveBeenCalled()
  })

  it('should handleFilterFormChange the component correctly', async () => {
    const page = [
      {
        'id': '1418e91d-840c-4ce2-9e53-a813eb614372',
        'name': 'test2',
        'idDigit': 4,
        'startNumber': 1,
        'lastIdValue': null,
        'prefix': [
          {
            'index': 0,
            'expression': 'Prefix-',
            'type': 'string',
            'value': 'Prefix-'
          },
          {
            'index': 1,
            'expression': '{date(yyyy/MM/dd HH:mm:ss)}',
            'type': 'date',
            'value': 'yyyy/MM/dd HH:mm:ss'
          },
          {
            'index': 2,
            'expression': '-',
            'type': 'string',
            'value': '-'
          },
          {
            'index': 3,
            'expression': '{var(name)}',
            'type': 'variable',
            'value': 'HKHS'
          },
          {
            'index': 4,
            'expression': '-',
            'type': 'string',
            'value': '-'
          }
        ],
        'suffix': [
          {
            'index': 0,
            'expression': '-PJD',
            'type': 'string',
            'value': '-PJD'
          },
          {
            'index': 1,
            'expression': '-',
            'type': 'string',
            'value': '-'
          },
          {
            'index': 2,
            'expression': '{var(session)}',
            'type': 'variable',
            'value': 'PMS'
          }
        ],
        'enabled': true,
        'createdBy': 'Joshua',
        'modifiedBy': 'Joshua',
        'createdDate': '2025-04-23T06:43:47Z',
        'modifiedDate': '2025-04-23T07:44:19Z',
        'createdByName': 'Joshua',
        'modifiedByName': 'Joshua'
      },
      {
        'id': '71f73a02-886d-411c-8ec7-e4bdadc7fb26',
        'name': 'test3',
        'idDigit': 2,
        'startNumber': 100,
        'lastIdValue': null,
        'prefix': [
          {
            'index': 0,
            'expression': '{var(qwe)}',
            'type': 'variable',
            'value': 'ewq'
          },
          {
            'index': 1,
            'expression': '{date(yyyy-MM-dd HH:mm)}',
            'type': 'date',
            'value': 'yyyy-MM-dd HH:mm'
          }
        ],
        'suffix': [],
        'enabled': true,
        'createdBy': 'Joshua',
        'modifiedBy': 'Joshua',
        'createdDate': '2025-04-25T01:42:53Z',
        'modifiedDate': '2025-04-25T01:49:15Z',
        'createdByName': 'Joshua',
        'modifiedByName': 'Joshua'
      }
    ]
    vi.spyOn(adminApi.api, 'postIdTemplatesPage').mockResolvedValue({ data: page })
    const spy = vi.spyOn(wrapper.vm, 'handleFilterFormChange')
    const formModel = {
      isDesc: 'true',
      orderBy: 'name',
      name: 'test'
    }
    await wrapper.vm.handleFilterFormChange(formModel)
    await wrapper.vm.$nextTick()
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.extraParams).toEqual({ isDesc: true, orderBy: 'name', name: 'test' })
  })

  it('should click addAction the component correctly', async () => {
    const mockOpen = vi.fn()
    wrapper.vm.addDialogRef = { handleOpen: mockOpen }
    const handleOpenSpy = vi.spyOn(wrapper.vm.addDialogRef, 'handleOpen')
    await wrapper.vm.handleAdd()
    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should click editAction the component correctly', () => {
    const row = { id: '71f73a02-886d-411c-8ec7-e4bdadc7fb26' }
    wrapper.vm.handleDetail(row)
    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(expect.anything(), false)
  })

  it('should click dblClickAction the component correctly', async () => {
    wrapper.vm.tableRef = {
      dblClickAction: vi.fn()
    }
    const row = { id: '71f73a02-886d-411c-8ec7-e4bdadc7fb26' }
    await wrapper.vm.tableRef.dblClickAction(row)

    expect(wrapper.vm.tableRef.dblClickAction).toHaveBeenCalled()
  })

  it('should click duplicateAction the component correctly', async () => {
    const mockOpen = vi.fn()
    wrapper.vm.duplicateDialogRef = { handleOpen: mockOpen }
    const handleOpenSpy = vi.spyOn(wrapper.vm.duplicateDialogRef, 'handleOpen')
    const row = { id: '71f73a02-886d-411c-8ec7-e4bdadc7fb26' }
    await wrapper.vm.handleDuplicate(row)
    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should click deleteAction the component correctly', async () => {
    vi.spyOn(adminApi.api, 'deleteIdTemplatesId').mockResolvedValue({ data: true })
    const confirmSpy = vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm')
    const id = { id: '71f73a02-886d-411c-8ec7-e4bdadc7fb26' }
    await wrapper.vm.handleDelete(id)
    expect(confirmSpy).toHaveBeenCalled()
    expect(ElMessageBox.confirm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    )
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(adminApi.api.deleteIdTemplatesId).toHaveBeenCalled()
  })
})
