import type { InjectionKey } from '#imports';

interface userProvider {
    getAllUsersApi: (params:any) => Promise<any>,
    SetUserStatusApi: (params:any) => Promise<any>,
    BatchActiveUserApi: (params:any) => Promise<any>,
    BatchDeleteUserApi: (params:any) => Promise<any>,
    getAllUserAndActiveCountApi: () => Promise<any>,
    BatchUsersToGroupsApi: (params:any) => Promise<any>,
    GetGroupListApi : () => Promise<any>,
    openUserDetail: (data:any, openInNewTab?:boolean) => void,
    sendInvitation:(data:any) => void
}
interface userProviderDetail {
    openUserList: (openInNewTab?: boolean) => void,
    getUser: () => void,

    SetUserStatusApi: (params:any) => Promise<any>,
    BatchActiveUserApi: (params:any) => Promise<any>,
    BatchDeleteUserApi: (params:any) => Promise<any>,
    PatchUserPasswordApi: (params:any) => Promise<any>,
    MemberGroupGetApi: (params:any) => Promise<any>,
    BatchUserRemoveGroupsApi: (params:any) => Promise<any>,
    BatchUserAddGroupsApi: (params:any) => Promise<any>,
    GetGroupListApi : () => Promise<any>,
}
interface groupProvider {
    openGroupDetail:(data:any, openInNewTab?:boolean) => void,
    GetGroupListApi : () => Promise<any>,
    DeleteGroupApi: (params:any) => Promise<any>,
    CreateGroupApi: (params:any) => Promise<any>,
}
interface groupProviderDetail {
    DeleteGroupApi: (params:any) => Promise<any>,
    GetMemberListApi: (params:any) => Promise<any>,
    BatchGroupRemoveUsersApi: (params:any) => Promise<any>,
    BatchGroupAddUsersApi: (params:any) => Promise<any>,
}
export const userProviderKey: InjectionKey<userProvider> = Symbol('userProvider');
export const userProviderDetailKey: InjectionKey<userProviderDetail> = Symbol('userProviderDetail');

export const groupProviderKey: InjectionKey<groupProvider> = Symbol('groupProvider');
export const groupProviderDetailKey: InjectionKey<groupProviderDetail> = Symbol('groupProviderDetail');
