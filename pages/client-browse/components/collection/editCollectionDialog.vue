<template>
  <el-dialog v-model="state.visible" :title="t('collections_edit')" :close-on-click-modal="false" destroy-on-close>
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button id="Collection__EditCollectionInfo__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import formJson from './editCollectionDialog.vform.json'
import { ElMessage } from 'element-plus'
import { clientApi } from 'api'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const state = reactive({
  loading: false,
  visible: false
})

/**
 *
 * @param collection 收藏夾對象
 */
function handleOpen(collection: object) {
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.setFormData(collection)
  })
  state.visible = true
}

const emits = defineEmits([
  'refresh'
])

const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  let params = {
    idOrPath: data.id,
    name: data.name,
    description: null
  }
  try {
    await clientApi.api.patchNuxeoCollection(params)
    ElMessage.success(t('tip_updateSuccessMsg', {
      modelName: t('collection_collection'),
      name: data.name
    }))
    state.visible = false
    FormRendererRef.value.vFormRenderRef.resetForm()
    emits('refresh')
  } catch
    (error) {

  }
  state.loading = false
}

defineExpose({ handleOpen })
</script>
