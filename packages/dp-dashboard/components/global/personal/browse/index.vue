<script lang="ts" setup>
import { BrowseTablePage, PersonalBrowseSetting } from '#components'

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
  home: [],
  commentId: '',
  setting: {},
  hideSetting: true,
})

const state = reactive({
  path: '/Domain'
})

const tableRef = ref()

const { cardRef, settingRef, refresh, loading } = useDashboardCard({
  props,
  handleRefreshAction: (setting: any) => {
    // tableRef.value.query({})
  }
})

async function handleDelete() {
  emits('delete')
}

function handleRefresh(data: any) {
  state.path = data.path
  refresh()
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
    <BrowseTablePage ref="tableRef" :idOrPath="state.path" />
    <PersonalBrowseSetting ref="settingRef" :path="state.path" @refresh="handleRefresh" />
  </DashboardCard>
</template>

<style scoped lang="scss">

</style>
