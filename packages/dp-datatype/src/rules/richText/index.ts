import { RichTextType } from '../../types';

export const richTextValidators = {
  // Add custom RichText validators as needed
};

/**
 * Validate a value against a RichTextType definition.
 * Returns true if valid, false otherwise.
 */
export function validateRichTextType(value: unknown, typeDef: RichTextType): boolean {
  if (typeof value !== 'string') return false;
  // Extensible validation
  if (typeDef.validateFunction && richTextValidators[typeDef.validateFunction]) {
    if (!richTextValidators[typeDef.validateFunction](value, typeDef.validateParams)) return false;
  }
  return true;
} 
