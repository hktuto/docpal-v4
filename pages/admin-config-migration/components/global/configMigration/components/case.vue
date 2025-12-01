<script setup lang="ts">
import { adminApi } from 'api'

const props = defineProps<{
  caseList: any
}>()

function handleCaseFieldsShow(xml: string) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'application/xml')
  const formElements = xmlDoc.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'form')

  const filedList = []

  const excludeList = ['case_id', 'created_date', 'created_by', 'modified_by', '']

  if (formElements.length > 0) {
    const formElement = formElements[0]

    const fields = formElement.getElementsByTagName('field')
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const id = field.getAttribute('id')

      if (excludeList.includes(id)) {
        continue
      }

      filedList.push({
        id: id,
        name: field.getAttribute('name'),
        type: field.getAttribute('type')
      })
    }
  }
  return filedList
}

function handleEditCaseDashboardItem(dashboardItem: any) {
  console.log('DashboardItem', dashboardItem)
  // update case dashboard permissions
}

async function handleCreateCase() {
  console.log('case List', props.caseList)

  for (const item of Object.values(props.caseList)) {

    const data = await adminApi.api.postCaseTypes({
      name: item.name,
      caseIdPrefix: item.caseIdPrefix,
      caseIdDigit: item.caseIdDigit,
      startNumber: item.startNumber
    }).then(r => r.data)

    if (!data.id) {
      throw Error(`Create Case error：${item.namesss}`)
    }
    const caseDetails: any = await adminApi.api.getCaseTypesId(data.id).then(r => r.data)
    const versionId = caseDetails.latestVersionId

    const blob = new Blob([item.xml], { type: 'text/xml' })
    const formData = new FormData()
    formData.append('file', blob, 'ordercase.cmmn.xml')
    // save design
    await adminApi.api.patchCaseTypesVersionVersionidSave(versionId, null, formData).then(r => r.data)

    // update styleJson
    await adminApi.api.postCaseTypesStylejsonSave({
      caseTypeId: data.id,
      styleJson: JSON.stringify(item.styleJson),
      versionNumber: 'V1'
    }).then(r => r.data)

    for (const dashboardItem of item.dashboard) {
      const form = {
        caseTypeId: data.id,
        cmmnVersionId: versionId,
        label: dashboardItem.label,
        permissions: toPermissions(dashboardItem.permissions)
      }
      const dashboard = await adminApi.api.postCaseDashboard(form).then(r => r.data)
      await adminApi.api.postCaseDashboardSaveStyle({ id: dashboard.id, styleJson: dashboardItem.styleJson })
    }
  }
}

function toPermissions(permissions: any[]) {
  return permissions.reduce((acc, item) => {
    const key = item.dataType

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(item.value)
    return acc
  }, {})
}

defineExpose({
  handleCreateCase
})
</script>

<template>
  <el-row :gutter="1">
    <template v-for="item in props.caseList" :key="item.key">
      <el-col :span="12">
        <el-card style="max-height: 400px;">
          <template #header>
            <div class="card-header">
              <h4>{{ item.name }}</h4>
            </div>
          </template>
          <span>Case Fields</span>
          <div style="overflow-y: auto; max-height: 150px">
            <div v-for="fieldsItem in handleCaseFieldsShow(item.xml)">
              <el-tag :key="fieldsItem.id" size="small">
                {{ fieldsItem.name }} - {{ fieldsItem.type }}
              </el-tag>
            </div>
          </div>
          <el-divider />

          <span>Case Dashboard</span>
          <div v-for="dashboardItem in item.dashboard" style="max-height: 100px">
            <el-row>
              <el-col :span="8">
                <el-tag :key="dashboardItem.label" size="small" @dblclick="handleEditCaseDashboardItem(dashboardItem)">
                  {{ dashboardItem.label }}
                </el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </template>
  </el-row>
</template>

<style scoped lang="scss">
.el-col {
  padding-block: 2px;
  padding-right: 5px;
  padding-left: 5px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
