import type { InjectionKey } from '#imports';

interface masterTableProvider {
  GetMasterTablesPageApi:(params:any) => Promise<any>
  DeleteMasterTablesApi:(params:any) => Promise<any>
  GetMasterTablesPageConditionApi:(params:any) => Promise<any>
  UpdateMasterTableApi:(params:any) => Promise<any>
  GetMasterTablesLogsApi:(params:any) => Promise<any>
  GetMasterTablesLogConditionsApi:(params:any) => Promise<any>
  openDetail:(row:any) => void
  openNew:() => void
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
