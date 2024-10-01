<script lang="ts" setup>

const props = defineProps<{
    loading:boolean,
    columns: any,
    tableData: any,
    options: any,
}>()

const emits = defineEmits(['handleAction', 'handleDblclick', 'handlePaginationChange', 'handleAdd', 'inactive', 'active'])
</script>

<template>
    <Table v-loading="loading" :columns="columns" :table-data="tableData" :options="options"
            @command="$emit('handleAction', $event)"
            @row-dblclick="$emit('handleDblclick', $event)"
            @pagination-change="$emit('handlePaginationChange', $event)">
            <template #preSortButton>
                <!-- {{ $t('msg.confirmWhetherToDeactivate') }} -->
                <!-- <ResponsiveFilter ref="ResponsiveFilterRef" @form-change="handleFilterFormChange" @clear-filter="handleClearFilter"
                    inputKey="name"/> -->
            </template>  
            <template #suffixSortButton>
                <el-button type="primary" @click="$emit('handleAdd', $event)">{{$t('button.add')}}</el-button>
            </template>
            <template #publishStatus="{ row }">
                {{ row.status === 'P' ? 
                    $t('actions.unpublished') : 
                    row.publishStatus === 'A' ? 
                    $t('actions.activated') : 
                    $t('actions.inactivated') }}
            </template>
            <template #dpTable_actions="{ row }">
                <el-dropdown>
                    <SvgIcon src="/icons/dots.svg"></SvgIcon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-loading="loading" @click="$emit('handleDblclick', row)">{{$t('masterTable.editDetail')}}</el-dropdown-item>
                            <el-dropdown-item v-if="row.publishStatus === 'A' && row.status === 'A'" v-loading="loading" @click="$emit('inactive', row)">{{$t('actions.inactive')}}</el-dropdown-item>
                            <el-dropdown-item v-else-if="row.status === 'A'" v-loading="loading" @click="$emit('active', row)">{{$t('actions.active')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </Table>

</template>