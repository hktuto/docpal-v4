<script setup lang="ts">
import { ElNotification } from 'element-plus'
const nuxtApp = useNuxtApp()
const { t } = useI18n()
// app:manifest:update'
nuxtApp.hooks.hook('app:manifest:update', () => {
  setTimeout(() => {
    showUpdateToast()
  }, 3000)
})


function showUpdateToast() {
  ElNotification({
    title: 'HTML String',
    dangerouslyUseHTMLString: true,
    message: `<strong>${t('appVersionUpdate.title')}</strong><br/><button class="el-button el-button--primary" onclick="window.location.reload()">${t('appVersionUpdate.button')}</button>`,
    duration: 0,
  })
}




</script>

<template>
</template>
