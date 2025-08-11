<template>
  <el-button @click="handleInsertSignature">
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M13.5 1H.5m13 4H6m7.5 4H6m7.5 4H.5m2-8L1 7l1.5 2" />
    </svg>
    Signature
  </el-button>
</template>

<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
const { t } = useI18n()

function handleInsertSignature() {
  editor.value.commands.insertSignature({
    prefix: 'Best regards,',
    suffix: 'CEO, Company Inc.'
  })
}
</script>
