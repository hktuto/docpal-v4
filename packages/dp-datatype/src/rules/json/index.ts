import { JsonType } from '../../types';

export const jsonValidators = {
  // Add custom JSON validators as needed
};

/**
 * Validate a value against a JsonType definition.
 * Returns true if valid, false otherwise.
 */
export function validateJsonType(value: unknown, typeDef: JsonType): boolean {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  // Extensible validation
  if (typeDef.validateFunction && jsonValidators[typeDef.validateFunction]) {
    if (!jsonValidators[typeDef.validateFunction](value as object, typeDef.validateParams)) return false;
  }
  return true;
} 
