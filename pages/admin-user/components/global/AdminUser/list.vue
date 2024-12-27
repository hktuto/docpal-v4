<script lang="ts" setup>
import { adminApi } from "api";
import { userProviderKey } from "~/util/userProvider";
const tabProvider = inject(TabManagerKey);
const routerProvider = inject(MenuRouterKey);
if (!tabProvider || !routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
function openUserDetail(data: any, openInNewTab = false) {
  // TODO: open detail page
  const newItem: any = {
    menuKey: routerProvider?.menuSymbol,
    id: "user-detail-" + new Date().getTime(),
    name: "user-detail-" + data.id,
    icon: "lucide:user",
    label: data.username,
    component: "LazyAdminUserDetail",
    props: {
      id: data.userId,
    },
  };
  routerProvider?.navigateTo({ ...newItem }, openInNewTab);
}

const userCondition = ref({});

// #region module:
let userTableFilter = {};
const tableRef = ref();
function handleFilterChange(filter: any) {
  userTableFilter = { ...filter };
  tableRef?.value.reload();
}
// #endregion
provide(userProviderKey, {
  getAllUsersApi: async (params: any) => {
    const res: any = await adminApi.identityNuxeo.postGetallusers({
      ...params,
      ...userTableFilter,
    });
    const { conditions, page } = res.data;
    console.log("conditions", conditions, res);
    userCondition.value = conditions;
    return { data: page };
  },
  SetUserStatusApi: (params: any) => {
    return adminApi.userNuxeo.putStatus(params);
  },
  BatchActiveUserApi: (params: any) => {
    return adminApi.userNuxeo.postActive(params);
  },
  BatchDeleteUserApi: (params: any) => {
    return adminApi.identityNuxeo.postDelete(params);
  },
  getAllUserAndActiveCountApi: async () => {
    const res = await adminApi.identityNuxeo.postGetlicenseusernumandactivecount();
    return res.data;
  },
  CreateUserApi: (params: any) => {
    return adminApi.identityNuxeo.postUser(params);
  },
  BatchUsersToGroupsApi: (params: any) => {
    return adminApi.identityNuxeo.postGroups(params);
  },
  GetGroupListApi: async () => {
    const res = await adminApi.identityNuxeo.postGroups3();
    return res.data;
  },
  openUserDetail,
});
</script>

<template>
  <div class="pageContainer">
    <UserTable
      ref="tableRef"
      :condition="userCondition"
      @filter-change="handleFilterChange"
    ></UserTable>
  </div>
</template>
<style lang="scss" scoped>
.pageContainer {
  padding: var(--app-space-s);
  height: 100%;
  overflow: hidden;
}
</style>
