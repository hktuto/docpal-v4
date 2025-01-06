<template>
  <el-dialog
    v-model="state.visible"
    :title="state.title"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleClose"
  >
    <MasterTableVariableForm ref="FromVariablesRendererRef" :ignoreList="ignoreList" isAddRelation flexible />
    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{ $t('common_submit')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { adminApi } from "api";
const props = withDefaults(
  defineProps<{
    ignoreList: any;
  }>(),
  {
    ignoreList: [],
  }
);
const emits = defineEmits(["refresh", "delete"]);
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  fields: [],
  edit: false,
  title: $i18n.t("masterTable.editRows"),
  rows: [],
});
const route = useRoute();
const router = useRouter();
// #region module: submit
async function handleSubmit() {
  try {
    state.loading = true;
    const data = await FromVariablesRendererRef.value.getData(true);
    const params: any = {
      data: [{ ...data }],
      in: { id: state.rows.map(item => item.id)}
    }
    if(data.relationRecords) {
      params.relationRecords = data.relationRecords
      delete params.data[0].relationRecords
    }
    const tableId = route.params.id || route.query.id

    await adminApi.api.putMasterTablesIdBatchRecord(tableId, params)
    // console.log(params);
    emits("refresh");
    state.visible = false;
  } catch (error) {
    
  } finally {
    state.loading = false;
  }
}
// #endregion

const FromVariablesRendererRef = ref();
async function handleOpen(fields, rows) {
  state.visible = true;
  state.loading = false;
  state.rows = deepCopy(rows)
  state.fields = fields
  setTimeout(() => {
    initForm(state.rows[0])
  });
}
function initForm(row: any) {
  console.log(state.fields)
  FromVariablesRendererRef.value.init(state.fields, row);
}
defineExpose({ handleOpen });
</script>
<style lang="scss" scoped></style>
