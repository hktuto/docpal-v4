<script lang="ts" setup>
import formJson from './form.vform.json'
import { ElMessage } from 'element-plus'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const FormRendererRef = ref()

function handleSuccess(metaDateFormat: string) {
  routerProvider?.message.success(t('dpMsg_success'))
  const bus = useEventBus<string>(EventType.USER_PREFERENCE_CHANGE__TIME)
  bus.emit(metaDateFormat)
}
</script>

<template>
  <div class="cardCaontainer">
    <h2>{{ t('admin.setting.title') }}</h2>
    <FormRenderer ref="FormRendererRef" :form-json="formJson" @success="handleSuccess" />
  </div>
</template>