<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t("dashboard.PersonalShareInternalMe") }}</h4>
      <Icon  v-show="!hideSetting" name="material-symbols:delete-rounded" class="normal cursor-pointer"  @click="handleDelete"></Icon>
    </template>
    <PersonalShareInternalMeTable />
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
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
</script>
<style lang="scss" scoped></style>
