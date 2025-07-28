<template>
  <el-dialog v-model="visible" :title="t('metadata.new')"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
             destroy-on-close
  >
    <el-form :model="formData" ref="elFormRef" label-position="top">
      <el-form-item :label="t('metadata.name')" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item :label="t('metadata.type')"  required>
        <el-select v-model="selectedType" placeholder="Select">
          <el-option-group v-for="group in METADATA_OPTIONS" :key="group.group" :label="t(group.group)">
            <el-option v-for="option in group.options" :key="option.name" :label="t(option.name)" :value="option.name" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <!-- validationRuleSection -->
      <template v-if="selectedType && validationComponent">
        <component :is="validationComponent" ref="validationFormRef" v-model:validation="formData.validationRule" />
      </template>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { METADATA_OPTIONS , type MetadataOption } from '../../../../utils/metadataHelper';

const { t } = useI18n()
const validationFormRef = ref<FormInstance>()
const visible = defineModel<boolean>('visible', { required: true })
const selectedType = ref<MetadataOption['name']>("Text")


const validationComponent = computed(() => {
  return `MetadataValidator${selectedType.value}`
})

const formData = reactive({
  name: '',
  validationRule: {},
  langs:{},
  maskRule: {
    maskType: "MASK_ALL",  
    maskLength: 10
  }
})

const elFormRef = ref<FormInstance>()

watch(selectedType, () => {
  // if selectedType is valid, then get the default value of the validationRule
  if(selectedType.value) {
    const validationRule = METADATA_OPTIONS.reduce((acc, group) => {
      return acc.concat(group.options)
    }, [] as MetadataOption[])
    .find(option => option.name === selectedType.value)?.validation
    if(validationRule) {
      formData.validationRule = validationRule
    }
  }
},{
  immediate: true,
})

function open() {
  visible.value = true
}

function close() {
  visible.value = false
}

defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>

</style>
