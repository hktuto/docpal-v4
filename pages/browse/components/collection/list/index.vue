<script lang="ts" setup>
import {useActiveElement, useMagicKeys, whenever} from '@vueuse/core'
import { clientApi } from 'api'
import { logicAnd } from '@vueuse/math'

const tabProvider = inject(TabManagerKey)
if(!tabProvider) {
    throw createError('tab manger not found')
}
const focusIndex = ref<number>(0);
const activeElement = useActiveElement()

const { up, down, space, enter} = useMagicKeys()

const dialogOpened = ref(false)
const isFocusWithin = computed(() => {
    return (tabProvider?.dialogOpened.value || activeElement.value?.parentElement?.classList.contains('inlineListContainer'))
})

function opendDialog(item:any) {
    const tabData = {
        id: item.id,
        label: item.name,
        icon: 'tabler:bookmark-filled',
        component:'LazyCollectionDetail',
        props:{
            collectionId: item.id
        }
    }
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
   if(!focusIndex.value || focusIndex.value > entryList.value.length - 1) {
    focusIndex.value = 0
   }else{
    focusIndex.value += 1
   }
   if(tabProvider?.dialogOpened.value) {
        opendDialog(entryList.value[focusIndex.value])
   }
})

whenever(logicAnd(space, isFocusWithin), async () => {
    console.log("focusWithin space",tabProvider?.dialogOpened.value )
    if(!tabProvider?.dialogOpened.value) {
        opendDialog(entryList.value[focusIndex.value])
    }else{
        console.log("space, close dialog")
        tabProvider?.closeDialog()
    }
})

whenever(logicAnd(enter, isFocusWithin), async () => {
    console.log("enter, open dialog", tabProvider?.dialogOpened.value)
    if(tabProvider?.dialogOpened.value){

        const item = entryList.value[focusIndex.value]
        tabProvider?.closeDialog()
        const tabData:any = {
            id: item.id,
            label: item.name,
            icon: 'tabler:bookmark-filled',
            component:'LazyCollectionDetail',
            props:{
                collectionId: item.id
            }
        }
        addTabInCurrentPanel(tabData)
    }
})


const query = ref({
    currentPageIndex: 0,
    pageSize: 10,
})
const { data, refresh, pending } = useAsyncData('collection-menu', () => clientApi.collectionNuxeo.getCollection({
    currentPageIndex: 0,
    pageSize: 20,
}))

const entryList = computed(() => {
    return data.value?.data?.entryList || []
})


function focusChange(index:number) {
    focusIndex.value = index
}

</script>

<template>
    <ul class="inlineListContainer">
        <CollectionListItem v-for="(item, index) in entryList" :key="item.id" :item="item" :selected="index === focusIndex"  @focus="focusChange(index)" :tabindex="index + 1"/>
    </ul>
</template>


<style scoped lang="scss">
.inlineListContainer{
    display: flex;
    flex-flow: column nowrap;
    gap: 0;
    justify-content: flex-start;
    align-items: flex-start;
    list-style: none;
    padding: 0;
    margin:0;
    &:focus-within{
        outline: none;
    }
}
</style>