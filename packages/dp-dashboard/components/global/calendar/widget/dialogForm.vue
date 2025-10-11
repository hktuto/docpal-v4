<script setup lang="ts">
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const FormRendererRef = ref()
const showSelectUserDialog = ref(false)
const state = reactive({
  formJson: {},
  readonly: false,
  tableData: [],
  userList: [],
  isEdit: false
})
const userList = ref([])
const { formJson } = toRefs(state)

async function setForm(json: string | object) {
  if (!json || JSON.stringify(json) === '{}') {
    routerProvider?.message.error(t('No form was obtained'))
    return
  }
  state.formJson = json
  state.tableData = []
  FormRendererRef.value.setFormJson(json)
}

const { tableConfig, tableEvent, tableRef, reload, query } = useVxeTable({
  id: 'newEventDialogParticipantsTable',
  columns: [
    {
      field: 'name',
      title: 'Username',
      fixed: 'left'
    },
    {
      field: 'email',
      title: 'Email'
    }
  ],
  bodyActions: [
    [
      {
        code: 'delete',
        name: 'Remove',
        visible: true,
        disabled: false,
        action: ({ row }: any) => {
          handleRemoveUser(row.id)
        }
      }
    ]
  ],
  virtualScroll: true,
  refresh: false,
  zoom: false,
  saveColumnOrder: false
})

function openSelectUser() {
  state.userList = []
  showSelectUserDialog.value = true
}

function handleUserListConfirm() {
  state.tableData = userList.value.filter((item: any) => state.userList.includes(item.id))
  showSelectUserDialog.value = false
}

function handleRemoveUser(userId: string) {
  state.tableData = state.tableData.filter((item: any) => item.id !== userId)
  state.userList = state.userList.filter((item: any) => item !== userId)
}

watch(() => state.tableData, () => {
  tableConfig.data = state.tableData
  reload()
})

async function getFormData() {
  try {
    let formData = await FormRendererRef.value.getFormData().then((res: any) => res)
      .catch((error: any) => {
        console.log(error)
        return
      })
    if (!formData) return

    if (state.userList.length === 0) {
      routerProvider?.message.error(t('Please add a user'))
      return
    }

    const data = {
      eventName: formData.eventName,
      eventDescription: formData.eventDescription,
      category: formData.category,
      location: formData.location,
      startTime: formData.startTime + ' 00:00',
      endTime: formData.endTime + ' 23:59',
      isAllDay: formData.isAllDay,
      user: state.userList.join(',')
    }

    if (!formData.isAllDay) {
      data.startTime = formData.startTime + ' ' + formData.time[0]
      data.endTime = formData.endTime + ' ' + formData.time[1]
    }

    // Update operation requires id
    if (state.isEdit) {
      data.eventId = formData.eventId
    }

    return data
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

async function getUserList() {
  userList.value = await getUserSelectOption()
}

function setFormData(isEdit: boolean, data: any) {
  state.isEdit = isEdit
  if (isEdit) {
    state.userList = data.user.split(',')
    delete data.user
    handleUserListConfirm()
  }
  setTimeout(() => {
    FormRendererRef.value.setFormData(data)
  })
}

onMounted(() => {
  getUserList()
})

defineExpose({ setForm, getFormData, setFormData, disableForm, enableForm })
</script>

<template>
  <FormRenderer ref="FormRendererRef" :form-json="formJson">
    <template v-slot:eventUser>
      <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent" style="height: 300px">
        <template #toolbar_buttons>
          <div class="actions">
            <p>Participants</p>
            <el-button id="Home__Dashboard__Calendar__NewEvent__AddParticipants" @click="openSelectUser"
                       class="button-container" type="primary">
              {{ $t('Add Participants') }}
            </el-button>
          </div>
          <slot name="toolbar_buttons" />
        </template>
      </VxeGrid>

      <el-dialog v-model="showSelectUserDialog" :title="t('Select User')" append-to-body align-center width="400px">
        <el-form-item :label="t('User')" label-position="top">
          <el-select v-model="state.userList" multiple filterable clearable>
            <el-option v-for="user in userList" :key="user.id" :label="user.name" :value="user.id" />
          </el-select>
        </el-form-item>
        <template #footer>
          <el-button id="Home__Dashboard__Calendar__NewEvent__AddParticipants__Cancel"
                     @click="showSelectUserDialog = false">
            {{ $t('vxe.button.cancel') }}
          </el-button>
          <el-button id="Home__Dashboard__Calendar__NewEvent__AddParticipants__Confirm" type="primary"
                     @click="handleUserListConfirm">
            {{ $t('dpButtom_confirm') }}
          </el-button>
        </template>
      </el-dialog>
    </template>
  </FormRenderer>
</template>

<style scoped lang="scss">
.actions {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
