import type { WidgetItem } from '@/types/vform'
import type { DocumentMetadata, VariableItem } from '@/types/vform.extend'
import { adminApi, clientApi } from 'api'
import dayjs from 'dayjs'
export const useMetadata = () => {
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
          metadataItem.type = item.type
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
            metadataItem = { ...item, ...item.items, type: item.type }
          }
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
          const selectResult = selectDecorator(metadataItem)
          _item.options = selectResult.options
          _item.type = selectResult.type
          break
        case 'date':
          const dateResult = dateDecorator(metadataItem)
          _item.options = dateResult.options
          _item.type = dateResult.type
          break
        case 'number':
          const numberResult = numberDecorator(metadataItem)
          _item.options = numberResult.options
          _item.type = numberResult.type
          break
        case 'text':
          _item.type = 'textarea'
          _item.options.maxLength = metadataItem.maxLength
          break
        case 'boolean':
          _item.type = 'switch'
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
      _item.options.validationName = metadataItem.validationName
      _item.options.validationType = metadataItem.type
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
      if (!item.options) return
      if (item.options.validationType === 'array') {
        if (!data[item.name]) return
        result[item.name] = Array.isArray(data[item.name]) ? data[item.name] : [data[item.name]]
        if (['case', 'workflow', 'document', 'date'].includes(item.options.validationName)) return
        if (['select', 'user_role_user_group'].includes(item.options.validationName)) return
        result[item.name] = result[item.name].map((citem: any) => {
          const selectItem = item.options.optionItems?.find((sitem: any) => sitem.value === citem)
          if (!selectItem) return ''
          return JSON.stringify(selectItem)
        })
      }
    })
    return result
  }
  function getParseData(data: Record<string, any>, variableList: VariableItem[]) {
    const result = { ...data }
    Object.keys(result).forEach((key) => {
      let resultItem = result[key]
      if (Array.isArray(resultItem)) {
        result[key] = resultItem.map((citem: any) => {
          const _citem = getParseDataItem(citem)
          console.log(_citem, 'citem')
          if (!_citem.value) return _citem
          return _citem.value
        })
      }
      const variableItem = variableList.find((item) => item.name === key)
      if (!variableItem) return
      if (variableItem.options.validationName === 'date') {
        result[key] = variableItem.options.type === 'daterange' ? result[key] : result[key].length > 0 ? result[key][0] : ''
      } else if (['case', 'workflow', 'document'].includes(variableItem.options.validationName)) {
        result[key] = result[key].length > 0 ? result[key][0] : ''
      } else if (['select', 'select-group'].includes(variableItem.type) && !variableItem.options.multiple && variableItem.name !== 'documentType') {
        result[key] = result[key].length > 0 ? result[key][0] : ''
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
function selectDecorator(data: any) {
  const result: any = {
    type: data.options && data.options[0] && data.options[0].options ? 'select-group' : 'select',
    options: {}
  }
  if (result.type === 'select-group' && data.options && data.options.length === 1 && (data.options[0] as any).options) {
    result.type = 'select'
    result.options.optionItems = (data.options[0] as any).options
  } else {
    result.options.optionItems = data.options
  }

  result.options.clearable = true
  result.options.filterable = true
  result.options.multiple = data.isMultiple || false
  return result
}
function numberDecorator(data: any) {
  const result: any = {
    type: 'number',
    options: {
      min: data.minimum,
      max: data.maximum,
      step: data.multipleOf || 1,
      precision: 0
    }
  }
  if (data.multipleOf) {
    if (data.multipleOf < 1) {
      const precision = data.multipleOf.toString().split('.')[1].length
      result.options.precision = precision
    } else {
      result.options.precision = 0
    }
  }
  return result
}
function dateDecorator(data: any) {
  const metaDateFormat = useDisplayTimeFormat()
  const result: any = {
    type: data.isMultiple ? 'date-range' : 'date',
    options: {
      format: 'YYYY-MM-DD',
      valueFormat: data.dateFormat || 'YYYY-MM-DD',
      type: 'date',
      defaultValue: ''
    }
  }
  if (result.type === 'date-range') {
    result.options.type = 'daterange'
    const defaultStartDate = dateDefaultDecorator(data.defaultValue, result.options.valueFormat)
    const defaultEndDate = formatDate(formatDate(defaultStartDate, 'YYYY-MM-DD 23:59:59'), result.options.valueFormat)
    result.options.defaultValue = [defaultStartDate, defaultEndDate]
    result.options.defaultTime = ['2000-01-01 00:00:00', '2000-01-01 23:59:00']
  } else {
    if (data.dateFormat) {
      result.options.format = data.dateFormat
    } else if (metaDateFormat.value) {
      result.options.format = metaDateFormat.value
      if (metaDateFormat.value?.includes('HH') || metaDateFormat.value?.includes('hh')) result.options.type = 'datetime'
    }
    if (data.dateOrDateTime) {
      result.options.type = data.dateOrDateTime.toLowerCase()
      result.options.defaultValue = dateDefaultDecorator(data.defaultValue, result.options.valueFormat)
    }
  }
  return result
}
function dateDefaultDecorator(defaultValue: any, valueFormat: string) {
  if (Date.parse(defaultValue)) {
    return formatDate(defaultValue, valueFormat)
  } else if (defaultValue === 'today') {
    return formatDate(dayjs().format('YYYY-MM-DD 00:00:00'), valueFormat)
  } else if (defaultValue === 'tomorrow') {
    return formatDate(dayjs().add(1, 'day').format('YYYY-MM-DD 00:00:00'), valueFormat)
  } else if (defaultValue === 'yesterday') {
    return formatDate(dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'), valueFormat)
  } else if (defaultValue === 'now') {
    return formatDate(dayjs().format('YYYY-MM-DD HH:mm:ss'), valueFormat)
  } else {
    return ''
  }
}
