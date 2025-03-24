<script lang="ts" setup>
import {
  MessageTemplateProviderKey,
  newMessageTemplateDetailPageRoute,
  newMessageTemplateTemplatePageRoute
} from '~/utils/messageTemplateHelper'
import {adminApi} from 'api';
import {ElMessage, ElMessageBox} from "element-plus";

const {t} = useI18n()
const routerProvider = inject(MenuRouterKey)

const tableRef = ref();
const newTemplateRef = ref();
const duplicateTemplateRef = ref();
const deleteDialogRef = ref();

function itemReload() {
  if (tableRef.value) {
    tableRef.value.reload()
  }
}

provide(MessageTemplateProviderKey, {
  getListApi: (params: any) => adminApi.api.postMessageTemplateList(params),
  openDetail: (row: any) => {
    const tabItem = newMessageTemplateDetailPageRoute(row)
    routerProvider?.navigateTo(tabItem)
  },
  openTemplate: (row: any) => {
    const tabItem = newMessageTemplateTemplatePageRoute(row)
    routerProvider?.navigateTo(tabItem)
  },
  duplicate: (row: any) => {
    // open duplicate dialog
    duplicateTemplateRef.value?.open(row)
  },
  delete: async (row: any) => {
    // call delete api
    // deleteDialogRef.value?.open(row)
    let action = await ElMessageBox.confirm(
      t('deleteDocument_msg'),
      {
        confirmButtonText: t('common_confirmDelete'),
      }
    );
    if (action !== 'confirm') return
    await adminApi.api.deleteMessageTemplateId(row.id)
    ElMessage.success(t('vxe.grid.delSuccess'))
    itemReload()
  }
})

</script>


<template>
  <div class="pageContainer">
    <MessageTemplateTable ref="tableRef">
      <template #toolbar_buttons>
        <ElButton id="MessageTemplate_NewTemplate" type="primary" @click="newTemplateRef.open()">
          {{ $t('messageTemplate_Create') }}
        </ElButton>
      </template>
    </MessageTemplateTable>
    <MessageTemplateNewDialog ref="newTemplateRef" @success="itemReload"/>
    <MessageTemplateDuplicateDialog ref="duplicateTemplateRef" @success="itemReload"/>
  </div>
</template>

<style lang="scss" scoped>
.pageContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding: var(--app-space-xs);
}
</style>