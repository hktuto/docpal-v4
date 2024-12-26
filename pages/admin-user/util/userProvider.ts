import type { InjectionKey } from '#imports';

interface userProvider {
    getAllUserAndActiveCountApi: () => Promise<any>,
    BatchActiveUserApi: (params:any) => Promise<any>,
    BatchDeleteUserApi: (params:any) => Promise<any>,
    GetUserStatusApi: (params:any) => Promise<any>,
    GetAllUsersApi: (params:any) => Promise<any>,
    SetUserStatusApi: (params:any) => Promise<any>,
    CreateUserApi: (params:any) => Promise<any>,
}
interface userProviderDetail {
    openUserList: (openInNewTab?: boolean) => void,
    getUser: () => void,

    SetUserStatusApi: (params:any) => Promise<any>,
    BatchActiveUserApi: (params:any) => Promise<any>,
    BatchDeleteUserApi: (params:any) => Promise<any>,
    PatchUserApi: (params:any) => Promise<any>,
    PatchUserPasswordApi: (params:any) => Promise<any>,
    MemberGroupGetApi: (params:any) => Promise<any>,
    BatchUserRemoveGroupsApi: (params:any) => Promise<any>,
    BatchUserAddGroupsApi: (params:any) => Promise<any>,
    GetGroupListApi : () => Promise<any>,
}
interface groupProvider {

}
interface groupProviderDetail {
    DeleteGroupApi: (params:any) => Promise<any>,
    GetMemberListApi: (params:any) => Promise<any>,
    BatchGroupRemoveUsersApi: (params:any) => Promise<any>,

}
export const userProviderKey: InjectionKey<userProvider> = Symbol('userProvider');
export const userProviderDetailKey: InjectionKey<userProviderDetail> = Symbol('userProviderDetail');

export const groupProviderKey: InjectionKey<groupProvider> = Symbol('groupProvider');
export const groupProviderDetailKey: InjectionKey<groupProviderDetail> = Symbol('groupProviderDetail');
