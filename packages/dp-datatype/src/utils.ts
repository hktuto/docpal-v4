import type{ BaseType, StringType, NumberType, BooleanType, DateTimeType, JsonType, ListType, ReferenceType, FileType, ArrayType, ObjectType, RichTextType, GeoPointType, CustomType } from './types';
import { validateStringType } from './rules/string';
import { validateNumberType } from './rules/number';
import { validateBooleanType } from './rules/boolean';
import { validateDateTimeType } from './rules/dateTime';
import { validateJsonType } from './rules/json';
import { validateListType } from './rules/list';
import { validateReferenceType } from './rules/reference';
import { validateFileType } from './rules/file';
import { validateArrayType } from './rules/array';
import { validateObjectType } from './rules/object';
import { validateRichTextType } from './rules/richText';
import { validateGeoPointType } from './rules/geoPoint';
import { validateCustomType } from './rules/custom';

/**
 * Validate a value against a BaseType definition.
 * Returns true if valid, false otherwise.
 */
export function validateType(value: unknown, typeDef: BaseType): boolean {
  switch (typeDef.type) {
    case 'String':
      return validateStringType(value, typeDef as StringType);
    case 'Number':
      return validateNumberType(value, typeDef as NumberType);
    case 'Boolean':
      return validateBooleanType(value, typeDef as BooleanType);
    case 'DateTime':
      return validateDateTimeType(value, typeDef as DateTimeType);
    case 'Json':
      return validateJsonType(value, typeDef as JsonType);
    case 'List':
      return validateListType(value, typeDef as ListType);
    case 'Reference':
      return validateReferenceType(value, typeDef as ReferenceType);
    case 'File':
      return validateFileType(value, typeDef as FileType);
    case 'Array':
      return validateArrayType(value, typeDef as ArrayType);
    case 'Object':
      return validateObjectType(value, typeDef as ObjectType);
    case 'RichText':
      return validateRichTextType(value, typeDef as RichTextType);
    case 'GeoPoint':
      return validateGeoPointType(value, typeDef as GeoPointType);
    case 'Custom':
      return validateCustomType(value, typeDef as CustomType);
    default:
      return false;
  }
}

/**
 * Convert a value from one BaseType to another.
 * Returns the converted value, or the original value if conversion is not possible.
 */
export function convertType(value: unknown, fromType: BaseType, toType: BaseType): unknown {
  if (fromType.type === toType.type) return value;
  // String to Number
  if (fromType.type === 'String' && toType.type === 'Number') {
    const num = Number(value);
    return isNaN(num) ? value : num;
  }
  // Number to String
  if (fromType.type === 'Number' && toType.type === 'String') {
    return String(value);
  }
  // String to DateTime
  if (fromType.type === 'String' && toType.type === 'DateTime') {
    const date = new Date(value as string);
    return isNaN(date.getTime()) ? value : date;
  }
  // DateTime to String
  if (fromType.type === 'DateTime' && toType.type === 'String') {
    return value instanceof Date ? value.toISOString() : String(value);
  }
  // Boolean to String
  if (fromType.type === 'Boolean' && toType.type === 'String') {
    return value ? 'true' : 'false';
  }
  // String to Boolean
  if (fromType.type === 'String' && toType.type === 'Boolean') {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  }
  // List to String
  if (fromType.type === 'List' && toType.type === 'String') {
    return String(value);
  }
  // String to List (if value is in list)
  if (fromType.type === 'String' && toType.type === 'List') {
    if (toType.values.includes(value as any)) return value;
    return undefined;
  }
  // Array to String
  if (fromType.type === 'Array' && toType.type === 'String') {
    return JSON.stringify(value);
  }
  // String to Array
  if (fromType.type === 'String' && toType.type === 'Array') {
    try {
      const arr = JSON.parse(value as string);
      return Array.isArray(arr) ? arr : value;
    } catch {
      return value;
    }
  }
  // Fallback: return original value
  return value;
} 
