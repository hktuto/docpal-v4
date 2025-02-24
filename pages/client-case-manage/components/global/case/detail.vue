<script lang="ts" setup>
import {clientApi} from 'api'
import dayjs from "dayjs";

const { id } = defineProps<{
    id: string;
}>();

const {t} = useI18n()
const emits = defineEmits(['filter-change', 'refresh'])
const keyword = ref()
const title = ref()

type TableState = {
    ready: boolean,
    loading: boolean,
    keyword: string,
    title: string,
    extraParamsFilter: any,
    selectList: any[],
}
const state = reactive<TableState>({
    ready: false,
    loading: false,
    keyword: "",
    title: "",
    extraParamsFilter: {},
    selectList: [],
});

const {tableConfig, tableEvent, tableRef, query, reload, cleanSelectedRows,} = useVxeTable({
    id: "clientCaseTableList",
    api: async (pageParams: any) => {
        if (keyword.value) {
            pageParams.q = keyword.value
        }
        if (title.value) {
            pageParams.where.title = title.value
        }
        return clientApi.api.postCaseTypesCasetypeidRecordsPage(id, pageParams)
    },
    defaultSort: {
        field: "createdDate",
        order: 'desc'
    },
    columns: [
        {field: 'name', title: 'search.name'},
        {field: 'folderCabinet', title: 'folderCabinet'},
        {field: 'title', title: 'title'},
        {
            field: 'created_date',
            title: 'workflow_createDate',
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        {
            field: 'modified_date',
            title: 'table_modifiedDate',
            formatter({cellValue}: any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
    ],
    optionalConfig: {
        tooltipConfig: {
            contentMethod: ({
                                items,
                                row,
                                rowIndex,
                                $rowIndex,
                                column,
                                columnIndex,
                                $columnIndex,
                                type,
                                cell,
                                $event
                            }: any) => {
                const key = column.property
                const value = row[key]
                if (key === 'groupDTOList') {
                    return value.map(item => item.name).join(', ')
                }
                if (typeof value === 'string') {
                    return value
                }
                if (Array.isArray(value)) {
                    return value.join(',')
                }
            }
        }
    },
    dblClickAction: ({row}) => {
        routerProvider.navigateTo(newItem)
    }
});

const ResponsiveFilterRef = ref()

async function getFilter(conditions) {
    ResponsiveFilterRef.value.init(conditions);
}

function handleFilterFormChange(formModel) {
    state.extraParamsFilter = formModel;
    emits('filter-change', state.extraParamsFilter)
}

</script>

<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig" v-on="tableEvent">
        <ResponsiveFilter
            ref="ResponsiveFilterRef"
            @form-change="handleFilterFormChange"
            inputKey="userNameOrEmail"
            :inputPlaceHolder="t('placeHolder.userNameOrEmail')"
        />
    </VxeGrid>
</template>

<style lang="scss" scoped>

</style>
