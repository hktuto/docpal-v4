<script lang="ts" setup>


const emits = defineEmits(['delete', 'refreshSetting'])
const { t } = useI18n()

const props = withDefaults(defineProps<{
  setting?: any
  hideSetting?: boolean
}>(), {
  setting: {
    path: '/',
    home: {
      homeRouteItem: '/',
      secondId: '/'
    }
  },
  hideSetting: true
})

const tableRef = ref()

const { cardRef, settingRef, refresh, loading } = useDashboardCard({
  props,
})

async function handleDelete() {
  emits('delete')
}

function handleRefresh(data: any) {
  emits('refreshSetting', data)
  console.log('handleRefresh222', JSON.stringify(props.setting))
}
</script>

<template>
  <DashboardCard
    ref="cardRef"
    v-loading="loading"
    class="dp-dashboard--card__padding"
    :settingRef="settingRef"
    :hideSetting="hideSetting"
    :title="setting.name || $t('dashboard.Browse')"
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
