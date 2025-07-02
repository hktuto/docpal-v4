<script setup lang="ts">
import { clientApi } from 'api'

const { t } = useI18n()
const state = reactive({
  changePasswordVisible: false,
  statusList: [
    { key: 'oldPassword', label: 'Old Password' },
    { key: 'authenticatorVerification', label: 'Authenticator Verification' },
    { key: 'emailVerification', label: 'Email Verification' }
  ]
})
const form = reactive({
  status: 'oldPassword',
  oldPassword: '',
  authenticatorCode: '',
  VerificationCode: '',
  newPassword: ''
})

const FormRef = ref()
const rules = reactive({
  newPassword: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('new Password') }),
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (form.status === 'oldPassword') {
          if (value && value !== form.oldPassword) {
            callback(new Error(t('password is not match')))
            return
          }
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  oldPassword: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('old Password') }),
      trigger: 'blur'
    }
  ],
  authenticatorCode: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('authenticator Code') }),
      trigger: 'blur'
    }
  ],
  VerificationCode: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('Verification Code') }),
      trigger: 'blur'
    }
  ]
})

function handleOpen() {
  state.changePasswordVisible = true
  setTimeout(() => {
    FormRef.value.resetFields()
    Object.assign(form, {})
    form.status = 'oldPassword'
  }, 200)
}

function getEmailCode() {
  console.log('getEmailCode')
}

async function handleSubmit() {
  try {
    await FormRef.value.validate()
  } catch (e) {
    return
  }

  // TODO: 根據不同的校驗模式使用不同的校驗規則
  switch (form.status) {
    case 'oldPassword':
      await clientApi.api.postUserPreferences(state.form)

      state.changePasswordVisible.value = false
      break
    case 'authenticatorVerification':
      // await clientApi.api.postUserPreferences(state.form)
      state.changePasswordVisible.value = false
      break
    case 'emailVerification':
      // await clientApi.api.postUserPreferences(state.form)
      state.changePasswordVisible.value = false
      break
    default:
      break
  }
}

defineExpose({ handleOpen })

</script>

<template>
  <el-dialog v-model="state.changePasswordVisible" :title="t('change Password')" width="600px">
    <div>
      <el-form ref="FormRef" :rules="rules" :model="form" label-position="top">
        <el-form-item label="checkRule">
          <el-select v-model="form.status" active-text="Enabled"
                     inactive-text="Disabled">
            <el-option v-for="item in state.statusList" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.status === 'oldPassword'" label="Password" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" />
        </el-form-item>

        <el-form-item v-if="form.status === 'authenticatorVerification'" label="Authenticator" prop="authenticatorCode">
          <el-input v-model="form.authenticatorCode" />
        </el-form-item>

        <el-form-item v-if="form.status === 'emailVerification'" label="Verification Code" prop="VerificationCode">
          <div style="display: flex; gap: 16px;">
            <el-input v-model="form.VerificationCode" style="flex: 1;" />
            <el-button type="primary" @click="getEmailCode">Get Email Code</el-button>
          </div>
        </el-form-item>

        <el-form-item label="New Password" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="actions">
        <ElButton id="UserProfileChangePassword__Dialog__Cancel" type="info"
                  @click="state.changePasswordVisible = false">
          {{ $t('dpButtom_cancel') }}
        </ElButton>
        <ElButton id="UserProfileChangePassword__Dialog__Save" type="primary" @click="handleSubmit">
          {{ $t('common_save') }}
        </ElButton>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
