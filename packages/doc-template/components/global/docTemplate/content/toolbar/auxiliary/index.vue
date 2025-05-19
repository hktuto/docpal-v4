<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'
import type { UploadFile } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import Base64 from 'happy-dom/lib/base64/Base64.d.ts.js'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
const { t } = useI18n()
const disabled = ref(false)
const dialogVisible = ref(false)
let dialogImageUrl = ref('')

const state = reactive({
  fontLinkDialogVisible: false,
  imageDialogVisible: false,
  isImageLink: false,
  imageLink: '',


  link: ''
})

/**
 * Add horizontal
 */
function addHorizontalRule() {
  editor.value.chain().focus().setHorizontalRule().run()
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

/**
 * Set the selected string to task list
 */
function handleTaskList() {
  editor.value.chain().focus().toggleTaskList().run()
}

function openSetImageDialog() {
  state.imageDialogVisible = true
  state.isImageLink = false
  state.imageLink = ''
}

function handleImage() {

  if (state.isImageLink) {
    const url = state.imageLink
    if (url) {
      editor.value.commands.setImage({ src: url })
    }
    state.imageLink = ''
  } else {
    Base64(state.dialogImageUrl)
  }
  state.isImageLink = false
  state.imageDialogVisible = false
}

const handleRemove = (file: UploadFile) => {
  console.log(file)
  dialogImageUrl = ''
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

</script>

<template>
  <div>
    <el-button @click="addHorizontalRule">
      Horizontal line
    </el-button>

    <el-button @click="handleTaskList" :class="{ 'is-active': editor.isActive('taskList') }">
      Toggle task list
    </el-button>

    <!-- font link -->
    <el-button @click="openSetLinkDialog">
      <p>🔗</p>
    </el-button>

    <!-- set image   -->
    <el-button @click="openSetImageDialog">
      image
    </el-button>
  </div>

  <div style="text-align: center; margin-top: 9px;">
    {{ t('Utils') }}
  </div>

  <el-dialog v-model="state.fontLinkDialogVisible" title="Set Link" width="500">
    <el-form>
      <el-form-item label="Link">
        <el-input v-model="state.link" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleResetLink">Reset</el-button>
        <el-button type="primary" @click="handleSetLink">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="state.imageDialogVisible" title="Set Image" width="500">
    <el-form>
      <el-switch
        v-model="state.isImageLink"
        size="large"
        active-text="Image"
        inactive-text="Link(Base64)"
      />

      <el-form-item v-if="!state.isImageLink" label="Image link(Base64)">
        <el-input v-model="state.imageLink" />
      </el-form-item>

      <el-form-item v-else label="Image" lable="Update Image">
        <el-upload v-if="!dialogImageUrl" action="#" list-type="picture-card" :auto-upload="false" limit="1">
          <el-icon>
            <Plus />
          </el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
                <!--          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                          >
                            <el-icon><Download /></el-icon>
                          </span>-->
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImage">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>