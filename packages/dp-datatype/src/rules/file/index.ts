import { FileType } from '../../types';

export const fileValidators = {
  // Add custom File validators as needed
};

/**
 * Validate a value against a FileType definition.
 * Returns true if valid, false otherwise.
 */
export function validateFileType(value: unknown, typeDef: FileType): boolean {
  if (typeof File !== 'undefined' && value instanceof File) {
    if (typeDef.mimeTypes && !typeDef.mimeTypes.includes(value.type)) return false;
    if (typeDef.maxSize && value.size > typeDef.maxSize) return false;
    // Extensible validation
    if (typeDef.validateFunction && fileValidators[typeDef.validateFunction]) {
      if (!fileValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
    }
    return true;
  }
  if (value && typeof value === 'object' && 'name' in value && 'size' in value) {
    if (typeDef.maxSize && (value as any).size > typeDef.maxSize) return false;
    // Extensible validation
    if (typeDef.validateFunction && fileValidators[typeDef.validateFunction]) {
      if (!fileValidators[typeDef.validateFunction](value as any, typeDef.validateParams)) return false;
    }
    return true;
  }
  return false;
} 
