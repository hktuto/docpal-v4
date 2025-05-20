<template>
  <el-dialog v-model="state.visible" :title="state.setting.operation === 'ADD' ? $t('hp.addHold') : $t('hp.removeHold')"
             :close-on-click-modal="false">
    <FormRenderer ref="FormRendererRef" :form-json="formJson"/>
    <template #footer>
      <el-button id="HoldPolicy__RemoveHoldPolicy__Submit" type="primary" :loading="state.loading"
                 @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import formJson from '../form/updateHold.vform.json'

const emits = defineEmits([
  'submit', 'remove'
])
const state = reactive({
  loading: false,
  visible: false,
  setting: {}
})
const FormRendererRef = ref()

async function handleSubmit() {
  const data = await FormRendererRef.value.getFormData()
  state.loading = true
  try {
    if (state.setting.operation === 'ADD') {
      emits('submit', {
        holdPolicyId: data.id,
        holdApprovalId: data.approvedBy,
        applyReason: data.reason
      }, () => {
        state.visible = false
        state.loading = false
      })
    } else {
      emits('remove', {
        id: data.id,
        removeReason: data.reason
      }, () => {
        state.visible = false
        state.loading = false
      })
    }
  } catch (error) {
    state.loading = false
  }

}

function handleOpen(setting) {
  state.visible = true
  setTimeout(async () => {
    state.setting = setting
    await FormRendererRef.value.vFormRenderRef.resetForm()
    await FormRendererRef.value.vFormRenderRef.setFormData(setting)
    state.loading = false
  })
}

onMounted(async () => {
})
defineExpose({handleOpen})
</script>
<style lang="scss" scoped>

</style>
