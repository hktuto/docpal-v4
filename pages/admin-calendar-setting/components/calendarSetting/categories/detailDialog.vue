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
  name: [
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
const locationsOptions = ref([])
const limitSeat = ref(false)
// TODO 在創建時會默認加載以下的workflow
const defWorkflow = ref([
  {
    'key': `new_folder_cabinet_1755583567273_${Date.now()}`,
    'name': 'Test New Folder Cabinet',
    'type': 'new_folder_cabinet_1755583567273'
  },
  {
    'key': `test-pdf-writer_1754295048597_${Date.now()}`,
    'name': 'test-PDF-writer',
    'type': 'test-pdf-writer_1754295048597'
  },
  {
    'key': `test-http-script_1754991301482_${Date.now()}`,
    'name': 'test-http-script',
    'type': 'test-http-script_1754991301482'
  },
  {
    'key': `test-pdf-reader_1754029457595_${Date.now()}`,
    'name': 'Test-PDF-reader',
    'type': 'test-pdf-reader_1754029457595'
  }
])

async function init() {
  permissionOptions.value = await getPermissionSelectOption()

  userOptions.value = permissionOptions.value[0].options
  roleOptions.value = permissionOptions.value[1].options
  groupOptions.value = permissionOptions.value[2].options
  locationsOptions.value = locationsOption.value.map((item: any) => ({
    id: item.id,
    name: item.Location
  }))
}

const state = reactive({
  viewList: [],
  updateList: [],
  createList: [],
  cancelList: [],
  removeList: [],
  exportList: [],
  locationList: []
})

function initPermission() {
  state.viewList = mergeAllArrays(currentData.value.permission.view)
  state.updateList = mergeAllArrays(currentData.value.permission.update)
  state.createList = mergeAllArrays(currentData.value.permission.create)
  state.cancelList = mergeAllArrays(currentData.value.permission.cancel)
  state.removeList = mergeAllArrays(currentData.value.permission.remove)
  state.exportList = mergeAllArrays(currentData.value.permission.export)

  const list = []
  if (currentData.value.location?.value?.length > 0) {
    currentData.value.location.value.forEach((values: any) => {
      const find = locationsOptions.value.find((lOp: any) => lOp.id === values.id)
      if (find) {
        list.push(values.id)
      }
    })
  }
  state.locationList = list
}

function mergeAllArrays(item: any) {
  const list = []
  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const value = item[key]
      if (Array.isArray(value)) {
        list.push(...fillList(value))
      }
    }
  }
  return list
}

function fillList(list: any) {
  const newList = []
  list.forEach((itemKey: string) => {
    if (userOptions.value.find((ui: any) => ui.value.includes(itemKey))) {
      newList.push(`user_${itemKey}`
      )
    } else if (roleOptions.value.find((ui: any) => ui.value.includes(itemKey))) {
      newList.push(
        `role_${itemKey}`
      )
    } else if (groupOptions.value.find((ui: any) => ui.value.includes(itemKey))) {
      newList.push(
        `group_${itemKey}`
      )
    }
  })
  return newList
}

async function open(item?: any) {
  await init()
  if (item) {
    isEdit.value = true
    currentData.value = deepCopy(item)
    if (typeof currentData.status === 'string') {
      currentData.status = currentData.status === 'true'
    }
    limitSeat.value = currentData.value.availableSeat > 0
    initPermission()
  } else {
    isEdit.value = false
    currentData.value = {
      permission: {},
      location: {},
      availableSeat: 0
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

  Object.keys(item).forEach(prop => {
    if (item[prop].length === 0) {
      delete item[prop]
    }
  })

  return item
}

async function submit() {
  if (!limitSeat) currentData.value.availableSeat = 0

  try {
    await formRef.value.validate()
  } catch (e) {
    return
  }

  if (isEdit.value) {
    const result = await adminApi.api.putEventCalendarsSettingId(currentData.id, currentData.value)
  } else {
    // TODO use def value
    currentData.value.flows = defWorkflow.value
    const result = await adminApi.api.postEventCalendarsSetting(currentData.value)
  }

  emits('submit')
  opened.value = false
}

watch(() => state.locationList, () => {
  const location = []
  if (state.locationList?.length > 0) {
    state.locationList.forEach((item: string) => {
      const find = locationsOptions.value.find((o: any) => o.id === item)
      if (find) {
        location.push(find)
      }
    })
  }
  currentData.value.location.value = location
})
defineExpose({ open })
</script>

<template>
  <ElDialog v-model="opened" :title="$t('Create Calendar')" top="5vh" width="800px">
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
                <el-option v-for="item in group.options" :key="item.value" :label="item.location" :value="item.value" />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />

      <el-form-item :label="t('Location Options')">
        <el-select v-model="state.locationList" multiple collapse-tags placeholder="Select" style="width: 50%">
          <el-option v-for="item in locationsOptions" :key="item.id" :label="item.name" :value="item.id" />
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
          <el-form-item v-if="limitSeat" :label="t('Available Seat')" prop="availableSeat">
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
        <el-form-item :label="t('Flows')">
          <template v-for="item in currentData.flows">
            {{ item.name }}
          </template>
        </el-form-item>
        <el-divider />
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
