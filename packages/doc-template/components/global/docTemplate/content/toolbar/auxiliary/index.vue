<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTempalteHelper'
import { ElMessage, type UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const { editor, options, initEditor } = inject(DocTemplateProveKey)
const { t } = useI18n()

const state = reactive({
  fontLinkDialogVisible: false,
  imageDialogVisible: false,
  isImageUrl: true,
  imageLink: '',
  imageUrl: '',
  previewDialogVisible: false,
  previewDialogImage: '',
  link: ''
})

/**
 * Add horizontal Line
 */
function addHorizontalLine() {
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
    editor.value.commands.setImage({ src: url })
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

async function handleSuccess(uploadFile: any, uploadFiles: any) {
  state.imageUrl = await toBase64(uploadFiles.raw)
}


</script>

<template>
  <div class="font-style-toolbar">
    <el-button @click="addHorizontalLine">
      {{ $t('Horizontal line')}}
    </el-button>

    <el-button @click="handleTaskList" :class="{ 'is-active': editor.isActive('taskList') }">
      {{ $t('Toggle task list')}}
    </el-button>

    <!-- font link -->
    <el-button style="width: 38px"  @click="openSetLinkDialog">
      <p>🔗</p>
    </el-button>

    <!-- set image   -->
    <el-button @click="openSetImageDialog">
      {{ $t('image')}}
    </el-button>
  </div>

  <div style="text-align: center; margin-top: 44px;">
    {{ $t('Utils') }}
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
        v-model="state.isImageUrl"
        size="large"
        active-text="Image"
        inactive-text="Link(Base64)"
      />

      <el-form-item v-if="!state.isImageUrl" label="Image link(Base64)">
        <el-input v-model="state.imageLink" />
      </el-form-item>

      <el-form-item v-else label="Image" lable="Update Image">
        <el-upload
          ref="uploadRef"
          action="#"
          list-type="picture-card"
          accept="image/jpeg,image/png,image/jpg"
          limit="1"
          :on-success="handleSuccess"
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
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.font-style-toolbar{
  width: max-content;
}
</style>