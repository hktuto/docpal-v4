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
export type MetadataType = MetadataMasterTable | MetadataNumber | MetadataBoolean | MetadataSelect | MetadataDate | MetadataText | MetadataUserRoleUserGroup | MetadataUser
export type DocumentMetadata = Record<string, MetadataType>
export type MetadataNumber = {
  validationName: 'number'
  minimum?: number
  maximum?: number
  multipleOf?: number
  type?: any
}
export type MetadataText = {
  validationName: 'text'
  maxLength?: number
  type?: any
}
export type MetadataBoolean = {
  validationName: 'boolean'
  type?: any
}
export type MetadataSelect = {
  validationName: 'select'
  options?: string[]
  isMultiple?: boolean
  type?: any
}
export type MetadataDate = {
  validationName: 'date'
  dateOrDateTime?: 'date' | 'dateTime'
  format?: string
  defaultValue?: string
  dateFormat?: string
  isMultiple?: boolean
  type?: any
}
export type MetadataMasterTable = {
  validationName: 'mastertable'
  masterTableName?: string
  displayColumn?: string
  valueColumn?: string
  isMultiple?: boolean
  type?: any
  options?: {
    label: string
    value: string,
    options?: {
      label: string
      value: string
    }[]
  }[]
}
export type MetadataUserRoleUserGroup = {
  validationName: 'user_role_user_group'
  allow?: 'USER_ROLE' | 'USER_GROUP' | 'ALL'
  isMultiple?: boolean
  type?: any
  options?: {
    label: string
    value: string,
    options?: {
      label: string
      value: string
    }[]
  }[]
}
export type MetadataUser = {
  validationName: 'user'
  isMultiple?: boolean
  type?: any
  options?: {
    label: string
    value: string
  }[]
}
