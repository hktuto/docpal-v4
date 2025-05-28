<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'
import { defaultAvailableFonts } from 'docpal-document-editor/src/utils/fontHelper'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
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

function handlerFontSizeNumber(status: boolean) {
  console.log(state.fontSize)
  let down = 8
  let up = 48

  if (state.fontSize < fontPredefineSize[0]) {
    console.log('--1')
    if (state.fontSize <= 1) {
      down = 1
      up = 2
    } else {
      down = state.fontSize - 1
      up = state.fontSize + 1
    }
  } else {
    const lastNumber = fontPredefineSize[fontPredefineSize.length - 1]
    if (fontPredefineSize[0] <= state.fontSize && state.fontSize <= lastNumber) {
      console.log('--2')
      if (state.fontSize == lastNumber) {
        down = fontPredefineSize[fontPredefineSize.length - 2]
        up = Math.ceil(state.fontSize / 10) * 10
        return status ? up : down
      }

      // 數組包含的數據
      for (let i = 0; i < fontPredefineSize.length; i++) {
        if (fontPredefineSize[i] === state.fontSize) {
          down = fontPredefineSize[i - 1]
          up = fontPredefineSize[i + 1]
          break
        } else if (fontPredefineSize[i] > state.fontSize) {
          down = fontPredefineSize[i - 1]
          up = fontPredefineSize[i + 1]
          break
        }
      }
    } else if (state.fontSize > lastNumber) {
      // 大於最後的值
      console.log('--3')
      if (state.fontSize <= Math.ceil(lastNumber / 10) * 10) {
        down = lastNumber
        up = (Math.ceil(lastNumber / 10) + 1) * 10
      } else {
        down = (Math.ceil(state.fontSize / 10) - 1) * 10
        up = (Math.ceil(state.fontSize / 10) + 1) * 10
      }
    }
  }
  return status ? up : down
}

/**
 * Resize font size
 * @param status (true: down, false: up)
 */
function handlerFontSizeResize(status: boolean) {
  // TODO 需要考慮當前選中的數據的大小，動態變更字體的大小時，需要先獲取當前選中的數據的字體大小
  // TODO 如果存在多個字體大小格式，需要分別處理
  state.fontSize = handlerFontSizeNumber(status)
  handleFontSizeChange(state.fontSize)
}

/**
 * Set the selected string Bold
 */
function handleFontBoldChange() {
  editor.value.chain().focus().toggleBold().run()
}

/**
 * Set the selected string Italic
 */
function handleFontItalicChange() {
  editor.value.chain().focus().toggleItalic().run()
}

/**
 * Set the selected string Underline
 */
function handleUnderline() {
  editor.value.chain().focus().toggleUnderline().run()
}

/**
 * Set the selected string font family
 * @param fontFamily font family
 * default font family ["Inter" :String]
 */
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

/**
 * Set the selected string font size
 * @param size font size number
 * default color [12 :Number]
 */
function handleFontSizeChange(size: Number) {
  editor.value.chain().focus().setFontSize(size + 'px').run()
}

/**
 * Set the selected string to highlight
 * @param highlightColor The HEX value of the color
 * default color [Yellow :String]
 */
function handleFontHighlight(highlightColor: string) {
  editor.value.chain().focus().toggleHighlight({ color: highlightColor }).run()
}

/**
 * Set the selected string to font color
 * @param fontColor
 * default color [black]
 */
async function handleSetFontColor(fontColor: string) {
  editor.value.chain().focus().setColor(fontColor).run()
}

function handleFontColorFocus() {
  const color = editor.value.getAttributes('textStyle').color
  if (color) {
    state.fontColor = color
  } else {
    state.fontColor = '#000000'
  }
}

/**
 * Set the selected string to unset all font style
 */
function handleFontStyleClear() {
  editor.value.chain().focus().unsetAllMarks().run()
}

/**
 * Set the selected string to Strike
 */
function handleStrike() {
  editor.value.chain().focus().toggleStrike().run()
}

/**
 * Set the selected string to Subscript
 */
function handleSubscript() {
  editor.value.chain().focus().toggleSubscript().run()
}

/**
 * Set the selected string to Superscript
 */
function handleSuperscript() {
  editor.value.chain().focus().toggleSuperscript().run()
}
</script>

