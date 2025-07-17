<template>
  <el-dialog
    v-model="visible"
    :title="isEdit ? $t('companyProfile.chopEdit') : $t('companyProfile.chopCreate')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
  >
    <el-form :model="form" label-width="80px" ref="formRef" :rules="rules" label-position="top">
      <el-form-item :label="$t('companyProfile.chopName')" prop="name" required>
        <el-input v-model="form.name" :placeholder="$t('render.hint.fieldRequired', { name: $t('companyProfile.chopName') })"></el-input>
      </el-form-item>
      <el-form-item :label="$t('common_status')" prop="status" required>
        <el-switch v-model="form.status" active-text="Active" inactive-text="Inactive" active-value="A" inactive-value="D"></el-switch>
      </el-form-item>
      <el-divider></el-divider>
      <div style="margin-bottom: 10px; color: #888">{{ $t('dpTable_permission') }}</div>
      <el-form-item label="User, User Role" prop="permissions">
        <el-select v-model="form.permissions" multiple placeholder="Select" style="width: 100%">
          <el-option-group v-for="group in permissionOptions" :key="group.label" :label="$t(group.label)">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-option-group>
          <!-- <el-option v-for="item in permissionOptions" :key="item" :label="item" :value="item" /> -->
        </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <CompanyProfilePictureUpload v-model="form.file" @upload-success="fileChange = true" />
      <!-- 图片上传部分可忽略 -->
    </el-form>
    <template #footer>
      <div class="footer-grid">
        <el-button @click="visible = false">{{ $t('cancelText') }}</el-button>
        <el-button type="primary" :loading="loading" @click="onSave">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { adminApi, clientApi } from 'api'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  companyId?: string
}>()

const emits = defineEmits(['refresh'])

const visible = ref(false)
const loading = ref(false)
const isEdit = ref(false)
const editData = ref<any>(null)
const fileChange = ref(false)
const formRef = ref()
const form = ref<any>({
  name: '',
  status: 'A',
  permissions: [],
  file: null
})

const permissionOptions = ref<any>([])

const rules = {
  name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
  permissions: [{ required: true, message: 'Please select permissions', trigger: 'change' }]
}

// 重置表单
function resetForm() {
  form.value = {
    name: '',
    status: 'A',
    permissions: []
  }
  formRef.value?.resetFields()
}

// 打开添加对话框
function handleAdd() {
  isEdit.value = false
  editData.value = null
  visible.value = true
  resetForm()
}

// 打开编辑对话框
async function handleEdit(data: any) {
  isEdit.value = true
  editData.value = data
  visible.value = true
  fileChange.value = false
  const file = await adminApi.api.getCompanyprofilesCompanyidChopsCompanychopidFile(props.companyId as string, data.id, {
    format: 'blob'
  })
  const permissions: any = []
  if (data.roles) {
    data.roles.split(',').forEach((item: any) => {
      permissions.push('role____' + item)
    })
  }
  if (data.users) {
    data.users.split(',').forEach((item: any) => {
      permissions.push(item)
    })
  }
  // 填充表单数据
  form.value = {
    name: data.name || '',
    status: data.status,
    permissions,
    file
  }
}

const { flatRole } = useRBAC()
let userList: any = []
async function getOptions() {
  await getUserList()
  permissionOptions.value.push(
    {
      label: 'user_role',
      value: 2, // 1=User, 3=Group, 2=Role
      type: 'select',
      options: flatRole.value.map((item: any) => ({
        label: item.name,
        value: 'role____' + item.id
      }))
    },
    {
      label: 'user_users',
      value: 1,
      type: 'select',
      options: userList
    }
  )
  async function getUserList() {
    if (userList.length > 0) return
    try {
      const _userList: any = await clientApi.api.postNuxeoIdentityUsers().then((res) => res.data)
      userList = _userList
        .sort((a: any, b: any) => a.username.localeCompare(b.username))
        .map((item: any) => ({
          label: item.userId,
          value: item.userId
        }))
    } catch (error) {
      userList = []
    }
  }
}
// 保存数据
async function onSave() {
  try {
    if (!form.value.file) {
      ElMessage.error('Please upload a file')
      return
    }
    await formRef.value?.validate()
    loading.value = true
    const roles: any = []
    const users: any = []
    form.value.permissions.forEach((item: any) => {
      if (item.includes('role____')) {
        roles.push(item.split('role____')[1])
      } else {
        users.push(item)
      }
    })
    const formData = new FormData()
    formData.append('status', form.value.status)
    formData.append('name', form.value.name)
    if (roles.length > 0) {
      formData.append('roles', roles.join(','))
    }
    if (users.length > 0) {
      formData.append('users', users.join(','))
    }
    if (isEdit.value && editData.value) {
      // 编辑模式
      if (fileChange.value) {
        formData.append('file', form.value.file)
      }
      await adminApi.api.putCompanyprofilesCompanyidChopsCompanychopid(props.companyId as string, editData.value.id, {} as any, formData as any)
      ElMessage.success('Updated successfully')
    } else {
      // 添加模式
      formData.append('file', form.value.file)

      await adminApi.api.postCompanyprofilesCompanyidChops(props.companyId as string, {} as any, formData as any)
      ElMessage.success('Created successfully')
    }

    visible.value = false
    emits('refresh')
  } catch (error) {
    console.error('Save failed:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getOptions()
})
// 暴露方法给父组件
defineExpose({
  handleAdd,
  handleEdit
})
</script>

<style lang="scss" scoped>
.footer-grid {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
