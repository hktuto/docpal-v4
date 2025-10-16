import { adminApi, clientApi } from 'api'

const userList = ref([])
const roleList = ref([])
const groupList = ref([])
const appPlatform = useAppPlatform()
export const usePermissionOption = () => useState('permission', () => ([]))

export const getFromServer = async function(loadUserList: boolean, loadRoleList: boolean, loadGroupList: boolean) {
  const options = usePermissionOption()
  options.value = []
  const api = appPlatform.value === 'admin' ? adminApi : clientApi

  try {
    if (loadUserList) {
      const user = await api.api.postNuxeoIdentityUsers().then((res) => res.data)
      userList.value = user || []
      if (userList.value.length > 0) {
        options.value.push(
          {
            label: 'User',
            value: 1,
            type: 'select',
            options: user.map((item: any) => item)
          }
        )
      }
    }

    if (loadRoleList) {
      const role = await api.api.postAclRoleList([{
        column: 'status',
        type: 'EQ',
        values: '1'
      }]).then((res) => res.data)
      roleList.value = role || []
      if (roleList.value.length > 0) {
        options.value.push(
          {
            label: 'Role',
            value: 2,
            type: 'select',
            options: role.map((item: any) => item)
          }
        )
      }
    }

    if (loadGroupList) {
      const group = await api.api.postNuxeoIdentityGroups().then((res) => res.data)
      groupList.value = group || []
      if (groupList.value.length > 0) {
        options.value.push(
          {
            label: 'Group',
            value: 3,
            type: 'select',
            options: group.map((item: any) => item)
          }
        )
      }
    }

  } catch (e) {
    console.log(e)
  }
  return options.value
}

// User, Role, Group Select Option
export const getPermissionSelectOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer(true, true, true)
  }
  return convertId(options.value)
}

// Role, Group Select Option
export const getRoleAndGroupPermissionSelectOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer(false, true, true)
  }
  return convertId(options.value)
}

function convertId(options: any) {
  return options.map((item: any) => ({
    ...item,
    options: item.options.map((option: any) => {
      const name = option.name || option.userName || option.username || ''
      let id = option.id
      switch (item.label) {
        case 'User':
          id = 'user_' + option.userId
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

// From the select array, convert permissions to objects. format: { "user": ["joshua"], "group": ['group_IT'], "role": ['role_cxv']}
export const convertPermissionObjectByPermissions = (permissions: any) => {
  const item: {} = {}
  permissions.forEach((key: string) => {
    const match = key.match(/^(user|role|group)_(.+)$/)
    if (match) {
      const [_, type, value] = match
      if (!item[type]) {
        item[type] = []
      }
      item[type].push(value)
    }
  })
  return item
}

// Convert permissions object to permission array.  format: [ "user_joshua","group_IT","role_cxv"  ]
export const convertPermissionsByPermissionObject = (permissions: {
  user: string[],
  role: string[],
  group: string[]
}) => {
  return Object.entries(permissions).flatMap(([key, values]) =>
    values.map(value => `${key}_${value}`)
  )
}

// To Select Options. output Data
export const convertSelectOptions = (permissions: any) => {
  const permission: any = []
  permissions.forEach((item: any) => {
    const type = item.dataType
    switch (type) {
      case 'user':
        permission.push(`user_${item.value}`)
        break
      case 'role':
        permission.push(`role_${item.value}`)
        break
      case 'group':
        permission.push(`group_${item.value}`)
        break
    }
  })
  return permission
}

// User Select Option
export const getUserPermissionSelectOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer(true, false, false)
  }

  return userList.value.map((item: any) => {
    const name = item.name || item.userName || item.username || ''
    return { label: name, value: item.userId, email: item.email, userId: item.userId }
  })
}

// Role Select Option
export const getRolePermissionSelectOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer(false, true, false)
  }

  return roleList.value.map((item: any) => {
    return { label: item.name, value: item.id }
  })
}

// Group Select Option
export const getGroupPermissionSelectOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer(false, false, true)
  }
  return groupList.value.map((item: any) => {
    return { label: item.name, value: item.id }
  })
}

export const getPermissionPairOption = async () => {
  const options = usePermissionOption()
  if (options.value.length === 0) {
    await getFromServer(true, true, true)
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
    await getFromServer(true, true, true)
    return options.value
  }
}

export const getUserSelectOption = async () => {
  const list: any = await adminApi.api.postNuxeoIdentityUsers().then((res) => res.data)
  if (list.length === 0) return []

  return list.map((item: any) => ({
    id: item.userId,
    name: item.username,
    email: item.email
  }))
}

export const getRoleSelectOption = async () => {
  const list: any = await adminApi.api.postAclRoleList([{
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
  let list = await adminApi.api.postNuxeoIdentityGroups().then((res) => res.data)
  if (list.length === 0) return []

  return list.map((item) => ({
    id: item.id,
    name: item.name
  }))
}