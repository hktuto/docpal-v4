import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import {
  AdminUserList,
  UserTable,
  UserEditDialog,
  UserGroupTable,
  UserAddGroupDialog,
  UserAddGroupsDialog,
  UserPasswordDialog,
  AdminUserDetail,
  UserInfo,
  ResponsiveFilter
} from '#components'
import { adminApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { userProviderKey, userProviderDetailKey } from '~/util/userProvider'
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus'
import { mockRouterProvider } from './util'

const userProvider = {
  getAllUsersApi: vi.fn(),
  BatchDeleteUserApi: vi.fn(),
  SetUserStatusApi: vi.fn(),
  BatchActiveUserApi: vi.fn(),
  getAllUserAndActiveCountApi: vi.fn(),
  openUserDetail: vi.fn(),
  openUserList: vi.fn()
}

const userProviderDetail = {
  BatchDeleteUserApi: vi.fn(),
  SetUserStatusApi: vi.fn(),
  openUserList: vi.fn(),
  PatchUserPasswordApi: vi.fn(),
  BatchUserRemoveGroupsApi: vi.fn(),
  MemberGroupGetApi: vi.fn(),
  BatchUsersToGroupsApi: vi.fn(),
  BatchUserAddGroupsApi: vi.fn()
}
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn()
  }
}))
describe('[admin-user]AdminUserList', () => {
  let wrapper: any

  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = shallowMount(AdminUserList, {
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          userProviderKey: 'userProviderKey'
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.pageContainer').exists()).toBe(true)
  })
  test('handles filter change correctly', async () => {
    const filter = { search: 'test' }

    wrapper.vm.tableRef = {
      reload: vi.fn().mockReturnValue(true)
    }
    await wrapper.vm.handleFilterChange(filter)

    expect(wrapper.vm.userTableFilter).toEqual(filter)
    expect(wrapper.vm.tableRef.reload).toHaveBeenCalled()
  })
  test('opens user detail correctly', async () => {
    const userData = { id: '1', username: 'testUser', userId: 'user-1' }
    wrapper.vm.openUserDetail(userData)

    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(
      {
        menuKey: mockRouterProvider.menuSymbol,
        id: expect.stringContaining('user-detail-'),
        name: 'user-detail-1',
        icon: 'lucide:user',
        label: 'testUser',
        component: 'LazyAdminUserDetail',
        props: {
          id: 'user-1'
        }
      },
      false
    )
  })
})
describe('[admin-user]UserTable', () => {
  let wrapper: any
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserTable, {
      props: {
        id: 'user-1'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderKey]: userProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.userDetailSection').exists()).toBe(false)
  })
  it('fetches user count on mount', async () => {
    const mockCountResponse = { ActiveCount: 10, licenseUserNum: 50 }
    userProvider.getAllUserAndActiveCountApi.mockResolvedValueOnce(mockCountResponse)

    await wrapper.vm.getAllUserAndActiveCount()

    expect(userProvider.getAllUserAndActiveCountApi).toHaveBeenCalled()
    expect(wrapper.vm.state.activeUsers).toBe(10)
    expect(wrapper.vm.state.licenseUsers).toBe(50)
  })
  it('handles user deletion confirmation', async () => {
    const userToDelete = { userId: 'user-1' }
    wrapper.vm.state.selectList = [userToDelete]

    ElMessageBox.confirm = vi.fn().mockResolvedValue('confirm')
    userProvider.BatchDeleteUserApi.mockResolvedValueOnce({})
    await wrapper.vm.handleDeleteSelected()

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(userProvider.BatchDeleteUserApi).toHaveBeenCalledWith({ userIds: ['user-1'] })
    expect(mockRouterProvider.message.success).toHaveBeenCalled()
  })
  it('does not delete users if confirmation is canceled', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('cancel')

    await wrapper.vm.handleDeleteSelected()

    expect(userProvider.BatchDeleteUserApi).not.toHaveBeenCalled()
  })
  it('sets user status correctly', async () => {
    const userRow = { userId: 'user-1', status: 'D', loading: false }
    userProvider.SetUserStatusApi.mockResolvedValueOnce({})

    await wrapper.vm.handleSetStatus('A', userRow)

    expect(userRow.loading).toBe(false)
    expect(userProvider.SetUserStatusApi).toHaveBeenCalledWith(userRow)
  })

  it('shows warning when active users exceed license limit', async () => {
    wrapper.vm.state.activeUsers = 50
    const userRow = { userId: 'user-1', status: 'D', loading: false }

    await wrapper.vm.handleSetStatus('A', userRow)

    expect(userRow.status).toBe('D') // Status should not change
    expect(mockRouterProvider.message.warning).toHaveBeenCalled()
  })
  it('handles filter form change', async () => {
    const filterModel = { isDesc: false }
    await wrapper.vm.handleFilterFormChange(filterModel)

    expect(wrapper.vm.state.extraParamsFilter).toEqual(filterModel)
  })
  it('clears filters correctly', async () => {
    await wrapper.vm.handleClearFilter()

    expect(wrapper.vm.state.extraParamsFilter).toEqual({})
  })
})

