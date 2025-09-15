<template>
  <el-dialog class="scroll-dialog" v-model="dialogOpened" append-to-body :close-on-click-modal="false">
    <FormVariablesRenderer ref="FormVariablesRendererRef"></FormVariablesRenderer>
    <template #footer>
      <el-button id="Browse__NewFolder__Submit" type="primary" :loading="state.loading" @click="handleSubmit">
        {{ $t('submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { globalApi } from 'api'
const dialogOpened = ref(false)
const { t } = useI18n()
const props = defineProps<{
  id: string
}>()
const contactBookDetail = inject('contactBookDetail')
const emits = defineEmits(['success'])
const state = reactive<any>({})
const FormVariablesRendererRef = ref()

async function handleSubmit() {
  const data = await FormVariablesRendererRef.value.getData()
  await globalApi.api.postContactgroupIdContactdetail(contactBookDetail.value.id, JSON.stringify(data))
}
function handleOpen() {
  dialogOpened.value = true
  setTimeout(() => {
    init()
  })
}
function init() {
  const attributes = contactBookDetail.value.attributes.map((item: any) => {
    return {
      name: item.name,
      label: item.label,
      type: item.dataType
    }
  })
  FormVariablesRendererRef.value.createJson(attributes)
}
defineExpose({ handleOpen })
</script>
