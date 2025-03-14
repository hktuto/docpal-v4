<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('user_newGroup')"
    :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
    <template #footer>
      <el-button :loading="state.loading" @click="handleSubmit">{{
        $t("common_submit")
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { groupProviderKey } from "~/util/userProvider";
import formJson from "./dialog.vform.json";

const routerProvider = inject(MenuRouterKey);
const { t } = useI18n();
const groupProvider = inject(groupProviderKey);
const emits = defineEmits(["refresh"]);
const props = defineProps<{
  groups: any[];
}>();
const state = reactive({
  loading: false,
  visible: false,
});
const FormRendererRef = ref();

async function handleSubmit() {
  const data = await FormRendererRef.value.vFormRenderRef.getFormData();
  // check group name exist
  if (props.groups.some((g: any) => g.name === data.groupName || g.id === data.groupId)) {
    ElMessage.error(t("user_userGroupsIsExistsMsg"));
    return;
  }
  data.groupName = data.groupName.trim();
  state.loading = true;
  try {
    await groupProvider?.CreateGroupApi(data);
    routerProvider?.message.success(t("user_userGroupsCreatedSuccessMsg"));
    state.visible = false;
    FormRendererRef.value.vFormRenderRef.resetForm();
    emits("refresh");
  } catch (error) {}
  state.loading = false;
}

function handleOpen() {
  state.visible = true;
  setTimeout(() => {
    FormRendererRef.value.vFormRenderRef.optionData.exitGroups = props.groups.map(
      (item) => item.name
    );
  });
}

onMounted(async () => {});
defineExpose({ handleOpen });
</script>
<style lang="scss" scoped></style>
