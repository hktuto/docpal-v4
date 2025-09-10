<script lang="ts" setup>
import dayjs from 'dayjs'
import { clientApi } from 'api'

const { t } = useI18n()
const emit = defineEmits(['addEvent'])
const opened = ref(false)
// const newEventId = defineModel<string>('newEventId')
const createDialogFormRef = ref()
const newEventId = ref(new Date().valueOf().toString())

function open() {
  opened.value = true
}

function submit() {
  // TODO: save to server and 填充回 calendar
  const newEvent = {
    id: 'newEventName_' + Date.now(),
    eventId: newEventId.value,
    start: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
    end: dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
    title: 'test'
    //   people: [''],
    //   location: '',
    //   description: '',
    //   calendarId: '',
    //   _customContent: {
    //     timeGrid: '',
    //     dateGrid: '',
    //     monthGrid: '',
    //     monthAgenda: ''
    //   },
    //   _options: props.options
  }

  // console.log(22, newEvent, createDialogFormRef.value.form)
  emit('addEvent', newEvent)
  opened.value = false
}

defineExpose({ open })
</script>

<template>
  <el-dialog v-model="opened" :title="t('New Event')" append-to-body>
    <el-form label-position="top">
      <el-form-item :label="t('Calendar')">
        <el-select>
          <el-option />
        </el-select>
      </el-form-item>
    </el-form>

    <CalendarWidgetCreateDialogForm ref="createDialogFormRef" />

    <template #footer>
      <el-button id="Home__Dashboard__Calendar__NewEvent__Cancel" @click="opened = false">
        {{ $t('vxe.button.cancel') }}
      </el-button>
      <el-button id="Home__Dashboard__Calendar__NewEvent__Save" type="primary" @click="submit">
        {{ $t('button.save') }}
      </el-button>
    </template>
  </el-dialog>
</template>