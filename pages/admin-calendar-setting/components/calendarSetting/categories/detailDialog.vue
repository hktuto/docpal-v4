<script lang="ts" setup>
import { ElColorPicker, ElDialog } from 'element-plus'
import { adminApi } from 'api'

const { t } = useI18n()
const { locationsOption } = useCalendarStore()


const emits = defineEmits(['submit'])
const currentData = ref()
const opened = ref(false)
const isEdit = ref(false)
const formRef = ref()
const rules = reactive({
  nane: [
    { required: true, message: t('render.hint.fieldRequired', { name: t('Name') }), trigger: 'blur' }
  ],
  availableSeat: [
    { required: true, message: t('render.hint.fieldRequired', { name: t('AvailableSeat') }), trigger: 'blur' }
  ]
})

const permissionOptions = ref([])
const userOptions = ref([])
const roleOptions = ref([])
const groupOptions = ref([])

const remoteOption = usePermissionOption()
const options = computed(() => {
  // remoteOption
})

async function getPermissionOption() {
  const options = await getCachePermissionOptions()

  console.log(22, options)


  permissionOptions.value = []
  // const userData: any = await adminApi.api.postNuxeoIdentityUsers().then((res) => res.data)
  // if (userData.length > 0) {
  //   userOptions.value = userData
  //   permissionOptions.value.push(
  //     {
  //       label: 'User',
  //       value: 1,
  //       type: 'select',
  //       options: userData.map((item: any) => ({
  //         label: item.username,
  //         value: `user_${item.id}`
  //       }))
  //     }
  //   )
  // }

  // const roleData: any = await adminApi.api.postAclRoleList([{
  //   column: 'status',
  //   type: 'EQ',
  //   values: '1'
  // }]).then((res) => res.data)
  // if (roleData.length > 0) {
  //   roleOptions.value = roleData
  //   permissionOptions.value.push(
  //     {
  //       label: 'Role',
  //       value: 2,
  //       type: 'select',
  //       options: roleData.map((item: any) => ({
  //         label: item.name,
  //         value: `role_${item.id}`
  //       }))
  //     }
  //   )
  // }

  // const groupData = await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
  // if (roleData.length > 0) {
  //   groupOptions.value = groupData
  //   permissionOptions.value.push(
  //     {
  //       label: 'Group',
  //       value: 3,
  //       type: 'select',
  //       options: groupData.map((item: any) => ({
  //         label: item.name,
  //         value: `group_${item.id}`
  //       }))
  //     }
  //   )
  // }
}

const limitSeat = computed(() => {
  return currentData.value.availableSeat > 0
})

const state = reactive({
  viewList: [],
  updateList: [],
  createList: [],
  cancelList: [],
  removeList: [],
  exportList: []
})

const locationList = computed(() => {

})

function initPermission() {
  state.viewList = mergeAllArrays(currentData.value.permission.view)
  state.updateList = mergeAllArrays(currentData.value.permission.update)
  state.createList = mergeAllArrays(currentData.value.permission.create)
  state.cancelList = mergeAllArrays(currentData.value.permission.cancel)
  state.removeList = mergeAllArrays(currentData.value.permission.remove)
  state.exportList = mergeAllArrays(currentData.value.permission.export)
}

function fillList(list: any) {
  const newList = []
  list.forEach((item: string) => {
    if (userOptions.value.includes(item)) {
      newList.push(`user_${item}`)
    } else if (roleOptions.value.includes(item)) {
      newList.push(`role_${item}`)
    } else if (groupOptions.value.includes(item)) {
      newList.push(`group_${item}`)
    }
  })
  console.log(2, newList)
  return newList
}

function mergeAllArrays(item: any) {
  const list = []
  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const value = item[key]
      console.log(1, value)
      if (Array.isArray(value)) {
        list.push(...fillList(value))
      }
    }
  }
  return list
}

async function open(item?: any) {
  // console.log(2, locationsOption)
  console.log(item)
  // await getCachePermissionOptions()
  // await getPermissionOption()
  if (item) {
    isEdit.value = true
    currentData.value = item
    initPermission()
  } else {
    isEdit.value = false
    currentData.value = {
      name: '',
      register: true,
      permission: {},
      location: {
        newLocation: true,
        empty: true,
        value: []
      },
      availableSeat: 0,
      backgroundColor: '#FF9900',
      textColor: '#FF9900',
      highlightColor: '#FF9900',
      status: true
    }
  }
  opened.value = true
}

