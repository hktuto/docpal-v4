import { adminApi } from 'api'

export const usePermissionOption = () => useState('permission', () => ([]))

export const getFromServer = async function() {
  const options = usePermissionOption()
  const [user, role, group] = await Promise.all(
    await adminApi.api.postNuxeoIdentityUsers().then((res) => res.data),
    await adminApi.api.postAclRoleList([{
      column: 'status',
      type: 'EQ',
      values: '1'
    }]).then((res) => res.data),
    await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
  )
  if (user.length > 0) {
    userOptions.value = user
    usePermissionOption.value.push(
      {
        label: 'User',
        value: 1,
        type: 'select',
        options: user.map((item: any) => item)
      }
    )
  }

  if (roleData.length > 0) {
    roleOptions.value = roleData
    usePermissionOption.value.push(
      {
        label: 'Role',
        value: 2,
        type: 'select',
        options: role.map((item: any) => item)
      }
    )
  }

  if (group.length > 0) {
    groupOptions.value = group
    usePermissionOption.value.push(
      {
        label: 'Group',
        value: 3,
        type: 'select',
        options: group.map((item: any) => item)
      }
    )
  }
  return options.value
}

export const getPermissionSelectOption = async () => {
  const options = usePermissionOption()
  if (options.length === 0) await getFromServer()
  return options.value.map((item: any) => {
  })
}

export const getCachePermissionOptions = async () => {
  const options = usePermissionOption()
  if (options.length > 0) {
    getFromServer()
    return options.value
  } else {
    await getFromServer()
    return options.value
  }
}