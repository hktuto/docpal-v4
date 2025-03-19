<script lang="ts" setup>
import {EventType, useEventBus} from 'eventbus'

import {ArrowRight} from '@element-plus/icons-vue'
import {clientApi} from 'api';
import {MenuRouterKey} from '#imports';

const routerProvider = inject(MenuRouterKey)
const props = defineProps<{
    idOrPath: string,
    home: any,
}>();
const {idOrPath} = toRefs(props)
const listProvider = inject(BrowseListProviderKey)
if (!listProvider) {
    throw new Error('BrowseListProviderKey not found')
}


const bus = useEventBus(EventType.FILE_NEED_REFRESH);


const breadcrumbList = ref<any[]>([])
const loading = ref(false)
const dropItems = []

async function getBreadcrumb() {
    loading.value = true
    try {
        const {data}: any = await clientApi.api.postNuxeoDocumentBreadcrumb({idOrPath: idOrPath.value})
        if (props.home) {
            const index = data?.findIndex((item: any) => item.id === props.home.secondId)
            if (index > 0) {
                data.splice(0, index)
            }
        }
        breadcrumbList.value = data || []
    } catch (e) {
    }
    loading.value = false
    // remove old dropItem
    nextTick(() => {
        dropItems.forEach(item => {
            if (typeof item === 'function') {
                item()
            }
        })
        breadcrumbList.value.forEach((item: any) => {
            const element = document.getElementById('breadcrumb-' + item.id)
            if (element) {
                dropItems.push(createDropableBreadcrumb(element, item, listProvider.tableRef))
            }
        })
    })
}

function navigate(idOrPath?: string) {
    if (idOrPath) {
        listProvider?.changeRoute(idOrPath)
        return
    }
    if (props.home?.homeRouteItem) {
        routerProvider?.navigateTo(props.home.homeRouteItem)
        return
    }
    if (props.home?.secondId) {
        listProvider?.changeRoute(props.home.secondId)
        return
    }

    listProvider?.changeRoute('/')
}

watch(idOrPath, () => {
    if (idOrPath.value) {
        getBreadcrumb()
    }
}, {
    immediate: true
})

onActivated(() => {
    bus.on(fileRefreshHandler)
})

onDeactivated(() => {
    console.log(222)
    bus.off(fileRefreshHandler)
})

function fileRefreshHandler({relatedIdOrPath}:any) {
    console.log(1, relatedIdOrPath)
    // const needRefresh = breadcrumbList.value.some((el) => el.id !== relatedIdOrPath)
    const needRefresh = breadcrumbList.value.some((el) => el.id === relatedIdOrPath)
    console.log(3, needRefresh)
    getBreadcrumb()
}


</script>

<template>
    <div class="breadcrumbContainer">
        <div v-loading="loading" class="breadItem pointer home" @click="navigate()">
            <Icon name="dp-icon:breadcrumb-home"/>
        </div>
        <div v-if="breadcrumbList && breadcrumbList.length > 0" class="divider">
            <ElIcon>
                <ArrowRight/>
            </ElIcon>
        </div>
        <template v-for="(item,index) in breadcrumbList" :key="item.id">
            <div :class="{breadItem:true, pointer: index < breadcrumbList.length - 1 }"
                 :id="'breadcrumb-'+item.id"
                 @click="() => {if(index === breadcrumbList.length - 1 )return; navigate(item.id)}">
                {{ item.name }}
            </div>
            <div v-if="index < breadcrumbList.length - 1" class="divider">
                <ElIcon>
                    <ArrowRight/>
                </ElIcon>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumbContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    gap: var(--app-space-xxs);
}

.breadItem {
    color: var(--app-grey-100);
    font-size: var(--app-font-size-m);
    font-weight: 700;

    &.pointer {
        color: var(--app-grey-300);
        cursor: pointer;

        &:hover {
            color: var(--app-accent-color);
        }
    }
}
</style>