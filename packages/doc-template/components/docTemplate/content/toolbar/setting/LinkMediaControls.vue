<script setup lang="ts">
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { useI18n } from 'vue-i18n'
import { inject, reactive, ref } from 'vue'
import { ElMessage, type UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const provider = inject(DocTemplateProveKey)
if (!provider) throw new Error('DocTemplateProvider not found')
const { editor } = provider
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

const uploadRef = ref()

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

function handleImage() {
  let url
  if (!state.isImageUrl) {
    url = state.imageLink
    state.imageLink = ''
  } else {
    url = state.imageUrl
    state.imageUrl = ''
  }
  console.log("state", state)
  if (url) {
    const { from, to } = editor.value.state.selection
    console.log(url)
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

async function handlePictureCardPreview(file: UploadFile) {
  state.previewDialogImage = file.url!
  state.previewDialogVisible = true
  state.imageUrl = await toBase64(file.raw) as string
}

const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
})

async function handleImageSuccess(uploadFile: any, uploadFiles: any) {
  if(!uploadFile) return;
  const isSizeOk = handleBeforeUpload(uploadFile.raw)
  if(!isSizeOk) {
    uploadRef.value.clearFiles()
    return
  }
  state.imageUrl = await toBase64(uploadFile.raw) as string

}
</script>

<template>
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
          :auto-upload="false"
          :on-change="handleImageSuccess"
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
</template> 
