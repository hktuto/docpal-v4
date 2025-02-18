export type AllPermission = {
    permission: Permission,
    print: boolean,
    hold: any,
    retention: any
}
export type Permission = "Read" | "ReadWrite" | "ManageRecord" | "ManageLegalHold" | "Everything" | "ACL-ReadWrite";
/**
 * A: active
 * D: de-active
 * R: remove
 * P: pending add
 * L: pending remove
 */
export type HoldStatus = "A" | "D" | "R" | "P" | "L" | "";
const PermissionArray:Permission[] = ["Read", "ACL-ReadWrite", "ReadWrite", "ManageRecord","ManageLegalHold", "Everything"];

type AllowToArgs = {
    feature: Permission;
    permission: AllPermission
}
export const AllowTo = ({feature, permission}:AllowToArgs) => {
    if(feature === 'Read') return true
    if(!permission) return false
    // 针对 hold-policy, 仅 acl 为 ReadWrite 权限时显示
    if (feature !== 'ACL-ReadWrite') {
        if (!!permission.hold && ['A', 'L', 'P'].includes(permission.hold.status)) return false
    }
    if (!!permission.retention && permission.retention.status) return false
    const userPermission = permission.permission
    // ['A', 'L', 'P'].includes(holdStatus)
    // FIXME: Y add this?
    // if (!userPermission || feature === 'Read') {
    //     return false;
    // }
    return PermissionArray.indexOf(userPermission) >= PermissionArray.indexOf(feature);
};