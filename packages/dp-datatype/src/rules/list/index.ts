import { ListType } from '../../types';

export const listValidators = {
  // Add custom List validators as needed
};

/**
 * Validate a value against a ListType definition.
 * Returns true if valid, false otherwise.
 */
export function validateListType(value: unknown, typeDef: ListType): boolean {
  if (!typeDef.values.includes(value as any)) return false;
  // Extensible validation
  if (typeDef.validateFunction && listValidators[typeDef.validateFunction]) {
    if (!listValidators[typeDef.validateFunction](value as any, typeDef.validateParams)) return false;
  }
  return true;
} 
