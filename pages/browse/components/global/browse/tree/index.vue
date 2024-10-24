<script lang="ts" setup>
import VirTree from '@ysx-libs/vue-virtual-tree';
import type { TreeNodeOptions, BaseTreeNode } from '@ysx-libs/vue-virtual-tree';
import '@ysx-libs/vue-virtual-tree/style.css';
import {clientApi} from 'api'

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}

const loading = ref(false)
const tree = ref<TreeNodeOptions[]>([])

const virtual = ref({
    size: 26, remain: 15
})

const defaultBaseNode: BaseTreeNode = {
    key:'/',
    name:"",
    level:0,
    loading:false,
    hasChildren:true,
    showCheckbox:false,
    children:[],
    parentKey:'',
    parentKeys:[],
    origin:{
        nodeKey:'/',
        name:'',
        path:'/',
        loading:false,
    }
}

async function getChildren(node: BaseTreeNode = defaultBaseNode, callback: (children: TreeNodeOptions[]) => void ) {
    console.log("getChildren", node)
    const idOrPath = node.key as string
    const response = await clientApi.documentNuxeo.postThumbnailV2({
        idOrPath,
        pageNumber : 0,
        pageSize : 1000,
    })
    if(!response || !response.data || !response.data.entryList) {
        callback([])
    }
    if(response?.data?.entryList?.length === 0) {
        callback([])
    }
    const entryList = response?.data?.entryList || []
    const data = entryList.map((item:any) => {
        const data: TreeNodeOptions = {
            id: item.id,
            nodeKey: item.id,
            name: item.name,
            path: item.path,
            loading: false,
            expanded: false,
            isDummy:false,
            isFolder: item.isFolder,
            hasChildren: item.isFolder
        }
        
        return data;
    })
    console.log(data)
    callback(data)
}



onMounted(async () => {
    await getChildren(defaultBaseNode, (data) => {
        tree.value = data
    })
    
})


</script>

<template>
<div class="listContainer">
    <VirTree ref="virTree" :source="tree" :virtual="{ size: 26, remain: 15 }" :load-data="getChildren" >
        <template #icon="{ loading, expanded, node }">
            <Icon v-if="loading" name="tabler:loader" />
            <Icon v-else-if="expanded" name="lucide:folder-open" />
            <Icon v-else-if="node.origin.isFolder" name="lucide:folder" />
            <Icon v-else name="lucide:file" />
        </template>
        <template #node="{ node }">
            <span>{{ node.origin.name }}</span>
         </template>
    </VirTree>
</div>
</template>

<style lang="scss" scoped>
.listContainer {
    height: 100%;
    overflow: hidden;
    :deep(.vir-tree){
        --virt-tree-color-node-bg: transparent;
        // --vir-tree-indent: 6px;
    }
    :deep(.vir-tree-node){
        display: flex;
        flex-flow: row nowrap;
        gap: var(--app-space-xxs);
        justify-content: flex-start;
        align-items: center;
        white-space: nowrap;
        .node-arrow.expanded{
            transform: rotate(0) !important;
        }
    }
}
</style>