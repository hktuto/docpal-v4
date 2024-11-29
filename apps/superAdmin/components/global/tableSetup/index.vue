<script lang="ts" setup>
import type {ListSetting, ListData} from '#/apps/superAdmin/utils/tableSetupHelper'
import { demo } from './demo'
const tableSetting = ref<ListSetting>()

const renderSetting = ref<ListData>({
    api:{
        url:'',
        method:'get',
        params:{},
        data:{}
    },
    columns:[],
    actions:[],
})

function getListData(){
    tableSetting.value = demo
    
}



</script>

<template>
<div class="pageContainer">
    <div class="settingContainer">
        <TableSettingForm v-model:renderSetting="renderSetting" :tableSetting="tableSetting" />
    </div>
    <div class="previewContainer">
        <TableSettingPreview :renderSetting="renderSetting" />
    </div>
</div>

</template>

<style lang="scss" scoped>
.pageContainer{
    padding: var(--app-space-s);
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: var(--app-space-xs);
}
.settingContainer{
    height: 100%;
    min-width: 280px;
    overflow: hidden;
    border-right: 1px solid var(--app-grey-800);
}
.previewContainer{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>