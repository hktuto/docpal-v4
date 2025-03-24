<template>
  <el-dialog v-model="state.visible" :title="$t('easyForm_createForm')"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
             destroy-on-close
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson">
    </FormRenderer>
    <template #footer>
      <div class="footer-grid">
        <el-button id="EasyForm__CreateNewForm__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
          {{ $t('common_submit') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import formJson from './newDialog.vform.json'
import {adminApi} from 'api';
import {ElMessage} from 'element-plus'

const {t} = useI18n()
const emits = defineEmits([
  'refresh'
])
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
})

const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData()
  state.loading = true
  try {
    data.permission = 'members'
    const result = await adminApi.api.postFormDesign(data)
    ElMessage.success(t('easyForm_createdSuccessMsg'))
    emits('refresh')
  } catch (error) {
    state.loading = false
  }
  state.visible = false
  state.loading = false
}

function handleOpen() {
  state.visible = true
  setTimeout(async () => {
    FormRendererRef.value.vFormRenderRef.resetForm()
    state.loading = false
  })
}

defineExpose({handleOpen})
</script>
<style lang="scss" scoped>

</style>
    