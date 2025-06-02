import { ObjectType } from '../../types';
import { validateType } from '../../utils';

export const objectValidators = {
  // Add custom Object validators as needed
};

/**
 * Validate a value against an ObjectType definition.
 * Returns true if valid, false otherwise.
 */
export function validateObjectType(value: unknown, typeDef: ObjectType): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  for (const key in typeDef.fields) {
    if (!validateType((value as any)[key], typeDef.fields[key])) return false;
  }
  // Extensible validation
  if (typeDef.validateFunction && objectValidators[typeDef.validateFunction]) {
    if (!objectValidators[typeDef.validateFunction](value as object, typeDef.validateParams)) return false;
  }
  return true;
} 
