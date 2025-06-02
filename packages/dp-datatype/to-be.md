# To-Be Data Type System for DocPal V4

## 1. Design Principles

- **Simplicity:** Minimize the number of primitive types, but allow rich metadata for flexibility.
- **Extensibility:** Support custom and composite types, and allow for future expansion.
- **Interoperability:** Types should be easily serializable (JSON), and compatible with frontend and backend.
- **Validation:** Each type should support built-in validation rules.
- **Localization:** Types like Date, Number, and String should support locale-specific formatting.
- **Reference Integrity:** Relations between entities should be explicit and type-safe.

---

## 2. Core Data Types

| Type         | Description                                                                 | Example Metadata/Options                |
|--------------|-----------------------------------------------------------------------------|-----------------------------------------|
| `String`     | Text, with options for length, format, and localization                     | minLength, maxLength, format, multiline |
| `Number`     | Integer or float, with validation and formatting                            | min, max, step, precision               |
| `Boolean`    | True/false                                                                 | —                                       |
| `DateTime`   | Date and/or time, with timezone and formatting options                      | format, timezone                        |
| `Json`       | Arbitrary structured data                                                  | schema                                  |
| `List`       | Predefined set of string or number values                                  | values, labels                          |
| `Reference`  | Link to another entity, with type and cardinality                          | targetType, multiple, required          |
| `File`       | File upload, with type and size restrictions                               | mimeTypes, maxSize                      |
| `Array`      | List of any type, with item validation                                     | itemType, minItems, maxItems            |
| `Object`     | Composite type with named fields (schema)                                  | fields                                  |
| `RichText`   | Formatted text (HTML/Markdown), for documents or comments                  | allowedFormats                          |
| `GeoPoint`   | Geographic location (latitude/longitude)                                   | —                                       |
| `Custom`     | For future or domain-specific extensions                                   | definition                              |

---

## 3. Example TypeScript Definition

```ts
type BaseType =
  | { type: 'String'; minLength?: number; maxLength?: number; format?: string; multiline?: boolean; localized?: boolean }
  | { type: 'Number'; min?: number; max?: number; step?: number; precision?: number }
  | { type: 'Boolean' }
  | { type: 'DateTime'; format?: string; timezone?: string }
  | { type: 'Json'; schema?: object }
  | { type: 'List'; values: (string | number)[]; labels?: string[] }
  | { type: 'Reference'; targetType: string; multiple?: boolean; required?: boolean }
  | { type: 'File'; mimeTypes?: string[]; maxSize?: number }
  | { type: 'Array'; itemType: BaseType; minItems?: number; maxItems?: number }
  | { type: 'Object'; fields: Record<string, BaseType> }
  | { type: 'RichText'; allowedFormats?: string[] }
  | { type: 'GeoPoint' }
  | { type: 'Custom'; definition: object };
```

---

## 4. Extensibility

- **Custom Types:** Developers can define new types by extending `Custom` or composing `Object`/`Array` types.
- **Validation:** Each type can have built-in or custom validation logic.
- **Metadata:** All types can accept a `meta` field for additional, system-specific information.

---

## 5. Example Usage

```json
{
  "name": { "type": "String", "maxLength": 100, "required": true },
  "age": { "type": "Number", "min": 0 },
  "isActive": { "type": "Boolean" },
  "createdAt": { "type": "DateTime", "format": "YYYY-MM-DD" },
  "tags": { "type": "Array", "itemType": { "type": "String" } },
  "profile": {
    "type": "Object",
    "fields": {
      "bio": { "type": "RichText" },
      "location": { "type": "GeoPoint" }
    }
  },
  "role": { "type": "List", "values": ["admin", "user", "guest"] },
  "documents": { "type": "Reference", "targetType": "Document", "multiple": true }
}
```

---

## 6. Migration/Deployment Plan

1. **Define the new type system in the `dp-datatype` package.**
2. **Update backend models and APIs to use the new types.**
3. **Provide migration scripts/utilities to convert existing data to the new types.**
4. **Update frontend and all sub-systems to consume the new type definitions.**
5. **Document the new type system and provide examples for extension.**
6. **Add validation and conversion utilities for all types.**
7. **Iterate and extend as new requirements emerge.** 
