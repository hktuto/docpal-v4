<script lang="ts" setup>
const routerProvider = inject(MenuRouterKey)

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
  routerProvider?.navigateTo(navigateToTemplatePage())
}
</script>

<template>
  <ElDialog v-model="opened" :show-close="false" :before-close="handleClose">
    <DocTemplateNewDocumentForm ref="formRef" :title="title" @submit="handleSubmit" @close="handleClose" />
  </ElDialog>
</template>