describe('[admin-user]AdminUserDetail', () => {
  let wrapper: any
  const mockUserData = {
    id: 'user-1',
    username: 'testUser',
    status: 'A'
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = shallowMount(AdminUserDetail, {
      props: {
        id: 'user-1'
      },
      global: {
        components: { VxeGrid, ResponsiveFilter },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          userProviderKey: 'userProviderKey'
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  test('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.userDetailSection').exists()).toBe(false)
  })
  test('opens user list correctly', async () => {
    adminApi.api.getNuxeoUserUserid.mockResolvedValueOnce({ data: mockUserData })
    await wrapper.vm.getUser()
    wrapper.vm.openUserList()

    expect(mockRouterProvider.navigateTo).toHaveBeenCalledWith(
      {
        menuKey: mockRouterProvider.menuSymbol,
        id: 'admin-user',
        name: 'admin-user-list',
        icon: 'lucide:user',
        label: 'Admin User',
        component: 'LazyAdminUserList',
        props: {}
      },
      false
    )
  })
  test('handles user data retrieval correctly', async () => {
    adminApi.api.getNuxeoUserUserid.mockResolvedValueOnce({ data: mockUserData })

    await wrapper.vm.getUser()

    expect(wrapper.vm.state.curUser).toEqual({
      ...mockUserData,
      status: 'A' // Ensure the status is set correctly
    })
  })
  test('does not set user data if no data is returned', async () => {
    adminApi.api.getNuxeoUserUserid.mockResolvedValueOnce({ data: null })

    await wrapper.vm.getUser()

    expect(wrapper.vm.state.curUser).toBeNull()
  })
})

// Mock UserEditDialog
const mockUserEditDialog = {
  template: '<div class="mock-user-edit-dialog" @refresh="$emit(\'refresh\')"></div>',
  methods: {
    handleOpen: vi.fn()
  }
}
const mockUserPasswordDialog = {
  template: '<div class="mock-user-password-dialog"></div>',
  methods: {
    handleOpen: vi.fn()
  }
}
// Mock Icon
const mockIcon = {
  template: '<span class="mock-icon"></span>'
}
describe('[admin-user]UserInfo', () => {
  let wrapper: any
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
        isLdapMode: false
      },
      global: {
        components: {
          VxeGrid,
          UserEditDialog: mockUserEditDialog,
          UserPasswordDialog: mockUserPasswordDialog,
          Icon: mockIcon
        },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderDetailKey]: userProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('user_info')
    const rowValues = wrapper.findAll('.rowValue')
    expect(rowValues.length).toBe(5)
    expect(rowValues[0].text()).toBe(mockUser.firstName)
    expect(rowValues[1].text()).toBe(mockUser.lastName)
    expect(rowValues[2].text()).toBe(mockUser.email)
    expect(rowValues[3].text()).toBe(mockUser.company)
  })
  it('handles user edit', async () => {
    const editDialogRef = wrapper.vm.UserEditDialogRef
    const handleOpenSpy = vi.spyOn(editDialogRef, 'handleOpen')

    await wrapper.vm.handleEdit()

    expect(handleOpenSpy).toHaveBeenCalled()
  })
  it('handles password change dialog', async () => {
    const passwordDialogRef = wrapper.vm.UserPasswordDialogRef
    const handleOpenSpy = vi.spyOn(passwordDialogRef, 'handleOpen')

    await wrapper.vm.openDialog()

    expect(handleOpenSpy).toHaveBeenCalled()
  })
  it('confirms user deletion and deletes user', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('confirm')
    userProviderDetail.BatchDeleteUserApi.mockResolvedValueOnce({})

    await wrapper.vm.handleDelete()

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(userProviderDetail.BatchDeleteUserApi).toHaveBeenCalledWith({ userIds: [mockUser.userId] })
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.stringContaining('tip_deleteSuccessMsg'))
    expect(userProviderDetail.openUserList).toHaveBeenCalled()
  })
  it('does not delete user if confirmation is canceled', async () => {
    ElMessageBox.confirm = vi.fn().mockResolvedValue('cancel')

    await wrapper.vm.handleDelete()

    expect(userProviderDetail.BatchDeleteUserApi).not.toHaveBeenCalled()
  })
  it('sets user status correctly', async () => {
    userProviderDetail.SetUserStatusApi.mockResolvedValueOnce(true)

    await wrapper.vm.handleSetStatus('D', mockUser)

    expect(mockUser.loading).toBe(false)
    expect(userProviderDetail.SetUserStatusApi).toHaveBeenCalledWith(mockUser)
  })
  it('handles status update failure', async () => {
    userProviderDetail.SetUserStatusApi.mockResolvedValue(false)
    await wrapper.vm.handleSetStatus('D', mockUser)
    expect(mockUser.status).toBe('A') // 确保状态不变
  })
})
describe('[admin-user]UserPasswordDialog', () => {
  let wrapper: any
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserPasswordDialog, {
      props: {
        user: mockUser,
        isLdapMode: false
      },
      global: {
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderDetailKey]: userProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true)
  })
  it('opens the dialog', async () => {
    await wrapper.vm.handleOpen()
    expect(wrapper.vm.state.visible).toBe(true)
  })
  it('handles password submission', async () => {
    const formData = {
      password: 'newPassword123'
    }

    // Mock the method to return form data
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }

    await wrapper.vm.handleSubmit()

    expect(userProviderDetail.PatchUserPasswordApi).toHaveBeenCalledWith({
      password: formData.password,
      userId: mockUser.userId
    })
    expect(ElMessage.success).toHaveBeenCalledWith(expect.stringContaining('tip_updateSuccessMsg'))
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
  })
  it('handles submission failure', async () => {
    const formData = {
      password: 'newPassword123'
    }

    // Mock the method to return form data
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData)
    }

    // Simulate an error thrown by the PatchUserPasswordApi
    userProviderDetail.PatchUserPasswordApi.mockRejectedValue(new Error('Error updating password'))
    await wrapper.vm.handleSubmit()
    // Ensure that the loading state is reset
    expect(wrapper.vm.state.loading).toBe(false)
  })
})
const SvgIcon = {
  template: '<div class="SvgIcon">SvgIcon</div>',
  methods: {}
}
const Icon = {
  template: '<div class="Icon">Icon</div>',
  methods: {}
}
describe('[admin-user]UserGroupTable', () => {
  let wrapper: any
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserGroupTable, {
      props: {
        user: mockUser,
        isLdapMode: false
      },
      global: {
        components: { VxeGrid, ResponsiveFilter, SvgIcon, Icon },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderDetailKey]: userProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.el-card').exists()).toBe(true)
    expect(wrapper.find('.vxe-grid').exists()).toBe(true)
  })
  it('fetches member group list on activation', async () => {
    userProviderDetail.MemberGroupGetApi.mockResolvedValueOnce({ data: [] })

    await wrapper.vm.getMemberGroupList()

    expect(userProviderDetail.MemberGroupGetApi).toHaveBeenCalledWith({
      userId: mockUser.userId
    })
    expect(wrapper.vm.state.groupList).toEqual([])
  })
  it('handles group deletion confirmation', async () => {
    const mockRow = { id: 'group-1' }
    ElMessageBox.confirm.mockResolvedValue('confirm')
    await wrapper.vm.handleDelete(mockRow)

    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(userProviderDetail.BatchUserRemoveGroupsApi).toHaveBeenCalledWith({
      groupIds: [mockRow.id],
      userId: mockUser.userId
    })
  })
  it('handles selected deletion confirmation', async () => {
    wrapper.vm.state.selectedRows = [{ id: 'group-1' }, { id: 'group-2' }]
    const confirmSpy = vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm')

    await wrapper.vm.handleDeleteSelected()

    expect(confirmSpy).toHaveBeenCalled()
    expect(userProviderDetail.BatchUserRemoveGroupsApi).toHaveBeenCalledWith({
      groupIds: ['group-1', 'group-2'],
      userId: mockUser.userId
    })
    expect(wrapper.vm.state.selectedRows).toEqual([])
  })
  it('confirms deletion of selected groups', async () => {
    wrapper.vm.state.selectedRows = [{ id: 'group-1', name: 'Group 1' }]
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm')

    await wrapper.vm.handleDeleteSelected()

    expect(mockRouterProvider.message.success).toHaveBeenCalledWith(expect.stringContaining('user_removeGroupsSuccessMsg'))
  })

  it('handles filter form change', async () => {
    wrapper.vm.state.groupList = [{ name: 'Group A' }, { name: 'Group B' }]
    wrapper.vm.tableRef = {
      loadData: vi.fn(),
      commitProxy: vi.fn()
    }
    const formModel = { metaData: 'Group A' }
    await wrapper.vm.handleFilterFormChange(formModel)

    expect(wrapper.vm.state.groupList[0].name).toEqual('Group A')
    // expect(wrapper.vm.tableRef.loadData).toHaveBeenCalledWith([{ name: 'Group A' }])
  })
})

