<template>
  <div>loading</div>
</template>

<script lang="ts" setup>
import { clientApi } from "../../../libraries/api/src";

import { ElMessage } from "element-plus";
// TODO : add custom router control
const route = useRoute();
const router = useRouter();
function openTab(tabItem: any) {
  let storageTabs = localStorage.getItem("app-tab");
  let newLayout = [];
  if (storageTabs) {
    newLayout = JSON.parse(storageTabs);
    tabItem.parent = newLayout[0].id;
    // TODO : check if storageTabs is array, and handle restore other tabs
    newLayout[0].tabs = [tabItem];
  } else {
    newLayout = [
      {
        id: "dummy-tab-container",
        parent: "root",
        showingTabIndex: 0,
        size: 100,
        tabs: [{ ...tabItem, parent: "dummy-tab-container" }],
      },
    ];
  }
  localStorage.setItem("app-tab", JSON.stringify(newLayout));
  setTimeout(() => {
    router.push("/");
  });
}
onMounted(async() => {
  // step1 normalize route path by removing trailing slash
  const path = route.path.replace(/\/$/, "");
  switch (path) {
    case "/browse":
      const idOrPath = (route.query.id || route.query.path || "/") as string;
      const newTab = createBrowseListPageParams({
        idOrPath: decodeURI(idOrPath),
      });
      openTab(newTab);
      break;
    case "/workflow/link":
      const workflowItem = await getWorkflowRoute(route.query.processInstanceId as string);
      openTab(workflowItem);
      break;
    default:
      router.push("/");
  }
});
</script>
