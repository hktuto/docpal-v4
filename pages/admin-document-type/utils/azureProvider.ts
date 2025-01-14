import type { InjectionKey } from '#imports';

interface AzureProvider {
    UpdateAzureApiKeyApi: (params:any) => Promise<any>,
    GetAzureSettingApi?: (params:any) => Promise<any>,
    UpdateAzureOcrSettingApi: (params:any) => Promise<any>,
    CreateAzureOcrMappingApi: (params:any) => Promise<any>,
    UpdateAzureOcrMappingApi: (params:any) => Promise<any>,
    GetAzureOcrModelsApi: (params:any) => Promise<any>,
    goClientPath:(path:string) => void,
    GetOCRTransactionLogApi: (params: any) => Promise<any>,
}

export const AzureProviderKey : InjectionKey<AzureProvider> = Symbol('azureProvider');