<script setup lang="ts">
import {addTabInCurrentPanel} from '#imports'
const { item } = defineProps<{
    item:{tabData:TabItem, previewData:TabItem}
}>()
const dialogOpened = defineModel<boolean>('dialogOpened', { required: true })
function open(){
    dialogOpened.value = true
    openInTab();
}

function openInTab(){
    console.log("open in tab", item)
    addTabInCurrentPanel(item.tabData)
}

defineExpose({
    open
})
</script>

<template>
    <ElDialog v-model="dialogOpened" :show-close="false"  @close="dialogOpened = false" height="90%" :modal="false" :draggable="true">
        <template #header="{ close, titleId, titleClass }">
            <div class="header">
               <div class="label"> {{ item.previewData.label }}</div>
               <div class="action">
                    <Icon name="lucide:columns-2" class="action" @click="() => {openInTab(), close()}" />
                    <Icon name="lucide:x" class="action" @click="close" />
               </div>
            </div>
        </template>
   
        <div class="dialogContainer">
            
            <Transition>
                <Suspense>
                    <component :is="item.previewData.component" :tab="item" v-bind="item.previewData.props"/>
                    <template #fallback>
                        <LoadingBgInline />
                    </template>
                </Suspense>
            </Transition>
        </div>
</ElDialog>
</template>

<style scoped lang="scss">
.header{
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-block: var(--app-space-xs);
    gap:var(--app-space-xs);
    cursor: pointer;
    .label{
        flex: 1 0 auto;
    }
    .action{
        flex: 0 0 auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        font-size: var(--app-font-size-s);
    }
}

</style>