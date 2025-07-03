<script setup lang="ts">
import { clientApi } from 'api'
import { UploadFilled, DeleteFilled } from '@element-plus/icons-vue'
import { useDebounceFn } from '@vueuse/core'

const routerProvider = inject(MenuRouterKey)
const { t } = useI18n()
const state = reactive({
  userSignatureVisible: false,
  fileList: [],
  imageSize: 10
})
const form = reactive({})

async function handleOpen() {
  state.userSignatureVisible = true
  // TODO: 获取用户签圖片
  // await clientApi.api.getUserProfileSetting().then((res: any) => res.data)
}

function handleSubmit() {
  // TODO: 保存用户签圖片


  routerProvider?.message.success(t('tip_updateSuccessMsg', { modelName: t('user.setting.userSignature'), name: null }))

  state.userSignatureVisible = false
}

const onChange = useDebounceFn((file: any, _fileList: any) => {
    state.fileList = _fileList.reduce((prev: any, item: any) => {
      const fileSizeCheckResult = item.size / 1024 / 1024 <= state.imageSize
      if (!fileSizeCheckResult) {
        routerProvider?.message.error(
          '[' + item.name + ']' + t('render.hint.fileSizeExceed') + state.imageSize + 'MB'
        )
        return prev
      }
      prev.push(item)
      return prev
    }, [])
    state._fileList = [...state.fileList]
  },
  500, { maxWait: 5000 }
)

function beforeRemove() {
  state.fileList = []
}

defineExpose({ handleOpen })
</script>

<template>
  <el-dialog v-model="state.userSignatureVisible" :title="t('user.setting.editSignature')" width="600px">
    <div>
      <el-form ref="FormRef" :model="form" label-position="top">
        <el-form-item label="Upload Image ( Support PNG, SVG )">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="#"
            accept="image/png,.svg"
            drag
            :limit="1"
            list-type="picture"
            :file-list="state.fileList"
            :on-change="onChange"
            :auto-upload="false"
            :show-file-list="false"
          >
            <div>
              <el-icon v-if="state.fileList.length > 0" :disabled="!state.fileList.length > 0"
                       style="position: relative; right: -80px; font-size: 18px; cursor: pointer;"
                       @click.stop="beforeRemove">
                <DeleteFilled />
              </el-icon>
            </div>
            <el-image v-if="state.fileList.length > 0" style="height: 100px" :src="state.fileList[0].url" :fit="fit" />
            <el-icon class="el-icon--upload" v-if="state.fileList.length === 0">
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