function fillPermissionObject(itemKey: string) {
  switch (itemKey) {
    case 'view':
      currentData.value.permission.view = fillItem(state.viewList)
      break
    case 'update':
      currentData.value.permission.update = fillItem(state.updateList)
      break
    case 'create':
      currentData.value.permission.create = fillItem(state.createList)
      break
    case 'cancel':
      currentData.value.permission.cancel = fillItem(state.cancelList)
      break
    case 'remove':
      currentData.value.permission.remove = fillItem(state.removeList)
      break
    case 'export':
      currentData.value.permission.export = fillItem(state.exportList)
      break
  }
}

function fillItem(list: any) {
  const item = {
    USERS: [],
    ROLE: [],
    GROUPS: []
  }

  list.forEach((key: string) => {
    if (key.includes('user_')) {
      item.USERS.push(key.split('user_')[1])
    } else if (key.includes('role_')) {
      item.ROLE.push(key.split('role_')[1])
    } else if (key.includes('group_')) {
      item.GROUPS.push(key.split('group_')[1])
    }
  })

  return item
}

async function submit() {
  console.log(isEdit, currentData)

  if (isEdit.value) {
    return
  }

  const result = await adminApi.api.postEventCalendarsSetting(currentData.value)
  console.log(2, result)

  // emits('submit')
  // opened.value = false
}

defineExpose({ open })
</script>

<template>
  <ElDialog v-model="opened" :title="t('Create Calendar')" width="800px">
    <el-form ref="formRef" :model="currentData" label-position="top" :rules="rules">
      <h4>Information</h4>
      <el-form-item :label="t('Name') " prop="name">
        <el-input v-model="currentData.name" />
      </el-form-item>

      <el-form-item :label="t('Allow External User To Register')">
        <el-switch v-model="currentData.register" active-text="Yes" inactive-text="No" />
      </el-form-item>

      <el-divider />

      <h4>Permission</h4>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item :label="t('View')">
            <el-select v-model="state.viewList" multiple filterable clearable collapse-tags placeholder="Select"
                       @blur="fillPermissionObject('view')">
              <el-option-group v-for="group in permissionOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('Update')">
            <el-select v-model="state.updateList" multiple filterable clearable collapse-tags placeholder="Select"
                       @blur="fillPermissionObject('update')">
              <el-option-group v-for="group in permissionOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('Create')">
            <el-select v-model="state.createList" multiple filterable clearable collapse-tags placeholder="Select"
                       @blur="fillPermissionObject('create')">
              <el-option-group v-for="group in permissionOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('Cancel')">
            <el-select v-model="state.cancelList" multiple filterable clearable collapse-tags placeholder="Select"
                       @blur="fillPermissionObject('cancel')">
              <el-option-group v-for="group in permissionOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('Remove')">
            <el-select v-model="state.removeList" multiple filterable clearable collapse-tags placeholder="Select"
                       @blur="fillPermissionObject('remove')">
              <el-option-group v-for="group in permissionOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="t('Export')">
            <el-select v-model="state.exportList" multiple filterable clearable collapse-tags placeholder="Select"
                       @blur="fillPermissionObject('export')">
              <el-option-group v-for="group in permissionOptions" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />

      <el-form-item :label="t('Location Options')">
        <el-select v-model="locationList" multiple collapse-tags placeholder="Select" style="width: 50%">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="t('Allow New Location')">
            <el-switch v-model="currentData.location.newLocation" active-text="Yes" inactive-text="No" />
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item :label="t('Allow Empty')">
            <el-switch v-model="currentData.location.empty" active-text="Yes" inactive-text="No" />
          </el-form-item>
        </el-col>
      </el-row>

      <h4>Seat Options</h4>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="t('Limit Seat')">
            <el-switch v-model="limitSeat" active-text="Yes" inactive-text="No" />
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item :label="t('Available Seat')" prop="availableSeat">
            <el-input-number v-model="currentData.availableSeat" controls-position="right" min="0" max="99999999"
                             :step="1" step-strictly style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />

      <h4>Style</h4>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="t('Background Color')">
            <el-color-picker v-model="currentData.backgroundColor" color-format="hex" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="t('Text Color')">
            <el-color-picker v-model="currentData.textColor" color-format="hex" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="t('Highlight Color')">
            <el-color-picker v-model="currentData.highlightColor" color-format="hex" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />

      <div v-if="isEdit">
        <el-divider />
        <el-form-item :label="t('Flows')">

        </el-form-item>
      </div>

      <el-form-item :label="t('Status')">
        <el-switch v-model="currentData.status" active-text="Active" inactive-text="No" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button id="CalendarSetting__EventLocations__EventCategories__Add__Cancel" @click="opened = false">
        {{ t('Cancel') }}
      </el-button>
      <el-button type="primary" @click="submit"
                 :id="`CalendarSetting__EventLocations__EventCategories__Add__${isEdit ? 'Save' : 'Create'}`">
        {{ isEdit ? t('Save') : t('Create') }}
      </el-button>
    </template>
  </ElDialog>
</template>
