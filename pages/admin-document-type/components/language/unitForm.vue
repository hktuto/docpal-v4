<template>
  <el-form label-position="top" class="language-form-unit">
    <el-form-item v-for="locale in localeKeys" :label="$t(locale)">
      <el-input v-model="state.form[locale]" @input="handleInput(locale)" @keyup.enter="handleSubmit(locale)" :disabled="state.loading"></el-input>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { getMetaI18n, localeKeys, saveMetaI18n } from '~/utils/languageHelper'
import { useDebounceFn } from '@vueuse/core'
import { ElMessage } from 'element-plus'
const props = defineProps<{
  lKey?: string
}>()
const { t } = useI18n()
const state: any = reactive({
  form: {},
  loading: false
})
async function handleInit() {
  const res = await getMetaI18n(props.lKey)
  state.form = { ...res }
}
async function handleSubmit(locale: string) {
  try {
    state.loading = true
    await saveMetaI18n(props.lKey, state.form)
    let tip = ''
    if (locale) {
      tip = '[' + $t(locale) + ':' + state.form[locale] + ']'
    }
    ElMessage.success(t('dpMsg_success', { tip }))
  } catch (error) {
    console.error(error)
  } finally {
    state.loading = false
  }
}
const handleInput = useDebounceFn(
  (locale: string) => {
    handleSubmit(locale)
  },
  1000,
  {
    maxWait: 3000
  }
)

watch(
  () => props.lKey,
  () => {
    if (props.lKey) {
      handleInit()
    }
  },
  { immediate: true }
)
defineExpose({ handleInit, handleSubmit })
</script>
<style lang="scss" scoped>
.language-form-unit {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--app-space-xs);
}
.el-form-item {
  margin-bottom: unset;
}
</style>
