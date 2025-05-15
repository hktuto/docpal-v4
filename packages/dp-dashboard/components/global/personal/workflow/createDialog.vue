<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
  >
    <div style="height: 50vh;overflow: hidden;">
      <DragSelect
        layout="lr"
        itemKey="name" showDragTip
        joiner=""
        :dragList="state.workflowAList"
        :dropList="form.workflowList"
      />
    </div>

    <template #footer>
      <div class="footer-grid">
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{
          $t("common_submit")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
const props = defineProps(["setting", "workflowList", "workflowAList"]);
const emits = defineEmits(["refresh", "delete"]);
const { t } = useI18n()

const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  icon: "",
  workflowAList: [],
});
const form = ref({
  workflowList: [],
});
async function handleSubmit() {
  try {
    state.loading = true;
    const keys = form.value.workflowList.reduce((prev,item) => {
      prev.push(item.key)
      return prev
    }, [])
    emits("refresh", { workflowKeys: keys }, [...form.value.workflowList]);
  } catch (error) {
  } finally {
    state.visible = false;
    state.loading = false;
  }
}
function handleOpen(setting) {
  state.visible = true;
  state.loading = true
  setTimeout(async () => {
    state.setting = setting;
    let workflowList = props.workflowList ? [...props.workflowList] : []
    if(!setting.workflowKeys) setting.workflowKeys = []
    form.value.workflowList = workflowList
    state.loading = false;
    
    state.workflowAList = props.workflowAList.filter(item => !setting.workflowKeys.includes(item.key))
  });
}
defineExpose({ handleOpen });
</script>
<style lang="scss" scoped>
</style>
