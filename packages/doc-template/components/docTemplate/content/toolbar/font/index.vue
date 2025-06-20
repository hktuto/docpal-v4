<script setup lang="ts">
import { DocTemplateProveKey, type DocTemplateVariable } from '~/utils/docTemplateHelper'
import { defaultAvailableFonts } from 'docpal-document-editor/src/utils/fontHelper'
import { useI18n } from 'vue-i18n'
import { inject, ref } from 'vue'
import { ElMessage, type UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import VariableValueTable from '../../setting/variable/VariableValueTable.vue'
import VariableForm from '../../setting/variable/variableForm.vue'
import Manager from '../../setting/variable/manager.vue'
import VariablePicker from '../../toolbar/variable/VariablePicker.vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor, options, initEditor, setVariables, variables } = provider
const { t } = useI18n()

const titlePredefine = ref([
  { name: 'Default', key: 0 },
  { name: 'H1', key: 1 },
  { name: 'H2', key: 2 },
  { name: 'H3', key: 3 },
  { name: 'H4', key: 4 },
  { name: 'H5', key: 5 }
])
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
  titleTags: 'Default',
  fontColor: '#000000',
  fontHighlightColor: '#ffff00',
  fontLinkDialogVisible: false,
  imageDialogVisible: false,
  isImageUrl: true,
  imageLink: '',
  imageUrl: '',
  previewDialogVisible: false,
  previewDialogImage: '',
  link: '',
  createTablePopoverVisible: false,
  addVisible: false,
  mangerVisible: false,
  insertVariableVisible: false
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

function handleFontColorFocus() {
  const color = editor.value.getAttributes('textStyle').color
  if (color) {
    state.fontColor = color
  } else {
    state.fontColor = '#000000'
  }
}

function handleTitle(index) {
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

/**
 * Set the selected string to align
 * @param align string('left','center','right','justify')
 */
function handleTextAlign(align: string) {
  editor.value.chain().focus().toggleTextAlign(align).run()
}

/**
 * @param state boolean(true:indent,false:outdent)
 */
function handleIndent(state: boolean) {
  if (state) {
    editor.value.chain().focus().indent().run()
  } else {
    editor.value.chain().focus().outdent().run()
  }
}

function openSetLinkDialog() {
  state.fontLinkDialogVisible = true
  const href = editor.value.getAttributes('link').href
  if (href) {
    state.link = href
  } else {
    state.link = ''
  }
}

/**
 * Set the selected string to unset link
 */
function handleResetLink() {
  editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  state.fontLinkDialogVisible = false
}

/**
 * Set the selected string to link
 */
function handleSetLink() {
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: state.link }).run()
  state.fontLinkDialogVisible = false
}

function openSetImageDialog() {
  state.imageDialogVisible = true
  state.isImageUrl = true
  state.imageLink = ''
  state.imageUrl = ''
}

const uploadRef = ref()

function handleImage() {
  let url

  if (!state.isImageUrl) {
    url = state.imageLink
    state.imageLink = ''
  } else {
    url = state.imageUrl
    state.imageUrl = ''
  }

  if (url) {
    const { from, to } = editor.value.state.selection
    editor.value.commands.setImage({ src: url })
    editor.value.commands.focus(to + 1)
  }

  uploadRef.value.clearFiles()
  state.isImageUrl = true
  state.imageDialogVisible = false
}

function handleBeforeUpload(file: File) {
  const isLt1m = file.size / 1024 / 2048 < 1
  if (!isLt1m) {
    ElMessage.error('上传头像图片大小不得超过 1M!')
  }
  return isLt1m
}

function handlePictureCardPreview(file: UploadFile) {
  state.previewDialogImage = file.url!
  state.previewDialogVisible = true
}

const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
})

async function handleImageSuccess(uploadFile: any, uploadFiles: any) {
  state.imageUrl = await toBase64(uploadFiles.raw)
}

const tableForm = reactive({
  value: {
    columns: [{ 'name': 'Column 1', 'align': 'left', 'color': '#d3dbde', 'width': '', 'key': 'Col_1' }],
    rows: [['']],
    bordered: true,
    striped: false,
    sort: 'Default',
    sortBy: true
  }
})

function handleCreateTable() {
  const { to } = editor.value.state.selection
  editor.value.commands.insertContent({
    type: 'variableTable',
    attrs: {
      type: 'table',
      value: tableForm.value
    }
  })
  editor.value.commands.focus(to + 1)
  state.createTablePopoverVisible = false
}

