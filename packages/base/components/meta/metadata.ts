import type { WidgetItem } from '@/types/vform'
import type { DocumentMetadata, VariableItem } from '@/types/vform.extend'
import { adminApi, clientApi } from 'api'
import { mounteMasterTableOptions, mounteRoleOptions } from './metadata.vform.extent'
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
  let count = 0
  const getDocumentMetadata = async (type: string, initOptions = true): Promise<any> => {
    if (metadataMap.value[type]) return metadataMap.value[type]
    try {
      // type = 'testOy'
      const { data }: any = await clientApi.api.getTypesMetadataGenerateJsonSchemaDocpaltypename(type, {
        headers: { noThrowError: 'true' }
      })
      const metadataSchema: any = data.properties || {}
      metadataMap.value[type] = await initMetadataVformOptions(metadataSchema, initOptions)
      return metadataMap.value[type]
    } catch (error) {
      return null
    }
  }
  const initMetadataVformOptions = async (metadataSchema: any, initOptions = true) => {
    const promises: Promise<any>[] = []
    const properties: DocumentMetadata = {}
    Object.keys(metadataSchema).forEach(async (key) => {
      let item: any = metadataSchema[key]
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
          if (initOptions) {
            promises.push(
              getMasterTableOptions(item.items.info).then((options) => {
                metadataItem.options = options
              })
            )
          } else if (item.items.info.masterTableName && item.items.info.displayColumn && item.items.info.valueColumn) {
            metadataItem.onMounted = mounteMasterTableOptions(item.items.info.masterTableName, item.items.info.displayColumn, item.items.info.valueColumn)
          }
        } else if (item.items.validationName === 'user_role_user_group') {
          if (initOptions) {
            // allow USER_ROLE, USER_GROUP, ALL
            metadataItem.options = []
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
            metadataItem.onMounted = mounteRoleOptions(item.items.allow !== 'USER_GROUP', item.items.allow !== 'USER_ROLE', false)
          }
        } else if (item.items.validationName === 'user') {
          metadataItem.options = []
          if (initOptions) {
            promises.push(
              getUserList().then((options) => {
                metadataItem.options = options
              })
            )
          } else {
            metadataItem.onMounted = mounteRoleOptions(false, false, true)
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
    return properties
  }
  const getVFormVariableListByMetadata = (metadataListMap: DocumentMetadata, initOptions: any): VariableItem[] => {
    const widgetVariableList: VariableItem[] = []
    Object.keys(metadataListMap).forEach((key) => {
      if (ignoreList.indexOf(key) !== -1 || initOptions.hiddenFields.includes(key)) return
      const metadataItem = metadataListMap[key]
      const _item: any = {
        name: key,
        label: metadataItem.label || key,
        type: 'input',
        required: initOptions.readonlyFields.includes(key) ? false : initOptions.requiredFields.includes(key) ? true : false,
        disabled: initOptions.readonlyFields.includes(key) ? true : false,
        options: {}
      }

      switch (metadataItem.validationName) {
        case 'user':
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
          _item.options.maxLength = metadataItem.maxLength || 0
          const row60 = (_item.options.maxLength / 60).toFixed(0)
          _item.options.rows = Number(row60) > 0 ? Number(row60) : 1 
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
      if (metadataItem.onMounted) {
        _item.options.onMounted = metadataItem.onMounted
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
  const initVformVariableList = async (type: string, initOptions: any) => {
    if (!initOptions) initOptions = {}
    if (!initOptions.hiddenFields) initOptions.hiddenFields = []
    if (!initOptions.requiredFields) initOptions.requiredFields = []
    if (!initOptions.readonlyFields) initOptions.readonlyFields = []
    const metadataList = await getDocumentMetadata(type)
    const variableList: VariableItem[] = getVFormVariableListByMetadata(metadataList, initOptions)
    return variableList
  }
  function getStringfyData(data: Record<string, any>, variableList: VariableItem[]) {
    const result: any =  {}
    variableList.forEach((item) => {
      if (!item.options) return
      if (item.options.validationType === 'array') {
        if (!data[item.name]) return []
        result[item.name] = Array.isArray(data[item.name]) ? data[item.name] : [data[item.name]]
        if (['case', 'workflow', 'document', 'date'].includes(item.options.validationName)) return
        if (['select'].includes(item.options.validationName)) return
        result[item.name] = result[item.name].map((citem: any) => {
          let selectItem = item.options.optionItems?.find((sitem: any) => sitem.value === citem)
          if (!selectItem) {
            selectItem = {
              label: citem,
              value: citem
            }
          }
          return JSON.stringify(selectItem)
        })
      } else if(item.options.validationName === 'boolean') {
        result[item.name] = data[item.name] ? true : false
      } else if(data[item.name]) {
        result[item.name] = data[item.name]
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
          if (!_citem.value) return _citem
          return _citem.value
        }).filter((item: any) => !!item)
      }
      const variableItem = variableList.find((item) => item.name === key)
      if (!variableItem) return
      if (variableItem.options.validationName === 'date') {
        if (!result[key]) result[key] = []
        result[key] = variableItem.options.type === 'daterange' ? result[key] : result[key].length > 0 ? result[key][0] : ''
      } else if (['case', 'workflow', 'document'].includes(variableItem.options.validationName)) {
        result[key] = result[key].length > 0 ? result[key][0] : ''
      } else if (['select', 'select-group'].includes(variableItem.type) && !variableItem.options.multiple && variableItem.name !== 'documentType') {
        result[key] = result[key].length > 0 ? result[key][0] : ''
      } else if (variableItem.options.multiple && !result[key]) {
        result[key] = []
      }
    })
    return result
  }
  function generateId(prefix: string = '') {
    const random = Math.floor(100000 + Math.random() * 900000)
    return `${prefix}_${random}${count++}`
  }
  function vFormWidgetListDecorator(variableList: VariableItem[]) {
    const widgetList: WidgetItem[] = []
    variableList.forEach((item: VariableItem, index: number) => {
      const id = generateId(item.type)
      const _item: WidgetItem = {
        key: id,
        id: id,
        type: item.type,
        formItemFlag: true,
        options: {
          name: item.name,
          label: item.label ? item.label : item.name,
          required: item.required ? true : false,
          defaultValue: '',
          size: '',
          columnWidth: '',
          placeholder: '',
          readonly: false,
          disabled: item.disabled ? true : false,
          hidden: false,
          clearable: true,
          requiredHint: '',
          onValidate: '',
          onCreated: '',
          onMounted: '',
          onInput: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onEnter: ''
        }
      }
      if (!['date', 'input', 'switch', 'textarea', 'number', 'select', 'json-editor', 'divider', 'select-group', 'date-range'].includes(item.type))
        _item.type = 'input'
      if (item.type === 'date') {
        _item.options.format = item.options.type === 'datetime' ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD' //日期显示格式
        _item.options.valueFormat = 'YYYY-MM-DDTHH:mm:ss.000Z'
        _item.options.onDisabledDate =
          "const myDate = new Date();\nconst year = myDate.getFullYear() + 100;  \nconst minDate = new Date('1901-01-01 00:00:00').getTime()\nconst maxDate = new Date(year + '-12-31 23:59:59').getTime()\nreturn dateTime.getTime() < minDate || dateTime.getTime() > maxDate;"
      } else if (item.type === 'input') {
        _item.options.type = 'text'
        _item.options.maxLength = 255
        _item.options.showWordLimit = true
      } else if (item.type === 'textarea') {
        _item.options.rows = 5
        _item.options.maxLength = 4000
        _item.options.showWordLimit = true
      } else if (item.type === 'number') {
        _item.options.defaultValue = 0
        _item.options.min = -999999999999998
        _item.options.max = 999999999999998
        _item.options.controlsPosition = 'right'
      } else if (item.type === 'switch') {
        // _item.activeText = ''
        // _item.inactiveText = ''
        _item.options.defaultValue = false
        _item.options.labelIconPosition = 'rear'
      } else if (item.type === 'select') {
      }
      if (item.options) _item.options = { ..._item.options, ...item.options }
      widgetList.push(_item)
    })
    return widgetList
  }
  return {
    vFormWidgetListDecorator,
    getVFormVariableListByMetadata,
    initVformVariableList,
    initMetadataVformOptions,
    getStringfyData,
    getParseData
  }
}

const ignoreDisplayList = [
  'file:content',
  'nxtag:tags',
  'dc:creator',
  'dc:title',
  'dpc:startDate',
  'dpe:approver',
  'dpm:contractExpirationDate',
  'dpa:docpalType',
  'maskList',
  'readonlyList'
]
export function getDisplayProperties(properties: Record<string, any>) {
  if (!properties) return []
  const result: any = []
  Object.keys(properties).forEach((key) => {
    if (ignoreDisplayList.includes(key)) return
    const propertyItem = properties[key]
    if (Array.isArray(propertyItem)) {
      result.push({
        metaData: key,
        value: propertyItem.map((item: any) => getParseDataItem(item))
      })
    } else {
      result.push({
        metaData: key,
        value: propertyItem
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
async function getUserList() {
  try {
    const { data }: any = await clientApi.api.postNuxeoIdentityUsers()
    return data.map((item: any) => ({
      label: item.username,
      value: item.userId
    }))
  } catch (error) {
    console.error(error)
    return []
  }
}
async function getRoleList(type: string = 'role') {
  try {
    const data = await adminApi.api.getAclRoleRoot().then((res: any) => res.data)
    const roleList = data ? makeFlapRoleList([data]) : []
    return roleList.map((item: any) => ({
      label: item.name,
      value: item.id,
      type: type
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
async function getUserGroupList(type: string = 'group') {
  try {
    const { data }: any = await adminApi.api.postNuxeoIdentityGroups()
    return data.map((item: any) => ({
      label: item.name,
      value: item.id,
      type: type
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
  if (result.type === 'select-group' && data.options && data.options.length === 1 && data.options[0].options) {
    result.type = 'select'
    result.options.optionItems = data.options[0].options
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
