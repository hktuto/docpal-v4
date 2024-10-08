<script setup lang="ts">
import {addTabInCurrentPanel} from '#imports'
const { item } = defineProps<{
    item:TabItem
}>()
const dialogOpened = defineModel<boolean>('dialogOpened', { required: true })
function open(){
    dialogOpened.value = true
}

function openInTab(){
    console.log(item)
    addTabInCurrentPanel({...item})
    dialogOpened.value = false
}

defineExpose({
    open
})
</script>

<template>
    <ElDialog v-model="dialogOpened" :show-close="false"  @close="dialogOpened = false" height="90%" :modal="false" :draggable="true">
        <template #header="{ close, titleId, titleClass }">
            <div class="header">
               <div class="label"> {{ item.label }}</div>
               <div class="action">
                    <Icon name="lucide:columns-2" class="action" @click="openInTab" />
                    <Icon name="lucide:x" class="action" @click="close" />
               </div>
            </div>
        </template>
   
        <div class="dialogContainer">
            
            <Transition>
                <KeepAlive>
                    <Suspense>
                        <component :is="item.component" :tab="item" v-bind="item.props"/>
                        <template #fallback>
                            <LoadingBgInline />
                        </template>
                    </Suspense>
                </KeepAlive>
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