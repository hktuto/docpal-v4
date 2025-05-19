<script lang="ts" setup>

const {defaultOpened = false} = defineProps<{
  defaultOpened: boolean
}>()

const opened = ref(defaultOpened)
const formRef = ref()

const emits = defineEmits(['submit'])

function handleSubmit(newDoc:any){
  emits('submit', newDoc);
  opened.value = false;
}

</script>


<template>
  <ElDialog v-model="opened" >
    <DocTemplateNewDocumentForm ref="formRef" @submit="handleSubmit" />
  </ElDialog>
</template>
