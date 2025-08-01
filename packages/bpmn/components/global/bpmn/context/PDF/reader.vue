<script setup lang="ts">
import type { Node } from '@antv/x6'
import { useDebounceFn } from '@vueuse/core/index'
import { adminApi } from 'api'

const { t } = useI18n()

const { node } = defineProps<{
  node: Node
}>()

const state = reactive({
  form: {},
  fileList: [],
  _fileList: []
})

const loading = ref(false)

const onChange = useDebounceFn(
  async (file: any, _fileList: any) => {
    state.fileList = _fileList.reduce((prev: any, item: any) => {
      prev.push(item)
      return prev
    }, [])
    state._fileList = [...state.fileList]

    const formData = new FormData()
    formData.append('file', state.fileList[0].raw)
    // call Api
    const re = await adminApi.api.postTemplateDocumentParse({}, formData)
    console.log(222, re)
  },
  500,
  { maxWait: 5000 }
)

const beforeRemove = (file: any, _fileList: any) => {
  state.fileList = _fileList
}

</script>

<template>
  <div>
    <BpmnSidebarEditLabel :node="node" />
    <el-form label-width="auto" label-position="top">
      <el-form-item :label="t('File Field')">
        <el-select v-model="state.form.fileField" placeholder="please select your zone">
        </el-select>
      </el-form-item>

      <el-form-item :label="t('PDF form Example')">
        <el-upload
          v-model:file-list="state.fileList"
          class="upload-demo"
          action="#"
          accept=".pdf"
          :limit="1"
          :auto-upload="true"
          :on-change="onChange"
          :before-remove="beforeRemove"
        >
          <el-button type="primary">{{ t('Click to upload') }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-divider />

    <!--    <div>
          {{ $t('Field Mapping') }}
          <el-form>
            <el-form-item label="Activity name">
              <el-input />
            </el-form-item>

            <el-form-item label="Activity name">
              <el-select placeholder="please select your zone">
              </el-select>
            </el-form-item>

            <el-form-item label="Instant delivery">
              <el-switch />
            </el-form-item>

            <el-form-item label="Activity type">
              <el-checkbox-group>
                <el-checkbox value="Online activities" name="type">
                  Online activities
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>-->
  </div>
</template>

<style scoped lang="scss">

</style>