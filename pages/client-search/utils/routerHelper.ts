export const routeSearch = function (params: any) {
  return {
    id: 'client-search',
    name: 'client-search',
    icon: 'lucide:search',
    hoverIcon: 'lucide:search',
    label: "file_search",
    component: "LazySearchPage",
    feature: "SEARCH",
    props: {
      pageSize: 20,
      pageNum: 0,
      ...params
    }
  } as TabItem
}
export const routeSmartFolderDetail = function (params: any) {
  return {
    id: "smart-folder-versions-" + new Date().getTime(),
    name: "smart-folder-versions-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.name,
    component: 'LazySmartFolderDetail',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const routeSmartFolderBrowse = function (params: any) {
  return {
    id: "smart-folder-versions-" + new Date().getTime(),
    name: "smart-folder-versions-" + params.id,
    icon: 'icon-park-outline:document-folder',
    label: params.name,
    component: 'LazySmartFolderBrowse',
    props: {
      id: params.id,
    }
  } as TabItem
}
export const routeSmartFolder = function (params: any) {
  return {
    id: "smart-folder",
    name: "smart-folder",
    icon: 'icon-park-outline:document-folder',
    label: 'adminMenu.smartFolder',
    component: 'LazySmartFolderPage',
    props: {
      id: params.id,
    }
  } as TabItem
}