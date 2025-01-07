<template>
  <el-card>
    <h3 class="title">{{ $t("easyForm.formSetting") }}</h3>
    <el-form ref="FormRef" label-position="top" :model="form" @submit.prevent>
      <el-formItem
        :label="$t('tableHeader_name')"
        prop="name"
        :rules="[{ required: true, message: $t('form_common_requird') }]"
      >
        <el-input
          v-model="form.name"
          @change="handleChange"
          :placeholder="$t('tip.input')"
        />
      </el-formItem>
    </el-form>
    <el-button :loading="state.publishLoading" type="primary" @click="handlePublish">{{ $t('button.publish') }}</el-button>
  </el-card>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ElMessage } from 'element-plus'
const props = defineProps(["detail"]);
const { t } = useI18n()
const route = useRoute()
const state = reactive<any>({
  publishLoading: false
})
const form = ref({
  name: "",
});
const FormRef = ref();
async function handleChange(value) {
  console.log(value)
  try {
    if (value === props.detail.name) return
    await adminApi.api.patchFormDesignName({
      id: props.detail.id,
      name: value
    })
    props.detail.name = value
    ElMessage.success(t('dpMsg_success'))
  } catch (error) {
    form.value.name = props.detail.name
    ElMessage.error(`${t('dpMsg_error')}`)
  }
}
async function handlePublish() {
  try {
    state.publishLoading = true
    await adminApi.api.postFormDesignPublish(props.detail.id)
    ElMessage.success(t('dpMsg_success'))
  } catch (error) {
    
  } finally {
    state.publishLoading = false
  }
}
watch(() => props.detail, (newValue, oldValue) => {
  if(!!oldValue && oldValue.name === newValue.name) return
  if(!!newValue) form.value.name = newValue.name
}, {
  immediate: true
})
</script>
<style lang="scss" scoped>
.el-button {
  width: 100%;
}
</style>
