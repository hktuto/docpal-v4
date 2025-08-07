import type { WidgetItem } from '@/types/vform'
import type { DocumentMetadata, VariableItem } from '@/types/vform.extend'
import { adminApi, clientApi } from 'api'
export const useMetadata = () => {
  const dateMap = {
    today: 'today',
    tomorrow: 'tomorrow',
    yesterday: 'yesterday',
    now: 'now'
  }
  const metadataMap = useState<Record<string, DocumentMetadata>>('metadataMap', () => ({}))
  const ignoreList = [
    'dc:title',
    'dc:creator',
    'dc:modified',
    'dc:lastContributor',
    'dc:created',
    'dc:publisher',
    'dc:contributors',
    'common:icon',
    'common:icon-expanded',
    'uid:uid',
    'uid:major_version',
    'uid:minor_version',
    'file:content',
    'files:files',
    'nxtag:tags',
    'relatedtext:relatedtextresources',
    'sec:clearanceLevel',
    'sec:securityKeyword'
  ]
  const getDocumentMetadata = async (type: string): Promise<any> => {
    // if (metadataMap.value[type]) return metadataMap.value[type]
    try {
      type = 'testOy'
      const { data }: any = await clientApi.api.getTypesMetadataGenerateJsonSchemaDocpaltypename(type, {
        headers: { noThrowError: 'true' }
      })
      const metadataList: any = data.properties || {}
      const properties: DocumentMetadata = {}
      const promises: Promise<any>[] = []
      Object.keys(metadataList).forEach(async (key) => {
        let item: any = metadataList[key]
        let metadataItem: any = {
          validationName: item.validationName
        }
        if (item.items) {
          metadataItem.validationName = item.items.validationName
          metadataItem.isMultiple = item.isMultiple
          if (item.items.validationName === 'select') {
            metadataItem.options = item.items.enum.map((item: any) => ({
              label: item,
              value: item
            }))
          } else if (item.items.validationName === 'mastertable') {
            promises.push(
              getMasterTableOptions(item.items.info).then((options) => {
                metadataItem.options = options
              })
            )
          } else if (item.items.validationName === 'user_role_user_group') {
            // allow USER_ROLE, USER_GROUP, ALL
            metadataItem.options = []
            item.items.allow = 'USER_ROLE'
            if (item.items.allow !== 'USER_GROUP') {
              promises.push(
                getRoleList().then((options) => {
                  metadataItem.options.push({
                    label: 'user_role',
                    value: 'role____',
                    options: options
                  })
                })
              )
            }
            if (item.items.allow !== 'USER_ROLE') {
              promises.push(
                getUserGroupList().then((options) => {
                  metadataItem.options.push({
                    label: 'user_group',
                    value: 'group____',
                    options: options
                  })
                })
              )
            }
          } else {
            metadataItem = { ...item.items }
          }
          // TODO role
          // TODO case
          // TODO workflow
          // TODO document
        } else {
          metadataItem = { ...item }
        }
        properties[key] = metadataItem
      })
      await Promise.all(promises)
      metadataMap.value[type] = properties
      return metadataMap.value[type]
    } catch (error) {
      return null
    }
  }
  const getVFormWidgetList = (metadataListMap: DocumentMetadata): VariableItem[] => {
    const metaDateFormat = useDisplayTimeFormat()
    const widgetVariableList: VariableItem[] = []
    Object.keys(metadataListMap).forEach((key) => {
      if (ignoreList.indexOf(key) !== -1) return
      const metadataItem = metadataListMap[key]
      const _item: any = {
        name: key,
        label: key,
        type: 'input',
        required: false,
        options: {}
      }

      switch (metadataItem.validationName) {
        case 'user_role_user_group':
        case 'mastertable':
        case 'select':
          if (metadataItem.options && metadataItem.options[0] && (metadataItem.options[0] as any).options) {
            _item.type = 'select-group'
          } else {
            _item.type = 'select'
          }
          if (_item.type === 'select-group' && metadataItem.options && metadataItem.options.length === 1 && (metadataItem.options[0] as any).options) {
            _item.type = 'select'
            _item.options.optionItems = (metadataItem.options[0] as any).options
          } else {
            _item.options.optionItems = metadataItem.options
          }

          _item.options.clearable = true
          _item.options.filterable = true
          _item.options.multiple = metadataItem.isMultiple
          // _item.options.multipleLimit = 5
          break
        case 'date':
          console.log(metadataItem, 'metadataItem')
          _item.type = 'date'
          if (metadataItem.dateFormat) {
            _item.options.format = metadataItem.dateFormat
          } else if (metaDateFormat.value) {
            _item.options.format = metaDateFormat.value
            if (metaDateFormat.value?.includes('HH') || metaDateFormat.value?.includes('hh')) _item.options.type = 'datetime'
          }
          if (metadataItem.dateOrDateTime) {
            _item.options.displayType = metadataItem.dateOrDateTime
          }
          break
        case 'number':
          _item.type = 'number'
          _item.options.min = metadataItem.minimum
          _item.options.max = metadataItem.maximum
          if (metadataItem.multipleOf) {
            if (metadataItem.multipleOf < 1) {
              const precision = metadataItem.multipleOf.toString().split('.')[1].length
              _item.options.precision = precision
            } else {
              _item.options.precision = 0
            }
            _item.options.step = metadataItem.multipleOf
          }
          break
        case 'text':
          _item.type = 'textarea'
          _item.options.maxLength = metadataItem.maxLength
          break
        case 'boolean':
          _item.type = 'checkbox'
          break
        default:
          const item = metadataItem as any
          if (item && item.maxLength && item.maxLength > 0) {
            _item.options.maxLength = item.maxLength
            if (item.maxLength > 60) {
              _item.type = 'textarea'
            } else {
              _item.type = 'input'
            }
          }
          break
      }
      widgetVariableList.push(_item)
    })
    return widgetVariableList
  }
  const getMasterTableOptions = async ({
    masterTableName,
    displayColumn,
    valueColumn
  }: {
    masterTableName: string
    displayColumn: string
    valueColumn: string
  }): Promise<any> => {
    try {
      const record: any = await clientApi.api
        .postMasterTablesRecordPageNonpermission({
          name: masterTableName
        })
        .then((res) => res.data)
      const options: any[] = record.map((item: any) => ({
        label: item[displayColumn],
        value: item[valueColumn]
      }))
      return options
    } catch (error) {
      return []
    }
  }
  const initVformVariableList = async (type: string) => {
    const metadataList = await getDocumentMetadata(type)
    const variableList: VariableItem[] = getVFormWidgetList(metadataList)
    return variableList
  }
  function getStringfyData(data: Record<string, any>, variableList: VariableItem[]) {
    // const variableList: VariableItem[] = getVFormWidgetList(data)
    const result = data ? { ...data } : {}
    variableList.forEach((item) => {
      if (item.type === 'select' && !['documentType'].includes(item.name)) {
        if (!data[item.name]) return
        console.log(data[item.name])

        result[item.name] = Array.isArray(data[item.name]) ? data[item.name] : [data[item.name]]
        result[item.name] = result[item.name].map((citem: any) => {
          const selectItem = item.options.optionItems.find((sitem: any) => sitem.value === citem)
          if (!selectItem) return ''
          return JSON.stringify(selectItem)
        })
      }
    })
    return result
  }
  function getParseData(data: Record<string, any>, variableList: VariableItem[]) {
    const result = { ...data }
    variableList.forEach((item) => {
      if (item.type === 'select' && !['documentType'].includes(item.name)) {
        if (!result[item.name]) return
        console.log(result)

        result[item.name] = result[item.name].map((citem: any) => {
          const _citem = getParseDataItem(citem)
          if (!_citem.value) return _citem
          return _citem.value
        })
      }
    })
    return result
  }
  function getParseDataItem(s: string) {
    try {
      return JSON.parse(s)
    } catch (error) {
      return s
    }
  }
  return {
    // getDocumentMetadata,
    // getVFormWidgetList,
    initVformVariableList,
    getStringfyData,
    getParseData
  }
}

async function getRoleList(prefix: string = 'role____') {
  try {
    const data = await adminApi.api.getAclRoleRoot().then((res: any) => res.data)
    const roleList = data ? makeFlapRoleList([data]) : []
    return roleList.map((item: any) => ({
      label: item.name,
      value: prefix + item.id
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}

function makeFlapRoleList(data: any[], roleList: any[] = []) {
  data.forEach((node) => {
    const _node = { ...node }
    delete _node.children
    roleList.push(_node)
    if (node.children) {
      makeFlapRoleList(node.children, roleList)
    }
  })
  return roleList
}
async function getUserGroupList(prefix: string = 'group____') {
  try {
    const { data }: any = await adminApi.api.postNuxeoIdentityGroups()
    return data.map((item: any) => ({
      label: item.name,
      value: prefix + item.id
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
