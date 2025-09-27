
interface CaseDashboardProvider {
    caseTypeId: Ref<string | null>,
    instanceId?: Ref<string | null>,
    versionId?: Ref<string | null>,
    name: Ref<string | null>,
}

export const CaseManagementDashboardKey:InjectionKey<CaseDashboardProvider> = Symbol('caseManagementDashboard')
