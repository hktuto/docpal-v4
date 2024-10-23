<script lang="ts" setup>
 import { VirtList } from 'vue-virt-list';
import {useActiveElement, useMagicKeys, whenever} from '@vueuse/core'
import {TabManagerKey } from '#imports'
import { logicAnd } from '@vueuse/math'
import { onMounted } from 'vue';

const { getListFunction, listResultMappingFunction, generatePreviewData, generatePageData } = defineProps<{
    getListFunction: (param:any) => Promise<any>,
    listResultMappingFunction: (data:any) => any[],
    generatePreviewData: (item:any) => any,
    generatePageData:(item:any) => any,
}>()

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
// #region list setup

const entryList = ref<any[]>([])
const loading = ref(false)
const totalSize = ref(0)
const pageParams = ref({
    pageNum: 0,
    pageSize: 20
})
async function getList() {
    loading.value = true
    const {data}:any = await getListFunction(pageParams.value)
    totalSize.value = data.totalSize
    if(!data && !data.entryList) {
        throw createError('data not found')
    }
    const list = await listResultMappingFunction(data)
    entryList.value.push(...list)
    pageParams.value.pageNum = (Number(pageParams.value.pageNum) + 1) || 0
    loading.value = false
}

onMounted(async() => {
    await getList()
})
// #endregion

// #region focus setup
const focusIndex = ref<number>(0);
const activeElement = useActiveElement()

const { up, down, space, enter} = useMagicKeys()
const dialogOpened = ref(false)
const isFocusWithin = computed(() => {
    return (tabProvider?.dialogOpened.value || activeElement.value?.parentElement?.classList.contains('inlineListContainer'))
})

function opendDialog(item:any) {
    const tabData = generatePreviewData(item)
    tabProvider?.openNewDialog(tabData)
}


whenever(logicAnd(up, isFocusWithin), () => {
   if(!focusIndex.value || focusIndex.value === 0) {
    focusIndex.value = entryList.value.length - 1
   }else{
    focusIndex.value -= 1
   }
   if(tabProvider?.dialogOpened.value) {
        opendDialog(entryList.value[focusIndex.value])
   }
})

whenever(logicAnd(down, isFocusWithin), () => {
   if(focusIndex.value === entryList.value.length - 1) {
    focusIndex.value = 0
   }else{
    focusIndex.value += 1
   }
   if(tabProvider?.dialogOpened.value) {
        opendDialog(entryList.value[focusIndex.value])
   }
})

whenever(logicAnd(space, isFocusWithin), async () => {
    
    if(!tabProvider?.dialogOpened.value) {
        opendDialog(entryList.value[focusIndex.value])
        dialogOpened.value = true
    }else{
        console.log("space, close dialog")
        tabProvider?.closeDialog()
        dialogOpened.value = false
    }
})

whenever(logicAnd(enter, isFocusWithin, dialogOpened), () => {
    if(tabProvider?.dialogOpened.value){

        const item = entryList.value[focusIndex.value];
        tabProvider?.closeDialog();
        const data = generatePageData(item);
        addTabInCurrentPanel(data)
    }
})

function focusChange(index:number) {
    focusIndex.value = index
}

function itemClick(tabindex:number) {
    focusIndex.value = tabindex
    if(!dialogOpened.value) {
        opendDialog(entryList.value[tabindex])
    }
}


watch(tabProvider.dialogOpened, (bool) => {
    if(!bool) {
        dialogOpened.value = false
    }
})

// #endregion


// #region filter list

function loadMore() {
    if(entryList.value.length < totalSize.value) {
        pageParams.value.pageNum += 1
        getList()
    }
}


// #endregion

</script>

<template>
    <div class="listCont">

     <VirtList itemKey="id" 
        :list="entryList" 
        :buffer="10"
        :minSize="20"
        @toBottom="loadMore"
        >
        <template #default="{ itemData, index }">
           
            <AppMenuLazyLoadListItem :item="itemData" :selected="index === focusIndex"  :index="index" :tabindex="index + 1" @itemClick="itemClick" @focus="focusChange(index)"/>
        </template>
     </VirtList>
    </div>

</template>


<style lang="scss" scoped>
.listCont{
    height: 200px;
    overflow: hidden;
}
.item{
    height: 20px;
}

</style>
