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
export type MetadataType = MetadataMasterTable | MetadataNumber | MetadataBoolean | MetadataSelect | MetadataDate | MetadataText
export type DocumentMetadata = Record<string, MetadataType>
export type MetadataNumber = {
  validationRuleName: 'number'
  minimum?: number
  maximum?: number
  multipleOf?: number
}
export type MetadataText = {
  validationRuleName: 'text'
  maxLength?: number
}
export type MetadataBoolean = {
  validationRuleName: 'boolean'
}
export type MetadataSelect = {
  validationRuleName: 'select'
  options?: string[]
  isMultiple?: boolean
}
export type MetadataDate = {
  validationRuleName: 'date'
  dateOrDateTime?: 'date' | 'dateTime'
  format?: string,
  defaultValue ?: string
}
export type MetadataMasterTable = {
  validationRuleName: 'mastertable'
  masterTableName?: string
  displayColumn?: string
  valueColumn?: string
  isMultiple?: boolean
  options?: {
    label: string
    value: string
  }[]
}
