<script lang="ts" setup>
import { getUserPreference } from '#imports'
import { EventType, useEventBus } from 'eventbus'
import { clientApi } from 'api'

const opened = ref(false)
const userPreference = useUserPreference()
const userId = useUserId()
const { t } = useI18n()
const form = reactive({})
const state = reactive({
  list: [
    {
      key: 'username',
      type: 'string',
      label: 'Username',
      allowUserEdit: true,
      disabled: true,
      readyOnly: false
    },
    {
      key: 'email',
      type: 'string',
      label: 'Email',
      allowUserEdit: true,
      disabled: false,
      readyOnly: false
    }
  ],
  notificationPreferenceList:[]
})

const NotificationPreference = reactive({
  list: [
    {
      name: 'Document',
      value: [
        { key: 'Document:Trash', label: 'Trash', value: true },
        { key: 'Document:Create', label: 'Create', value: true },
        { key: 'Document:Convert', label: 'Convert', value: true },
        { key: 'Document:Replace', label: 'Replace', value: true }
      ]
    },
    {
      name: 'Workflow',
      value: [
        { key: 'Workflow:Trash', label: 'Trash', value: true },
        { key: 'Workflow:Create', label: 'Create', value: true },
        { key: 'Workflow:Convert', label: 'Convert', value: true },
        { key: 'Workflow:Replace', label: 'Replace', value: true }
      ]
    }
  ]
})

function handleOpen() {
  console.log('handleOpen')
  init()
  opened.value = true
}

async function reset() {
  opened.value = false
  await getUserPreference()
  updateStyle()
}

async function saveToServer() {
  clientApi.api.putUserSetting(userPreference.value as any)
  opened.value = false
}

function updateStyle() {
  // step 1 : get HTML element
  const htmlElement = document.querySelector('html')
  if (!htmlElement) return
  // step 2 : set style
  htmlElement.style.fontSize = fontSize.value + 'px'
  // set html light or dark mode class
  if (!userPreference.value || userPreference.value.color === 'light') {
    htmlElement.classList.remove('dark')
    // set data-vxe-ui-theme attr
    htmlElement.setAttribute('data-vxe-ui-theme', 'light')
  } else {
    htmlElement.classList.add('dark')
    htmlElement.setAttribute('data-vxe-ui-theme', 'dark')
  }
}

const fontSize = computed({
  get() {
    if (!userPreference.value || !userPreference.value.size) {
      return 16
    } else {
      const fontSize = userPreference.value.size
      return Number(fontSize.replaceAll('px', ''))
    }
  },
  set(value) {
    if (!userPreference.value) return
    userPreference.value.size = value + 'px'
    updateStyle()
  }
})

const colorMode = computed({
  get() {
    if (!userPreference.value || !userPreference.value.color) {
      return true
    } else {
      return userPreference.value.color === 'light'
    }
  },
  set(value) {
    userPreference.value.color = value ? 'light' : 'dark'
    console.log('udpate color', value, userPreference.value.color)
    updateStyle()
  }
})

function init() {
  // let da:any = clientApi.api.getNotificationSettingUserUseridPreferences(userId.value).then(res => res.data)
  // state.notificationPreferenceList = da
  // console.log(22, state.notificationPreferenceList)
}

const bus = useEventBus(EventType.OPEN_SETTINGS)
bus.on(handleOpen)
const userLoginBus = useEventBus(EventType.USER_LOGIN__SUCCESS)
userLoginBus.on(updateStyle)
onUnmounted(() => {
  bus.off(handleOpen)
  bus.off(updateStyle)
})

onMounted(() => {
  init()
})

</script>


<template>
  <ElDialog v-model="opened" draggable append-to-body destroy-on-close width="1500px">
    <el-row :gutter="30">
      <el-col :span="12">
        <h3>User Profile</h3>
        <el-form :model="form" label-position="top">
          <el-form-item v-for="(item, index)  in state.list" :label="t(`${item.label}`)" :key="item.key">
            <el-input v-model="item.value" :disabled="item.disabled" />
          </el-form-item>
        </el-form>

        <el-divider />
        <h3>Password</h3>
        <el-button type="primary" @click="handleOpen">{{ t('Change Password') }}</el-button>
        <el-divider />
      </el-col>

      <!--      <el-col :span="1">-->
      <!--        <el-divider direction="vertical" />-->
      <!--      </el-col>-->

      <el-col :span="12">
        <h3>Preference</h3>

        <div class="colorSetting">
          <div class="label">Color Mode</div>
          <ElSwitch v-model="colorMode" active-text="Light" inactive-text="Dark" />
        </div>
        <div>
          <div class="label">Font Size</div>
          <el-slider v-model="fontSize" style="width: 50%" :min="10" :max="24" />
        </div>

        <el-divider />

        <h3>Notification Preference</h3>
        <div v-for="(item, index) in state.notificationPreferenceList" :key="index">
          <h4>{{ item.name }}</h4>
          <el-checkbox v-for="ite in item.value" :label="ite.label" size="large" v-model="ite.value" :key="ite.key" />
        </div>


      </el-col>

      <el-col :span="12">
        <setting-user-profile-setting />
      </el-col>
    </el-row>
    <!--    <template #footer>-->
    <!--      <div class="actions">-->
    <!--        <ElButton @click="reset">Cancel</ElButton>-->
    <!--        <ElButton @click="saveToServer">Save</ElButton>-->
    <!--      </div>-->
    <!--    </template>-->

    <el-button type="primary">{{ $t('common_save') }}</el-button>
  </ElDialog>
</template>
