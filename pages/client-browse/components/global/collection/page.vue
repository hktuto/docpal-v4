<template>
    <div class="collection-container withPadding">
        <div :class="['collection-container--left', { collapse: style.collapse }]">
            <div class="flex-x-end">
                <el-button :loading="fileFormAddLoading" @click="openCollectionDialog(false)">
                    {{ t('collections_new') }}
                </el-button>
                <el-icon :class="['collapse-icon', 'el-icon--right', style.collapse ? 'rotate' : 'revert']"
                         @click="handleCollapse">
                    <ArrowDownBold/>
                </el-icon>
            </div>
            <div class="collection-list" style="--color: #F56C6C">
                <div v-for="item in state.collectionList" :key="item.id"
                     :class="['collection-item','cursorPointer', {'current': state.curCollection.id === item.id}]"
                     @click="handleTabClick(item)">
                    <span class="ellipsis" :title="item.name">{{ item.name }}</span>
                    <el-icon class="color__danger__hover cursorPointer"
                             @click.stop="handleDelete(item)">
                        <Delete/>
                    </el-icon>
                </div>
            </div>
        </div>

        <div class="collection-main">
            <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
                <template #toolbar_buttons>
                    <div class="flex-x-between">{{ state.curCollection.name }}
                        <SvgIcon src="/icons/edit.svg" class="el-icon--right"
                                 @click="openCollectionDialog(true)"/>
                    </div>
                    <div class="flex-x-end">
                        <template v-if="state">
                            <SvgIcon v-if="state.tableData && state.tableData.length > 0"
                                     src="/icons/file/share.svg"
                                     round
                                     :content="t('tip.addToShare')"
                                     @click="handleShare"/>
                        </template>
                    </div>
                </template>
            </VxeGrid>
        </div>

        <LazyCollectionDialog ref="collectionDialog" @refresh="reloadPage">
        </LazyCollectionDialog>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {clientApi} from 'api'
import {ElMessageBox} from "element-plus";
import {createBrowseListPageParams, createDetailPageParams} from "~/utils/browseMenuHelper";
import {ArrowDownBold, Delete} from '@element-plus/icons-vue'
const routerProvider = inject(MenuRouterKey)

const {t} = useI18n()
const route = useRoute()
const router = useRouter()
const pageParams = {
    pageIndex: 0,
    pageSize: 20
}

function reloadPage() {
    reload();
    getCollectionList();
}

async function getCollectionList() {
    const {data} = await clientApi.api.getNuxeoCollection()
    try {
        state.collectionList = data.entryList
        if (state.collectionList.length > 0) {
            let index = state.collectionList.findIndex(item => item.id === route.query.tab)
            if (index === -1) index = 0
            handleTabClick(state.collectionList[index])
        }
        reload();
    } catch (error) {

    }
}

function handleTabClick(row) {
    state.curCollection = row
    reload();
}

function handleDelete(row) {
    ElMessageBox.confirm(t("msg_confirmWhetherToDelete"))
        .then(async () => {
            await clientApi.api.deleteNuxeoDocument({idOrPath: row.id})
            reloadPage()
        })
}

function handleDocDelete(row) {
    let docList = [];
    docList.push({idOrPath: row.id})
    const param = {
        documents: docList,
        collection: {idOrPath: state.curCollection.id}
    }
    ElMessageBox.confirm(t('msg_confirmWhetherToDelete'))
        .then(async () => {
            state.loading = true
            try {
                await clientApi.api.deleteNuxeoCollectionRemove(param)
                setTimeout(() => {
                    query();
                }, 1000)
                reload()
            } catch (error) {

            }
            state.loading = false
        })
}

const collectionDialog = ref()

const fileFormAddLoading = ref(false)
const fileFormEditLoading = ref(false)

function openCollectionDialog(status: boolean) {
    collectionDialog.value.handleOpen(status, state.curCollection)
}

async function submitNewCollection(form) {
    try {
        fileFormAddLoading.value = true
        await clientApi.api.postNuxeoCollectionCreate(form)
        setTimeout(async () => {
            await getCollectionList()
            fileFormAddLoading.value = false
        }, 500)
    } catch (error) {
    } finally {
        fileFormAddLoading.value = false
    }
}

async function saveCollection(form) {
    try {
        fileFormEditLoading.value = true
        form.idOrPath = state.curCollection.id
        await clientApi.api.patchNuxeoCollection(form)
        setTimeout(async () => {
            await getCollectionList()
            fileFormAddLoading.value = false
        }, 800)
    } catch (error) {
    } finally {
        fileFormAddLoading.value = false
    }
}

const style = reactive({
    collapse: true
})

function handleCollapse() {
    style.collapse = !style.collapse
}

