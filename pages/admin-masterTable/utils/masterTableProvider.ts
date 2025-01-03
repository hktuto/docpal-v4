import type { InjectionKey } from '#imports';

interface masterTableProvider {
  GetMasterTablesPageApi:(params:any) => Promise<any>
  DeleteMasterTablesApi:(params:any) => Promise<any>
  GetMasterTablesPageConditionApi:(params:any) => Promise<any>
  UpdateMasterTableApi:(params:any) => Promise<any>
  openDetail:(row:any) => void
  openNew:() => void
}

export const MasterTableProviderKey : InjectionKey<masterTableProvider> = Symbol('masterTableProvider');
export function getIgnoreSchemas () {
  return ['id', 'created_date', 'created_by','modified_date', 'modified_by','status']
}
