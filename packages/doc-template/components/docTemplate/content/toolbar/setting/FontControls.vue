<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { defaultAvailableFonts } from 'docpal-document-editor/src/utils'
import { useI18n } from 'vue-i18n'
import { inject, reactive, ref } from 'vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
const { t } = useI18n()

const fontPredefineFamily = [...defaultAvailableFonts]
const fontPredefineSize = [8, 9, 10, 11, 12, 14, 15, 18, 20, 22, 24, 26, 28, 36, 48]
const fontPredefineColors = ref(['#000000'])
const fontPredefineHighlightColors = ref(['#FFFFFF', '#ffff00', '#00ff00', '#007FFF', '#FF0000', '#FF00FF', '#00FFFF'])

const state = reactive({
  fontFamily: 'Inter',
  fontDataOptions: Array.from({ length: fontPredefineSize.length }).map((_, idx) => ({
    value: fontPredefineSize[idx],
    label: fontPredefineSize[idx]
  })),
  fontSize: 12,
  fontColor: '#000000',
  fontHighlightColor: '#ffff00'
})

function checkFontSizeIsNumber() {
  // Regular expressions that allow integers and up to one decimals
  const regex = /^\d+(\.\d{1})?$/
  if (!regex.test(state.fontSize.toString())) {
    state.fontSize = 12
    return
  }
  const fontSize = Number(state.fontSize)
  if (fontSize <= 0) {
    state.fontSize = 1
  } else if (fontSize > 500) {
    state.fontSize = 500
  } else {
    state.fontSize = fontSize
  }
  handleFontSizeChange(state.fontSize)
}

function handleFontFamilyChange(fontFamily: string) {
  if (fontFamily) {
    editor.value.chain().focus().setFontFamily(fontFamily).run()
    return
  }
  editor.value.chain().focus().setFontFamily(state.fontFamily).run()
}

function handleFontSizeChangeOnDown(fontFamily: string) {
  state.fontFamily = fontFamily
  handleFontFamilyChange(fontFamily)
}

function handleFontSizeChange(size: Number) {
  editor.value.chain().focus().setFontSize(size + 'px').run()
}

function handleFontColorFocus() {
  const color = editor.value.getAttributes('textStyle').color
  if (color) {
    state.fontColor = color
  } else {
    state.fontColor = '#000000'
  }
}
</script>

<template>
  <!-- font family -->
  <el-dropdown v-tooltip="t('docTemplate.font.family')" trigger="click" split-button
               @click="handleFontFamilyChange(state.fontFamily)" class="ordinary-button">
    {{ state.fontFamily }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item,index) in fontPredefineFamily" :key="index"
                          @click="handleFontSizeChangeOnDown(item)">
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- font size -->
  <el-select
    v-tooltip="t('docTemplate.font.size')"
    v-model="state.fontSize"
    allow-create
    filterable
    default-first-option
    :reserve-keyword="false"
    placeholder="please select"
    style="width: 80px;"
    @change="checkFontSizeIsNumber"
  >
    <el-option v-for="item in state.fontDataOptions" :key="item.value" :label="item.label"
               :value="item.value" />
  </el-select>

  <!-- font color -->
  <el-button-group v-tooltip="t('docTemplate.font.color')">
    <el-button class="ordinary-button" style="width: 34px"
               @click="editor.chain().focus().setColor(state.fontColor).run()">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              d="m6.5 12.5l3.14-7.33a.39.39 0 0 1 .72 0l3.14 7.33M7.91 9.21h4.18M.5 12.5L5.07 1.84a.57.57 0 0 1 1 0L7 3.94M2.55 7.72H5" />
      </svg>
    </el-button>
    <el-button style="width: 34px">
      <el-color-picker v-model="state.fontColor" :predefine="fontPredefineColors"
                       @change="editor.chain().focus().setColor(state.fontColor).run()"
                       @focus="handleFontColorFocus" />
    </el-button>
  </el-button-group>

  <!-- highlight -->
  <el-button-group v-tooltip="t('docTemplate.font.highlight')">
    <el-button class="ordinary-button" style="width: 34px"
               @click="editor.chain().focus().toggleHighlight({ color: state.fontHighlightColor }).run()">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <rect width="5.66" height="9.66" x="5.67" y=".67" rx="1" transform="rotate(-45 8.498 5.5)" />
          <path d="M.91 11.09a1.41 1.41 0 0 0 2 2L7.5 8.5l-2-2Z" />
        </g>
      </svg>
    </el-button>
    <el-button style="width: 22px;">
      <el-color-picker v-model="state.fontHighlightColor" :predefine="fontPredefineHighlightColors"
                       @blur="editor.chain().focus().toggleHighlight({ color: state.fontHighlightColor }).run()" />
    </el-button>
  </el-button-group>

  <!-- bold -->
  <el-button class="ordinary-button" style="width: 34px" v-tooltip="t('docTemplate.font.bold')"
             @click="editor.chain().focus().toggleBold().run()"
             :class="{ 'is-active': editor.isActive('bold') }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M11 3.5a3 3 0 0 0-3-3H4a1 1 0 0 0-1 1v5h5a3 3 0 0 0 3-3Zm1 6.5a3.5 3.5 0 0 1-3.5 3.5H4a1 1 0 0 1-1-1v-6h5.5A3.5 3.5 0 0 1 12 10Z" />
    </svg>
  </el-button>

  <!-- italic -->
  <el-button style="width: 34px; margin-left: -6px" v-tooltip="t('docTemplate.font.italic')"
             @click="editor.chain().focus().toggleItalic().run()"
             :class="{ 'is-active': editor.isActive('italic') }"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="m4.5 13.5l5-13m-4 0H13m-12 13h7.5" />
    </svg>
  </el-button>
</template> 
