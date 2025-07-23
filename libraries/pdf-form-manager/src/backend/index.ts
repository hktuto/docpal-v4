import { PDFDocument, PDFForm, PDFField } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import type { 
  PdfFormField, 
  FormFieldType, 
  PdfFormDocument, 
  FormFieldDetectionOptions,
  CombinedField,
  FormFieldExportData
} from '../types';

/**
 * PDF Form Field Manager Backend
 */
export class PdfFormFieldManager {
  private pdfDoc: PDFDocument | null = null;
  private pdfJsDoc: any = null;

  /**
   * Load PDF document from various sources
   */
  async loadPdf(source: string | Blob | ArrayBuffer): Promise<PdfFormDocument> {
    let data: Uint8Array;

    if (typeof source === 'string') {
      // URL or base64
      if (source.startsWith('data:')) {
        const base64 = source.split(',')[1];
        data = new Uint8Array(atob(base64).split('').map(char => char.charCodeAt(0)));
      } else {
        const response = await fetch(source);
        data = new Uint8Array(await response.arrayBuffer());
      }
    } else if (source instanceof Blob) {
      data = new Uint8Array(await source.arrayBuffer());
    } else {
      data = new Uint8Array(source);
    }

    // Load with pdf-lib for form processing
    this.pdfDoc = await PDFDocument.load(data);
    
    // Load with pdf.js for rendering
    this.pdfJsDoc = await pdfjsLib.getDocument({ data }).promise;

    const fields = await this.detectFormFields();

    return {
      id: this.generateId(),
      name: 'Uploaded PDF',
      size: data.length,
      pageCount: this.pdfDoc.getPageCount(),
      fields,
      uploadDate: new Date(),
      lastModified: new Date()
    };
  }

  /**
   * Detect all form fields in the PDF
   */
  async detectFormFields(options: FormFieldDetectionOptions = {}): Promise<PdfFormField[]> {
    if (!this.pdfDoc || !this.pdfJsDoc) {
      throw new Error('PDF not loaded');
    }

    const form = this.pdfDoc.getForm();
    console.log('form', form);
    const fields = form.getFields();
    const detectedFields: PdfFormField[] = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const fieldInfo = await this.extractFieldInfo(field, i);
      
      if (fieldInfo) {
        // Apply filtering based on options
        if (!options.includeReadonly && fieldInfo.readonly) continue;
        if (!options.detectSignatureFields && fieldInfo.type === 'signature') continue;
        
        detectedFields.push(fieldInfo);
      }
    }

    return detectedFields;
  }

  /**
   * Extract detailed information from a PDF field
   */
  private async extractFieldInfo(field: PDFField, index: number): Promise<PdfFormField | null> {
    try {
      const fieldName = field.getName();
      const widgets = field.acroField.getWidgets();
      
      if (widgets.length === 0) return null;

      const widget = widgets[0];
      const rect = widget.getRectangle();
      const page = this.findFieldPage(widget);

      const fieldInfo: PdfFormField = {
        id: this.generateFieldId(fieldName, index),
        name: fieldName,
        type: this.determineFieldType(field),
        page: page,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        originalLabel: fieldName,
        customLabel: fieldName,
        selected: false
      };

      // Extract additional properties based on field type
      await this.enrichFieldInfo(field, fieldInfo);

      return fieldInfo;
    } catch (error) {
      console.warn('Error extracting field info:', error);
      return null;
    }
  }

  /**
   * Determine the type of form field
   */
  private determineFieldType(field: PDFField): FormFieldType {
    const fieldType = field.constructor.name;
    
    switch (fieldType) {
      case 'PDFTextField':
        // Check if it's a multiline text field by checking the field properties
        return (field as any).isMultiline?.() ? 'multiline' : 'text';
      case 'PDFCheckBox':
        return 'checkbox';
      case 'PDFRadioGroup':
        return 'radio';
      case 'PDFDropdown':
        return 'dropdown';
      case 'PDFButton':
        return 'button';
      case 'PDFSignature':
        return 'signature';
      default:
        return 'text';
    }
  }

  /**
   * Enrich field information with additional properties
   */
  private async enrichFieldInfo(field: PDFField, fieldInfo: PdfFormField): Promise<void> {
    try {
      // Set value
      if ('getText' in field) {
        fieldInfo.value = (field as any).getText() || '';
      } else if ('isChecked' in field) {
        fieldInfo.value = (field as any).isChecked() ? 'true' : 'false';
      }

      // Set options for dropdown/radio fields
      if ('getOptions' in field) {
        fieldInfo.options = (field as any).getOptions();
      }

      // Set readonly status
      fieldInfo.readonly = field.isReadOnly();
      
      // Detect field type patterns for better classification
      const name = fieldInfo.name.toLowerCase();
      if (name.includes('email') || name.includes('e-mail')) {
        fieldInfo.type = 'email';
      } else if (name.includes('date') || name.includes('birth') || name.includes('dob')) {
        fieldInfo.type = 'date';
      } else if (name.includes('phone') || name.includes('number') || name.includes('amount')) {
        fieldInfo.type = 'number';
      } else if (name.includes('password') || name.includes('pwd')) {
        fieldInfo.type = 'password';
      } else if (name.includes('signature') || name.includes('sign')) {
        fieldInfo.type = 'signature';
      }

    } catch (error) {
      console.warn('Error enriching field info:', error);
    }
  }

  /**
   * Find which page a field widget belongs to
   */
  private findFieldPage(widget: any): number {
    try {
      // This is a simplified approach - in a real implementation,
      // you'd need to traverse the PDF structure to find the exact page
      const pageRef = widget.dict.get('P');
      if (pageRef) {
        const pages = this.pdfDoc!.getPages();
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].ref === pageRef) {
            return i + 1;
          }
        }
      }
      return 1; // Default to first page if unable to determine
    } catch {
      return 1;
    }
  }

  /**
   * Generate unique ID for fields
   */
  private generateFieldId(name: string, index: number): string {
    return `field_${name.replace(/[^a-zA-Z0-9]/g, '_')}_${index}`;
  }

  /**
   * Generate unique document ID
   */
  private generateId(): string {
    return 'pdf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Update field labels
   */
  updateFieldLabel(fieldId: string, fields: PdfFormField[], newLabel: string): PdfFormField[] {
    return fields.map(field => 
      field.id === fieldId 
        ? { ...field, customLabel: newLabel }
        : field
    );
  }

  /**
   * Create combined field
   */
  createCombinedField(
    fieldIds: string[], 
    label: string, 
    combineType: CombinedField['combineType'],
    separator?: string
  ): CombinedField {
    return {
      id: 'combined_' + Date.now(),
      name: label.replace(/[^a-zA-Z0-9]/g, '_'),
      type: 'combined',
      fieldIds,
      customLabel: label,
      combineType,
      separator
    };
  }

  /**
   * Export field configuration
   */
  exportFieldConfiguration(
    document: PdfFormDocument,
    selectedFields: string[],
    combinedFields: CombinedField[]
  ): FormFieldExportData {
    return {
      documentInfo: {
        name: document.name,
        pageCount: document.pageCount
      },
      fields: document.fields,
      selectedFields,
      combinedFields,
      exportDate: new Date()
    };
  }

  /**
   * Import field configuration
   */
  importFieldConfiguration(data: FormFieldExportData): {
    fields: PdfFormField[];
    selectedFields: string[];
    combinedFields: CombinedField[];
  } {
    return {
      fields: data.fields,
      selectedFields: data.selectedFields,
      combinedFields: data.combinedFields
    };
  }
}

export default PdfFormFieldManager; 
