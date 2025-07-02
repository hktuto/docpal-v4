<script setup lang="ts">
import { clientApi } from 'api'
import ChangePassword from '~/components/setting/changePassword.vue'
import userSignature from '~/components/setting/userSignature.vue'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const userPreference = useUserPreference()
const userId = useUserId()
const ChangePasswordRef = ref()

const state = reactive({
  form: {},
  list: [],
  notificationPreferenceList: []
})

async function init() {
  try {
    const { properties } = await clientApi.api.getUserProfileSetting().then((res: any) => res.data)
    state.list = Object.entries(properties)
      .sort(([, v1], [, v2]) => (v1.sort ?? 0) - (v2.sort ?? 0))
      .map(([key, value]) => ({
        key,
        type: value.type,
        label: value.label,
        allowUserEdit: value.allowUserEdit,
        disabled: value.display,
        readyOnly: value.readyOnly
      }))

    if (state.list.length > 0) {
      const data = await clientApi.api.getNuxeoUserGetapplication().then((res: any) => res.data)
      state.form.id = data.id
      state.list.forEach(item => {
        state.form[item.key] = data[item.key]
      })
    }

    if ('groups' in state.form) {
      let groupList: any = await clientApi.api.postNuxeoIdentityMembergroup({ userId: userId.value }).then(res => res.data)
      state.form.groups = groupList.map(item => item.name)
    }

    state.notificationPreferenceList = await clientApi.api.getNotificationSettingUserUseridPreferences(userId.value).then(res => res.data)
  } catch (e) {
    throw createError(e)
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
  ChangePasswordRef.value.handleOpen()
}

const userSignatureRef = ref()
function handleChangeMangeSignatureOpen() {
  userSignatureRef.value.handleOpen()
}

async function save() {
  try {
    let newUserInfo = {
      id: state.form.id,
      userId: userId.value
    }
    state.list.forEach((item: any) => {
      if (item.allowUserEdit) {
        newUserInfo[item.key] = state.form[item.key]
      }
    })
    await clientApi.api.patchNuxeoIdentityUser(newUserInfo)

    await clientApi.api.putUserSetting(userPreference.value as any)

    await clientApi.api.postNotificationSettingUserUseridPreferences(userId.value, state.notificationPreferenceList)

    routerProvider?.message.success(t('tip_updateSuccessMsg', { modelName: t('user_info'), name: null }))

    await init()
  } catch (e) {
    throw createError(e)
  }
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
          <el-form :model="state.form" label-position="top">
            <el-form-item v-for="item in state.list" :label="t(`${item.label}`)" :key="item.key">
              <el-input v-if="item.type === 'string'" v-model="state.form[item.key]" :disabled="!item.allowUserEdit" />
              <el-input-tag
                v-if="item.type === 'array'"
                v-model="state.form[item.key]"
                :disabled="!item.allowUserEdit"
              />
            </el-form-item>
          </el-form>
        </div>

        <el-divider />
        <h3>{{ t('login_password') }}</h3>
        <el-button style="width: 150px; margin-bottom: 10px" type="primary" @click="handleChangePasswordOpen">
          {{ t('Change Password') }}
        </el-button>

<!--        <el-divider />-->
<!--        <h3>{{ t('User Signature') }}</h3>-->
<!--        <el-button style="width: 150px; margin-bottom: 10px" type="primary" @click="handleChangeMangeSignatureOpen">-->
<!--          {{ t('Mange Signature') }}-->
<!--        </el-button>-->
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

    <el-divider />

    <el-button class="fixed-save-btn" type="primary" @click="save">{{ $t('common_save') }}</el-button>
  </div>

  <ChangePassword ref="ChangePasswordRef" />

  <userSignature ref="userSignatureRef" />

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
  max-height: 580px;
  overflow-y: auto;
  padding-right: 4px;

  .el-checkbox.el-checkbox--large {
    height: 16px;
  }
}

.form-scroll-wrapper {
  flex: 1 1 0 !important;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  padding-right: 4px;

  .el-form-item {
    margin-bottom: 6px;
  }
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
