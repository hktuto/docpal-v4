<template>
<el-card v-loading="state.loading">
    <div>
        <h3 class="title">{{ $t('master.setting.permission') }}</h3>
        <div class="description">{{ $t('master.setting.permissionDescription') }}</div>
        <el-button type="primary" @click="handleAdd">{{ $t('master.addPermissions') }}</el-button>
    </div>
    <div class="table-container">
        <el-table :data="state.tableData" style="width: 100%;height: 100%;"
            :default-sort="{ prop: 'userId', order: 'descending' }">
            <el-table-column sortable  prop="userId" :label="$t('dpTable_name')"> </el-table-column>
            <el-table-column v-for="item in ['read', 'edit', 'create', 'enable']" :key="item"
                :label="$t(`permission.${item}`)" align="center" header-align="center"
                sortable :prop="item">
                <template #default="{ row }">
                    <el-switch v-model="row[item]" :loading="row.loading" :disabled="item === 'read'"
                        @change="(value: boolean) => handlePermissionChange(value, item, row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="$t('dpTable_actions')">
                <template #default="{ row }">
                    <el-button size="small" :loading="row.loading" @click="handleRemove(row)">{{$t('dpButtom_remove')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        
    </div>
    <MasterTableSettingAddPermissionDialog ref="AddPermissionDialogRef" :tableId="table.id" :exitList="state.tableData" @refresh="init"/>
</el-card>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
const props = defineProps(['table'])
const { t } = useI18n()
const state = reactive<any>({
    loading: false,
    tableData: []
})
const AddPermissionDialogRef = ref()
function handleAdd () {
    AddPermissionDialogRef.value.handleOpen()
}
async function handlePermissionChange(boo: boolean, permission: string, row: any) {
    row.loading = true
    try {
        await adminApi.masterTableController.postRemove({
            ...row,
            [permission]: boo
        })
    } catch (error) {
    }
    setTimeout(() => row.loading = false, 500)
}
async function handleRemove(row: any) {
    const action = await ElMessageBox.confirm(`${t('msg_confirmWhetherToDelete')}`)
    if(action !== 'confirm') return
    await adminApi.masterTableController.postDelete1({
        masterTableId: row.masterTableId,
        userId: row.userId
    })
    init()
}

async function init() {
    try {
        state.loading = true
        state.tableData = await adminApi.masterTableController.getAcls(props.table.id).then(res => res.data)
    } catch (error) {
    }
    state.loading = false
}
onMounted(() => {
    init()
})
</script>
<style lang="scss" scoped>
.el-button {
    margin: var(--app-space-xs) 0;
}
:deep .el-card__body {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--app-space-xs);
    height: 100%;
    overflow: hidden;
}
.table-container {
    height: 100%;
    overflow: hidden;
}
</style>
