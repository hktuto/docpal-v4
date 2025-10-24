
export type BaseType =
  | { type: 'String' }
  | { type: 'Number' }
  | { type: 'Boolean' }
  | { type: 'DateTime' }
  | { type: 'Json' }
  | { type: 'List' }
  | { type: 'Reference' }
  | { type: 'File' }
  | { type: 'Array' }
  | { type: 'Object' }
  | { type: 'RichText' }
  | { type: 'GeoPoint' }
  | { type: 'Custom' }

export type VariableType = 'text' | 'list' | 'table' | 'link' | 'image' | 'signature'

export interface Variable {
  id: string
  name: string
  type: VariableType | BaseType['type']
  displayValue: string
  value: any
  inUse: boolean
  createdBy: string
  createdAt: string
  updatedAt?: string
} 