const formMode = ref<'create' | 'edit'>('create')
const selectedVariable = ref<DocTemplateVariable | null>(null)
const renderKey = ref(0)

function handleOpenManagerCreate() {
  formMode.value = 'create'
  selectedVariable.value = null
  state.addVisible = true
}

function handleFormSubmit(payload: { mode: 'create' | 'edit'; variable: any }) {
  if (payload.mode === 'create') {
    provider?.addVariable?.({ ...payload.variable })
  } else {
    provider?.updateVariable?.({ ...payload.variable })
  }
  renderKey.value++
  state.addVisible = false
}

function handleFormCancel() {
  state.addVisible = false
}

function handlePickerSelect(variable: DocTemplateVariable) {
  if (!editor) {
    state.insertVariableVisible = false
    return
  }
  let nodeType = ''
  switch (variable.type) {
    case 'text':
      nodeType = 'variableText'
      break
    case 'list':
      nodeType = 'variableList'
      break
    case 'table':
      nodeType = 'variableTable'
      break
    case 'link':
      nodeType = 'variableLink'
      break
    default:
      state.insertVariableVisible = false
      return
  }
  const { to } = editor.value.state.selection
  editor.value.commands.insertContent({
    type: nodeType,
    attrs: { ...variable }
  })
  editor.value.commands.focus(to + 1)
  state.insertVariableVisible = false
}

function handlePickerClose() {
  state.insertVariableVisible = false
}
</script>

