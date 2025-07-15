<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
    :fullscreen="isFullScreen"
    @close="isFullScreen = false"
  >
    <template #header>
      <div class="float-right">
        <Icon name="mdi:fullscreen" class="cursor-pointer" @click="isFullScreen = !isFullScreen" />
      </div>
    </template>
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
        <el-button type="primary" :loading="state.loading" @click="handleSubmit">{{
          $t("common_submit")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
const props = defineProps(["setting","caseList","caseAList"]);
const emits = defineEmits(["refresh", "delete"]);

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

const isFullScreen = ref(false)


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
    let caseList = props.caseList ? [...props.caseList] : []
    if(!setting.caseKeys) setting.caseKeys = []
    form.value.caseList = caseList;
    state.loading = false;
    state.list = props.caseAList.filter(item => !setting.caseKeys.includes(item.id))
  });
}

defineExpose({ handleOpen });
</script>
<style lang="scss" scoped>
.float-right{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}
</style>
