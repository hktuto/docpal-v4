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
import dayjs from 'dayjs'
import {useI18n} from '#imports'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MasterTableProviderKey } from '~/utils/masterTableProvider';
const emits = defineEmits(['filter-change'])
const { t } = useI18n()
const masterTableProvider = inject(MasterTableProviderKey)
const state = reactive<any>({
    loading: false,
})

const { tableConfig, tableEvent , tableRef, reload, query } = useVxeTable({
    id: 'masterTableTableSetting',
    api: (pageParams:any) => masterTableProvider?.GetMasterTablesLogsApi(pageParams),
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
        const filters = await masterTableProvider?.GetMasterTablesLogConditionsApi()
        nextTick(() => {
            ResponsiveFilterRef.value.init(filters.data)
        })
    }
    function handleFilterFormChange(formModel: any) {
        state.extraParams = formModel
        emits('filter-change', state.extraParams)
    }
// #endregion

onMounted(() => {
    getFilter()
})
defineExpose({ reload })
</script>

<style lang="scss" scoped>
.responsive-container {
    width: fit-content;
}
</style>
