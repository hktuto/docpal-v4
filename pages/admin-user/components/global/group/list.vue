<script lang="ts" setup>
import { adminApi } from "api";
import { groupProviderKey } from "~/util/userProvider";
const tabProvider = inject(TabManagerKey);
const routerProvider = inject(MenuRouterKey);
if (!tabProvider || !routerProvider) {
  throw new Error("MenuRouterKey is not provided");
}
function openGroupDetail(data: any, openInNewTab = false) {
  // TODO: open detail page
  const newItem: any = {
    id: "group-detail-" + new Date().getTime(),
    name: "group-detail-" + data.id,
    icon: "lucide:user",
    label: data.name,
    component: "LazyGroupDetail",
    props: {
      id: data.id,
      name: data.name,
      isCanModified: data.isCanModified,
    },
  };
  routerProvider?.navigateTo({ ...newItem }, openInNewTab);
}

provide(groupProviderKey, {
  openGroupDetail,
  GetGroupListApi: async () => {
    const res = await adminApi.identityNuxeo.postGroups3();
    return res.data;
  },
  DeleteGroupApi: (params: any) => {
    return adminApi.identityNuxeo.deleteGroup(params);
  },
  CreateGroupApi: (params: any) => {
    return adminApi.identityNuxeo.postGroup(params);
  },
});
</script>

<template>
  <div class="pageContainer">
    <GroupTable ref="tableRef"></GroupTable>
  </div>
</template>
<style lang="scss" scoped>
.pageContainer {
  padding: var(--app-space-s);
  height: 100%;
  overflow: hidden;
}
</style>
