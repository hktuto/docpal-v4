import { adminApi } from 'api'
import { clientApi } from 'api'

export const usePermissionOption = () => useState('permission', () => ([]))

export const getFromServer = async function() {
  const options = usePermissionOption()
  // 需要根據不同的環境調用對應的接口前綴
  const [user, role, group] = await Promise.all([
    adminApi.api.postNuxeoIdentityUsers().then((res) => res.data),
    adminApi.api.postAclRoleList([{
      column: 'status',
      type: 'EQ',
      values: '1'
    }]).then((res) => res.data),
    adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
  ])
  if (user.length > 0) {
    options.value.push(
      {
        label: 'User',
        value: 1,
        type: 'select',
        options: user.map((item: any) => item)
      }
    )
  }

  if (role.length > 0) {
    options.value.push(
      {
        label: 'Role',
        value: 2,
        type: 'select',
        options: role.map((item: any) => item)
      }
    )
  }

  if (group.length > 0) {
    options.value.push(
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
  if (options.value.length === 0) {
    await getFromServer()
  }
  return options.value.map((item: any) => ({
    ...item,
    options: item.options.map((option: any) => {
      const name = option.name || option.userName || option.username || ''
      let id = option.id
      switch (item.label) {
        case 'User':
          id = 'user_' + id
          break
        case 'Role':
          id = 'role_' + id
          break
        case 'Group':
          id = 'group_' + id
          break
      }
      return { value: id, label: name }
    })
  }))
}

export const getPermissionPairOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer()
  }
  return options.value.map((item: any) => ({
    ...item,
    options: item.options.map((option: any) => {
      const name = option.name || option.userName || option.username || ''
      return { value: option.id, label: name }
    })
  }))
}

export const getCachePermissionOptions = async () => {
  const options = usePermissionOption()
  if (options.value.length > 0) {
    return options.value
  } else {
    await getFromServer()
    return options.value
  }
}

export const getUserSelectOption = async () => {
  const list = await adminApi.api.postNuxeoIdentityUsers().then((res) => res.data)
  if (list.length === 0) return []

  return list.map((item: any) => ({
    id: item.id,
    name: item.username,
    email: item.email
  }))
}

export const getRoleSelectOption = async () => {
  const list = await adminApi.api.postAclRoleList([{
    column: 'status',
    type: 'EQ',
    values: '1'
  }]).then((res) => res.data)
  if (list.length === 0) return []

  return list.map((item) => ({
    id: item.id,
    name: item.name
  }))
}

export const getGroupsSelectOption = async () => {
  return await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
}