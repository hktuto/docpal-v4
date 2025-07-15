<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
const { t } = useI18n()

/**
 * Set the selected string to align
 * @param align string('left','center','right','justify')
 */
function handleTextAlign(align: string) {
  editor.value.chain().focus().toggleTextAlign(align).run()
}
</script>

<template>
  <!-- Align-left -->
  <el-button style="width:34px" @click="handleTextAlign('left')" v-tooltip="t('docTemplate.font.alignLeft')"
             :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h10M4 18h14" />
    </svg>
  </el-button>
  
  <!-- Align-center -->
  <el-button style="width:34px; margin-left: -6px" @click="handleTextAlign('center')"
             v-tooltip="t('docTemplate.font.alignCenter')"
             :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M8 12h8M6 18h12" />
    </svg>
  </el-button>
  
  <!-- Align-right -->
  <el-button style="width:34px; margin-left: -6px " @click="handleTextAlign('right')"
             v-tooltip="t('docTemplate.font.alignRight')"
             :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16m-10 6h10M6 18h14" />
    </svg>
  </el-button>
</template> 
