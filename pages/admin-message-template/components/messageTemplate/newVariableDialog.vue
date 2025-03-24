<script setup lang="ts">

const dialogVisible = ref(false)

const newVariable = ref("");
const emits = defineEmits(['added'])

function open() {
  newVariable.value = ""
  dialogVisible.value = true
}

function submit() {
  emits('added', newVariable.value)
  dialogVisible.value = false
}

defineExpose({
  open
})
</script>

<template>
  <ElDialog v-model="dialogVisible" append-to-body>
    <ElForm label-position="top">
      <ElFormItem label="Name">
        <ElInput v-model="newVariable" placeholder="Name"/>
      </ElFormItem>
    </ElForm>
    <template #footer>
        <span class="dialog-footer">
            <ElButton id="MessageTemplate__Detail__EditTemplate__Variable__Submit" type="primary" @click="submit">
              {{ $t('common_submit') }}
            </ElButton>
        </span>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">

</style>