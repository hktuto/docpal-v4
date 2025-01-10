<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
  >
    <div>
      <DragSelect
        layout="lr"
        itemKey="name" showDragTip
        joiner=""
        :dragList="state.list"
        :dropList="form.caseList"
      />
    </div>

    <template #footer>
      <div class="footer-grid">
        <el-button type="danger" @click="handleDelete">{{
          $t("common_delete")
        }}</el-button>
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{
          $t("common_submit")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { clientApi } from "api";
const props = defineProps(["setting"]);
const { t } = useI18n()

const emits = defineEmits(["refresh", "delete"]);

const {
  public: { endPoint },
} = useRuntimeConfig();
const state = reactive({
  loading: false,
  visible: false,
  setting: {},
  icon: "",
  list: [],
});
const form = ref({
  caseList: [],
});
async function handleSubmit() {
  try {
    state.loading = true;
    const ids = form.value.caseList.reduce((prev,item) => {
      prev.push(item.id)
      return prev
    }, [])
    emits("refresh", { caseKeys: ids }, [...form.value.caseList]);
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
    if(!setting.caseList) setting.caseList = []
    if(!setting.caseKeys) setting.caseKeys = []
    form.value.caseList = [...setting.caseList];
    state.loading = false;
    state.list = state.list.filter(item => !setting.caseKeys.includes(item.id))
  });
}
async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  emits("delete");
  state.visible = false;
}
async function getList() {
  try {
    const res = await clientApi.api.postCaseTypesPage({}).then(res => res.data)
    state.list = res?.entryList
    console.loog(state.list)
  } catch (error) {
  }
}
onMounted(() => {
  getList()
});

defineExpose({ handleOpen });
</script>
<style lang="scss" scoped>

</style>
