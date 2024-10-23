<script lang="ts" setup>
import {clientApi} from 'api'
 import { VirtTree  } from 'vue-virt-list';
 import 'vue-virt-list/lib/assets/tree.css';

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
type NodeData = {
    id: string,
    name: string,
    path: string,
    loading: boolean,
    isFolder: boolean,
    isDummy: boolean,
    expanded?: boolean,
    selected?: boolean,
    pageSize?: number,
    pageNumber?: number,
    children?: NodeData[]
}
const loading = ref(false)
const tree = ref<NodeData[]>([])


async function getChildren(idOrPath:string = '/', pageNumber=0, pageSize=2147483647, parentPath:string[]=[]) {
    const response = await clientApi.documentNuxeo.postThumbnailV2({
        idOrPath,
        pageNumber,
        pageSize
    })
    if(!response || !response.data || !response.data.entryList) {
        throw createError('data not found')
    }
    if(response?.data?.entryList.length === 0) {
        return
    }
    const entryList = response?.data?.entryList || []
    const items:NodeData[] = entryList.map((item:any) => {
        const data: NodeData = {
            id: item.id,
            name: item.name,
            path: item.path,
            loading: false,
            expanded: false,
            isDummy:false,
            isFolder: item.isFolder,
        }
        if(item.isFolder){
            data.children = [
                {
                    id: new Date().getTime().toString(),
                    name: "..",
                    path: item.path,
                    loading: false,
                    expanded: false,
                    isFolder: false,
                    isDummy: true
                }
            ]
        }
        return data;
    })
    if(tree.value.length === 0) {
        tree.value = items
    } else {
        
    }
}

async function onExpand(data: NodeData, expandedInfo: any) {
    console.log('onExpand', data, expandedInfo)
    // check if the node is a dummy node
}

onMounted(() => {
    getChildren()
})


</script>

<template>
<div class="listContainer">
    <VirtTree
        ref="virtTreeRef"
        :list="tree"
        :showLine="true"
        :indent="20"
         :fieldNames="{
            key: 'id',
         }"
        expandOnClickNode
        @expand="onExpand"
    >
        <template #icon>
          <div style="height: 16px; width: 16px">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              class="arco-icon arco-icon-down"
              stroke-width="4"
              stroke-linecap="butt"
              stroke-linejoin="miter"
            >
              <path d="M39.6 17.443 24.043 33 8.487 17.443"></path>
            </svg>
          </div>
        </template>
        <template #content="{ node }">
          <div>
            <span> {{ node.data.name }}</span>
          </div>
        </template>
    </VirtTree>
</div>
</template>

<style lang="scss" scoped>
.listContainer {
    height: 400px;
    overflow: hidden;
    :deep(.virt-tree-item){
        --virt-tree-color-node-bg: transparent;
    }
}
</style>