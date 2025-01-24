<script setup lang="ts">
import {adminApi} from "api";
const dialogVisible = ref(false)
const emits = defineEmits(['success'])
const templateDetail = ref()
const { t } = useI18n()
function open(row:any) {
    templateDetail.value = row
    dialogVisible.value = true
}

async function submit(){
    await adminApi.api.deleteMessageTemplateId(templateDetail.value.id)
    dialogVisible.value = false
}

defineExpose({
    open
})

</script>

<template>
<ElDialog v-model="dialogVisible" append-to-body >
    <h3 class="dialog-title">
        {{ t('deleteDocument_msg')}}
    </h3>
    <template #footer>
        <span class="dialog-footer">
            <ElButton @click="dialogVisible = false">Cancel</ElButton>
            <ElButton type="primary" @click="submit">Submit</ElButton>
        </span>
    </template>
</ElDialog>
</template>

<style scoped lang="scss">

</style>