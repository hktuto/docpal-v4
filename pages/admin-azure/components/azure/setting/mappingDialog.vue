<template>
  <el-dialog v-model="state.visible" :title="state.setting ? $t('common_edit') : $t('azureSettingMapping.add')"
             :close-on-click-modal="false"
             class="scroll-dialog"
             append-to-body
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button :loading="state.loading" @click="handleSubmit">{{ $t('common_save') }}</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import formJson from './mappingDialog.vform.json'
const routerProvider = inject(MenuRouterKey)
const props = defineProps(['exitList'])
const azureProvider = inject(AzureProviderKey)
const emits = defineEmits([
  'refresh'
])
const state = reactive<any>({
  loading: false,
  visible: false,
  setting: null
})
const route = useRoute()
const FormRendererRef = ref()

// #region module: handleSubmit
async function handleSubmit() {
  // 获取 v-form 数据
  const formData = await FormRendererRef.value.getFormData()
  state.loading = true
  try {
    let result = false
    if (!!state.setting) {
      result = await azureProvider?.UpdateAzureOcrMappingApi({
        ...state.setting,
        ...formData
      })
    } else {
      result = await azureProvider?.CreateAzureOcrMappingApi(formData)
    }
    if (result) ElMessage.success($i18n.t('dpMsg_success'))
    emits('refresh')
    state.visible = false
  } catch (error) {

  }
  state.loading = false
}

// #endregion

// #region module: init
async function handleOpen(setting: any) {
  state.loading = false
  state.setting = null
  state.visible = true
  setTimeout(async () => {
    await FormRendererRef.value.vFormRenderRef.resetForm()

    initOptions(setting)
    if (!!setting) {
      state.setting = { ...setting }
      FormRendererRef.value.vFormRenderRef.setFormData({
        name: setting.ocrProfileName,
        scanProfile: setting.scanProfile,
        normalizeSetting: formatJson(setting.normalizeSetting)
      })
    }
  })

  function formatJson(o) {
    try {
      return JSON.stringify(JSON.parse(o), null, 2)
    } catch (error) {
      return o
    }
  }
}

async function initOptions(setting: any) {
  try {
    const options = props.exitList.reduce((prev: any, item: any) => {
      if (!setting?.ocrProfileName || item.ocrProfileName !== setting.ocrProfileName) {
        prev.push({
          label: item.ocrProfileName,
          value: item.ocrProfileName
        })
      }
      return prev
    }, [])
    const namesRef = await FormRendererRef.value.vFormRenderRef.getWidgetRef('names')
    namesRef.loadOptions(options)
  } catch (error) {
  }
}

// #endregion
defineExpose({ handleOpen })
</script>
<style lang="scss" scoped>

</style>
    