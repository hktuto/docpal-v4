import { NumberType } from '../../types';
import { isEven } from './isEven';
import { isPositive } from './isPositive';

export const numberValidators = {
  isEven,
  isPositive,
};

/**
 * Validate a value against a NumberType definition.
 * Returns true if valid, false otherwise.
 */
export function validateNumberType(value: unknown, typeDef: NumberType): boolean {
  if (typeof value !== 'number' || isNaN(value)) return false;
  if (typeDef.min !== undefined && value < typeDef.min) return false;
  if (typeDef.max !== undefined && value > typeDef.max) return false;
  // Extensible validation
  if (typeDef.validateFunction && numberValidators[typeDef.validateFunction]) {
    if (!numberValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
  }
  return true;
} 
