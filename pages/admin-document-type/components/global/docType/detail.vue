<template>
  <div class="pageContainer--padding" backPath="/documentType">
    <div class="metaSetting-container">
      <div class="meta-setting-info">
        <BrowseItemIcon style="--icon-size: 80px" class="meta-setting-info-icon el-icon--left" :documentBasicType="state.docTypeDetail.dataType" />
        <el-form label-position="top" class="meta-setting-info-form">
          <el-form-item :label="$t('search.type')">
            <el-input
              v-model="state.form.docpalTypeName"
              @input="handleInput('docpalTypeName')"
              @keyup.enter="handleSubmit('docpalTypeName')"
              :disabled="state.loading"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('docType.category')">
            <el-select v-model="state.form.category" :disabled="state.loading" filterable @change="handleSubmit('category')">
              <el-option v-for="item in categoryOpts" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('doc.isFolder')">
            <el-switch
              v-model="state.form.isFolder"
              :active-text="$t('el.popconfirm.confirmButtonText')"
              :inactive-text="$t('el.popconfirm.cancelButtonText')"
              @change="handleSubmit('isFolder')"
              :disabled="state.loading"
            />
          </el-form-item>
        </el-form>
        <LanguageUnitForm ref="LanguageUnitFormRef" class="meta-setting-info-language" :lKey="name" />
      </div>
      <el-tabs v-model="state.activeTabName" class="dp-tabs--auto">
        <el-tab-pane :label="$t('docType_displayMeta')" name="metadata">
          <DocTypeDisplayMetaTable :documentType="name" :id="id" @refresh="initDocType" @updateDetail="initDocType"></DocTypeDisplayMetaTable>
        </el-tab-pane>
        <!-- <el-tab-pane :label="$t('docType_relatedDocument')" name="related">
          <DocTypeRelatedTypeTable :docTypeDetail="state.docTypeDetail" :name="name"></DocTypeRelatedTypeTable>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
import { useDebounceFn } from '@vueuse/core'
// const { getLanguageListStore } = useLanguage()
const { name, id } = defineProps<{
  name: string
  id: string
}>()
const { categoryOpts } = useDocumentTypeOptioins()
const { t } = useI18n()

const state = reactive({
  docTypeDetail: {},
  lanLoading: false,
  activeTabName: 'metadata',
  form: {
    docpalTypeName: '',
    category: '',
    isFolder: false
  }
})

async function initDocType(detail: any) {
  state.docTypeDetail = {
    docpalTypeName: detail.docpalTypeName,
    category: detail.category,
    isFolder: detail.isFolder === 'Yes',
    dataType: detail.dataType
  }
  setTimeout(() => {
    state.form = {
      docpalTypeName: detail.docpalTypeName,
      category: detail.category,
      isFolder: detail.isFolder === 'Yes'
    }
  }, 100)
}
const handleInput = useDebounceFn(
  (attr: string) => {
    handleSubmit(attr)
  },
  1000,
  {
    maxWait: 3000
  }
)
async function handleSubmit(attr: string) {
  if (attr === 'isFolder' && state.form.isFolder === state.docTypeDetail.isFolder) return
  try {
    state.loading = true
    const params = {
      name: state.form.docpalTypeName,
      category: state.form.category,
      isFolder: state.form.isFolder,
      id
    }
    let tip = ''
    if (attr) {
      const i18nMap = {
        docpalTypeName: t('search.type'),
        category: t('docType.category'),
        isFolder: t('doc.isFolder')
      }
      const i18nValue = attr === 'isFolder' ? (state.form.isFolder ? 'Yes' : 'No') : state.form[attr]
      tip = '[' + i18nMap[attr] + ':' + i18nValue + ']'
    }
    const res = await adminApi.api.postDocpaltypeSettingsDocpalTypeV2Update(params)
    state.docTypeDetail[attr] = params[attr]
    ElMessage.success(t('dpMsg_success', { tip }))
  } catch (error) {
    console.error(error)
    state.form[attr] = state.docTypeDetail[attr]
  } finally {
    state.loading = false
  }
}
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
  gap: calc(var(--app-space-xs) * 2);
  margin-bottom: var(--app-space-xs);
  grid-template-columns: min-content 1fr;
  grid-template-rows: repeat(2, min-content);
  grid-column-gap: var(--app-space-s);
  grid-row-gap: 0px;
  align-items: center;
  &-icon {
    grid-area: 1 / 1 / 3 / 2;
  }
  &-form {
    grid-area: 1 / 2 / 2 / 3;
  }
  &-language {
    grid-area: 2 / 2 / 3 / 3;
  }
}
.meta-setting-info-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--app-space-xs);
}
</style>
