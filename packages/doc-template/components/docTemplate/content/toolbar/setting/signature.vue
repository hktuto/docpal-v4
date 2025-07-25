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

// Inline SVG dummy signature image (base64-encoded)
const dummySignatureSVG = 'data:image/svg+xml;base64,' +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60">
    <rect width="200" height="60" fill="#fff"/>
    <path d="M20,40 Q40,10 60,40 Q80,70 100,40 Q120,10 140,40 Q160,70 180,40" stroke="#222" stroke-width="2" fill="none"/>
    <text x="100" y="55" font-size="16" text-anchor="middle" fill="#888" font-family="cursive">Signature</text>
  </svg>`);


function handleInsertSignature() {
  editor.value.commands.insertSignature({
    id: 'signature-1',
    name: 'John Doe',
    prefix: 'Best regards,',
    signature: dummySignatureSVG,
    suffix: 'CEO, Company Inc.'
  })
}
</script>
