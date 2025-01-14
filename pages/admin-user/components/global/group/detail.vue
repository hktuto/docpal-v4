<template>
<div class="group-detail" >
  <div class="topArea">
    <div class="flex-x-center">
      {{state.name}}
      <Icon  v-show="isCanModified" name="material-symbols:edit-square" class="normal cursor-pointer"  @click="handleEdit"></Icon>
    </div>
    <Icon  v-show="isCanModified" name="material-symbols:delete-rounded" class="normal cursor-pointer"  @click="handleDelete"></Icon>

  </div>
  <GroupUserTable class="group" :group="{id, name, isCanModified}" ></GroupUserTable>
  <GroupEditDialog ref="GroupEditDialogRef" :group="{
    id,
    name: state.name,
    isCanModified
  }" @refresh="handleEditRefresh"></GroupEditDialog>
</div>
</template>
<script lang="ts" setup>
import { adminApi } from 'api'
import { ElNotification, ElMessageBox } from 'element-plus'
import { groupProviderDetailKey } from '~/util/userProvider';
const routerProvider = inject(MenuRouterKey)
if( !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const { id, name, isCanModified } = defineProps<{
  id: string;
  name: string;
  isCanModified: boolean;
}>();
const state = reactive<any>({
  name: name
})
async function handleDelete() {
  const action = await ElMessageBox.confirm(`${$i18n.t('msg_confirmWhetherToDelete')}`)
  if (action !== 'confirm') return
  const res = await adminApi.api.postNuxeoIdentityGroup({ groupId: id })
  if(!!res) openGroupList()
}
const GroupEditDialogRef = ref()
function handleEdit () {
  GroupEditDialogRef.value.handleOpen()
}
function openGroupList(openInNewTab: boolean = false){
    // TODO: open detail page
    const newItem: any = {
        menuKey: routerProvider?.menuSymbol,
        id: "admin-group",
        name: "admin-group-list",
        icon: 'mingcute:group-line',
        label: 'Admin Group',
        component: 'LazyGroupList',
        props: {
        }
    }        
    routerProvider?.navigateTo({...newItem}, openInNewTab)
}
function handleEditRefresh(group:any) {
  state.name = group.name
}
provide(groupProviderDetailKey, {
  DeleteGroupApi: (params:any) => {
    return adminApi.api.deleteNuxeoIdentityGroup(params)
  },
  GetMemberListApi: (params:any) => {
    return adminApi.api.postNuxeoIdentityMember(params)
  },
  BatchGroupRemoveUsersApi : (params:any) => {
    return adminApi.api.postNuxeoIdentityGroupBatchRemoveUsers(params)
  },
  BatchGroupAddUsersApi : (params:any) => {
    return adminApi.api.postNuxeoIdentityGroupBatchAddUsers(params)
  },
  PatchGroupApi: (params:any) => {
    return adminApi.api.patchNuxeoIdentityGroup(params)
  },
  getUserListApi : async() => {
    const res = await adminApi.api.postNuxeoIdentityUsers({})
    return res.data
  },
}
)
</script>
<style lang="scss" scoped>
.group-detail {
  padding: var(--app-space-s);
  
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: var(--app-space-s);
}
.topArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-x-center {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>