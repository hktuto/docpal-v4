<script setup lang="ts">
import { clientApi } from 'api'

const { t } = useI18n()
const state = reactive({
  changePasswordVisible: false
})
const form = reactive({
  status: 'oldPassword',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const FormRef = ref()
const rules = reactive({
  oldPassword: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('old Password') }),
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('new Password') }),
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value && value !== form.confirmPassword) {
          callback(new Error(t('password is not match')))
          return
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('render.hint.fieldRequired', { name: t('Confirm Password') }),
      trigger: 'blur'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value && value !== form.newPassword) {
          callback(new Error(t('password is not match')))
          return
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

function handleOpen() {
  state.changePasswordVisible = true
  setTimeout(() => {
    FormRef.value.resetFields()
    Object.assign(form, {})
  }, 200)
}

async function handleSubmit() {
  try {
    await FormRef.value.validate()
  } catch (e) {
    return
  }
}

defineExpose({ handleOpen })

</script>

<template>
  <el-dialog v-model="state.changePasswordVisible" :title="t('change Password')" width="600px">
    <div>
      <el-form ref="FormRef" :rules="rules" :model="form" label-position="top">
        <el-form-item :label="t('Old Password')" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" />
        </el-form-item>
        <el-form-item :label="t('New Password')" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" />
        </el-form-item>
        <el-form-item :label="t('Confirm Password')" prop="newPassword">
          <el-input v-model="form.confirmPassword" type="password" />
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
