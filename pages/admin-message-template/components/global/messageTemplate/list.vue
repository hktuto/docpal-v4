<script lang="ts" setup>
import {
    MessageTemplateProviderKey,
    newMessageTemplateDetailPageRoute,
    newMessageTemplateTemplatePageRoute
} from '~/utils/messageTemplateHelper'
import { adminApi } from 'api';
import {ElNotification} from "element-plus";

const routerProvider = inject(MenuRouterKey)

const tableRef = ref();
const newTemplateRef = ref();
const duplicateTemplateRef = ref();
const deleteDialogRef = ref();

provide(MessageTemplateProviderKey, {
    getListApi: (params:any) => adminApi.api.postMessageTemplateList(params),
    openDetail: (row:any) => {
        const tabItem = newMessageTemplateDetailPageRoute(row)
        routerProvider?.navigateTo(tabItem)
    },
    openTemplate: (row:any) => {
        const tabItem = newMessageTemplateTemplatePageRoute(row)
        routerProvider?.navigateTo(tabItem)
    },
    duplicate: (row:any) => {
        // open duplicate dialog
        duplicateTemplateRef.value?.open(row)
    },
    delete: async(row:any) => {
        // call delete api
        deleteDialogRef.value?.open(row)
    }
})

</script>


<template>
    <div class="pageContainer">
        <MessageTemplateTable ref="tableRef" >
            <template #toolbar_buttons>
                <ElButton type="primary" @click="newTemplateRef.open()">New Template</ElButton>
            </template>
        </MessageTemplateTable>
        <MessageTemplateNewDialog ref="newTemplateRef"  />
        <MessageTemplateDuplicateDialog ref="duplicateTemplateRef" />
        <MessageTemplateDeleteDialog ref="deleteDialogRef" @success="tableRef.reload()" />
    </div>
</template>

<style lang="scss" scoped>
.pageContainer{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: var(--app-space-xs);
}
</style>