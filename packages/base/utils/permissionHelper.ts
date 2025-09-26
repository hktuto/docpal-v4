export type AllPermission = {
  permission: Permission
  print: boolean
  hold: any
  retention: any
}
export type Permission = 'Read' | 'ReadWrite' | 'ManageRecord' | 'ManageLegalHold' | 'Everything' | 'ACL-ReadWrite'
/**
 * A: active
 * D: de-active
 * R: remove
 * P: pending add
 * L: pending remove
 */
export type HoldStatus = 'A' | 'D' | 'R' | 'P' | 'L' | ''
const PermissionArray: Permission[] = ['Read', 'ACL-ReadWrite', 'ReadWrite', 'ManageRecord', 'ManageLegalHold', 'Everything']

type AllowToArgs = {
  feature: Permission
  permission: AllPermission
}

export const AllowTo = ({ feature, permission }: AllowToArgs) => {
  if (feature === 'Read') return true
  if (!permission) {
    console.log('permission is null')
    return false
  }
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
  console.log('check permission', PermissionArray.indexOf(userPermission) >= PermissionArray.indexOf(feature))
  return PermissionArray.indexOf(userPermission) >= PermissionArray.indexOf(feature)
}
type rbacPermission =
  | 'viewFolder'
  | 'viewMetadata'
  | 'print'
  | 'download'
  | 'read'
  | 'write'
  | 'editSubContent'
  | 'editMetadata'
  | 'share'
  | 'createSubFolder'
  | 'create'
  | 'delete'
  | 'deleteSubContent'
  | 'assignPermission'
  | 'addUserSet'
  | 'normal'
  | 'hold-write'
const permissionOptions = [
  { label: 'rbac.permission.viewFolder', value: 1, group: 'read', name: 'viewFolder' },
  { label: 'rbac.permission.viewMetadata', value: 2, group: 'read', name: 'viewMetadata' },
  { label: 'rbac.permission.print', value: 3, group: 'read', name: 'print', isFolder: 'false' },
  { label: 'rbac.permission.download', value: 4, group: 'read', name: 'download', isFolder: 'false' },
  { label: 'rbac.permission.read', value: 5, group: 'read', name: 'read' },

  { label: 'rbac.permission.editFolder', value: 6, group: 'write', name: 'write' },
  { label: 'rbac.permission.editSubContent', value: 7, group: 'write', name: 'editSubContent', isFolder: 'true' },
  { label: 'rbac.permission.editMetadata', value: 8, group: 'write', name: 'editMetadata' },
  { label: 'share.share', value: 9, group: 'write', name: 'share' },
  { label: 'rbac.permission.createFolder', value: 10, group: 'write', name: 'createSubFolder' },
  { label: 'rbac.permission.createFile', value: 11, group: 'write', name: 'create' },

  { label: 'rbac.permission.deleteFolder', value: 12, group: 'manage', name: 'delete' },
  { label: 'rbac.permission.deleteSubContent', value: 13, group: 'manage', name: 'deleteSubContent', isFolder: 'true' },
  { label: 'rbac.permission.assignPermission', value: 14, group: 'manage', name: 'assignPermission' },
  { label: 'rbac.permission.addUserSet', value: 15, group: 'manage', name: 'addUserSet' }
]
export const RbacAllowTo = (
  rbacPermission: rbacPermission | any,
  docDetail: any,
  isFolder: boolean | '' = ''
): boolean => {
  if (!docDetail) return false
  const permissionIds = docDetail?.permissionIds || []
  if (!permissionIds) return false
  if (['normal', 'read'].includes(rbacPermission)) return true
  
  // hold status is A, L, P, return false,hold folder is not editable
  if (!['hold-write'].includes(rbacPermission)) {
    if (!!docDetail.hold && ['A', 'L', 'P'].includes(docDetail.hold.status)) return false
  } else {
    rbacPermission = 'write'
  }
  if(!Array.isArray(permissionIds)) {
    console.error('permissionIds', permissionIds)
  }
  return permissionIds.some((id: number) => {
    const option = permissionOptions.find((opt) => {
      const optIsFolder = opt.isFolder === 'false' ? false : true
      const folderMatch = isFolder === '' || Boolean(isFolder) === optIsFolder || !('isFolder' in opt)
      return opt.value === id && folderMatch
    })

    return option && option.name === rbacPermission
  })
}
