import { DateTimeType } from '../../types';
import { isFuture } from './isFuture';
import { isPast } from './isPast';

export const dateTimeValidators = {
  isFuture,
  isPast,
};

/**
 * Validate a value against a DateTimeType definition.
 * Returns true if valid, false otherwise.
 */
export function validateDateTimeType(value: unknown, typeDef: DateTimeType): boolean {
  if (typeof value === 'string' || value instanceof Date) {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return false;
    // Extensible validation
    if (typeDef.validateFunction && dateTimeValidators[typeDef.validateFunction]) {
      if (!dateTimeValidators[typeDef.validateFunction](date, typeDef.validateParams)) return false;
    }
    return true;
  }
  return false;
} 
