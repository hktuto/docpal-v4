<template>
  <div class="infoSection vertical-top">
    <div class="infoTitle">
      {{ $t('workflow.adHocApproval') }}
    </div>
    <div class="infoContetn">
      <div class="block">
        <el-button v-if="canAdhoc" type="primary" size="small" :loading="checkLoading || loading" @click="dialogShow = true">
          {{ $t('workflow_startAdhocWorkflow') }}
        </el-button>

        <template v-if="canApproval">
          <el-button type="primary" size="mini" :loading="checkLoading || loading" @click="handelAudit(true)">
            {{ $t('workflow_startAdhocWorkflow_approve') }}
          </el-button>
          <el-button type="danger" size="mini" :loading="checkLoading || loading" @click="handelAudit(false)">
            {{ $t('workflow_startAdhocWorkflow_reject') }}
          </el-button>
        </template>
      </div>
      <small>{{ displayStatus }}</small>
    </div>

    <el-dialog :title="$t('workflow_startAdhocWorkflow')" v-model="dialogShow" append-to-body v-loading="loading">
      <el-form :model="form" ref="FormRef" @submit.native.prevent>
        <el-form-item :label="$t('role.auditor')">
          <el-select v-model="form.user_approver_id" multiple filterable clearable>
            <template v-for="item in userListFilter">
              <el-option v-if="item.userId" :key="item.userId" :label="item.userId" :value="item.userId"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogShow = false">{{ $t('dpButtom_cancel') }}</el-button>
        <el-button type="primary" @click="handleStart">{{ $t('dpButtom_confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- <template> -->

  </div>

</template>

<script lang="ts" setup>
import { clientApi } from 'api'
import { ElMessage } from 'element-plus'

const props = defineProps<{ doc: any }>()
const emit = defineEmits(['update'])

const { doc } = toRefs(props)
const userId = useUserId()
const { t } = useI18n()
const loading = ref(false)
const checkLoading = ref(false)
const adHocHistory = ref<any>()
const adHocHistoryList = ref<any>([])
const { formatDate } = useTime()
const canAdhoc = computed(() => {
  if (!adHocHistory.value) return true
  return adHocHistory.value.approvedBy
  // if(adHocHistory.value[0])
})

const displayStatus = computed(() => {
  if (!adHocHistory.value) return t('tip.noAdhoc')
  if (adHocHistory.value.approvedBy) {
    return `${adHocHistory.value.approvedBy} ${tagTextFilter(adHocHistory.value.documentStatus)} on ${t('info_version')}: ${adHocHistory.value.documentApprovalVersion} `
  } else {
    return `${adHocHistory.value.user_creator_id} submit on ${formatDate(adHocHistory.value.startTime)}, version: ${adHocHistory.value.documentStartVersion} `
  }
})

const userList = ref([])
// #region module: befor audit
// TODO : add method to get UserList
// const { userList } = toRefs(UseUser()) TODO :
const userListFilter = computed(() => {
  if (!userList) return []
  return userList.value.filter(item => item.userId !== userId.value)
})
// const canAdhoc = ref(false)
const dialogShow = ref(false)
const form = ref({
  user_approver_id: []
})

async function checkAdhocStatus() {
  checkLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000)) // Delay of 1000ms occasionally fails
  const { entryList: list } = await clientApi.api.postWorkflowQueryadhocapprovalpage({ documentId: props.doc.id }).then(res => res.data) as any

  adHocHistoryList.value = list.length > 0 ? list : []
  adHocHistory.value = list.length > 0 ? list[0] : null
  checkLoading.value = false
}

const FormRef = ref()

function handleStart() {
  FormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const param = {
        processKey: 'adhocApproval',
        businessKey: `adhoc-${props.doc.name}`,
        properties: {
          documentId: props.doc.id,
          user_creator_id: userId.value,
          user_approver_id: form.value.user_approver_id.join(',')
        }
      }
      loading.value = true
      try {
        // TODO : add api
        await clientApi.api.postWorkflowProcessStart(param)
        dialogShow.value = false
        FormRef.value.resetFields()
        // TODO : add api
        await checkAdhocStatus()
      } catch (error) {
        await checkAdhocStatus()
      }
      loading.value = false
    }
  })
}

// #endregion

// #region module: audit
const canApproval = ref(false)

async function handelAudit(approved: boolean) {
  // if (!!approved && props.doc.isCheckedOut) {

  //   routerProvider?.message.error(`${t('dpTip_versoionError')}`)
  //   return
  // }
  const param = {
    properties: {
      documentId: props.doc.id,
      userId: userId.value,
      approved
    }
  }
  loading.value = true
  const result = await clientApi.api.postWorkflowSubmitadhocapproval(param as any).then(res => res.data)
  loading.value = false
  if (result) {
    canApproval.value = false
    // 有延迟
    // TODO : add api
    await checkAdhocStatus()
  }
}

// #endregion

// #region module: Collapse
const collapseItems = ref(['1'])

function tagStatusFilter(status: number) {
  switch (status) {
    case 0:
      return ''
      break
    case 1:
      return 'success'
      break
    case 2:
      return 'danger'
      break
  }
}

function tagTextFilter(status: number) {
  switch (status) {
    case 0:
      return t('status.underApproval')
    case 1:
      return t('status.approve')
    case 2:
      return t('status.reject')
  }
}

// #endregion
// doc
watch(doc, async (newValue) => {
  // TODO : add api
  await checkAdhocStatus()
  canApproval.value = await clientApi.api.getWorkflowIsdocumetidcanapproval({
    documentId: newValue.id,
    userId: userId.value
  }).then(res => res.data) as any
}, { immediate: true })

onMounted(async () => {
  const res = await clientApi.api.postNuxeoIdentityUsers().then(res => res.data) as any
  userList.value = res.sort((a, b) => a.username.localeCompare(b.username))
})
</script>
