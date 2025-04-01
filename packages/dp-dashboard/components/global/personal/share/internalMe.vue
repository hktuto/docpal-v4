<template>
  <el-card ref="cardRef" class="dashboard-item dashboard-item-card">
    <template #header="{ close, titleId, titleClass }">
      <h4>{{ $t('dashboard.PersonalShareInternalMe') }}</h4>
      <Icon id="Dashboard__Home__Detail__ShareWithMe__Delete" v-show="!hideSetting" name="material-symbols:delete-rounded" class="normal cursor-pointer"
            style="font-size: 20px" @click="handleDelete"></Icon>
    </template>
    <PersonalShareInternalMeTable />
  </el-card>
</template>
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

const emits = defineEmits(['delete'])
const props = withDefaults(defineProps<{
  dates?: any;
  setting?: any;
  hideSetting?: boolean,
}>(), {
  setting: {},
  hideSetting: false
})
const { t } = useI18n()

async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  emits('delete')
}
</script>
<style lang="scss" scoped></style>
