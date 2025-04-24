<template>
  <div class="formContainer">
    <client-only>
      <v-form-render
        ref="vFormRenderRef"
        :form-json="fromJsonNormalizer"
        :form-data="data"
        :option-data="options"
        @formChange="formChange"
        @file-preview="handleFilePreview"
        @emit="handleEmit"
      >
        <template v-for="(idx, slotName) in $slots" #[slotName]="data">
          <slot :name="slotName" :data="data"></slot>
        </template>
      </v-form-render>
    </client-only>
    <ReaderDialog ref="ReaderRef" v-bind="previewFile" :collabora="false"></ReaderDialog>
  </div>
</template>

<script lang="ts" setup>
import { clientApi } from 'api'

const emits = defineEmits(['submit', 'clean', 'fail', 'formChange', 'emit'])
const props = withDefaults(
  defineProps<{
    data?: Object
    formJson?: Object
    options?: Object
    attachmentDownloadApi?: Function
  }>(),
  {
    attachmentDownloadApi: (id: string) =>
      clientApi.api.getWorkflowTaskAttachmentInfo(
        { attachmentId: id },
        {
          format: 'blob'
        }
      )
  }
)
const vFormRenderRef = ref()
const fromJsonNormalizer = computed(() => {
  if (!props.formJson) return {}
  if (!props.formJson.formConfig) return {}

  let json = deepCopy(props.formJson)
  // if(json.formConfig.jsonVersion === 3) return props.formJson;
  // normalize vue 2 form designer
  if (!json.formConfig) json.formConfig = {}
  json.formConfig.jsonVersion = 3
  /**
   * old migrate function , change axious to $api
   */
  // let st = JSON.stringify(json)
  // st = st.replaceAll('this.$axios', '$api')
  // st = st.replaceAll('this.$cookies.get', '$getCookie')
  // st = st.replaceAll('yyyy-MM-dd', 'YYYY-MM-DD')
  // json = JSON.parse(st)

  return json
})
function setFormJson(json) {
  console.log('setFormJson', json)
  /**
   * old migrate function , change axious to $api
   */
  // let st = JSON.stringify(json)
  // st = st.replaceAll('this.$axios', '$api').replaceAll('_$api', '$api')
  // st = st.replaceAll('this.$cookies.get', '$getCookie')
  // st = st.replaceAll('yyyy-MM-dd', 'YYYY-MM-DD')
  // json = JSON.parse(st)
  vFormRenderRef.value.setFormJson(json)
}
function setFormData(data: any) {
  Object.keys(vFormRenderRef.value.widgetRefList).forEach((key: string) => {
    const widgetRef = vFormRenderRef.value.widgetRefList[key]
    // widget：仅容器含有；设置容器变量
    if(widgetRef.widget) {
      const widget = widgetRef.widget
      if(widget.type === 'sub-form') {
        if(!data[widget.id]) delete data[widget.id] // 删除 sub-form data,将按照默认设置渲染表单
        else {
          widget.widgetList.forEach(widgetItem => {
            if(widgetItem.type === 'date' && widgetItem.options.valueFormat) {
              data[widget.id].forEach(dataItem => {
                dataItem[widget.id] = formatDate(dataItem[widget.id], widgetItem.options.valueFormat)
              })
            }
          })
        }
      }
    }
    // field：仅字段含有；设置字段变量 
    else if(widgetRef.field) {
      const widget = widgetRef.field
      if(widget.type === 'date') {
        if(widget.options.valueFormat && data[widget.id]) {
          data[widget.id] = formatDate(data[widget.id], widget.options.valueFormat)
        }
      }
    }
  })
  vFormRenderRef.value.setFormData(data)
}
function formChange(fieldName, newValue, oldValue, formModel) {
  emits('formChange', { fieldName, newValue, oldValue, formModel })
}
function handleEmit(funName, newValue, oldValue) {
  emits(funName, newValue, oldValue)
  emits('emit', funName, newValue, oldValue)
}
const ReaderRef = ref()
const previewFile = reactive<any>({
  blob: null,
  name: '',
  id: '',
  loading: false,
  options: {
    noDownload: true,
    print: false,
    loadAnnotations: false,
    readOnly: true
  }
})
async function handleFilePreview({ file, options }) {
  previewFile.loading = true
  try {
    let fileId = ''
    if (options.uploadName === 'file') {
      fileId = file.response?.data ? file.response.data.id : file.id
      previewFile.blob = (await clientApi.api.getNuxeoDocumentDownload(
        { idOrPath: fileId },
        {
          format: 'blob'
        }
      )) as any
    } else {
      fileId = file.response?.data && file.response.data.length > 0 ? file.response.data[0].contentId : file.id
      previewFile.blob = await clientApi.api.getWorkflowTaskAttachmentInfo(
        { attachmentId: fileId },
        {
          format: 'blob'
        }
      )
    }
    previewFile.collabora = canCollaboraEdit(previewFile.blob.type)
    ReaderRef.value.handleOpen()
    previewFile.id = fileId
    previewFile.name = file.name
  } catch (error) {}
  previewFile.loading = false
}
defineExpose({ vFormRenderRef, setFormJson, setFormData })
</script>

<style lang="scss" scoped>
.formContainer {
  overflow-x: hidden;
}
:deep(.el-form-item__content > div) {
  width: 100%;
  .el-date-editor {
    width: 100%;
  }
}
:deep .el-select-group__wrap {
  display: unset !important;
}
</style>
<style lang="scss">
.el-select-group__wrap {
  display: unset !important;
}
.el-select-group__wrap:not(:last-of-type)::after {
  bottom: 0px;
}
.el-time-panel {
  width: 150px;
}
.container-wrapper {
  overflow-x: hidden;
  width: 100%;
  min-width: 400px;
  .sub-form-container {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    .el-row {
      flex-wrap: nowrap;
      min-width: 480px;
      .el-form-item__error {
        //opacity: 0;
      }
    }
  }
}
</style>
