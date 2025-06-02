import { CustomType } from '../../types';

export const customValidators = {
  // Add custom CustomType validators as needed
};

/**
 * Validate a value against a CustomType definition.
 * Returns true if valid, false otherwise.
 */
export function validateCustomType(value: unknown, typeDef: CustomType): boolean {
  // Extensible validation
  if (typeDef.validateFunction && customValidators[typeDef.validateFunction]) {
    if (!customValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
  }
  return true;
} 
