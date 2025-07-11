<script lang="ts" setup>

const { defaultOpened = false, title } = defineProps<{
  defaultOpened: boolean,
  title?: string
}>()

const opened = ref(defaultOpened)
const formRef = ref()

const emits = defineEmits(['submit', 'wordDialogClose'])

function handleSubmit(newDoc: any) {
  emits('submit', newDoc)
  opened.value = false
}

function handleClose() {
  if (title) {
    emits('wordDialogClose')
    opened.value = false
  }
}
</script>

<template>
  <ElDialog v-model="opened" :show-close="false">
    <DocTemplateNewDocumentForm ref="formRef" :title="title" @submit="handleSubmit" @close="handleClose" />
  </ElDialog>
</template>
