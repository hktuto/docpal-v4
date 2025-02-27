<template>
    <VxeGrid ref="tableRef" v-bind="tableConfig"> 
        <template #toolbar_buttons>
            <ResponsiveFilter
                ref="ResponsiveFilterRef"
                @form-change="handleFilterFormChange"
                inputKey="name"
            />
        </template>
    </VxeGrid>
</template>

<script lang="ts" setup>
import { adminApi } from 'api'
import dayjs from 'dayjs'
import {useI18n} from '#imports'

const props = defineProps(['tableName'])
const emits = defineEmits(['filter-change'])
const { t } = useI18n()
let extraParams:any = {
    eventCategory: 'Master Table'
}
let filtersParams:any = {
}
const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
    id: 'masterTable-log',
    api: (pageParams:any) => adminApi.api.postMasterTablesLogs({...pageParams, ...extraParams, ...filtersParams}),
    columns:  [
        { id: "10",  field: 'docPath', title: 'masterTable.table', fixed: 'left'},
        { field: 'principalName', title: 'user_username',},
        { field: 'eventId', title: 'masterTable.eventType',  
            formatter ({ cellValue }:any) {
                return t('eventId.'+cellValue)
            }
        },
        { field: 'eventDate', title: 'asterTable.eventDate',
            formatter ({ cellValue }:any) {
                const format = userDisplayTimeSetting()
                return dayjs(cellValue).format(format)
            }
        },
        { field: 'comment', title: 'docType_description',  }
    ],  
})
// #region module: ResponsiveFilterRef
    const ResponsiveFilterRef = ref()
    async function getFilter() {
        const filters = await adminApi.api.postMasterTablesLogsPageConditions({ ...extraParams }).then(res => res.data)
        nextTick(() => {
            ResponsiveFilterRef.value.init(filters)
        })
    }
    function handleFilterFormChange(formModel: any) {
        filtersParams = formModel
        reload()
    }
// #endregion

onMounted(() => {
    if(!!props.tableName) extraParams.name = props.tableName
    else delete extraParams.name
    getFilter()
})
defineExpose({ reload })

</script>

<style lang="scss" scoped>
.responsive-container {
    width: fit-content;
}
</style>
