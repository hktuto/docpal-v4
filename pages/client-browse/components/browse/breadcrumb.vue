<script lang="ts" setup>
import {ArrowRight} from '@element-plus/icons-vue'
import { clientApi } from 'api';
const props = defineProps<{
    idOrPath: string
}>();
const { idOrPath } = toRefs(props)
const listProvider = inject(BrowseListProviderKey)
if(!listProvider) {
    throw new Error('BrowseListProviderKey not found')
}
const breadcrumbList = ref<any[]>([])
const loading = ref(false)

async function getBreadcrumb() {
    loading.value = true
    try{

        const {data} = await clientApi.documentNuxeo.postBreadcrumb({idOrPath:idOrPath.value})
        breadcrumbList.value = data || []
    }catch(e){
        console.log(e)
    }
    loading.value = false
}

function navigate(idOrPath?:string) {
    if(idOrPath) {
        listProvider?.changeRoute(idOrPath)
    }else{
        listProvider?.changeRoute('/')
    }
}

watch(idOrPath, ()=> {
  if(idOrPath.value) {
    getBreadcrumb()
  }
},{
  immediate: true
})

</script>

<template>
    <div class="breadcrumbContainer">
        <div v-loading="loading" class="breadItem pointer home" @click="navigate()" >
                <Icon name="dp-icon:breadcrumb-home" />
            </div>
        <div v-if="breadcrumbList && breadcrumbList.length > 0" class="divider">
            <ElIcon><ArrowRight/></ElIcon>
        </div>
        <template v-for="(item,index) in breadcrumbList" :key="item.id">
            <div  :class="{breadItem:true, pointer: index < breadcrumbList.length - 1 }" 
                    @click="() => {if(index === breadcrumbList.length - 1 )return; navigate(item.id)}">
                    {{item.name}}
                </div>
            <div v-if="index < breadcrumbList.length - 1" class="divider">
                <ElIcon><ArrowRight/></ElIcon>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumbContainer{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap : var(--app-space-xxs);
}
.breadItem{
    color: var(--app-grey-100);
    font-size: var(--app-font-size-m);
    font-weight: 700;
    &.pointer{
        color: var(--app-grey-300);
        cursor: pointer;
        &:hover {
            color: var(--app-accent-color);
        }
    }
}
</style>