<template>
    <div class="pageContainer--padding">
        <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
            <template #toolbar_buttons>
                <header v-show="state.selectList.length === 0" class="header-flex">
                    <div class="flex-x-start">
                        <el-button type="danger" @click="handleDeleteAll"> {{
                                t("trash_actions_deleteAll")
                            }}
                        </el-button>
                    </div>
                </header>
                <header v-show="state.selectList?.length > 0" class="header-flex">
                    <div class="flex-x-start">
                        <el-button type="primary" @click="handleRestore">
                            {{ t("trash_actions_restore") }}
                        </el-button>
                        <el-button type="danger" @click="handleDelete">
                            {{ t("trash_actions_delete") }}
                        </el-button>
                    </div>
                </header>
            </template>
        </VxeGrid>
    </div>
</template>
<script lang="ts" setup>
import {ElMessageBox, ElNotification} from "element-plus";
import {clientApi} from 'api'
import dayjs from "dayjs";

type TableState = {
    ready: boolean,
    loading: boolean,
    extraParams: any,
    extraParamsFilter: any,
    selectList: any[],
}
const state = reactive<TableState>({
    ready: false,
    loading: false,
    extraParams: {},
    extraParamsFilter: {},
    selectList: [],
});

const {t} = useI18n()
const {tableConfig, tableEvent, tableRef, reload, query, cleanSelectedRows} = useVxeTable({
    id: 'clientTrashList',
    api: async (pageParams: any) => {
        cleanSelectedRows()
        return clientApi.api.getNuxeoDocumentTrash(pageParams)
    },
    columns: [
        {field: 'checkbox', type: 'checkbox', width: '50px', fixed: 'left'},
        {
            field: 'name',
            title: 'tableHeader_name',
            type: 'html',
            formatter: ({ cellValue, row }: any) => {
                let icon = "/icons/doc/file.svg";
                if (row.isFolder) {
                    icon = "/icons/doc/folder.svg";
                }
                return `<span class="tableRow-icon-cell"><img src="${icon}" /> ${cellValue}</span>`;
            }
        },
        {field: 'path', title: 'tableHeader_path',},
        {field: 'type', title: 'tableHeader_type',},
        {field: 'properties.principalName', title: 'trash_deleteBy',},
        {
            field: 'properties.trashed_date',
            title: 'trash_date',
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        }
    ],
    bodyActions: [
        [
            {
                code: 'restore_file',
                name: 'Restore File',
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    // trashProvider?.openUserDetail(row)
                }
            },
            {
                code: 'delete_file',
                name: 'Delete File',
                visible: true,
                disabled: false,
                action: ({row}: any) => {
                    handleDelete(row)
                }
            }
        ]
    ],
    selectChangeHander: (selectedRows: any[]) => {
        state.selectList = [...selectedRows];
    },
})

const batchAction = ref('')
const processDetail = reactive({
    completedNum: 0,
    total: 0,
    title: '',
    delay: 1000
})

/**
 * 刪除全部
 */
async function handleDeleteAll(row: any) {
    const action = await ElMessageBox.confirm(t("dpTip_deleteSelectedFiles"));
    if (action !== "confirm") return;
    state.loading = true
    await clientApi.api.deleteNuxeoDocumentPurge()
    setTimeout(async () => {
        state.loading = false
        reload();
    }, 2000)
}

/**
 * 批量恢復
 */
function handleRestore(row: any) {
    batchAction.value = 'restore'
    batchActionHandler()
}

/**
 * 批量刪除
 */
function handleDelete(row: any) {
    batchAction.value = 'delete'
    batchActionHandler()
}

/**
 * 批量恢復與刪除公共方法
 */
const batchActionHandler = async () => {
    if (state.selectList.length === 0) {
        ElNotification.error(t('dpTip_noSelection') as string)
        return
    }
    if (!batchAction.value) {
        ElNotification.error(t('trash_error_noAction') as string)
        return
    }
    if ('delete' === batchAction.value) {
        // 刪除時顯示提醒窗口
        const action = await ElMessageBox.confirm(t("dpTip_deleteSelectedFiles"));
        if (action !== "confirm") return;
    }

    processDetail.total = state.selectList.length
    processDetail.completedNum = 0
    const pList = []
    const selectList = [...state.selectList];
    switch (batchAction.value) {
        case 'restore':
            state.selectList.forEach(s => pList.push(restore(s.id)))
            break
        case 'delete':
            state.selectList.forEach(s => pList.push(deleteOne(s.id)))
            break
    }
    const res = await Promise.all(pList)

    batchAction.value = null
    handleMsg(selectList, res);
    setTimeout(async () => {
        query();
    }, 2000)
}

/**
 * 請求失敗消息提醒
 * @param selectList
 * @param ids
 */
function handleMsg(selectList, ids) {
    let num = 0
    // 拼接請求失敗的文件名稱
    const fileNames = ids.reduce((p, id, index) => {
        if (id) {
            num++
            p += ' <br/>' + selectList.find(item => item.id === id).name;
        }
        return p
    }, '');

    if (num !== 0) {
        ElNotification.error({
            title: '',
            dangerouslyUseHTMLString: true,
            message: `${nm} ${t('Fail')}: ${fileNames}`
        })
    } else {
        ElNotification.success(`${t('commons_success')}`)
    }
}

/**
 * 根據Id刪除
 * @param idOrPath
 */
async function deleteOne(idOrPath: string) {
    try {
        const res = await clientApi.api.deleteNuxeoDocument({idOrPath});
        processDetail.completedNum++
        return ''
    } catch (error) {
        processDetail.completedNum++
        return idOrPath
    }
}

/**
 * 根據Id恢復文件
 * @param idOrPath
 */
const restore = async (idOrPath: string) => {
    try {
        const res = await clientApi.api.postNuxeoDocumentRestore({idOrPath});
        processDetail.completedNum++
        return ''
    } catch (error) {
        processDetail.completedNum++
        return idOrPath
    }
}

onActivated(() => {
    state.selectList = []
})

</script>

<style lang="scss" scoped>
</style>
