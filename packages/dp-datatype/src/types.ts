// Type definitions for DocPal V4 To-Be Data Type System
// Generated from requirement.md and to-be.md

/**
 * StringType supports format, formatFunction (for registry-based validation), formatParams (for custom parameters),
 * validateFunction (for custom validation logic), and validateParams (for custom validation parameters).
 */
export type StringType = {
  type: 'String';
  minLength?: number;
  maxLength?: number;
  format?: string; // e.g., 'email', 'address', 'country', etc.
  formatFunction?: string; // e.g., 'validateHKID', 'customFormat'
  formatParams?: Record<string, unknown>; // parameters for custom validation
  multiline?: boolean;
  localized?: boolean;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * NumberType supports validateFunction and validateParams for extensible validation.
 */
export type NumberType = {
  type: 'Number';
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * BooleanType supports validateFunction and validateParams for extensible validation.
 */
export type BooleanType = {
  type: 'Boolean';
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * DateTimeType supports validateFunction and validateParams for extensible validation.
 */
export type DateTimeType = {
  type: 'DateTime';
  format?: string;
  timezone?: string;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * JsonType supports validateFunction and validateParams for extensible validation.
 */
export type JsonType = {
  type: 'Json';
  schema?: object;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * ListType supports validateFunction and validateParams for extensible validation.
 */
export type ListType = {
  type: 'List';
  values: (string | number)[];
  labels?: string[];
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * ReferenceType supports validateFunction and validateParams for extensible validation.
 */
export type ReferenceType = {
  type: 'Reference';
  targetType: string;
  multiple?: boolean;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * FileType supports validateFunction and validateParams for extensible validation.
 */
export type FileType = {
  type: 'File';
  mimeTypes?: string[];
  maxSize?: number;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * ArrayType supports validateFunction and validateParams for extensible validation.
 */
export type ArrayType = {
  type: 'Array';
  itemType: BaseType;
  minItems?: number;
  maxItems?: number;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * ObjectType supports validateFunction and validateParams for extensible validation.
 */
export type ObjectType = {
  type: 'Object';
  fields: Record<string, BaseType>;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * RichTextType supports validateFunction and validateParams for extensible validation.
 */
export type RichTextType = {
  type: 'RichText';
  allowedFormats?: string[];
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * GeoPointType supports validateFunction and validateParams for extensible validation.
 */
export type GeoPointType = {
  type: 'GeoPoint';
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

/**
 * CustomType supports validateFunction and validateParams for extensible validation.
 */
export type CustomType = {
  type: 'Custom';
  definition: object;
  required?: boolean;
  meta?: Record<string, unknown>;
  validateFunction?: string;
  validateParams?: Record<string, unknown>;
};

export type BaseType =
  | StringType
  | NumberType
  | BooleanType
  | DateTimeType
  | JsonType
  | ListType
  | ReferenceType
  | FileType
  | ArrayType
  | ObjectType
  | RichTextType
  | GeoPointType
  | CustomType; 
 