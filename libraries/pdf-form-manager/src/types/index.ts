/**
 * PDF Form Field Management Types
 */

export interface PdfFormField {
  id: string;
  name: string;
  type: FormFieldType;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  value?: string;
  options?: string[]; // For dropdown/radio fields
  required?: boolean;
  readonly?: boolean;
  selected?: boolean;
  customLabel?: string;
  originalLabel?: string;
}

export type FormFieldType = 
  | 'text'
  | 'password'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'button'
  | 'signature'
  | 'date'
  | 'number'
  | 'email'
  | 'multiline';

export interface CombinedField {
  id: string;
  name: string;
  type: 'combined';
  fieldIds: string[];
  customLabel: string;
  combineType: 'concatenate' | 'sum' | 'average' | 'group';
  separator?: string; // For concatenate type
}

export interface FormFieldSelection {
  selectedFields: string[];
  combinedFields: CombinedField[];
}

export interface PdfFormDocument {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  fields: PdfFormField[];
  uploadDate: Date;
  lastModified: Date;
}

export interface FormFieldHighlight {
  fieldId: string;
  color: string;
  opacity?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  borderWidth?: number;
}

export interface PageViewport {
  page: number;
  scale: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export interface FormFieldManager {
  document: PdfFormDocument | null;
  fields: PdfFormField[];
  selectedFields: string[];
  combinedFields: CombinedField[];
  highlightSettings: FormFieldHighlight[];
}

export interface FormFieldDetectionOptions {
  includeReadonly?: boolean;
  includeHidden?: boolean;
  detectSignatureFields?: boolean;
  customPatterns?: RegExp[];
}

export interface FormFieldExportData {
  documentInfo: {
    name: string;
    pageCount: number;
  };
  fields: PdfFormField[];
  selectedFields: string[];
  combinedFields: CombinedField[];
  exportDate: Date;
} 
