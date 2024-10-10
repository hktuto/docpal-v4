<script lang="ts" setup>
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
const pageParams = ref({
    pageNum: 0,
    pageSize: 20
})
async function getList() {
    loading.value = true
    const {data}:any = await getListFunction(pageParams.value)
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


watch(tabProvider.dialogOpened, (bool) => {
    if(!bool) {
        console.log("dialog closed")
        dialogOpened.value = false
    }
})

// #endregion

</script>

<template>
<div class="inlineListContainer">
    <AppMenuLazyLoadListItem v-for="(item, index) in entryList" :key="item.id" :item="item" @focus="focusChange(index)" :tabindex="index + 1" />
</div>
</template>