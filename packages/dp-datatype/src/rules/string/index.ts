import { StringType } from '../../types';
import { email } from './email';
import { address } from './address';
import { country } from './country';
import { string } from './string';
import { validateHKID } from './validateHKID';

export const stringFormatValidators = {
  email,
  address,
  country,
  string,
  validateHKID,
};

/**
 * Validate a value against a StringType definition.
 * Returns true if valid, false otherwise.
 */
export function validateStringType(value: unknown, typeDef: StringType): boolean {
  if (typeof value !== 'string') return false;
  if (typeDef.minLength !== undefined && value.length < typeDef.minLength) return false;
  if (typeDef.maxLength !== undefined && value.length > typeDef.maxLength) return false;
  // Format validation (formatFunction or format)
  if (typeDef.formatFunction && stringFormatValidators[typeDef.formatFunction]) {
    if (!stringFormatValidators[typeDef.formatFunction](value, typeDef.formatParams)) return false;
  } else if (typeDef.format && stringFormatValidators[typeDef.format]) {
    if (!stringFormatValidators[typeDef.format](value, typeDef.formatParams)) return false;
  }
  // Extensible validation
  if (typeDef.validateFunction && stringFormatValidators[typeDef.validateFunction]) {
    if (!stringFormatValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
  }
  return true;
} 
