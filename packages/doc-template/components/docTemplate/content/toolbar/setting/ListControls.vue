<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
const { t } = useI18n()
</script>

<template>
  <!-- bulletList -->
  <el-button style="width:34px" v-tooltip="t('docTemplate.paragraph.bulletList')"
             @click="editor.chain().focus().toggleBulletList().run()"
             :class="{ 'is-active': editor.isActive('bulletList') }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="1" cy="2.5" r=".5" />
        <path d="M4.5 2.5h9" />
        <circle cx="1" cy="7" r=".5" />
        <path d="M4.5 7h9" />
        <circle cx="1" cy="11.5" r=".5" />
        <path d="M4.5 11.5h9" />
      </g>
    </svg>
  </el-button>

  <!-- orderedList -->
  <el-button style="width:34px; margin-left: -6px" v-tooltip="t('docTemplate.paragraph.orderedList')"
             @click="editor.chain().focus().toggleOrderedList().run()"
             :class="{ 'is-active': editor.isActive('orderedList') }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M13.5 1H8m5.5 3H8m5.5 3H8m5.5 6H8m5.5-3H8M.5 1.5v4A.5.5 0 0 0 1 6h4a.5.5 0 0 0 .5-.5v-4A.5.5 0 0 0 5 1H1a.5.5 0 0 0-.5.5m0 7v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4A.5.5 0 0 0 5 8H1a.5.5 0 0 0-.5.5" />
    </svg>
  </el-button>
</template> 
