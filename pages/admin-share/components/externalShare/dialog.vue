<template>
  <el-dialog v-model="dialogVisible" :title="$t('share_editExternalShare')">
    <el-form ref="formRef" :model="form" label-width="120px" label-position="top" @submit.native.prevent>
      <el-form-item
        :label="$t('tableHeader_emailList')"
        prop="emailList"
        :rules="[
          {
            required: true,
            message: $t('tableHeader_emailList') + $t('render.hint.fieldRequired'),
            trigger: 'change'
          }
        ]"
      >
        <el-input-tag v-model="form.emailList" clearable draggable :placeholder="$t('vxe.base.pleaseInput')" :aria-label="$t('tip_enterAfterInput')">
        </el-input-tag>
      </el-form-item>
      <el-form-item :label="$t('share_shareLink')">
        <el-input v-model="state.shareLink" readonly type="text" class="cursorPointer" @click="handleCopy(state.shareLink)">
          <template #suffix>
            <el-icon @click="handleCopy(state.shareLink)">
              <CopyDocument />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$t('share_password')"
            prop="password"
            :rules="[{ required: true, message: $t('share_password') + $t('render.hint.fieldRequired') }]"
          >
            <el-input v-model="form.password" clearable type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="$t('tableHeader_dueDate')"
            prop="dueDate"
            :rules="[{ required: true, message: $t('tableHeader_dueDate') + $t('render.hint.fieldRequired') }]"
          >
            <el-date-picker v-model="form.dueDate" type="datetime" :default-time="defaultTime" :shortcuts="shortcuts" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button id="ExternalShare__EditExternalShareLink__Reset" @click="dialogVisible = false">
        {{ $t('common_reset') }}
      </el-button>
      <el-button id="ExternalShare__EditExternalShareLink__Submit" type="primary" @click="handleSubmit">
        {{ $t('submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { type FormInstance } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const {
  public: { endPoint }
}: any = useRuntimeConfig()
const emit = defineEmits(['submit'])
const state = reactive({
  userList: [],
  shareLink: '',
  shareId: ''
})

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const emailValidate = (rule: any, value: any, callback: any) => {
  value.forEach((item: any) => {
    if (!emailPattern.test(item)) {
      // if (form.emailList.length > 0) {

      // }
      callback(new Error(t('tip.enterValidEmail')))
    }
  })
  callback()
}

const defaultTime = new Date(2000, 1, 1, 23, 59, 59)
const shortcuts = [
  {
    text: `1 ${t('common_day')}`,
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: `7 ${t('common_days')}`,
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      return date
    }
  },
  {
    text: `30 ${t('common_days')}`,
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
      return date
    }
  }
]
// #region module: dialog
const dialogVisible = ref(false)

function handleOpen(shareInfo: any) {
  state.shareId = shareInfo.shareID
  initFormatItem(shareInfo)
  dialogVisible.value = true
}

// #endregion
// #region module: form
const formRef = ref<FormInstance>()
const form = reactive({
  emailList: [],
  password: '',
  dueDate: ''
})

async function handleSubmit() {
  const date = new Date()
  const valid = await formRef.value?.validate((valid: any) => valid)
  if (!valid) return
  const param = {
    // emailList: shareInfoForm.value.emailList,
    password: form.password,
    tokenLiveInMinutes: dayjs(form.dueDate).diff(date, 'minute'),
    shareId: state.shareId
  }
  ElMessage.success(t('tip_updateMsg', { modelName: t('share_externalShareLink'), name: null }))
  emit('submit', param)
  dialogVisible.value = false
}

// #endregion
function initFormatItem(shareInfo: any) {
  form.emailList = shareInfo.emailList
  form.password = shareInfo.password || ''
  form.dueDate = shareInfo.expiredDate
  const origin = endPoint?.upload
  state.shareLink = `${origin}/share?token=${shareInfo.accessToken}`
  setTimeout(() => {
    formRef.value?.clearValidate()
  })
}

function handleCopy(copyContent: string) {
  copy(copyContent, t('common_copySuccess'))
}

defineExpose({ handleOpen })
</script>

<style scoped lang="scss">
:deep(.el-input) {
  width: 100% !important;
}
</style>
