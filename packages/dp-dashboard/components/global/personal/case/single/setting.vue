<template>
  <el-dialog
    v-model="state.visible"
    :title="$t('dashboard.setting')"
    class="scroll-dialog"
    append-to-body
    :close-on-click-modal="false"
  >
    <FormRenderer ref="FormRendererRef" :form-json="formJson" />
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
import formJson from './setting.vform.json'
const emits = defineEmits(["refresh", "delete"]);
const { t } = useI18n()

const state = reactive({
  loading: false,
  visible: false,
  setting: {},
});
const FormRendererRef = ref();
async function handleSubmit() {
  state.loading = true;
  try {
    const data = await FormRendererRef.value.getFormData();
    emits("refresh", structuredClone(toRaw(data)));
  } catch (error) {
    state.loading = false;
  }
  state.visible = false;
  state.loading = false;
}
function handleOpen(setting) {
  state.visible = true;
  setTimeout(async () => {
    state.setting = setting;
    await FormRendererRef.value.vFormRenderRef.setFormData(setting);
    state.loading = false;
  });
}

defineExpose({ handleOpen });
</script>
<style lang="scss" scoped></style>
