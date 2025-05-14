<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
const emits = defineEmits(['delete', 'refreshSetting', 'openSetting'])
const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    showSkeleton: boolean
    hideSetting: boolean
    title: string
    settingRef: any
    setting: any
  }>(),
  {
    showSkeleton: false,
    hideSetting: false,
    title: 'title'
  }
)

function resize() {}

function openSetting() {
  console.log(props.settingRef, props.setting)

  if (!!props.settingRef) props.settingRef.handleOpen(props.setting)
  else emits('openSetting', props.setting)
}

async function handleDelete() {
  const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  emits('delete')
}

defineExpose({
  resize
})
</script>

<template>
  <ElCard ref="cardRef" class="dp-dashboard--card">
    <template #header>
      <slot name="header">
        <h4 v-if="title">
          {{ title }}
          <slot name="title_suffix"></slot>
        </h4>

        <div class="flex-x-end">
          <SvgIcon v-if="!hideSetting" class="" src="/icons/setting.svg" @click="openSetting" />
          <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg" @click="handleDelete" />
        </div>
      </slot>
    </template>
    <el-skeleton v-if="showSkeleton" :rows="5"> </el-skeleton>
    <slot v-else></slot>
  </ElCard>
</template>

<style lang="scss" scoped>
.el-card {
  height: 100%;
}
:deep .el-card__header {
  margin: 0;
  --icon-size: 16px;
  --icon-color: var(--app-grey-525);
  padding: var(--app-space-s) var(--app-space-s) 0 var(--app-space-s) !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: unset;
  .svgIcon + .svgIcon {
    margin-left: var(--app-space-xxs);
  }
}
.dp-dashboard--card__padding {
  :deep .el-card__body {
    padding: var(--el-card-padding)
  }
  :deep .el-card__header {
    padding: var(--el-card-padding) !important
  }
}
:deep .el-card__body {
  padding: 0;
  margin: 0 auto;
  width: 100%;
}
:deep h4 {
  padding: unset;
  margin: unset;
}
</style>
