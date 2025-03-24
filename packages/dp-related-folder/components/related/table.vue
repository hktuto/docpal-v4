<script lang="ts" setup>

const props = defineProps<{
    data: any
}>()
const router = useRouter()
function rowClick(row: any) {
    // if(row.isFolder) {
    //     const ev = new CustomEvent('closeFilePreview');
    //     document.dispatchEvent(ev);
    //     router.push({
    //         path:'/browse',
    //         query:{
    //         path: row.path
    //         }
    //     })
    //     return 
    // }
    // const newEv = new CustomEvent('openFilePreview', {detail :{pathOrId: row.path, options:{showInfo:true,showHeaderAction:true}}});
    // document.dispatchEvent(newEv);
    const url = router.resolve({  path: '/browse', query: { path: row.path, docId: row.id } })
    window.open(url.href, '_blank');
}
</script>

<template>
    <div class="relateListContainer">
        <b class="title">
            {{ data.name }}
        </b>
        <div class="table">
            <el-table :data="data.children">
                <el-table-column :label="$t('table_name')">
                  <template #default="{row}">
                    <div class="nameColumn">
                      <BrowseItemIcon :type="row.isFolder ? 'folder' : 'file'" />
                      <div class="label">{{row.name}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column >
                    <template #default="{row}">
                        <SvgIcon src="/icons/edit.svg" @click="rowClick(row)"></SvgIcon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.relateListContainer {
    margin-bottom: 30px;
}
.nameColumn{
    display: flex;
    flex-flow: row nowrap;
    gap: var(--app-space-s);
}
</style>