<template>
  <div class="toolsContainer">
    <el-row>
      <el-col :span="24" :gutter="0">
        <!-- Undo -->
        <LazyDocTemplateContentSettingUndo />

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

        <!-- set link -->
        <el-button v-tooltip="t('docTemplate.utils.link.link')" style="width:34px" @click="openSetLinkDialog">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
            <path fill="currentColor" fillRule="evenodd"
                  d="m7.671 2.743l-.964.964a1 1 0 0 1-1.414-1.414l.964-.965a4.536 4.536 0 0 1 6.415 6.415l-.965.964a1 1 0 1 1-1.414-1.414l.964-.965a2.536 2.536 0 0 0-3.585-3.585Zm-3.964 2.55a1 1 0 0 1 0 1.414l-.964.965a2.536 2.536 0 0 0 3.585 3.585l.965-.964a1 1 0 0 1 1.414 1.414l-.964.964a4.536 4.536 0 0 1-6.415-6.414l.965-.964a1 1 0 0 1 1.414 0m5.5.914a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 1.414 1.414z"
                  clipRule="evenodd" />
          </svg>
        </el-button>

        <!-- set image -->
        <el-button v-tooltip="t('docTemplate.utils.image.image')" @click="openSetImageDialog"
                   style="width:34px; margin-left: -6px">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
            <path fill="currentColor" fillRule="evenodd"
                  d="M14 12.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 12.5v-11A1.5 1.5 0 0 1 1.5 0h11A1.5 1.5 0 0 1 14 1.5zM3.75 2a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5m4.651 4.599L2.5 12.5h10v-4L9.69 6.492A1 1 0 0 0 8.4 6.6Z"
                  clipRule="evenodd" />
          </svg>
        </el-button>

        <!-- table -->
        <el-button v-tooltip="t('docTemplate.table.createTable')" @click="state.createTablePopoverVisible = true"
                   style="width:34px; margin-left: -6px">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
            <path fill="currentColor" fillRule="evenodd"
                  d="M1.5 0A1.5 1.5 0 0 0 0 1.5v1.375h14V1.5A1.5 1.5 0 0 0 12.5 0zM0 8.375v-4.25h6.375v4.25zm0 1.25V12.5A1.5 1.5 0 0 0 1.5 14h4.875V9.625zm7.625 0V14H12.5a1.5 1.5 0 0 0 1.5-1.5V9.625zM14 8.375v-4.25H7.625v4.25z"
                  clipRule="evenodd" />
          </svg>
        </el-button>

        <!--  Increase  -->
        <el-button v-tooltip="t('docTemplate.utils.increaseRight')" @click="handleIndent(true)" style="width:34px">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 1H.5m13 4H6m7.5 4H6m7.5 4H.5M2 5l2 2l-2 2" />
          </svg>
        </el-button>

        <el-button v-tooltip="t('docTemplate.utils.increaseLeft')" @click="handleIndent(false)"
                   style="width:34px; margin-left: -6px">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 1H.5m13 4H6m7.5 4H6m7.5 4H.5m2-8L1 7l1.5 2" />
          </svg>
        </el-button>

        <div class="setting-button">
          <!-- Import -->
          <LazyDocTemplateContentSettingImport />

          <!-- Export -->
          <LazyDocTemplateContentSettingExport />

          <!-- Variable Manager -->
          <el-dropdown class="ordinary-button">
            <el-button>
              {{ t('docTemplate.variable.manager') }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleOpenManagerCreate">
                  {{ t('docTemplate.utils.variableManager.add') }}
                </el-dropdown-item>
                <el-dropdown-item @click="state.mangerVisible = true">
                  {{ t('docTemplate.variable.editVariable') }}
                </el-dropdown-item>
                <el-dropdown-item @click="state.insertVariableVisible=true">
                  {{ t('docTemplate.variable.insertVariable') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- Page Setting -->
          <LazyDocTemplateContentSettingPage />
        </div>

      </el-col>
    </el-row>
  </div>

  <!-- Set link dialog -->
  <el-dialog v-model="state.fontLinkDialogVisible" :title="t('docTemplate.utils.link.set')" width="500">
    <el-form>
      <el-form-item :label="t('docTemplate.utils.link.link')">
        <el-input v-model="state.link" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleResetLink">{{ $t('common_reset') }}</el-button>
        <el-button type="primary" @click="handleSetLink">
          {{ $t('dpButtom_confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- Set image dialog -->
  <el-dialog v-model="state.imageDialogVisible" :title="t('docTemplate.utils.image.set')" width="500">
    <el-form>
      <el-switch
        v-model="state.isImageUrl"
        size="large"
        :active-text="t('docTemplate.utils.image.image')"
        :inactive-text="t('docTemplate.utils.image.link')"
      />

      <el-form-item v-if="!state.isImageUrl" :label="t('docTemplate.utils.image.link')">
        <el-input v-model="state.imageLink" />
      </el-form-item>

      <el-form-item v-else :label="t('docTemplate.utils.image.image')">
        <el-upload
          ref="uploadRef"
          action="#"
          list-type="picture-card"
          accept="image/jpeg,image/png,image/jpg"
          limit="1"
          :on-success="handleImageSuccess"
          :before-upload="handleBeforeUpload"
          :on-preview="handlePictureCardPreview"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="state.previewDialogVisible">
          <img w-full style="width: 100%; height: 100%" :src="state.previewDialogImage" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImage">
          {{ $t('dpButtom_confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- Create table dialog -->
  <el-dialog v-model="state.createTablePopoverVisible" :title="t(t('docTemplate.table.createTable'))">
    <VariableValueTable v-model="tableForm.value">
      {{ tableForm.value }}
    </VariableValueTable>
    <template #footer>
      <el-button @click="state.createTablePopoverVisible = false">
        {{ $t('vxe.button.cancel') }}
      </el-button>
      <el-button type="primary" @click="handleCreateTable">
        {{ $t('docTemplate.table.create') }}
      </el-button>
    </template>
  </el-dialog>

  <!-- add visible -->
  <el-dialog v-model="state.addVisible"
             :title="formMode === 'create' ? t('docTemplate.utils.variableManager.add') : t('docTemplate.variable.editVariable')"
             width="80%"
             destroy-on-close>
    <VariableForm
      v-if="state.addVisible"
      :mode="formMode"
      :variable="selectedVariable"
      :variables="provider.variables"
      @submit="handleFormSubmit"
      @cancel="handleFormCancel"
    />
  </el-dialog>

  <!-- edit visible-->
  <el-dialog v-model="state.mangerVisible">
    <Manager />
  </el-dialog>

  <!-- insert visible -->
  <VariablePicker
    :variables="variables"
    :visible="state.insertVariableVisible"
    @select="handlePickerSelect"
    @close="handlePickerClose"
  />

</template>

<style scoped lang="scss">
.toolsContainer {
  min-width: 240px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
}

.toolsContainer::-webkit-scrollbar {
  height: 4px;
}

.toolsContainer::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 2px;
}

.toolsContainer::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}

.el-row {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: max-content;
}

.el-col {
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: max-content;
}

.ordinary-button {
  margin-left: 0;
  flex-shrink: 0;
}

.setting-button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
}

.el-dropdown {
  :deep(.el-button-group > .el-button:first-child) {
    width: 120px;
    text-align: left;
    position: relative;

    span {
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: block;
    }
  }
}
</style>