// const {state: shareState, addToShareList} = `useShareStore`()
async function handleShare() {
    const data = await clientApi.api.postNuxeoCollectionAlldocuments({idOrPath: state.curCollection.id})
    // TODO 未調試
    addToShareList(data)

    nextTick(() => {
        const shareDraggableButton = document.getElementById('share-draggable-button')
        const shareToQueue = document.getElementById('shareToQueue')
        shareToQueue.style.transform = 'none'
        shareToQueue.style.display = 'block'
        if (shareDraggableButton) {
            anime({
                targets: '#shareToQueue',
                translateX: shareDraggableButton.offsetLeft - shareToQueue.offsetLeft,
                translateY: shareDraggableButton.offsetTop - shareToQueue.offsetTop - 60,
                duration: 750,
                easing: 'easeInOutQuad'
            })
        }
        setTimeout(() => {
            shareToQueue.style.display = 'none'
        }, 750)
    })
}

type TableState = {
    loading: false,
    tableData: any[],
    options: {
        showPagination: boolean,
        paginationConfig: {
            total: number,
            currentPage: number,
            pageSize: number
        },
    },
    collectionList: any,
    curCollection: string,
    selectedDocs: any[]
}

const state = reactive<TableState>({
    loading: false,
    tableData: [],
    options: {
        showPagination: true,
        paginationConfig: {
            total: 0,
            currentPage: 1,
            pageSize: pageParams.pageSize
        },
    },
    collectionList: [],
    curCollection: '',
    selectedDocs: []
})

const {tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows,} = useVxeTable({
    id: "clientCollectionsList",
    api: async (pageParams: any) => {
        let id = state.curCollection.id;
        const {data: {entryList}} = await clientApi.api.postNuxeoCollectionDocuments({idOrPath: id})
        state.tableData = entryList
        return entryList
    },
    columns: [
        {
            field: 'name', title: 'tableHeader.fileOrFolderName',
            type: 'html',
            formatter: ({cellValue, row}: any) => {
                let icon = "/icons/doc/file.svg";
                if (row.isFolder) {
                    icon = "/icons/doc/folder.svg";
                }
                return `<span class="tableRow-icon-cell"><img src="${icon}" /> ${cellValue}</span>`;
            }
        },
        {field: 'path', title: 'dpTable_location',},
        {
            field: 'modifiedDate',
            title: 'table_modifiedDate',
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {field: 'type', title: 'table_type',},
    ],
    bodyActions: [
        [{
            code: "deleted",
            name: "common_remove",
            action: ({row}: any) => {
                handleDocDelete(row);
            },
        }
        ],
    ],
    virtualScroll: true,
    dblClickAction: ({row}) => {
        let newItem;
        if (row.isFolder) {
            newItem = createBrowseListPageParams({
                idOrPath: row.id
            });
        } else {
            newItem = createDetailPageParams({
                idOrPath: row.id,
                docName: row.name,
                showHeaderAction: true
            });
        }
        routerProvider.navigateTo(newItem)
    },
    selectChangeHander: (selectedRows: any[]) => {
        state.selectedDocs = [...selectedRows];
    },
});

onMounted(() => {
    getCollectionList()
})
</script>


<style scoped lang="scss">
.current {
    background-color: var(--menu-selected-bg);
    color: var(--menu-selected-color);
}

.el-container {
    height: 100%;
    overflow: hidden;
}

.flex-x-end {
    display: flex;
    justify-content: flex-end;
}

.collection-container {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: var(--app-space-xs);
    height: 100%;
    overflow: hidden;

    &--left {
        width: 200px;
        display: grid;
        grid-template-rows: min-content 1fr;
        height: 100%;
        overflow: hidden;
        gap: var(--app-space-xs);
        border-right: 1px solid #ddd;
        // box-shadow: 0 0 12px rgba(0,0,0,.12);
        padding-right: var(--app-space-xs);

        .collection-list {
            overflow: auto;
        }

        .collection-item {
            padding: var(--app-space-xs);
            display: grid;
            grid-template-columns: 1fr min-content;
            gap: var(--app-space-xs);
        }

        .collapse-icon {
            display: none;
        }
    }
}

.collection-main {

    overflow: hidden;
}

.rotate {
    transition: all 1s;
}

.revert {
    transition: all 1s;
    transform: rotate(180deg);
}

@media (max-width: 1024px) {
    .collection-container {
        grid-template-columns: unset;
        grid-template-rows: min-content 1fr;
        width: 100%;

        &--left.collapse {
            height: 35px;
            width: 100%;
            box-shadow: unset;
        }

        &--left {
            height: 50vh;
            width: 100%;
            padding-right: unset;
            // box-shadow:  -1px 0px 3px rgba(0, 0, 0, .12);
        }

        .collection-list {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .collection-item {
                background-color: #ecf5ff;
                color: #409eff;
                display: grid;
                grid-template-columns: 1fr min-content;
                gap: var(--app-space-xs);
                align-items: center;
                vertical-align: middle;
                padding: 3px 9px;
                margin: 4px 4px;
                border-radius: 4px;
            }

            .current {
                background-color: aquamarine;
            }
        }

        .collapse-icon {
            display: unset;
        }

    }
}

#shareToQueue {
    z-index: 100;
    display: none;
}
</style>