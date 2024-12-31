import type { InjectionKey } from '#imports';

interface masterTableProvider {
}

export const MasterTableProviderKey : InjectionKey<masterTableProvider> = Symbol('masterTableProvider');
export const openMasterTablePage = () => {
  return {
    id:"admin-master-table",
    name: 'admin-master-table',
    label: "adminMenu.masterTable",
    icon: "uil:database-alt",
    hoverIcon: "uil:database-alt",
    component: "LazyMasterTablePage",
    props:{
    }
  }
}
