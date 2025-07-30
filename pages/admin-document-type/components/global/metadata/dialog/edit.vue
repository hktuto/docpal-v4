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
      <template v-if="selectedType && formData.validationRule && validationComponent">
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
      <el-form-item>
        <el-button type="primary" @click="handleUpdate">{{ t('common_save') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script lang="ts" setup>
import { adminApi } from 'api';
import { METADATA_OPTIONS, MASK_OPTIONS , type MetadataOption } from '../../../../utils/metadataHelper';
import { ElMessage, type FormInstance } from 'element-plus';

const formData = ref<any>({
  name: '',
  validationRule: {},
  langs:{},
  maskRule: {
    maskType: "MASK_ALL",
    maskLength: 10
  }
})
const emit = defineEmits(['reload'])
const visible = defineModel<boolean>('visible', { required: true })

const { t } = useI18n()

const selectedType = ref<MetadataOption['name']>("Text")
const originalName = ref('')
const elFormRef = ref<FormInstance>()

const validationFormRef = ref<FormInstance>()

const validationComponent = computed(() => {
  return `MetadataValidator${selectedType.value}`
})

function open(data:any ) {
  originalName.value = data.name
  
  // check if data.validationRUle is exist, if not, set the default value
  if(!data.validationRule || !data.validationRule.validationRuleName) {
    selectedType.value = 'Text'
    const validationRule = METADATA_OPTIONS.reduce((acc, group) => {
      return acc.concat(group.options)
    }, [] as MetadataOption[])
    .find(option => option.name === selectedType.value)?.validation
    data.validationRule = validationRule
  } else if(data.validationRule.validationRuleName === 'mastertable'){
    selectedType.value = 'MasterTable'
  } else{
    // data.validationRule.type maybe in lower case, change it to first letter uppercase
    selectedType.value = data.validationRule.validationRuleName.charAt(0).toUpperCase() + data.validationRule.validationRuleName.slice(1)
  }
  if(!data.maskRule) {
    data.maskRule = {
      maskType: "MASK_ALL",
      maskLength: 10
    }
  }
  formData.value = data
  nextTick(() => {
    console.log(formData.value)
    visible.value = true
  })
}

function close() {
  // clean the form
  elFormRef.value?.resetFields()
  formData.value.name = ''
  formData.value.validationRule = null
  formData.value.langs = {}
  formData.value.maskRule = {
    maskType: "MASK_ALL",
    maskLength: 10
  }
  visible.value = false
  emit('reload')
}


async function handleUpdate() {
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
    if(formData.value.name !== originalName.value) {
      const nameExists = await adminApi.api.postDocpaltypeSettingsMetadataV2Query({
        metadataName: formData.value.name,
        pageNum: 0,
        pageSize: 1
      }).then(res => (res.data?.entryList?.length ?? 0) > 0)
      if(nameExists) {
        ElMessage.error(t('dpTip.exit', { name: formData.value.name }))
        return
      }
    }
    const result = await adminApi.api.patchDocpaltypeSettingsMetadataV2Update(formData.value).then(res => res.data)
    if(result) {
      ElMessage.success(t('meta.update_success'))
      close()
    }else{
      ElMessage.error(t('meta.update_error'))
    }
  }
}

watch(selectedType, () => {
  // if selectedType is valid, then get the default value of the validationRule
  if(selectedType.value) {
    const validationRule = METADATA_OPTIONS.reduce((acc, group) => {
      return acc.concat(group.options)
    }, [] as MetadataOption[])
    .find(option => option.name === selectedType.value)?.validation
    console.log(validationRule)
    if(validationRule) {
      formData.value.validationRule = validationRule
    }
  }
},{
  immediate: true,
})


defineExpose({
  open,
  close
})
</script>

