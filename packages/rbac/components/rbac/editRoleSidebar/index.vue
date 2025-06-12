<template>
  <div class="sidebar-overlay" v-if="dialogVisible" @click.self="handleCancel">
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>{{ formData.type === 1 ? $t('orgChart.editSidebar.editRole') : $t('orgChart.editSidebar.editGroup') }}</h3>
        <el-button class="close-btn" link @click="handleCancel">×</el-button>
      </div>
      <div class="sidebar-content">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
          @submit.prevent
        >
          <el-form-item :label="$t('orgChart.editSidebar.roleLabel')" prop="name" required>
            <el-input v-model="formData.name" :placeholder="$t('orgChart.editSidebar.rolePlaceholder')" />
          </el-form-item>

          <el-form-item 
            v-if="formData.type === 1"
            :label="$t('orgChart.editSidebar.parentRole')" 
            prop="parentId"
          >
            <el-select
              v-model="formData.parentId"
              :placeholder="$t('orgChart.editSidebar.parentRolePlaceholder')"
              clearable
            >
              <el-option
                v-for="role in filteredRoleOptions"
                :key="role.id"
                :label="role.name"
                :value="role.id"
              />
            </el-select>
          </el-form-item>

          <el-form-item v-if="formData.status" :label="$t('tableHeader_status')" prop="status">
            <el-select v-model="formData.status" :placeholder="$t('tableHeader_status')">
              <el-option :label="$t('actions.active')" :value="1" />
              <el-option :label="$t('actions.inactive')" :value="3" />
            </el-select>
          </el-form-item>
        </el-form>

        <div class="form-actions">
          <el-button @click="handleCancel">{{ $t('orgChart.editSidebar.cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            {{ $t('orgChart.editSidebar.save') }}
          </el-button>
        </div>

        <RbacEditRoleSidebarUserTable 
          :role-id="String(formData.id)" 
          v-if="dialogVisible"
          :isAdd="false"
          :type="formData.type"
          @update="handleUsersUpdate"
        />
      </div>
      <div class="sidebar-footer">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { adminApi } from 'api'
import type { FormInstance } from 'element-plus'


const { t } = useI18n()

interface RoleFormData {
  id: number
  name: string
  parentId?: number
  status: number
  users?: any[]
  type: number
}

const props = defineProps<{
  roleOptions: Array<{ id: number; name: string }>
}>()

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'close'): void
}>()

const dialogVisible = ref(false)
const loading = ref(false)
const formRef = ref<FormInstance>()

const formData = reactive<RoleFormData>({
  id: 0,
  name: '',
  parentId: undefined,
  status: 1,
  type: 1
})

const rules = {
  name: [
    { required: true, message: t('orgChart.editSidebar.validation.roleRequired'), trigger: 'blur' },
    { min: 2, max: 50, message: t('orgChart.editSidebar.validation.minLength'), trigger: 'blur' }
  ]
}

// Filter out the current role and its children from parent role options
const filteredRoleOptions = computed(() => {
  return props.roleOptions.filter(role => role.id !== formData.id)
})

function resetForm() {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  formData.id = 0
  formData.name = ''
  formData.parentId = undefined
  formData.status = 1
  formData.users = undefined
  formData.type = 1
}

function open(role: RoleFormData) {
  resetForm()
  Object.assign(formData, role)
  console.log("formData", formData)
  dialogVisible.value = true
}

async function handleSubmit() {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    await adminApi.api.putAclRole({
      ...formData,
      id: String(formData.id),
      parentId: formData.parentId ? String(formData.parentId) : undefined,
      type: formData.type
    })
    
    dialogVisible.value = false
    emit('success')
  } catch (error) {
    console.error('Failed to update role:', error)
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  dialogVisible.value = false
  resetForm()
}

const handleUsersUpdate = (users: any[]) => {
  // formData.users = users
  emit('success')
}

defineExpose({
  open
})
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.sidebar {
  width: 600px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  font-size: 24px;
}

.sidebar-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.form-actions {
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
}
</style> 
