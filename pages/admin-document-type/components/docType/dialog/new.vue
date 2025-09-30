<template>
  <el-dialog v-model="state.visible" :title="$t('docType.new')"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
             destroy-on-close
  >
    <el-form :model="formData" ref="elFormRef" label-position="top" >
      <el-form-item :label="$t('search.type')" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item :label="$t('docType.category')" prop="category" required>
        <el-select v-model="formData.category" placeholder="Select" filterable>
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('doc.isFolder')" prop="isFolder">
        <el-switch v-model="formData.isFolder" />
      </el-form-item>
      <el-divider />
      <el-form-item :label="$t('dpTable_permission')">
        <el-select v-model="formData.acls" multiple placeholder="Select" style="width: 100%" filterable>
          <el-option-group v-for="group in permissionOptions" :key="group.label" :label="$t(group.label)">
            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-option-group>
          <!-- <el-option v-for="item in permissionOptions" :key="item" :label="item" :value="item" /> -->
        </el-select>
      </el-form-item>
      <!-- Add more fields as needed -->
    </el-form>
    <template #footer>
      <div class="footer-grid">
        <el-button id="DocumentType__CreateNewDocumentType__Submit" type="primary" :loading="state.loading"
                   @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>
import { adminApi, clientApi } from 'api'
import { ElMessage } from 'element-plus'
const emits = defineEmits([
  'refresh'
])
const state = reactive({
  loading: false,
  visible: false,
  setting: {}
})

const elFormRef = ref()
const { t } = useI18n()
const { flatRole } = useRBAC()
const permissionOptions = ref<any[]>([])
const categoryOptions = ref<any[]>([])
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
  const data = await adminApi.api.getDocpaltypeSettingsCategories().then((res) => res.data)
  categoryOptions.value = data.map((item: any) => ({
    label: item,
    value: item
  }))
}

const formData = reactive({
  name: '',
  category: '',
  isFolder: false,
  acls:[],
  status: 'A',
  langs:{
    en:true,
    zh:true,
    ja:true,
    ko:true,
    fr:true,
  },
  // add other fields as needed
})

async function handleSubmit() {
  try {
    await elFormRef.value.validate()
    const data = formData
    state.loading = true

    const result = await adminApi.api.postDocpaltypeSettingsDocpalTypeV2Create(data)
    ElMessage.success(t('tip_createdMsg', {
      modelName: t('docType_documentType'),
      name: data.name
    }))
    state.visible = false
    emits('refresh')
  } catch (error) {
    console.log('error', error)
  } finally {
    state.loading = false
  }
}

async function handleOpen() {
  state.visible = true
  await getOptions()
  setTimeout(async () => {
    elFormRef.value.resetFields()
    state.loading = false
  })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
    