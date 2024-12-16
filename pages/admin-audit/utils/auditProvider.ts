import type { InjectionKey } from '#imports';


interface AuditProvider {
    getListApi: (params:any) => Promise<any>,
    goClientPath:(path:string) => void
}

export const AuditProviderKey : InjectionKey<AuditProvider> = Symbol('auditProvider');