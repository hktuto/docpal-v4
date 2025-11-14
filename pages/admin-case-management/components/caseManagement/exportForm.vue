<script lang="ts" setup>
import { adminApi } from 'api'

const routerProvider = inject(MenuRouterKey)
if (!routerProvider) {
  throw new Error('MenuRouterKey not found')
}

const caseList = ref<any[]>([])
const selectedCase = ref<any>(null)
const loading = ref(false)


async function getCaseList() {
  const res = await adminApi.api.postCaseTypesPage({ pageNum: 0, pageSize: 1000 })
  caseList.value = res.data?.entryList.filter((item: any) => item.productionVersion) || []
}


async function handleExport() {
  loading.value = true
  
  try{
    // step 0 : check selectedCase value
    if(!selectedCase.value) {
      throw new Error('Please select a case')
    }
    const selectedCaseData = caseList.value.find((item) => item.id === selectedCase.value)
    console.log(selectedCaseData)
    // get case detail

    let {data: caseStyleJson} = await adminApi.api.getCaseTypesIdStylejson(selectedCaseData.id, {versionNumber: selectedCaseData?.latestVersion})
    caseStyleJson = caseStyleJson ? JSON.parse(caseStyleJson) : null
    const blob = await adminApi.api.getCaseTypesIdDownloadXml(selectedCaseData.id, {versionNumber: selectedCaseData?.latestVersion}, {
      format: 'blob'
    }) as any
    const cmmnString = await blob.text()

    // get case dashboard
    const caseDashboard = await adminApi.api.postCaseDashboardPage({caseTypeId: selectedCaseData.id, pageNum: 0, pageSize: 1000})
    
    // get case form
    const steps = caseStyleJson?.cells?.reduce((prev: any, item: any) => {
      if(item.data.type === 'humanTask') {
        prev.humanTask.push(item.data)
      } else if(item.data.type === 'processTask') {
        prev.processTask.push(item.data)
      }
      return prev
    }, {
      humanTask: [],
      processTask: [],
    })
    console.log(steps)
    // get case related workflow
    // get workflow related master table
    // get workflow related document template
    // get workflow related email template
    // get workflow related folder cabinet

    // final export all json data in a blob and download
  }catch(err:any){
    routerProvider?.message.error(err.message)
  }finally{
    loading.value = false
  }
  
}


onMounted(() => {
  getCaseList()
})
</script>

<template>
  <div class="exportFormContainer">
    <h3>
      Export Case
    </h3>
    <ElForm ref="formRef" label-position="top">
      <ElFormItem label="Case List" >
        <ElSelect v-model="selectedCase" placeholder="Select Case" filterable>
          <ElOption v-for="item in caseList" :key="item.id" :label="item.name" :value="item.id" />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" @click="handleExport">Export</ElButton>
  </div>
</template>
