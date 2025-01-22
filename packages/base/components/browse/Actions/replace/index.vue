<template>
  <BrowseActionsButton :label="$t('tip.replace')" >
    
    <SvgIcon :src="'/icons/replace.svg'" :content="$t('tip.replace')" round :svg-class="`dp-svg-icon`"
                class="cursorPointer headerIcons" 
        @click="handleOpenReplaceDialog(doc)"/>
    </BrowseActionsButton>
    <BrowseActionsReplaceDialog ref="BrowseActionsReplaceDialogRef" 
        @update="emits('success')"/>
</template>

<script lang="ts" setup>
import {GetDocumentOCRStatus, replaceFileDocumentApi} from 'dp-api'
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{doc:any}>();
const emits = defineEmits(['success'])
const BrowseActionsReplaceDialogRef = ref()
async function handleOpenReplaceDialog(doc:any) {
    // check is the doc OCR status is pending
    const status = await GetDocumentOCRStatus(doc.id);
    if(status !== "FINISH") {
        // Need to update user menu
        ElMessage({
            message: t('dpTip_ocrStatusError') as string,
            type: 'warning'
        })
        return; 
    }
    BrowseActionsReplaceDialogRef.value.handleOpen(doc)
}
</script>

<style lang="scss" scoped>
</style>
