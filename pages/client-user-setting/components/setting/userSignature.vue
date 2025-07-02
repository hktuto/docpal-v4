<script setup lang="ts">
import { clientApi } from 'api'
import { UploadFilled } from '@element-plus/icons-vue'

const { t } = useI18n()
const state = reactive({
  userSignatureVisible: false
})
const form = reactive({})

async function handleOpen() {
  state.userSignatureVisible = true
  // TODO: 获取用户签名
  // await clientApi.api.getUserProfileSetting().then((res: any) => res.data)
}

function handleSubmit() {
  console.log('handleSubmit')
}

defineExpose({ handleOpen })
</script>

<template>
  <el-dialog v-model="state.userSignatureVisible" :title="t('Edit Signature')" width="600px">
    <div>
      <el-form ref="FormRef" :model="form" label-position="top">
        <el-form-item label="Upload Image ( Support PNG, SVG )">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="#"
            accept="image/png,image/svg"
            multiple
            drag
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="handleBeforeUpload"
            :on-preview="handlePictureCardPreview"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="actions">
        <ElButton id="UserSignature__Dialog__Cancel" type="info"
                  @click="state.userSignatureVisible = false">
          {{ $t('dpButtom_cancel') }}
        </ElButton>
        <ElButton id="UserSignature__Dialog__Save" type="primary" @click="handleSubmit">
          {{ $t('common_save') }}
        </ElButton>
      </div>
    </template>
  </el-dialog>

</template>

<style>

</style>