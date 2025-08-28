import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { FolderCabinetTable } from '#components'
import { clientApi } from './mock/api'
import { ElMessageBox } from 'element-plus'
import { mockRouterProvider } from './util'
import { VxeGrid } from 'vxe-table'

describe('[client-folder-cabinet]FolderCabinetPage', () => {
  let wrapper: any
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FolderCabinetTable, {
      global: {
        components: { VxeGrid },
        mocks: {
          $t: (msg: string) => msg,
          $i18n: { t: (key: string) => key }
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider
        }
      },
      props: {
        id: '411a32c8-2598-4f72-be00-da8195ad88e7'
      }
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(VxeGrid).exists()).toBe(true)
  })

  it('should handleDblclick emits the component correctly', async () => {
    await wrapper.vm.handleDblclick()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['row-click']).toBeTruthy()
  })

  it('should handleAdd the component correctly', async () => {
    const handleOpenSpy = vi.spyOn(wrapper.vm.CreateDialogRef, 'handleOpen')

    await wrapper.vm.handleAdd()
    await wrapper.vm.$nextTick()

    expect(handleOpenSpy).toHaveBeenCalled()
  })

  it('should handleFilterFormChange the component correctly', async () => {
    const filterModel = { isDesc: false }
    await wrapper.vm.handleFilterFormChange(filterModel)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.extraParams).toEqual(filterModel)
  })

  it('should initFilter the component correctly', async () => {
    const data = [
      {
        'key': 'createdBy',
        'label': 'Create By',
        'type': 'string',
        'options': [
          {
            'value': 'Administrator',
            'label': 'Administrator'
          }
        ]
      },
      {
        'key': 'state',
        'label': 'Status',
        'type': 'string',
        'options': [
          {
            'value': 'true',
            'label': 'Completed'
          },
          {
            'value': 'false',
            'label': 'Fail'
          },
          {
            'value': 'delay',
            'label': 'Delay'
          }
        ]
      }
    ]
    vi.spyOn(clientApi.api, 'getCabinetTemplateidPageConditions').mockResolvedValueOnce({ data: data })
    const initSpy = vi.spyOn(wrapper.vm.ResponsiveFilterRef, 'init')

    const id = '411a32c8-2598-4f72-be00-da8195ad88e7'

    await wrapper.vm.initFilter(id)
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))

    expect(initSpy).toHaveBeenCalled()
    const columns = [
      {
        'field': 'status',
        'title': 'folder_cabinetStatus',
        'fixed': 'left',
        'slots': {
          'default': 'status'
        },
        'width': 120
      },
      {
        'field': 'label',
        'title': 'folder_cabinetItemName',
        'minWidth': '200px'
      },
      {
        'field': 'createdBy',
        'title': 'role.creator',
        'width': 220
      },
      {
        'field': 'modifiedDate',
        'title': 'tableHeader_modifiedDate',
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        },
        'width': 220
      },
      {
        'field': 'deadline',
        'title': 'tableHeader_dueDate',
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        },
        'width': 220
      },
      {
        'field': 'documentType',
        'title': 'tableHeader_type',
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        },
        'width': 220
      },
      {
        'title': 'dpTable_actions',
        'fixed': 'right',
        formatter({ cellValue }: any) {
          return formatDate(cellValue)
        },
        'width': 80,
        'type': 'html'
      }
    ]
    expect(JSON.stringify(wrapper.vm.tableConfig.columns)).to.deep.equal(JSON.stringify(columns))
  })

})
