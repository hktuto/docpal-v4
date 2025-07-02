<script lang="ts" setup>
import { EventType, useEventBus } from 'eventbus'

const tabProvider = inject(TabManagerKey)
const { public: { platform } } = useRuntimeConfig()

function handleOpen() {
  console.log('handleOpen')
  try {
    if (platform === 'admin') {
      const newItem: any = {
        id: 'admin-setting',
        name: 'admin-setting',
        icon: 'lucide:user',
        label: 'admin.setting.title',
        component: 'SettingUserSetting',
        props: {}
      }
      tabProvider?.openInCurrentTab(newItem)
    } else {
      const newItem: any = {
        id: 'client-user-setting',
        name: 'client-user-setting',
        icon: 'lucide:user',
        label: 'admin.setting.title',
        component: 'Setting',
        props: {}
      }
      tabProvider?.openInCurrentTab(newItem)
    }
  } catch (e) {
    console.log(e)
  }
}

const bus = useEventBus(EventType.OPEN_SETTINGS)
bus.on(handleOpen)
onUnmounted(() => {
  bus.off(handleOpen)
})

</script>


<template>

</template>
