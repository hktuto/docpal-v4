import { ReferenceType } from '../../types';

export const referenceValidators = {
  // Add custom Reference validators as needed
};

/**
 * Validate a value against a ReferenceType definition.
 * Returns true if valid, false otherwise.
 */
export function validateReferenceType(value: unknown, typeDef: ReferenceType): boolean {
  if (typeDef.multiple) {
    if (!Array.isArray(value) || !value.every(v => typeof v === 'string' || typeof v === 'number')) return false;
  } else {
    if (!(typeof value === 'string' || typeof value === 'number')) return false;
  }
  // Extensible validation
  if (typeDef.validateFunction && referenceValidators[typeDef.validateFunction]) {
    if (!referenceValidators[typeDef.validateFunction](value as any, typeDef.validateParams)) return false;
  }
  return true;
} 
