<script lang="ts" setup>
import type {VxeGrid} from 'vxe-table'
import {adminApi} from 'api';
import type {ActionPermissionParams} from '#imports';
import { newWorkflowEditorDetail } from '~/utils/workflowEditorMenu';
import type { PermissionMethodParams } from '../../../../../packages/base/composables/useVxeTable';

const { id, name, draftId, latestVersion } = defineProps<{
    id:string,
    draftId:string,
    name:string
    latestVersion:string
}>()
const workflowData = ref<any>()

const routerProvider = inject(MenuRouterKey)
if(!routerProvider ) {
    throw new Error('MenuRouterKey is not provided')
}



async function getWorkflowDetail(){
    const {data: draftData}:any = await adminApi.workflowProcessDefinitionController.getDraft(draftId)
    workflowData.value = draftData
    routerProvider?.updateTabName(draftData.name + '- versions list' )
}

function editHandler(row:any, openInNewTab = false){
    const newItem = newWorkflowEditorDetail(row)
    routerProvider?.navigateTo(newItem, openInNewTab)
}


function actionPermission({row, code }:PermissionMethodParams) : {disabled:boolean, visible:boolean}{
    const isProduction = row.isProduction === 'A'
    const isLatest = row.versionNumber === workflowData.value.latestVersion
    let result = {
        visible :true,
        disabled: true
    } 
    if(!code){
        return result
    }  
    if(code === 'edit' || code === 'edit_new_tab'){
        result.disabled = !isLatest || isProduction
    }
    if(code === 'promote_to_production'){
        result.disabled = isProduction
    }
    return result
}

onMounted(async () => {
    await getWorkflowDetail()
})


provide(WorkflowEditorVersionListProviderKey,{
    getListApi : adminApi.workflowVersionController.postPage,
    editHandler,
    actionPermission,
})

</script>

<template> 
<div class="pageContainer">
    <LazyWorkflowEditorVersionListTable ref="tableRef" :draftId="draftId" >
        <template #toolbar_buttons>
            <h2>{{ name }}</h2>
        </template>
    </LazyWorkflowEditorVersionListTable>
</div>
</template>

<style lang="scss" scoped>
h2{
    margin: 0;
}
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    overflow: hidden;
}
</style>