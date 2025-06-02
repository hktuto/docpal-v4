import { stringFormatValidators } from './string';
import { numberValidators } from './number';
import { booleanValidators } from './boolean';
import { dateTimeValidators } from './dateTime';
import { jsonValidators } from './json';
import { listValidators } from './list';
import { referenceValidators } from './reference';
import { fileValidators } from './file';
import { arrayValidators } from './array';
import { objectValidators } from './object';
import { richTextValidators } from './richText';
import { geoPointValidators } from './geoPoint';
import { customValidators } from './custom';

export const validationRegistry = {
  string: stringFormatValidators,
  number: numberValidators,
  boolean: booleanValidators,
  dateTime: dateTimeValidators,
  json: jsonValidators,
  list: listValidators,
  reference: referenceValidators,
  file: fileValidators,
  array: arrayValidators,
  object: objectValidators,
  richText: richTextValidators,
  geoPoint: geoPointValidators,
  custom: customValidators,
};

export type ValidationRegistry = typeof validationRegistry;
