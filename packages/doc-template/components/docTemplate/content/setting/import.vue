<script lang="ts" setup>
import { DocTemplateProveKey } from '~/utils/docTemplateHelper'
import { ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { templateApi } from 'api'
import formJson from './docJson.json'
import { useDebounceFn } from '@vueuse/core/index'

const routerProvider = inject(MenuRouterKey)
const { editor, options, initEditor, setVariables } = inject(DocTemplateProveKey)
const { t } = useI18n()

const state = reactive({
  loading: false,
  visible: false,
  textContent: '',
  status: '',
  fileList: []
})

const docxUploadRef = ref()

const FormRendererRef = ref()

function handleOpen(status: string) {
  state.visible = true
  state.status = status
  state.fileList = []
  if (status === 'Json') {
    setTimeout(async () => {
      await FormRendererRef.value.vFormRenderRef.resetForm()
      state.loading = false
    })
  }
}

async function handleSubmit() {
  try {
    let json
    if (state.status === 'Json') {
      const data = await FormRendererRef.value.vFormRenderRef.getFormData()
      if (!data) return
      json = JSON.parse(data.textContent)
    } else {
      const formData = new FormData()
      formData.append('file', state.fileList[0].raw)
      json = await templateApi.convert.postConvertUploaddocxtotemplatejson(formData as any)
    }

    ElMessageBox.confirm(t('docTemplate.import.msg'), 'Warning',
      {
        confirmButtonText: t('dpButtom_confirm'),
        cancelButtonText: t('dpButtom_cancel'),
        type: 'warning'
      }
    ).then(() => {
      setVariables(json.variables)
      initEditor(json.json.options, json.json.content)
      editor.value.commands.focus('end')
      state.visible = false
    })
  } catch (e) {
    routerProvider?.message.error(t('docTemplate.import.importError'))
  }
}

const beforeRemove = (file: any, _fileList: any) => {
  state.fileList = _fileList
}

const onChange = useDebounceFn(
  (file: any, _fileList: any) => {
    state.fileList = _fileList.reduce((prev: any, item: any) => {
      prev.push(item)
      return prev
    }, [])
    state._fileList = [...state.fileList]
  },
  500,
  { maxWait: 5000 }
)
</script>

<template>
  <el-dropdown class="ordinary-button" style="margin-right: 2px">
    <el-button>
      {{ t('designer.hint.import') }}
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleOpen('Json')">
          {{ t('docTemplate.variable.importJson') }}
        </el-dropdown-item>
        <el-dropdown-item @click="handleOpen('Docx')">
          {{ t('docTemplate.variable.importDocx') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dialog v-model="state.visible" :title="t('docTemplate.import.import')">
    <FormRenderer v-if="state.status === 'Json'" ref="FormRendererRef" :form-json="formJson" />

    <el-upload
      v-else
      ref="docxUploadRef"
      class="upload-demo"
      action="#"
      accept=".docx"
      drag
      :limit="1"
      :auto-upload="false"
      :file-list="state.fileList"
      :on-change="onChange"
      :before-remove="beforeRemove"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          only upload docx file
        </div>
      </template>
    </el-upload>

    <template #footer>
      <el-button type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('common_submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>