const FormRenderer = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {
    setFormJson: vi.fn(),
    setFormData: vi.fn()
  }
}
const VFormRender = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}
const ReaderDialog = {
  template: '<div class="FormRenderer">FormRenderer</div>',
  methods: {}
}
describe('[admin-user]UserEditDialog', () => {
  let wrapper: any
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserEditDialog, {
      props: {
        user: mockUser,
        isLdapMode: false
      },
      global: {
        components: { SvgIcon, Icon, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderDetailKey]: userProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true)
  })
  it('opens the dialog and sets form data', async () => {
    await wrapper.vm.handleOpen()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(wrapper.vm.state.visible).toBe(true)
    expect(wrapper.find('.FormRenderer').exists()).toBe(true)
  })
  it('submits the form successfully', async () => {
    const formData = { firstName: 'Updated Name' }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }
    wrapper.vm.state.loading = false

    await wrapper.vm.handleSubmit()

    expect(adminApi.api.patchNuxeoIdentityUser).toHaveBeenCalledWith({
      ...mockUser,
      properties: null,
      ...formData
    })
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
  })
  it('handles submit error gracefully', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({}),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }
    const error = new Error('Update failed')
    adminApi.api.patchNuxeoIdentityUser.mockRejectedValue(error)
    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.loading).toBe(false)
  })
})
describe('[admin-user]UserAddGroupsDialog', () => {
  let wrapper: any
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserAddGroupsDialog, {
      props: {
        user: mockUser,
        isLdapMode: false
      },
      global: {
        components: { SvgIcon, Icon, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderKey]: userProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true)
  })
  it('opens the dialog and sets options', async () => {
    const exitList: any = []
    const setting = { someSetting: true }
    wrapper.vm.FormRendererRef = {
      vFormRenderRef: {
        getWidgetRef: vi.fn()
      }
    }
    await wrapper.vm.handleOpen(exitList, setting)

    expect(wrapper.vm.state.visible).toBe(true) // 确保对话框可见
    expect(wrapper.vm.state.setting).toEqual(setting) // 确保设置被正确赋值
  })
  it('submits the form successfully', async () => {
    const formData = { id: ['group-1'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }
    await wrapper.vm.handleSubmit()

    expect(userProviderDetail.BatchUsersToGroupsApi).toHaveBeenCalledWith({
      groupIds: formData.id,
      ...wrapper.vm.state.setting
    })
    expect(ElMessage.success).toHaveBeenCalledWith(expect.stringContaining('dpMsg_success'))
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
  })
  it('handles submit error gracefully', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({}),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }
    const error = new Error('Update failed')
    userProviderDetail.BatchUsersToGroupsApi.mockRejectedValue(error)

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.loading).toBe(false)
  })
})
describe('[admin-user]UserAddGroupDialog', () => {
  let wrapper: any
  const mockUser = {
    userId: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Example Inc.',
    status: 'A',
    loading: false
  }
  beforeEach(async () => {
    vi.clearAllMocks()
    wrapper = mount(UserAddGroupDialog, {
      props: {
        user: mockUser,
        isLdapMode: false
      },
      global: {
        components: { SvgIcon, Icon, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [MenuRouterKey]: mockRouterProvider,
          [userProviderDetailKey]: userProviderDetail
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    await wrapper.vm.$nextTick()
  })
  it('renders correctly', () => {
    console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true)
  })
  it('opens the dialog and loads group list', async () => {
    const exitList: any = []
    await wrapper.vm.handleOpen(exitList)
    expect(wrapper.vm.state.visible).toBe(true)
  })
  it('submits the form successfully', async () => {
    const formData = { id: ['group-1'] }
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue(formData),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }
    await wrapper.vm.handleSubmit()

    expect(userProviderDetail.BatchUserAddGroupsApi).toHaveBeenCalled()
    expect(ElMessage.success).toHaveBeenCalledWith('user_userGroupsAssignedSuccessMsg')
    expect(wrapper.vm.state.visible).toBe(false)
    expect(wrapper.vm.FormRendererRef.vFormRenderRef.resetForm).toHaveBeenCalled()
  })
  it('handles submit error gracefully', async () => {
    wrapper.vm.FormRendererRef = {
      getFormData: vi.fn().mockResolvedValue({}),
      vFormRenderRef: {
        resetForm: vi.fn()
      }
    }
    const error = new Error('Update failed')
    userProviderDetail.BatchUserAddGroupsApi.mockRejectedValue(error) // Mock API 抛出错误

    await wrapper.vm.handleSubmit()

    expect(wrapper.vm.state.loading).toBe(false) // 确保 loading 状态恢复
    // 可以在这里检查是否有错误处理逻辑，例如显示错误消息
  })
})
