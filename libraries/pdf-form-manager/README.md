# PDF Form Field Manager

A comprehensive Vue 3 component for PDF form field detection, highlighting, management, and processing with multi-page support.

## Features

- 📄 **PDF Upload & Display**: Upload and display PDF forms with multi-page support
- 🔍 **Form Field Detection**: Automatically detect all form fields in PDF documents
- 🎯 **Field Highlighting**: Visual highlighting of form fields with customizable colors
- ✅ **Field Selection**: Select individual or multiple form fields
- 🏷️ **Field Labeling**: Edit and customize field labels
- 🔗 **Field Combination**: Create combined fields with multiple combination types
- 📊 **Export Configuration**: Export field configurations as JSON
- ⚡ **Virtual Scrolling**: Efficient rendering for large PDF documents
- 🎨 **Modern UI**: Clean, responsive interface with modal dialogs

## Installation

```bash
npm install pdf-form-manager
```

## Dependencies

This package requires the following peer dependencies:

```bash
npm install vue@^3.3.0 pdf-lib@^1.17.1 pdfjs-dist@^3.11.174
```

## Basic Usage

### Vue Component

```vue
<template>
  <PdfFormFieldManager 
    :auto-detect-fields="true"
    :highlight-color="#007bff"
    @fields-detected="onFieldsDetected"
    @fields-selected="onFieldsSelected"
    @configuration-exported="onConfigurationExported"
  />
</template>

<script setup>
import { PdfFormFieldManager } from 'pdf-form-manager';

function onFieldsDetected(fields) {
  console.log('Detected fields:', fields);
}

function onFieldsSelected(fieldIds) {
  console.log('Selected fields:', fieldIds);
}

function onConfigurationExported(config) {
  console.log('Exported configuration:', config);
}
</script>
```

### Backend Usage

```typescript
import { PdfFormFieldManager } from 'pdf-form-manager';

const manager = new PdfFormFieldManager();

// Load PDF from file
const document = await manager.loadPdf(pdfFile);

// Detect form fields
const fields = await manager.detectFormFields({
  includeReadonly: false,
  detectSignatureFields: true
});

// Create combined field
const combinedField = manager.createCombinedField(
  ['field1', 'field2'], 
  'Full Name', 
  'concatenate',
  ' '
);

// Export configuration
const config = manager.exportFieldConfiguration(
  document,
  selectedFieldIds,
  combinedFields
);
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoDetectFields` | `boolean` | `true` | Automatically detect fields when PDF is loaded |
| `highlightColor` | `string` | `"#007bff"` | Color used for field highlighting |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `fields-detected` | `PdfFormField[]` | Emitted when form fields are detected |
| `fields-selected` | `string[]` | Emitted when field selection changes |
| `configuration-exported` | `object` | Emitted when configuration is exported |

## Types

### PdfFormField

```typescript
interface PdfFormField {
  id: string;
  name: string;
  type: FormFieldType;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  value?: string;
  options?: string[];
  required?: boolean;
  readonly?: boolean;
  selected?: boolean;
  customLabel?: string;
  originalLabel?: string;
}
```

### FormFieldType

```typescript
type FormFieldType = 
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
```

### CombinedField

```typescript
interface CombinedField {
  id: string;
  name: string;
  type: 'combined';
  fieldIds: string[];
  customLabel: string;
  combineType: 'concatenate' | 'sum' | 'average' | 'group';
  separator?: string;
}
```

## API Reference

### PdfFormFieldManager Class

#### Methods

##### `loadPdf(source: string | Blob | ArrayBuffer): Promise<PdfFormDocument>`
Load a PDF document from various sources (URL, Blob, or ArrayBuffer).

##### `detectFormFields(options?: FormFieldDetectionOptions): Promise<PdfFormField[]>`
Detect all form fields in the loaded PDF document.

**Options:**
- `includeReadonly`: Include readonly fields (default: `true`)
- `includeHidden`: Include hidden fields (default: `false`)
- `detectSignatureFields`: Include signature fields (default: `true`)
- `customPatterns`: Custom regex patterns for field detection

##### `updateFieldLabel(fieldId: string, fields: PdfFormField[], newLabel: string): PdfFormField[]`
Update the custom label for a specific field.

##### `createCombinedField(fieldIds: string[], label: string, combineType: CombinedFieldType, separator?: string): CombinedField`
Create a new combined field from multiple existing fields.

**Combine Types:**
- `concatenate`: Join field values with separator
- `sum`: Calculate sum of numeric fields
- `average`: Calculate average of numeric fields
- `group`: Group fields together

##### `exportFieldConfiguration(document: PdfFormDocument, selectedFields: string[], combinedFields: CombinedField[]): FormFieldExportData`
Export the current field configuration as JSON.

##### `importFieldConfiguration(data: FormFieldExportData): object`
Import a previously exported field configuration.

## Features in Detail

### Virtual Scrolling
The component uses virtual scrolling to efficiently handle large PDF documents with many pages. Only visible pages are rendered, providing smooth performance even with documents containing hundreds of pages.

### Field Types
The system automatically detects and categorizes different types of form fields:

- **Text Fields**: Single-line and multi-line text inputs
- **Checkboxes**: Boolean selection fields
- **Radio Groups**: Single selection from multiple options
- **Dropdowns**: Selection from dropdown lists
- **Buttons**: Interactive buttons
- **Signatures**: Digital signature fields
- **Specialized Types**: Email, date, number, password fields

### Field Combination
Create logical groupings of related fields:

- **Concatenation**: Join text fields (e.g., First Name + Last Name = Full Name)
- **Mathematical**: Sum or average numeric fields
- **Grouping**: Organize related fields for processing

### Export/Import
Export field configurations to preserve settings:

```json
{
  "documentInfo": {
    "name": "form.pdf",
    "pageCount": 3
  },
  "fields": [...],
  "selectedFields": ["field1", "field2"],
  "combinedFields": [...],
  "exportDate": "2024-01-01T00:00:00.000Z"
}
```

## Development

### Setup
```bash
git clone <repository>
cd pdf-form-manager
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### v0.1.0
- Initial release
- PDF form field detection
- Field highlighting and selection
- Field labeling and combination
- Export/import functionality
- Virtual scrolling support 
