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
export type MetadataType = MetadataMasterTable | MetadataNumber | MetadataBoolean | MetadataSelect | MetadataDate | MetadataText | MetadataUserRoleUserGroup
export type DocumentMetadata = Record<string, MetadataType>
export type MetadataNumber = {
  validationName: 'number'
  minimum?: number
  maximum?: number
  multipleOf?: number
}
export type MetadataText = {
  validationName: 'text'
  maxLength?: number
}
export type MetadataBoolean = {
  validationName: 'boolean'
}
export type MetadataSelect = {
  validationName: 'select'
  options?: string[]
  isMultiple?: boolean
}
export type MetadataDate = {
  validationName: 'date'
  dateOrDateTime?: 'date' | 'dateTime'
  format?: string
  defaultValue?: string
  dateFormat?: string
}
export type MetadataMasterTable = {
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
export type MetadataUserRoleUserGroup = {
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
