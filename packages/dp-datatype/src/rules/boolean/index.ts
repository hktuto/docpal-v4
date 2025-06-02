import { BooleanType } from '../../types';
import { isTrue } from './isTrue';
import { isFalse } from './isFalse';

export const booleanValidators = {
  isTrue,
  isFalse,
};

/**
 * Validate a value against a BooleanType definition.
 * Returns true if valid, false otherwise.
 */
export function validateBooleanType(value: unknown, typeDef: BooleanType): boolean {
  if (typeof value !== 'boolean') return false;
  // Extensible validation
  if (typeDef.validateFunction && booleanValidators[typeDef.validateFunction]) {
    if (!booleanValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
  }
  return true;
} 
