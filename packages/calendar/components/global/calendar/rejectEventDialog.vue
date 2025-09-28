<script setup lang="ts">

const { t } = useI18n()
const dialogShow = ref(false)

const form = ref({
  message: '',
  sendMessageToCreator: true
})

function handleStart() {


  dialogShow.value = false
}

</script>

<template>
  <el-dialog v-if="dialogShow" :title="t('Update Message')">
    <el-form>
      <el-form-item :label="t('Message')">
        <el-input v-model="form.message" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                  :placeholder="t('vxe.base.pleaseInput')" />
      </el-form-item>
      <el-form-item :label="t('Send Message to Creator')">
        <el-switch v-model="form. sendMessageToCreator" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogShow = false">{{ $t('dpButtom_cancel') }}</el-button>
      <el-button type="primary" @click="handleStart">{{ $t('dpButtom_confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>