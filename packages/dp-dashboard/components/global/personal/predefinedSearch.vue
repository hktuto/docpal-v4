<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t("dashboard.PersonalPredefinedSearch") }}</h4>
      <SvgIcon
        v-if="!hideSetting"
        src="/icons/delete.svg"
        style="--icon-size: 1.14rem; --icon-color: red"
        @click="handleDelete"
      />
    </template>
    <PersonalPredefinedSearchTable />
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
const { t } = useI18n()
const emits = defineEmits(['delete'])
const props = withDefaults( defineProps<{
    dates?: any;
    setting?: any;
    hideSetting?: boolean,
}>() , {
    setting: {},
    hideSetting: false
})
async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t("msg_confirmWhetherToDelete")}`);
  if (action !== "confirm") return;
  emits("delete");
}
function resize() {
}

defineExpose({ resize });
</script>
<style lang="scss" scoped></style>
