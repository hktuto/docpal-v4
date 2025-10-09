<template>
  <el-dialog v-model="state.visible" :title="state.title"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <div class="footer-grid">
        <el-button id="SmartFolderSetting__CreateNewSmartFolder__Submit" type="primary" :loading="state.loading"
                   @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import formJson from './infoDialog.vform.json'
import { ElMessage } from 'element-plus'

const emits = defineEmits([
  'refresh'
])
const { t } = useI18n()
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  edit: false,
  title: t('doc_typeSmartFolderCreateFolder')
})
const FormRendererRef = ref()

async function handleSubmit() {
  try {
    const data = await FormRendererRef.value.getFormData()
    state.loading = true
    const _data = {
      name: data.name,
      bind: data.access.join(',')
    }
    let msg
    const res = await adminApi.api.patchNuxeoSfolder({
      ...state.setting,
      ..._data
    })
    if (Object.keys(state.setting).length === 0) {
      msg = t('tip_createdMsg', { modelName: t('tip_newMsg') + t('file_smartFolder'), name: null })
    } else {
      msg = t('tip_updateMsg', { modelName: t('file_smartFolder'), name: null })
    }
    ElMessage.success(msg)
    emits('refresh')
    state.visible = false
  } catch (error) {
    state.loading = false
  }
  state.loading = false
}

function handleOpen(setting?) {
  state.visible = true
  state.edit = false
  state.loading = false
  if (!setting) {
    setTimeout(async () => {
      state.setting = {}
      state.title = t('doc_typeSmartFolderCreateFolder')
      FormRendererRef.value.vFormRenderRef.resetForm()
    })
    return
  }
  setTimeout(async () => {
    const _setting = deepCopy(setting)
    // state.title = _setting.name
    state.title = t('doc_typeSmartFolderInfo')
    state.setting = _setting
    if (_setting.bind) _setting.access = _setting.bind.split(',')
    else _setting.access = []
    await FormRendererRef.value.vFormRenderRef.setFormData({
      ..._setting
    })
  })
}

defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
