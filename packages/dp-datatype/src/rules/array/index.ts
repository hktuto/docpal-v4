import { ArrayType, BaseType } from '../../types';
import { validateType } from '../../utils';

export const arrayValidators = {
  // Add custom Array validators as needed
};

/**
 * Validate a value against an ArrayType definition.
 * Returns true if valid, false otherwise.
 */
export function validateArrayType(value: unknown, typeDef: ArrayType): boolean {
  if (!Array.isArray(value)) return false;
  if (typeDef.minItems !== undefined && value.length < typeDef.minItems) return false;
  if (typeDef.maxItems !== undefined && value.length > typeDef.maxItems) return false;
  if (!value.every(item => validateType(item, typeDef.itemType))) return false;
  // Extensible validation
  if (typeDef.validateFunction && arrayValidators[typeDef.validateFunction]) {
    if (!arrayValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
  }
  return true;
} 
