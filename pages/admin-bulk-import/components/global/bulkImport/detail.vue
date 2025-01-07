<script lang="ts" setup>
import { adminApi } from 'api';
const docTypeData = ref()
const { documentType } = defineProps<{
    documentType: string
}>()

onActivated(async() => {
    const {data:metaSettingData} = await adminApi.api.getNuxeoAdminSetting(""); 
    if(metaSettingData && metaSettingData[documentType]) {
        docTypeData.value = {
            ...metaSettingData[documentType],
            name: documentType
        }
    }
})

</script>

<template>
    <div class="pageContainer">
        <div class="metaSetting-container">
            <BulkImportInfo :docType="docTypeData" :name="documentType"></BulkImportInfo>
            <BulkImportMetaMapping :docType="docTypeData" :name="documentType"></BulkImportMetaMapping>
            <!--<BulkImportConfig></BulkImportConfig> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    position: relative;
    padding: var(--app-space-xs);
    overflow: hidden;
}
.metaSetting-container {
    display: grid;
    grid-template-columns: minmax(min-content, 200px) 1fr 1fr;
    gap: var(--app-padding);
    height: 100%;
    overflow: hidden;
}
</style>