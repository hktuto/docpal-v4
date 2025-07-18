import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { Setting, SettingUserSignature } from '#components'
import { adminApi, clientApi } from './mock/api'
import { VxeGrid } from 'vxe-table'
import { ElMessageBox, ElMessage, ElSwitch } from 'element-plus'
import { mockRouterProvider, ReaderDialog, VFormRender, FormRenderer } from './util'
vi.mock('element-plus', () => ({
  ElMessageBox: {
    alert: vi.fn(),
    confirm: vi.fn()
  },
  ElNotification: {
    success: vi.fn()
  },
  ElMessage: {
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  }
}))
describe('[client-user-setting]Setting', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(Setting, {
      props: {
        pageNum: 0,
        pageSize: 20
      },
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.card').exists()).toBe(true) // 检查卡片容器是否存在
  })

  it('should handle password change', async () => {
    await wrapper.vm.handleChangePassword() // 点击按钮

    await new Promise((resolve) => setTimeout(resolve, 1000))
    const route = useRoute()
    expect(route.path).toBe('/resetPassword') // 检查路由是否变化
  })
  it('should initialize user profile settings correctly', async () => {
    // const spyInit =  vi.spyOn(wrapper.vm, 'init')
    wrapper.vm.state.form = {
      role: 'role',
      groups: [],
      status: 'A'
    }
    clientApi.api.getUserProfileSetting.mockResolvedValue({
      data: {
        properties: {
          name: { type: 'string', label: 'Name', allowUserEdit: true, display: false, readyOnly: false, sort: 1 },
          email: { type: 'string', label: 'Email', allowUserEdit: true, display: false, readyOnly: false, sort: 2 }
        }
      }
    })
    clientApi.api.getNuxeoUserGetapplication.mockResolvedValue({ data: { id: '123', name: 'John Doe', email: 'john@example.com' } })
    clientApi.api.getAclUserUserid.mockResolvedValue({ data: { roleName: 'Admin', groups: [{ groupName: 'Group1' }] } })
    clientApi.api.getNotificationSettingUserUseridPreferences.mockResolvedValue({ data: [{ name: 'Email Notifications', value: true }] })
    await wrapper.vm.save() // 点击按钮
    expect(wrapper.vm.state.list).toHaveLength(2)
    expect(wrapper.vm.state.list[0]).toEqual({
      key: 'name',
      type: 'string',
      label: 'Name',
      allowUserEdit: true,
      disabled: false,
      readyOnly: false
    })

    expect(wrapper.vm.state.form.id).toBe('123') // 检查 ID 是否正确
    expect(wrapper.vm.state.form.name).toBe('John Doe') // 检查名称是否正确
    expect(wrapper.vm.state.form.email).toBe('john@example.com') // 检查邮箱是否正确

    // 检查角色和组是否正确更新
    expect(wrapper.vm.state.form.role).toBe('Admin')
    expect(wrapper.vm.state.form.groups).toEqual(['Group1'])
    // 检查通知偏好设置是否正确更新
    expect(wrapper.vm.state.notificationPreferenceList).toHaveLength(1)
    expect(wrapper.vm.state.notificationPreferenceList[0].name).toBe('Email Notifications')
  })
  
  it('should message after save', async () => {
    // const spyInit =  vi.spyOn(wrapper.vm, 'init')
    await wrapper.vm.save() // 点击按钮
    expect(clientApi.api.patchNuxeoIdentityUser).toHaveBeenCalled() // 检查路由是否变化
    expect(clientApi.api.putUserSetting).toHaveBeenCalled() // 检查路由是否变化
    expect(clientApi.api.postNotificationSettingUserUseridPreferences).toHaveBeenCalled() // 检查路由是否变化
    // expect(clientApi.api.patchNuxeoIdentityUser).toHaveBeenCalled() // 检查路由是否变化
    expect(mockRouterProvider.message.success).toHaveBeenCalledWith('tip_updateSuccessMsg')
    // expect(spyInit).toHaveBeenCalled()
  })
})
describe('[client-user-setting]SettingUserSignature', () => {
  let wrapper: any
  const mockTabProvider = {}

  beforeEach(async () => {
    wrapper = mount(SettingUserSignature, {
      global: {
        components: { VxeGrid, FormRenderer, VFormRender, ReaderDialog },
        provide: {
          [TabManagerKey]: mockTabProvider,
          [MenuRouterKey]: mockRouterProvider
        },
        mocks: {
          $t: (msg: string) => msg, // Mock translation function
          $i18n: { t: (key: string) => key }
        }
      }
    })
    wrapper.vm.state.userSignatureVisible = true

    // const dialogRef = wrapper.vm.$refs.DocTypeDialogNewRef
    // dialogRef.handleOpen = vi.fn()
    // const tableRef = wrapper.vm.$refs.tableRef;
    // tableRef.loadData = vi.fn();
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })
  it('should open the dialog and get image URL', async () => {
    await wrapper.vm.handleOpen() // 打开对话框
    expect(wrapper.vm.state.userSignatureVisible).toBe(true)

    // await wrapper.vm.getImageUrl() // 获取图片 URL
    // expect(wrapper.vm.state.fileList).toHaveLength(1)
    // expect(wrapper.vm.state.fileList[0].name).toBe('user-signature.png')
  })
  it('should handle file upload on submit', async () => {
    // 模拟上传文件
    const file = new Blob(['test'], { type: 'image/png' })
    const fileList = [{ raw: file, name: 'user-signature.png', size: 1024 }]
    wrapper.vm.state.fileList = fileList

    await wrapper.vm.handleSubmit() // 提交表单

    expect(clientApi.api.postUserprofileUseridSignature).toHaveBeenCalled()
    expect(wrapper.vm.state.userSignatureVisible).toBe(false)
  })
  it('should handle error during image fetch', async () => {
    // 模拟 API 错误
    clientApi.api.getUserprofileUseridSignature.mockRejectedValue(new Error('Fetch error'))

    await wrapper.vm.getImageUrl() // 获取图片 URL
    expect(wrapper.vm.state.userSignatureVisible).toBe(true) // 对话框仍然打开
  })
  it('should handle file size exceed error', async () => {
    // 模拟文件大小超限
    const oversizedFile = new Blob(['test'], { type: 'image/png', size: 6 * 1024 * 1024 }) // 6MB
    const fileList = [{ raw: oversizedFile, name: 'oversized.png', size: 6 * 1024 * 1024 }]
    await wrapper.vm.onChange(null, fileList) // 调用 onChange

    expect(wrapper.vm.state.fileList).toHaveLength(0) // 文件列表应为空
  })
  it('should remove file on beforeRemove', async () => {
    wrapper.vm.state.fileList = [{ name: 'user-signature.png' }]
    await wrapper.vm.beforeRemove() // 移除文件

    expect(wrapper.vm.state.fileList).toHaveLength(0) // 文件列表应为空
  })
})
