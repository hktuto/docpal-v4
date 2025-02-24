import { InjectionKey, Ref } from "vue";

interface CaseDashboardProvider {
    caseTypeId: Ref<string | null>,
    instanceId?: Ref<string | null>,
    caseVersionId?: Ref<string | null>,
    name: Ref<string | null>,
}

export const CaseManagementDashboardKey:InjectionKey<CaseDashboardProvider> = Symbol('caseManagementDashboard')
