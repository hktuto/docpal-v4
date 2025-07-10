<script lang="ts" setup>

const { defaultOpened = false, title } = defineProps<{
  defaultOpened: boolean,
  title?: string
}>()

const opened = ref(defaultOpened)
const formRef = ref()

const emits = defineEmits(['submit'])

function handleSubmit(newDoc: any) {
  emits('submit', newDoc)
  opened.value = false
}

function handleClose() {
}
</script>

<template>
  <ElDialog v-model="opened">
    <DocTemplateNewDocumentForm ref="formRef" :title="title" @submit="handleSubmit" />
  </ElDialog>
</template>
