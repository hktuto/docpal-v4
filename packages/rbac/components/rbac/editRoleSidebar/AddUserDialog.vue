<template>
  <el-dialog
    v-model="dialogVisible"
    :title="$t('orgChart.userTable.addUser')"
    width="500px"
    @close="handleClose"
  >
    <div class="dialog-content">
      <el-select-v2
        v-model="selectedUsers"
        :options="users"
        :placeholder="$t('orgChart.userTable.addUser')"
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

const props = defineProps<{
  modelValue: boolean
  roleId: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', userIds: string[]): void
}>()

const { t } = useI18n()
const dialogVisible = ref(props.modelValue)
const selectedUsers = ref<string[]>([])
const users = ref<any[]>([])

watch(() => props.modelValue, async(newVal) => {
  dialogVisible.value = newVal
  console.log('newVal', newVal)
  if (newVal) {
    await loadUsers()
  }
})

watch(dialogVisible, (newVal) => {
  emit('update:modelValue', newVal)
})

const loadUsers = async () => {
  try {
    const data = await adminApi.api.getAclRoleUsersDropdown({
      roleId: props.roleId
    }).then(res => res.data)
    users.value = data.map((item: any) => ({
      label: item.username,
      value: item.id
    }))
  } catch(error) {
    console.error('Failed to fetch role users:', error)
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
