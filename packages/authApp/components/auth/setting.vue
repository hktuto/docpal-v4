<script lang="ts" setup>
import { getUserPreference } from '#imports'
import { EventType, useEventBus } from 'eventbus'
import { clientApi } from 'api'

const tabProvider = inject(TabManagerKey)
const opened = ref(false)
const userPreference = useUserPreference()
const { public: { platform } } = useRuntimeConfig()
const { t } = useI18n()
const state = reactive({
  visible: false
})

function handleOpen() {
  console.log('handleOpen')
  if (platform === 'admin') {
    state.visible = true
    const newItem: any = {
      id: 'admin-user-setting',
      name: 'admin-user-setting',
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
}

async function reset() {
  opened.value = false
  await getUserPreference()
  updateStyle()
}

async function saveToServer() {
  clientApi.api.putUserSetting(userPreference.value as any)
  opened.value = false
}

function updateStyle() {
  // step 1 : get HTML element
  const htmlElement = document.querySelector('html')
  if (!htmlElement) return
  // step 2 : set style
  htmlElement.style.fontSize = fontSize.value + 'px'
  // set html light or dark mode class
  if (!userPreference.value || userPreference.value.color === 'light') {
    htmlElement.classList.remove('dark')
    // set data-vxe-ui-theme attr
    htmlElement.setAttribute('data-vxe-ui-theme', 'light')
  } else {
    htmlElement.classList.add('dark')
    htmlElement.setAttribute('data-vxe-ui-theme', 'dark')
  }
}

const fontSize = computed({
  get() {
    if (!userPreference.value || !userPreference.value.size) {
      return 16
    } else {
      const fontSize = userPreference.value.size
      return Number(fontSize.replaceAll('px', ''))
    }
  },
  set(value) {
    if (!userPreference.value) return
    userPreference.value.size = value + 'px'
    updateStyle()
  }
})

const colorMode = computed({
  get() {
    if (!userPreference.value || !userPreference.value.color) {
      return true
    } else {
      return userPreference.value.color === 'light'
    }
  },
  set(value) {
    userPreference.value.color = value ? 'light' : 'dark'
    console.log('udpate color', value, userPreference.value.color)
    updateStyle()
  }
})

const bus = useEventBus(EventType.OPEN_SETTINGS)
bus.on(handleOpen)
const userLoginBus = useEventBus(EventType.USER_LOGIN__SUCCESS)
userLoginBus.on(updateStyle)
onUnmounted(() => {
  bus.off(handleOpen)
  bus.off(updateStyle)
})

</script>


<template>
  <el-dialog v-model="state.visible" :title="t('Edit Field')" width="1000px">
    <SettingUserSetting />
  </el-dialog>
</template>
