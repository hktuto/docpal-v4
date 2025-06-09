<template>
  <el-dialog
    v-model="dialogVisible"
    :title="type === 1 ? $t('orgChart.userTable.addUserToRole') : $t('orgChart.userTable.addUserToGroup')"
    width="500px"
    @close="handleClose"
  >
    <div class="dialog-content">
      <el-select-v2
        v-model="selectedUsers"
        :options="users"
        :placeholder="type === 1 ? $t('orgChart.userTable.addUserToRole') : $t('orgChart.userTable.addUserToGroup')"
        filterable
        multiple
        class="filter-input"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ $t('dpButtom_cancel') }}</el-button>
        <el-button type="primary" :disabled="!selectedUsers.length" @click="handleConfirm">
          {{ $t('dpButtom_confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { adminApi } from 'api'
import { ElNotification } from 'element-plus'

interface UserOption {
  label: string
  value: string
}

const props = defineProps<{
  modelValue: boolean
  roleId: string
  type: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', userIds: string[]): void
}>()

const { t } = useI18n()
const dialogVisible = ref(props.modelValue)
const selectedUsers = ref<string[]>([])
const users = ref<UserOption[]>([])

watch(() => props.modelValue, async(newVal) => {
  dialogVisible.value = newVal
  if (newVal) {
    await loadUsers()
  }
})

watch(dialogVisible, (newVal) => {
  emit('update:modelValue', newVal)
})

const loadUsers = async () => {
  try {
    const response = await adminApi.api.getAclRoleUsersDropdown({
      params: {
        roleId: props.roleId
      } 
    } as any)
    
    if (response && Array.isArray(response)) {
      users.value = response.map((item) => ({
        label: item.username || '',
        value: item.id || ''
      }))
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Failed to fetch role users:', error)
    ElNotification({
      title: t('commons_error'),
      message: t('common_fetchFail'),
      type: 'error'
    })
  }
}

const handleClose = () => {
  selectedUsers.value = []
  dialogVisible.value = false
}

const handleConfirm = () => {
  emit('confirm', selectedUsers.value)
  handleClose()
}
</script>

<style scoped>
.dialog-content {
  padding: 20px 0;
}

.filter-input {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 
