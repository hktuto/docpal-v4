<script setup lang="ts">
import { clientApi } from 'api'

const { t } = useI18n()
const userPreference = useUserPreference()
const userId = useUserId()
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
  notificationPreferenceList: []
})
const form = reactive({})

async function init() {
  state.notificationPreferenceList = await clientApi.api.getNotificationSettingUserUseridPreferences(userId.value).then(res => res.data)
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

function handleChangePasswordOpen() {

}

function save() {
  clientApi.api.putUserSetting(userPreference.value as any)

  // TODO : update user profile

}

onMounted(() => {
  init()
})

</script>

<template>
  <div class="card">
    <el-row :gutter="30" class="setting-row">
      <el-col :span="11">
        <h3>User Profile</h3>
        <div class="form-scroll-wrapper">
          <el-form :model="form" label-position="top">
            <el-form-item v-for="(item, index)  in state.list" :label="t(`${item.label}`)" :key="item.key">
              <el-input v-model="item.value" :disabled="item.disabled" />
            </el-form-item>
          </el-form>
        </div>

        <el-divider />
        <h3>Password</h3>
        <el-button style="width: 150px" type="primary" @click="handleChangePasswordOpen">{{ t('Change Password') }}</el-button>
        <el-divider />
      </el-col>

      <div class="vertical-divider"></div>

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
         <div class="notification-scroll-wrapper">
          <div v-for="(item, index) in state.notificationPreferenceList" :key="index">
          <h4>{{ item.name }}</h4>
          <el-checkbox v-for="ite in item.value" :label="ite.label" size="large" v-model="ite.value" :key="ite.key" />
        </div>
         </div>
      </el-col>
    </el-row>
    <el-button class="fixed-save-btn" type="primary" @click="save">{{ $t('common_save') }}</el-button>
  </div>
</template>

<style scoped lang="scss">
.card {
  height: 100vh;
  box-sizing: border-box;
  min-width: 0;
  padding-top: 16px;
  padding-left: 16px;
  position: relative;
}

.setting-row {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  height: calc(90vh - 40px);
}

.el-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.notification-scroll-wrapper {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
}

@media (max-width: 900px) {
  .notification-scroll-wrapper {
    max-height: 30vh;
    min-height: 100px;
  }
}

.form-scroll-wrapper {
  flex: 1 1 0;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  padding-right: 4px;
}

.fixed-save-btn {
  position: fixed;
  bottom: 16px;
}

.vertical-divider {
  width: 1px;
  background: #e0e0e0;
  margin: 0 6px;
  min-height: 300px;
  align-self: stretch;
}
</style>
