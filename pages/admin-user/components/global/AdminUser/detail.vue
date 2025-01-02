<script lang="ts" setup>
import { adminApi } from 'api'
import type { UserDTO } from 'api/src/generate/admin'
import { userProviderDetailKey } from "~/util/userProvider";
const { id } = defineProps<{
  id: string;
}>();
const routerProvider = inject(MenuRouterKey)
if( !routerProvider) {
    throw new Error('MenuRouterKey is not provided')
}
const isLdapMode: boolean = useIsLDAP();
const state = reactive<{
  curUser: UserDTO | null;
}>({
  curUser: null,
})
function openUserList(openInNewTab: boolean = false){
    // TODO: open detail page
    const newItem: any = {
        menuKey: routerProvider?.menuSymbol,
        id: "admin-user",
        name: "admin-user-list",
        icon: 'lucide:user',
        label: 'Admin User',
        component: 'LazyAdminUserList',
        props: {
        }
    }        
    routerProvider?.navigateTo({...newItem}, openInNewTab)
}
async function getUser() {
  const res = await adminApi.userNuxeo.getUser(id);
  if(!res.data) return
  res.data.status = res.data.status === "A" ? "A" : "D";
  state.curUser = res.data;
  console.log("getUser", state.curUser);
}
provide(userProviderDetailKey, {
  SetUserStatusApi: (params:any) => {
    return adminApi.userNuxeo.putStatus(params)
  },
  BatchActiveUserApi: (params:any) => {
    return adminApi.userNuxeo.postActive(params)
  },
  BatchDeleteUserApi: (params:any) => {
    return adminApi.identityNuxeo.postDelete(params)
  },
  PatchUserApi: (params:any) => {
    return adminApi.identityNuxeo.patchUser(params)
  },
  PatchUserPasswordApi: (params: any) => {
    return adminApi.identityNuxeo.patchPassword(params)
  },
  MemberGroupGetApi: (params: any) => {
    return adminApi.identityNuxeo.postMembergroup(params)
  },
  BatchUserRemoveGroupsApi: (params: any) => {
    return adminApi.identityNuxeo.postGroups1(params)
  },
  BatchUserAddGroupsApi: (params: any) => {
    return adminApi.identityNuxeo.postGroups2(params)
  },
  GetGroupListApi : async() => {
    const res = await adminApi.identityNuxeo.postGroups3()
    return res.data
  },
  getUser,
  openUserList
})
onActivated(async () => {
  getUser()
});
</script>
<template>
  <div class="userDetailSection" v-if="state.curUser">
    <UserInfo
      class="info"
      :user="state.curUser"
      :isLdapMode="isLdapMode"
      @refresh="getUser"
    ></UserInfo>
    <UserGroupTable class="group" :user="state.curUser">group</UserGroupTable>
    <!-- <UserVirtualFolder v-if="state.curUser" class="virtualFolder" :userOrGroup="state.curUser" mode="userAllowList">virtualFolder</UserVirtualFolder> -->
  </div>
</template>
<style lang="scss" scoped>
.userDetailSection{
  height: 100%;
  padding: var(--app-space-s);
  display : grid;
  grid-template-columns: minmax(min-content, 400px) 1fr ;
  grid-template-rows: 1fr;
  gap: var(--app-space-xs);
  grid-template-areas:
    'list topArea topArea'
    'list group virtualFolder';
  height: 100%;
  overflow: hidden;
}
</style>
