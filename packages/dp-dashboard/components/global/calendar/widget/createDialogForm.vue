<script setup lang="ts">
import { clientApi } from 'api'

const { t } = useI18n()
const shwoSelectUserDialog = ref(false)
const form = reactive({
  name: '',
  location: '',
  allDayEvent: false,
  startDate: '',
  endDate: '',
  limitSeat: false,
  availableSeat: 0
})

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

function openSelectUser() {
  shwoSelectUserDialog.value = true
}

function confirm() {
  shwoSelectUserDialog.value = false
}

function handleAllDayEvent() {
  if (form.allDayEvent) {
    form.startDate = ''
    form.endDate = ''
  }
}

defineExpose({ form })
</script>

<template>
  <el-form label-position="top">
    <el-form-item :label="t('Name')">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item :label="t('Location')">
      <el-select v-model="form.location">
        <el-option />
      </el-select>
    </el-form-item>
    <el-form-item :label="t('All Day Event')">
      <el-switch v-model="form.allDayEvent" @change="handleAllDayEvent" />
    </el-form-item>
    <el-form-item v-if="!form.allDayEvent" :label="t('Start Date')">
      <el-date-picker v-model="form.startDate" type="datetime" clearable placeholder="Select date and time"
                      value-format="YYYY-MM-DD" />
    </el-form-item>
    <el-form-item v-if="!form.allDayEvent" :label="t('End Date')">
      <el-date-picker v-model="form.endDate" type="datetime" clearable placeholder="Select date and time"
                      value-format="YYYY-MM-DD" />
    </el-form-item>
    <el-divider />

    <el-row>
      <el-col :span="8">
        <el-form-item :label="t('Limit Seat')">
          <el-switch v-model="form.limitSeat" active-text="Yes" inactive-text="No" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item v-if="form.limitSeat" :label="t('Available Seat')">
          <el-input-number v-model="form.availableSeat" controls-position="right" style="width: 100%" min="0"
                           max="99999999" :step="1" step-strictly />
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider />

    <div>
      <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <template #toolbar_buttons>
          <el-button @click="openSelectUser">{{ $t('Add Participants') }}</el-button>
          <slot name="toolbar_buttons" />
        </template>
      </VxeGrid>
    </div>
  </el-form>

  <el-dialog v-model="shwoSelectUserDialog" :title="t('Select User')" append-to-body align-center width="400px">
    <el-form-item :label="t('User')" label-position="top">
      <el-select>
        <el-option />
      </el-select>
    </el-form-item>
    <template #footer>
      <el-button id="Home__Dashboard__Calendar__NewEvent__SelectUser__Cancel" @click="shwoSelectUserDialog = false">
        {{ $t('vxe.button.cancel') }}
      </el-button>
      <el-button id="Home__Dashboard__Calendar__NewEvent__SelectUser__Confirm" type="primary" @click="confirm">
        {{ $t('dpButtom_confirm') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>