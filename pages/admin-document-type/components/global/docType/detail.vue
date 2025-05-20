<template>
  <div class="pageContainer--padding" backPath="/documentType">
    <div class="metaSetting-container">
      <div class="meta-setting-info">
        <div class="meta-setting-info-title">
          <div class="meta-setting-info-title-header">{{ $t('docType_documentType') }}</div>
          <div class="meta-setting-info-title-main">
            <BrowseItemIcon class="el-icon--left" :documentBasicType="state.docTypeDetail.dataType"/>
            {{ state.docTypeDetail.name }}
          </div>
        </div>
        <LanguageUnitForm ref="LanguageUnitFormRef" :lKey="state.docTypeDetail.name"/>
        <el-button id="DocumentType__Detail__Save" :loading="state.lanLoading" type="primary" @click="handleSave">
          {{ $t('common_save') }}
        </el-button>
      </div>
      <el-tabs v-model="state.activeTabName" class="dp-tabs--auto">
        <el-tab-pane :label="$t('docType_displayMeta')" name="metadata">
          <DocTypeDisplayMetaTable :docTypeDetail="state.docTypeDetail" :metadata="state.docTypeDetail.metadata"
                                   @refresh="initDocType"></DocTypeDisplayMetaTable>
        </el-tab-pane>
        <el-tab-pane :label="$t('docType_relatedDocument')" name="related">
          <DocTypeRelatedTypeTable :docTypeDetail="state.docTypeDetail" :name="name"></DocTypeRelatedTypeTable>
        </el-tab-pane>
      </el-tabs>
      <!-- <MetaInfo :docTypeDetail="state.docTypeDetail"></MetaInfo> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'
import {adminApi} from 'api';
// const { getLanguageListStore } = useLanguage()
const {name} = defineProps<{
  name: string;
}>();
const state = reactive({
  docTypeDetail: {},
  lanLoading: false,
  activeTabName: 'metadata'
})
const LanguageUnitFormRef = ref()

async function handleSave() {
  state.lanLoading = true
  await LanguageUnitFormRef.value.handleSubmit()
  state.lanLoading = false
}

async function initDocType() {
  state.docTypeDetail = await adminApi.api.getDocpaltypeSettingsNameName(name).then(res => res.data)
}

onMounted(async () => {
  initDocType()
})
</script>

<style lang="scss" scoped>
.dp-tabs--auto {
  height: 100%;
  overflow: hidden;

  .el-tab-pane {
    height: 100%;
  }
}

.metaSetting-container {
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-xs);
  height: 100%;
  overflow: hidden;
}

.meta-setting-info {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  gap: calc(var(--app-space-xs) * 2);
  align-items: end;
  margin-bottom: var(--app-space-xs);

  &-title {
    display: grid;
    grid-template-rows: min-content min-content;
    justify-content: space-between;

    &-header {
      text-wrap: nowrap;
      line-height: 22px;
      margin-bottom: 8px;
    }

    &-main {
      display: flex;
      line-height: 34px;
      align-items: center;
      text-wrap: nowrap;
    }
  }
}

</style>