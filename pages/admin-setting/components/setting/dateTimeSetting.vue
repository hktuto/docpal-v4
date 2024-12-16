<script lang="ts" setup>
import formJson from './form.vform.json'
import { ElMessage } from 'element-plus'
const { t } = useI18n()
const FromRendererRef = ref()
function  handleSuccess() {
  ElMessage.success(t('dpMsg_success'))
}
</script>

<template>
<div class="cardCaontainer">
<h2>{{ t('admin.setting.title')}}</h2>
    <FormRenderer ref="FromRendererRef" :form-json="formJson" @success="handleSuccess"/>
</div>

</template>