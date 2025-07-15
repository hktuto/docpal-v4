<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject, reactive, ref } from 'vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
const { t } = useI18n()

const titlePredefine = ref([
  { name: 'Default', key: 0 },
  { name: 'H1', key: 1 },
  { name: 'H2', key: 2 },
  { name: 'H3', key: 3 },
  { name: 'H4', key: 4 },
  { name: 'H5', key: 5 }
])

const state = reactive({
  titleTags: 0
})

function handleTitle(index: number) {
  // 檢查當前的tag是當前的Key
  if (state.titleTags === 0) {
    titlePredefine.value.forEach((v) => {
      if (editor.value.isActive('heading', { level: v.key })) {
        editor.value.chain().focus().toggleHeading({ level: v.key }).run()
        return
      }
    })
    return
  }

  // 防止重複設值
  if (editor.value.isActive('heading', { level: index })) {
    return
  }
  editor.value.chain().focus().setHeading({ level: state.titleTags }).run()
}
</script>

<template>
  <!-- title Tags -->
  <el-select
    v-tooltip="t('docTemplate.style.titleTags')"
    v-model="state.titleTags"
    allow-create
    default-first-option
    :reserve-keyword="false"
    style="width: 100px;"
  >
    <el-option v-for="(item,index) in titlePredefine" :key="index" :label="item.name"
               @click="handleTitle(index)" :value="item.key" />
  </el-select>
</template> 