<template>
  <el-row>
    <el-col :span="24">
      <!-- font family -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.family')"
        placement="bottom"
      >
        <el-dropdown trigger="click" split-button @click="handleFontFamilyChange(state.fontFamily)">
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
      </el-tooltip>

      <el-divider direction="vertical" />
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.size')"
        placement="bottom"
      >
        <el-select
          v-model="state.fontSize"
          allow-create
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="please select"
          style="width: 16%"
          @change="checkFontSizeIsNumber"
        >
          <el-option v-for="item in state.fontDataOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-tooltip>

      <el-divider direction="vertical" />

      <el-button-group>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="t('docTemplate.font.increaseSize')"
          placement="bottom"
        >
          <el-button style="width: 41px" @click="handlerFontSizeResize(true)">
            <p>A<sup>+</sup></p>
          </el-button>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="t('docTemplate.font.reduceSize')"
          placement="bottom"
        >
          <el-button style="width: 41px" @click="handlerFontSizeResize(false)">
            <p>A<sup>-</sup></p>
          </el-button>
        </el-tooltip>
      </el-button-group>

      <el-divider direction="vertical" />

      <!-- font color   -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.color')"
        placement="bottom"
      >
        <el-button-group>
          <el-button @click="handleSetFontColor(state.fontColor)">
            A
          </el-button>
          <el-button style="width: 22px">
            <el-color-picker v-model="state.fontColor" :predefine="fontPredefineColors" @change="handleSetFontColor"
                             @focus="handleFontColorFocus" />
          </el-button>
        </el-button-group>
      </el-tooltip>

      <el-divider direction="vertical" />

      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.deleteStyle')"
        placement="bottom"
      >
        <el-button style="width: 38px" @click="handleFontStyleClear">
          🗑️
        </el-button>
      </el-tooltip>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <!-- font bold  -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.bold')"
        placement="bottom"
      >
        <el-button style="width: 36px" @click="handleFontBoldChange" :class="{ 'is-active': editor.isActive('bold') }">
          <p style="font-weight: bold">B</p>
        </el-button>
      </el-tooltip>

      <!--  font italic  -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.italic')"
        placement="bottom"
      >
        <el-button @click="handleFontItalicChange" :class="{ 'is-active': editor.isActive('italic') }">
          <p><em>I</em></p>
        </el-button>
      </el-tooltip>

      <!--  font Underline  -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.underline')"
        placement="bottom"
      >
        <el-button style="width: 36px" @click="handleUnderline" :class="{ 'is-active': editor.isActive('underline') }">
          <p><u>U</u></p>
        </el-button>
      </el-tooltip>

      <!--  font Strike  -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.delineate')"
        placement="bottom"
      >
        <el-button @click="handleStrike" :class="{ 'is-active': editor.isActive('strike') }">
          <p><s>abc</s></p>
        </el-button>
      </el-tooltip>

      <!--  font Subscript  -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.subscript')"
        placement="bottom"
      >
        <el-button style="width: 36px" @click="handleSubscript" :class="{ 'is-active': editor.isActive('subscript') }">
          <p>X<sub>2</sub></p>
        </el-button>
      </el-tooltip>

      <!--  font Superscript  -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.superscript')"
        placement="bottom"
      >
        <el-button style="width: 36px" @click="handleSuperscript"
                   :class="{ 'is-active': editor.isActive('superscript') }">
          <p>X<sup>2</sup></p>
        </el-button>
      </el-tooltip>

      <el-divider direction="vertical" />

      <!-- font highlight -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="t('docTemplate.font.highlight')"
        placement="bottom"
      >
        <el-button-group>
          <el-button @click="handleFontHighlight(state.fontHighlightColor)">
            <p>Highlight</p>
          </el-button>
          <el-button style="width: 22px;">
            <el-color-picker v-model="state.fontHighlightColor" :predefine="fontPredefineHighlightColors"
                             @blur="handleFontHighlight(state.fontHighlightColor)" />
          </el-button>
        </el-button-group>
      </el-tooltip>
    </el-col>
  </el-row>

  <div style="text-align: center; margin-top: 9px;">
    {{ $t('docTemplate.font.font') }}
  </div>
</template>

<style scoped lang="scss">
.el-row {
  margin-bottom: 5px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 2px;
}
</style>