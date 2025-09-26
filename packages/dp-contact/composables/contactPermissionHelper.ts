// import { globalApi } from 'api'
import { ref, onMounted } from 'vue'

export const useContactPermissionHelper = () => {
  const isEdit = ref(false)
  const isDelete = ref(false)
  const isCreate = ref(false)
  const isManage = ref(false)
  async function getPermission(permissionList: string[]) {
    isEdit.value = false
    isDelete.value = false
    isCreate.value = false
    isManage.value = false
    const appPlatform = useAppPlatform()
    if (appPlatform.value === 'admin') {
      isEdit.value = true
      isDelete.value = true
      isCreate.value = true
      isManage.value = true
      return
    }
    if (permissionList.includes('Edit')) {
      isEdit.value = true
    }
    if (permissionList.includes('Delete')) {
      isDelete.value = true
    }
    if (permissionList.includes('Create')) {
      isCreate.value = true
    }
    if (permissionList.includes('Manage')) {
      isManage.value = true
      isEdit.value = true
      isDelete.value = true
      isCreate.value = true
    }
  }
  return {
    isEdit,
    isDelete,
    isCreate,
    isManage,
    getPermission
  }
}
