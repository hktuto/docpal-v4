<template>
  <el-dialog v-model="visible" :title="t('metadata.new')"
             class="scroll-dialog"
             append-to-body
             :close-on-click-modal="false"
             destroy-on-close
  >
    <el-form :model="formData" ref="elFormRef" label-position="top">
      <el-form-item :label="t('table_name')" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item :label="t('metadata.dataType')"  required>
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
      <!-- // mask options -->
      <h4>{{ t('meta.mask') }}</h4>
      <el-form-item :label="t('meta.mask_type')"  required>
        <el-select v-model="formData.maskRule.maskType" placeholder="Select">
          <el-option v-for="option in MASK_OPTIONS" :key="option.value" :label="t(option.label)" :value="option.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('meta.maskLength')"  required>
        <el-input-number v-model="formData.maskRule.maskLength" :min="1" :max="24" />
      </el-form-item>
    </el-form>
    
    <template #footer>
      <el-button type="primary" @click="handleUpdate">{{ t('metadata.new') }}</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance } from 'element-plus';
import { METADATA_OPTIONS, MASK_OPTIONS , type MetadataOption } from '../../../../utils/metadataHelper';
import { adminApi } from 'api';

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
  // clean the form
  elFormRef.value?.resetFields()
  validationFormRef.value?.resetFields()
  formData.name = ''
  formData.validationRule = {}
  formData.langs = {}
  formData.maskRule = {
    maskType: "MASK_ALL",
    maskLength: 10
  }
  visible.value = false
}

async function handleCreate() {
  // validate the form
  if(elFormRef.value) {
    // step 1 validate the form
    const formValid = await elFormRef.value.validate()
    if(!formValid) {
      return
    }
    // check if the validationRule is valid
    if(validationFormRef.value) {
      const isValid = await validationFormRef.value.validate()
      if(!isValid) {
        ElMessage.error(t('meta.validation_error'))
        return
      }
    }
    // step 3 check if the name is already exists
    const nameExists = await adminApi.api.postDocpaltypeSettingsMetadataV2Query({
      metadataName: formData.name,
      pageNum: 0,
      pageSize: 1
    }).then(res => res.data?.entryList?.length > 0)
    if(nameExists) {
      ElMessage.error(t('dpTip.exit', { name: formData.value.name }))
      return
    }
    // step 4 create the metadata
    const result = await adminApi.api.postDocpaltypeSettingsMetadataV2Create(
      formData
    ).then(res => res.data)
    if(result) {
      ElMessage.success(t('meta.create_success'))
      close()
    }else{
      ElMessage.error(t('meta.create_error'))
    }
  }
}

defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>

</style>
