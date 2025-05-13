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
  <ElCard ref="cardRef" class="dashboard-item dashboard-item-card">
    <slot name="header">
      <div class="flex-x-end">
        <h4 v-if="title">{{ title }}</h4>
        <slot name="title-extent"></slot>

        <SvgIcon v-if="!hideSetting" class="" src="/icons/setting.svg" @click="openSetting" />
        <SvgIcon v-if="!hideSetting" class="setting--icon" src="/icons/delete.svg" @click="handleDelete" />
      </div>
    </slot>
    <el-skeleton v-if="showSkeleton" :rows="5"> </el-skeleton>
    <slot v-else></slot>
  </ElCard>
</template>

<style lang="scss" scoped>
.settingIcons {
  font-size: var(--app-font-size-l);

  > * {
    cursor: pointer;
  }
}
svg {
  --icon-size: 12px;
}
h4 {
  padding: unset;
  margin: unset;
}
</style>
