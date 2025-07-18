<script setup lang="ts">
import VariableValueText from '../content/setting/variable/VariableValueText.vue'
import VariableValueList from '../content/setting/variable/VariableValueList.vue'
import VariableValueTable from '../content/setting/variable/VariableValueTable.vue'
import VariableValueLink from '../content/setting/variable/VariableValueLink.vue'
import VariableValueImage from '../content/setting/variable/VariableValueImage.vue'

const emits = defineEmits(['update'])
const { t } = useI18n()
const editFormRef = ref()
const state = reactive<{
  editForm: any,
  visible: boolean
}>({
  editForm: {},
  visible: false
})
const rules = ref({
  value: [{ required: true, message: t('Please input value') }]
})

const valueEditorComponent = computed(() => {
  switch (state.editForm.type) {
    case 'text':
      return VariableValueText
    case 'list':
      return VariableValueList
    case 'table':
      return VariableValueTable
    case 'link':
      return VariableValueLink
    case 'image':
      return VariableValueImage
    default:
      return VariableValueText
  }
})

function openVariablesDialog(item: any) {
  state.editForm = deepCopy(item)
  state.visible = true
}

async function handleSubmit() {
  await editFormRef.value.validate()
  emits('update', state.editForm)
  state.visible = false
}

defineExpose({ openVariablesDialog })
</script>

<template>
  <el-dialog :title="t('Edit Variables')" v-model="state.visible" width="1000px">
    <el-form ref="editFormRef" :model="state.editForm" :rules="rules">
      <el-form-item :label="t('Name')" disabled>
        <el-input v-model="state.editForm.name" />
      </el-form-item>

      <el-form-item :label="t('Value')" prop="value">
        <div style="max-width: 900px">
          <component
            :is="valueEditorComponent"
            v-model="state.editForm.value"
          />
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button id="UserList__CreateNewUser__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
