<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { MenuRouterKey } from '#imports'

const { t } = useI18n()
const routerProvider = inject(MenuRouterKey)
const upload = ref()
const mode = ref<'upload' | 'confirm'>('upload')
const fileList = ref<any[]>([])
const jsonData = ref<any>()

function handleExceed(files: any[]) {
  fileList.value[0] = files[0]
}

function handleChange(uploadFile: any, uploadFiles: any[]) {
  fileList.value = uploadFiles
}

async function handleConfirm() {
  if (fileList.value.length === 0) {
    routerProvider?.message.error(t('vxe.upload.dragPlaceholder'))
    return
  }

  const file = fileList.value[0].raw

  try {
    const fileContent = await readFileAsText(file)
    const data = JSON.parse(fileContent)
    console.log('JSON Data', data)
    jsonData.value = data
    mode.value = 'confirm'
  } catch (error) {
    console.error('Error reading file:', error)
    routerProvider?.message.error('Failed to read or parse JSON file')
  }
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => {
      reject(new Error('File reading error'))
    }
    reader.readAsText(file)
  })
}

function handleSubmit() {


  mode.value = 'upload'
  fileList.value = []
}

</script>

<template>
  <template v-if="mode ==='upload'">
    <h3>import data</h3>
    <div style="width: 400px">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="#"
        v-model:file-list="fileList"
        drag
        accept=".json"
        :limit="1"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :on-change="handleChange"
      >
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <template #tip>
          <div class="el-upload__tip">
            {{ $t('Only supports JSON files') }}
          </div>
        </template>
      </el-upload>
      <el-button @click="handleConfirm" type="primary">{{ $t('confirm') }}</el-button>
    </div>
  </template>

  <template v-if="mode === 'confirm'">
    <div v-if="!!jsonData">
      <div v-if="Object.keys(jsonData.case).length > 0">
        <h3>Case</h3>
        <LazyConfigMigrationComponentsCase :caseList="jsonData.case" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.workflow).length > 0">
        <h3>Workflow</h3>
        <LazyConfigMigrationComponentsWorkflow :workflowList="jsonData.workflow" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.masterTable).length > 0">
        <h3>Master Table</h3>
        <LazyConfigMigrationComponentsMasterTable :masterTableList="jsonData.masterTable" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.idGenerator).length > 0">
        <h3>ID Generator</h3>
        <LazyConfigMigrationComponentsIdGenerator :idGeneratorList="jsonData.idGenerator" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.homePage).length > 0">
        <h3>Home Page</h3>
        <LazyConfigMigrationComponentsHomePage :homePageList="jsonData.homePage" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.userGroup).length > 0">
        <h3>User Group</h3>
        <LazyConfigMigrationComponentsUserGroup :userGroupList="jsonData.userGroup" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.userRole).length > 0">
        <h3>User Role</h3>
        <LazyConfigMigrationComponentsUserRole :userRoleList="jsonData.userRole" />
      </div>

      <div v-if="Object.keys(jsonData.documentTemplate).length > 0">
        <h3>Document Template</h3>
        <LazyConfigMigrationComponentsDocumentTemplate :documentTemplateList="jsonData.documentTemplate" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.emailTemplate).length > 0">
        <h3>Email Template</h3>
        <LazyConfigMigrationComponentsEmailTemplate :emailTemplateList="jsonData.emailTemplate" />
      </div>
      <el-divider />

      <div v-if="Object.keys(jsonData.folderCabinet).length > 0">
        <h3>Folder Cabinet</h3>
        <LazyConfigMigrationComponentsFolderCabinet :folderCabinetList="jsonData.folderCabinet" />
      </div>
      <el-divider />

      <el-button type="primary" @click="handleSubmit">{{ $t('submit') }}</el-button>
    </div>
  </template>

</template>

<style lang="scss" scoped>
</style>
