<script setup lang="ts">
import { clientApi } from 'api'

const { t } = useI18n()
const FormRendererRef = ref()
const showSelectUserDialog = ref(false)
const formRenderSlotsRef = ref<any>({})
const state = reactive({
  formData: {},
  formJson: {},
  writableIds: [],
  readonly: false
})
const { formData, formJson } = toRefs(state)
// @ts-ignore
const { formRenderSlots } = useWorkflow()

async function setForm(json: string | object, data?: object, properties: any[] = []) {
  if (JSON.stringify(json) === '{}') {
    FormRendererRef.value.setFormJson(defaultFormJson)
    return
  }
  state.formJson = json
  FormRendererRef.value.setFormJson(json)
  // if (data && properties) {
  // const _data = await handleData(data)
  // // check if value in _data is undefine or null , if so remove it
  // Object.keys(_data).forEach((key) => {
  //   if (_data[key] === undefined || _data[key] === null) delete _data[key]
  // })
  // state.formData = { ..._data }
  //
  // FormRendererRef.value.setFormData(_data)
  // handleTypeIds(properties)
  // } else {
  state.formData = { ...data }
  // }
}

const saveForm = reactive({
  name: '',
  location: '',
  allDayEvent: false,
  startDate: '',
  endDate: '',
  limitSeat: false,
  availableSeat: 0
})

const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: 'newEventDialogParticipantsTable',
  api: (pageParams: any) => {
    return []
  },
  columns: [
    {
      field: 'username',
      title: 'Username',
      fixed: 'left'
    },
    {
      field: 'email',
      title: 'Email',
      slots: {
        default: 'currentPath'
      }
    }
  ],
  bodyActions: [
    [
      {
        code: 'edit',
        name: 'Edit',
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
        }
      },
      {
        code: 'delete',
        name: 'Delete',
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
        }
      }
    ]
  ]
})

const userList = []
const selectUser = reactive({
  userList: [],
  userString: ''
})

function openSelectUser() {
  selectUser.userString = ''
  showSelectUserDialog.value = true
}

function confirm() {


  showSelectUserDialog.value = false
}

async function getFormData(needValidation = true) {
  try {
    let formData = {}
    if (!needValidation) formData = await FormRendererRef.value.getFormData(false)
    else {
      formData = await FormRendererRef.value
        .getFormData()
        .then((res: any) => {
          return res
        })
        .catch((error: any) => {
          return false
        })
    }
    if (!formData) return false

    formData.user = selectUser.userString
    return formData
  } catch (error) {
    console.error(error)
  }
}

function disableForm() {
  state.readonly = true
  FormRendererRef.value.vFormRenderRef.disableForm()
}

function enableForm() {
  state.readonly = false
  FormRendererRef.value.vFormRenderRef.enableForm()
}

defineExpose({ setForm, getFormData, disableForm, enableForm })
</script>

<template>
  <FormRenderer ref="FormRendererRef" :form-json="formJson">
    <template v-slot:user>
      <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
          <el-button @click="openSelectUser" type="primary">{{ $t('Add Participants') }}</el-button>
          <slot name="toolbar_buttons" />
        </template>
      </VxeGrid>

      <el-dialog v-model="showSelectUserDialog" :title="t('Select User')" append-to-body align-center width="400px">
        <el-form-item :label="t('User')" label-position="top">
          <el-select v-model="selectUser.userList" multiple clearable>
            <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id" />
          </el-select>
        </el-form-item>
        <template #footer>
          <el-button id="Home__Dashboard__Calendar__NewEvent__SelectUser__Cancel" @click="showSelectUserDialog = false">
            {{ $t('vxe.button.cancel') }}
          </el-button>
          <el-button id="Home__Dashboard__Calendar__NewEvent__SelectUser__Confirm" type="primary" @click="confirm">
            {{ $t('dpButtom_confirm') }}
          </el-button>
        </template>
      </el-dialog>
    </template>
  </FormRenderer>
</template>

<style scoped lang="scss">

</style>