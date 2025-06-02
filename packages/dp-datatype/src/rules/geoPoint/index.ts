import { GeoPointType } from '../../types';

export const geoPointValidators = {
  // Add custom GeoPoint validators as needed
};

/**
 * Validate a value against a GeoPointType definition.
 * Returns true if valid, false otherwise.
 */
export function validateGeoPointType(value: unknown, typeDef: GeoPointType): boolean {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('lat' in (value as any)) ||
    !('lng' in (value as any)) ||
    typeof (value as any).lat !== 'number' ||
    typeof (value as any).lng !== 'number'
  ) {
    return false;
  }
  // Extensible validation
  if (typeDef.validateFunction && geoPointValidators[typeDef.validateFunction]) {
    if (!geoPointValidators[typeDef.validateFunction](value as any, typeDef.validateParams)) return false;
  }
  return true;
} 
