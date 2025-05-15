<template>
  <DashboardCard
    ref="cardRef"
    class="dp-dashboard--card__padding"
    :hideSetting="hideSetting"
    :title="$t('dashboard.PersonalShareExternal')"
    @delete="handleDelete"
  >
    <PersonalShareExternalTable />
  </DashboardCard>
</template>
<script lang="ts" setup>
const emits = defineEmits(['delete'])
const props = withDefaults(
  defineProps<{
    dates?: any
    setting?: any
    hideSetting?: boolean
  }>(),
  {
    setting: {},
    hideSetting: false
  }
)

async function handleDelete() {
  emits('delete')
}
</script>
<style lang="scss" scoped></style>
