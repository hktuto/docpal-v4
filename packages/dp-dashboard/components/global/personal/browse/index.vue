<script lang="ts" setup>
import { BrowseTablePage, PersonalBrowseSetting } from '#components'
import { onActivated } from 'vue'

const emits = defineEmits(['delete', 'refreshSetting'])
const { t } = useI18n()

const props = withDefaults(defineProps<{
  idOrPath: string
  home?: any
  commentId?: string
  setting?: any
  hideSetting?: boolean
}>(), {
  idOrPath: '/',
  home: {},
  commentId: '',
  setting: {},
  hideSetting: true
})

const tableRef = ref()

const { cardRef, settingRef, refresh, loading } = useDashboardCard({
  props
})

async function handleDelete() {
  emits('delete')
}

function handleRefresh(data: any) {
  props.setting.path = data.path
  props.setting.home = data.home
  
  refresh()
  emits('refreshSetting', props.setting)
}
</script>

<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :settingRef="settingRef"
    :hideSetting="hideSetting"
    :title="$t('dashboard.Browse')"
    :setting="setting"
    @delete="handleDelete"
    @refresh="refresh"
  >
    <BrowseTablePage ref="tableRef" :idOrPath="props.setting.path" :home="props.setting.home" />
    <PersonalBrowseSetting ref="settingRef" :path="props.setting.path" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<style scoped lang="scss">

</style>
