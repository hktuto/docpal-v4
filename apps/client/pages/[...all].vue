<template>
  <div>loading</div>
</template>

<script lang="ts" setup>
// TODO : add custom router control
let index = 0;
const route = useRoute();
const router = useRouter();
function openTab(tabItem: any) {
  let storageTabs = localStorage.getItem("app-tab");
  let newLayout: any = [];
  if (storageTabs) {
    const id = new Date().valueOf() + index
    newLayout = JSON.parse(storageTabs);
    newLayout.push({
      id: "dummy-tab-container" + id,
      parent: "root",
      showingTabIndex: 0,
      size: 100,
      tabs: [{ ...tabItem, parent: "dummy-tab-container" + id, initized:true  }],
    });
    index++;
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
onMounted(async () => {
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
      const workflowItem = await getWorkflowRoute(
        route.query.processInstanceId as string
      );
      openTab(workflowItem);
      break;
    default:
      router.push("/");
  }
});
</script>
