<script lang="ts" setup>
import { TabApp } from "#components";

const {public : { platform }} = useRuntimeConfig()
const localeReady = ref(false)
const appPlatform = useAppPlatform()
const defaultTab = useAppDefaultTab()


const tabAppRef = useTemplateRef<typeof TabApp>('tabAppRef');
const emits = defineEmits(["ready"]); 

const { globalSlots } = useGlobalSetting();

const config = useAppConfig()

const emptyTab = {
  id: "new-tab-001",
  label: "New Tab",
  name: "new-tab-001",
  parent: "dummy-tab-container",
  component: "LazyTabEmpty",
};


const inited = ref(false)

async function getTabsFromServer() {
  // check if new tab
  console.log("getTabsFromServer", inited.value);
  if(inited.value) return
  let storageTabs = localStorage.getItem('docpal-app-tab');

  sessionStorage.removeItem('temp-path')
  // storageTabs = null
  try {
    if (storageTabs) {
      const newLayout = JSON.parse(storageTabs);
      // check and set layout
      newLayout.forEach((item:any) => {
        const tabId = item.id;
        item.tabs.forEach((child:any) => {
          child.parent = tabId
        })
      })
      // TODO : check if storageTabs is array, and handle restore other tabs
      tabAppRef.value?.setLayout(newLayout);
      console.log("set layout", newLayout);
    } else {
      // init a basic layout
      tabAppRef.value?.setHightLightPanel("dummy-tab-container");
      const _defaultTab = JSON.parse(JSON.stringify(defaultTab.value))
      _defaultTab.parent = "dummy-tab-container";
      tabAppRef.value?.setLayout([
        {
          id: "dummy-tab-container",
          parent: "root",
          showingTabIndex: 0,
          size: 100,
          tabs: [_defaultTab],
        },
      ]);
      console.log("set default tab");
    }
  } catch (error) {
    console.log("error", error)
    tabAppRef.value?.setLayout([
      {
        id: "dummy-tab-container",
        parent: "root",
        showingTabIndex: 0,
        size: 100,
        tabs: [defaultTab.value],
      },
    ]);
    console.log("getTabsFromServer", error);
  }finally {

    inited.value = true;
    const router = useRouter();

    router.push({
      hash: "",
      query: {},
    });
  };
  
}

function saveHighlightPanel(panelID: string) {
  localStorage.setItem("docpal-tab-hightLightPanel", panelID);
}

async function saveTabsToLocalStorage(layout: TabPanel[]) {
  const saveData = JSON.parse(JSON.stringify(layout));
  // loop all panel and tabs to reset all initized to false
  saveData.forEach((panel: any) => {
    console.log('panel', panel)
    panel.tabs.forEach((tab: any) => {
      tab.initized = false;
    });
  });
  localStorage.setItem('docpal-app-tab', JSON.stringify(saveData));
}
const { t } = useI18n();
onMounted(async () => {
  await getLocale();
  // emits("ready");
  // getTabsFromServer();
});
</script>


<template>
  <AuthState>
    <template #default="{ loggedIn, logout }">
      <TabApp 
        ref="tabAppRef"
        @ready="getTabsFromServer"
        @layoutChanged="saveTabsToLocalStorage"
        @highlightPanelChanged="saveHighlightPanel"
      >
        <template #sidebar>
          <slot name="sidebar" />
          <component
            v-for="s in globalSlots"
            v-show="s.show"
            :key="s.name"
            :is="s.component"
            v-bind="$props"
          /> 
        </template>
      </TabApp>
    </template>
    <template #placeholder>
      <LoadingBg>
        <h1 style="color: #fff">{{ $t('loading') }}</h1>
      </LoadingBg>
    </template>
  </AuthState>
</template>

<style lang="scss" >
.appFullPage{
  --app-bg: radial-gradient(72% 72% at 2% -5%, #ddf2f7 0%, #dae7f1 100%);
  /* --app-bg: #fff; */
  --app-accent-color: #0077ff;
  --menu-color: var(--app-success-6);
}
</style>
