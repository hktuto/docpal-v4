export type VariableItem = {
  name: string
  label: string
  type: 'date' | 'input' | 'switch' | 'textarea' | 'number' | 'select'
  disabled: Boolean
  hidden: Boolean
  required: Boolean
  // format?: string,
  options?: any
  // maxLength?: number,
  // onValidate?: string
}
export type MetadataType = MetadataMasterTable | MetadataNumber | MetadataBoolean | MetadataSelect | MetadataDate | MetadataText | MetadataUserRoleUserGroup | MetadataUser | MetadataSubForm
export type DocumentMetadata = Record<string, MetadataType>
export type MetadataConfig = {
  onMounted?: string
  type?: any
  label?: string
}
export type MetadataNumber = MetadataConfig & {
  validationName: 'number'
  minimum?: number
  maximum?: number
  multipleOf?: number
}
export type MetadataText = MetadataConfig & {
  validationName: 'text'
  maxLength?: number
}
export type MetadataBoolean = MetadataConfig & {
  validationName: 'boolean'
}
export type MetadataSelect = MetadataConfig & {
  validationName: 'select'
  options?: string[]
  isMultiple?: boolean
}
export type MetadataSubForm = MetadataConfig & {
  validationName: 'sub_form'
  widgetList?: MetadataType[]
}
export type MetadataDate = MetadataConfig & {
  validationName: 'date'
  dateOrDateTime?: 'date' | 'dateTime'
  format?: string
  defaultValue?: string
  dateFormat?: string
  isMultiple?: boolean
}
export type MetadataMasterTable = MetadataConfig & {
  validationName: 'mastertable'
  masterTableName?: string
  displayColumn?: string
  valueColumn?: string
  isMultiple?: boolean
  options?: {
    label: string
    value: string,
    options?: {
      label: string
      value: string
    }[]
  }[]
}
export type MetadataUserRoleUserGroup = MetadataConfig & {
  validationName: 'user_role_user_group'
  allow?: 'USER_ROLE' | 'USER_GROUP' | 'ALL'
  isMultiple?: boolean
  options?: {
    label: string
    value: string,
    options?: {
      label: string
      value: string
    }[]
  }[]
}
export type MetadataUser = MetadataConfig & {
  validationName: 'user'
  isMultiple?: boolean
  options?: {
    label: string
    value: string
  }[]
}
