<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminApi } from 'api'
// deepCopy, GetDocDetailApi
// import { getAclsApi } from 'dp-api/src/endpoint/admin-acl'

// #region  tree
const tabProvider = inject(TabManagerKey)
const routerProvider = inject(MenuRouterKey)
if(!tabProvider || !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
// #endregion

interface Tree {
  name: string,
  leaf?: boolean,
}
const treeRef = ref()
const state = reactive<{
    doc: any,
    acls: {
        inherited: any[],
        local: any[]
    },
    loading: boolean,
    options: string[]
}>({
    doc: {},
    acls: {
        inherited: [],
        local: []
    },
    loading: false,
    options: [ 'classified', 'confidential','normal' ]
})

async function rootDataGet () {
    const res = await adminApi.documentNuxeo.getDocument({idOrPath: '/'})
    return [{ ...res.data, name: 'Root'}]
}

async function leafDataGet(pageParams:any) {
    const res = await adminApi.documentNuxeo.postThumbnail(pageParams)
    return res.data
}

async function handleClick (doc:any) {
    treeRef.value.treeRef.setCurrentKey(doc.logicPath)
    state.loading = true
    try {
        state.doc = deepCopy(doc)
        const {data} = await adminApi.documentNuxeo.getDocument({idOrPath: state.doc.id})
        state.doc = { ...data, ...doc }
        await getAcls()
    } catch (error) {

    }
    state.loading = false
}

async function getAcls () {
    try {
        if(!state?.doc?.id) throw new Error("no id");
        const { data } = await adminApi.documentNuxeo.getAcls(state.doc.id)
        if(data && data.inherited && data.local) {
            state.acls = data as any
        }else{
            throw new Error("no acls")
        }
    } catch (error) {
        state.acls = {
            inherited: [],
            local: []
        }
    }
}

// #region module: table data
const inheritedList = computed(() => {
        try {
            const result = state.acls.inherited.reduce((prev,item) => {
                const exitItem = prev.find((prevItem:any) => prevItem.userId === item.userId)
                if (exitItem) {
                    exitItem.permission = item.permission
                    permissionFilter(exitItem, item.permission, item.id)
                } else {
                    permissionFilter(item, item.permission, item.id)
                    prev.push(item)
                }
                return prev
            }, [])
            result.sort((a:any,b:any)=> (a.userId.localeCompare(b.userId) ));
            return deepCopy(result)
        } catch (error) {
            return []
        }
    })
    const localList = computed(() => {
        try {
            const result = state.acls.local.reduce((prev,item) => {
                if (item.userId === 'Everyone') return prev
                const exitItem = prev.find((prevItem:any) => prevItem.userId === item.userId)
                if (exitItem) {
                    permissionFilter(exitItem, item.permission, item.id)
                } else {
                    item.print = false
                    item.read = false
                    item.write = false
                    item.manage = false
                    item.loading = false
                    item.printLoading = false
                    permissionFilter(item, item.permission, item.id)
                    prev.push(item)
                }
                return prev
            }, [])
            result.sort((a,b)=> (a.userId.localeCompare(b.userId) ));
            return deepCopy(result)
        } catch (error) {
            return []
        }
        item.loading = false
    })
    function isRead (permission:string) {
      return ['Read', 'ReadWrite', 'ManageRecord', 'ManageLegalHold', 'Everything'].includes(permission)
    }
    function isWrite (permission:string) {
      return ['ReadWrite', 'ManageRecord', 'ManageLegalHold', 'Everything'].includes(permission)
    }
    function isManage (permission:string) {
      return ['Everything'].includes(permission)
    }
    function isPrint (permission:string) {
      return ['Print'].includes(permission)
    }
    function permissionFilter (aclItem:any, permission:string, id:string) {
      if(permission === 'Print') {
        aclItem.print = isPrint(permission)
        aclItem.printPermission = permission
        if (!aclItem.dpId) aclItem.dpId = []
        aclItem.dpId.push(id)
      } else {
        aclItem.acePermission = permission
        aclItem.aceId = id
        aclItem.read = isRead(permission)
        aclItem.write = isWrite(permission)
        aclItem.manage = isManage(permission)
      }
    }
// #endregion

</script>


<template>
     <div class="grid-layout">
            <Tree ref="treeRef" 
                    :rootDataGetApi="rootDataGet"
                    :leafDataGetApi="leafDataGet"
                    path="/"
                    @loadFinish="handleClick"
                    @handleNodeClick="handleClick">
                <template #default="{ node, data }">
                    <div class="doc-container">
                        <BrowseItemIcon class="el-icon--left" :type="data.isFolder ? 'folder' : 'file'"/>
                        {{data.name}}
                    </div>
                </template>
            </Tree>
            <div class="main" v-loading="state.loading">
                <div v-if="state.doc" class="topAction" >
                    <h3 class="flex-x-start">{{state.doc.name}}
                        <!-- <ExportFolderStructureButton v-show="state.doc.isFolder" class="el-icon--right"
                            :export-id="state.doc.id" :export-name="state.doc.name"></ExportFolderStructureButton> -->
                        <!-- <ExportButton v-show="folderCurItem.isFolder" class="el-icon--right" :export-id="folderCurItem.id" :export-name="folderCurItem.name"></ExportButton> -->
                    </h3>
                    <div class="right">
                        <AclExportZipButton v-show="state.doc.isFolder" :export-id="state.doc.id" :export-name="state.doc.name"></AclExportZipButton>
                        <!-- <el-select 
                            v-if="state.doc.properties"
                            v-model="state.doc.properties['sec:clearanceLevel']" 
                            id="clearance-select"
                            filterable clearable
                            placeholder="Clearance Level"
                            @change="clearanceLevelChange" >
                            <el-option v-for="o in state.options" :key="o" :label="o" :value="o"/>
                        </el-Select> -->
                    </div>
                </div>
                <div class="main-content" v-if="state.doc.name" >
                    <AclInherentTable v-if="state.doc.name !== 'Root'" :tableData="inheritedList" :doc="state.doc" @refresh="getAcls"></AclInherentTable>
                    <AclLocalTable :tableData="localList" :doc="state.doc" @refresh="getAcls"></AclLocalTable>
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
.grid-layout{
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--app-space-xs);
    .el-tree {
        overflow: auto;
        .doc-container {
            display: flex;
            align-items: center;
            :deep(img) {
                width: 26px;
            }
        }
    }
    :deep(.el-tree-node__content) {
        height: 32px;
    }
    .main {
        border-left: 1px solid #ddd;
        padding: 0 var(--app-space-xs);
        display:grid;
        grid-template-rows: min-content 1fr;
        gap: var(--app-space-xs);
        height: 100%;
        overflow: hidden;
        .topAction {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .right {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                gap: var(--app-space-xs);
                .el-select {
                    width: 120px;
                }
            }
        }
        &-content {
           overflow: auto;
           padding: var(--app-space-xs);
        }
    }
}
</style>