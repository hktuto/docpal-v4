# Datatype Management & Conversion  
**DocPal V5 – dp-datatype Package**

## 1. Overview

DocPal V4 consists of multiple sub-systems, each with its own data models and types. The `dp-datatype` package aims to:

- **Standardize** data types across all sub-systems.
- **Validate** data to ensure consistency and correctness.
- **Convert** data between different formats/types as required by various modules.
- **Facilitate** seamless data exchange and reduce integration friction.

---

## 2. Requirements

### 2.1 Functional Requirements

1. **Centralized Type Definitions**
   - Provide a single source of truth for all common data types (e.g., Date, Number, String, Boolean, File, User, Document, etc.).
   - Support for custom/complex types (e.g., Address, Metadata, WorkflowState).

2. **Type Validation**
   - Validate data against defined types.
   - Provide clear error messages for invalid data.
   - Support both synchronous and asynchronous validation.

3. **Type Conversion**
   - Convert data between compatible types (e.g., String ↔ Date, Number ↔ String).
   - Handle locale-specific conversions (e.g., date/time, number formatting).
   - Support custom conversion logic for complex types.

4. **Extensibility**
   - Allow sub-systems to extend or override base types and conversion logic.
   - Plugin system for adding new types or validators.

5. **Integration**
   - Easy integration with existing sub-systems (client, admin, desktop, etc.).
   - Provide utility functions and composables for use in Vue/Nuxt components.

6. **Documentation & Testing**
   - Well-documented API for type definitions, validation, and conversion.
   - Comprehensive unit tests for all core features.

### 2.2 Non-Functional Requirements

- **Performance:** Minimal overhead for validation/conversion.
- **Security:** Prevent type-based vulnerabilities (e.g., injection, overflow).
- **Maintainability:** Modular, well-structured, and easy to update.
- **Localization:** Support for multiple locales in conversions.

---

## 3. Unified Data Type Analysis & Proposal

### 3.1 Analysis of Current Data Types

#### Common Types Across Sub-systems
- **String/Text**: Appears as String, Text, Short Text, Long Text, single line text, multi line text.
- **Number**: Integer, Float, Number.
- **Date**: Date.
- **Boolean**: Boolean.
- **Json**: JSON.
- **Relation/Reference**: Master Table, Folder Cabinet Id, Relation, User Group.

#### Special/Domain-Specific Types
- **User Group**: Specific to Case Management.
- **Master Table**: Appears as both a type and a relation.
- **Folder Cabinet Id**: Specific reference type.
- **Relation**: Generic reference to another entity.

### 3.2 Proposed Unified Data Types

| Unified Type      | Description / Notes                                                                 |
|-------------------|-------------------------------------------------------------------------------------|
| `String`          | For all text fields (single/multi-line, short/long).                                |
| `Number`          | For all numeric values (integer, float).                                            |
| `Boolean`         | True/false values.                                                                  |
| `Date`            | For date and time values.                                                           |
| `Json`            | For structured data, settings, or dynamic fields.                                   |
| `Reference`       | For relations to other entities (User, Master Table, Folder Cabinet, etc.).         |
| `UserGroup`       | For user group references (can be a subtype of Reference or a specific type).       |
| `File`            | For file uploads/attachments (if needed in future).                                 |

**Notes:**
- `String` can have optional metadata for length (short/long), or single/multi-line.
- `Reference` can be extended with a `targetType` (e.g., MasterTable, FolderCabinet, UserGroup).
- `Json` is for flexible, schema-less data.
- `File` is included for extensibility.

#### Example Unified Data Type Definition (TypeScript)

```ts
type DataType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Date'
  | 'Json'
  | { type: 'Reference', target: 'User' | 'MasterTable' | 'FolderCabinet' | 'UserGroup' }
  | 'File'
```

#### Mapping Table

| As-Is Type           | Unified Type   |
|----------------------|---------------|
| String/Text/Short/Long Text | String        |
| Integer/Float/Number | Number        |
| Boolean              | Boolean       |
| Date                 | Date          |
| Json                 | Json          |
| Master Table         | Reference (target: MasterTable) |
| Folder Cabinet Id    | Reference (target: FolderCabinet) |
| User Group           | Reference (target: UserGroup) |
| Relation             | Reference     |

---

## 4. Deployment Plan

### 4.1 Development

- Develop the package in `packages/dp-datatype`.
- Use TypeScript for type safety and better integration with Vue 3/Nuxt 3.
- Follow monorepo standards for code sharing and versioning.

### 4.2 Integration

- Publish the package as a workspace dependency.
- Update all sub-systems to use `dp-datatype` for type definitions, validation, and conversion.
- Provide migration guides for replacing legacy type logic.
- **Map and migrate all as-is types in each sub-system to the new unified types.**
- **Create a mapping utility or documentation to help developers convert from legacy types to unified types.**

### 4.3 Testing

- Write unit tests for all type definitions, validators, and converters.
- Integrate with CI/CD to ensure all changes are tested before deployment.

### 4.4 Documentation

- Document all types, validators, and converters in a central README or Storybook.
- Provide usage examples for common scenarios.
- **Document the mapping from as-is types to unified types for each sub-system.**

### 4.5 Release

- Version the package according to semver.
- Publish to the internal registry or npm as required.
- Announce availability to all sub-system teams.

### 4.6 Maintenance

- Regularly review and update types as business requirements evolve.
- Accept and review contributions from other teams for new types or conversion logic.

---

## 5. Milestones

1. **MVP:** Central type definitions, basic validation, and conversion utilities.
2. **v1.0:** Full integration with all sub-systems, documentation, and tests.
3. **v1.1+:** Extensibility features, plugin support, and advanced conversion logic.

---

## 6. To-Be Data Type System

A future-proof, extensible, and easy-to-use data type system is defined below. This system introduces a set of core types, including String, Number, Boolean, DateTime, Json, List (replacing Enum for clarity), Reference, File, Array, Object, RichText, GeoPoint, and Custom. The 'List' type allows for predefined sets of values, making it more intuitive for developers.

### 6.1 Design Principles

- **Simplicity:** Minimize the number of primitive types, but allow rich metadata for flexibility.
- **Extensibility:** Support custom and composite types, and allow for future expansion.
- **Interoperability:** Types should be easily serializable (JSON), and compatible with frontend and backend.
- **Validation:** Each type should support built-in validation rules.
- **Localization:** Types like Date, Number, and String should support locale-specific formatting.
- **Reference Integrity:** Relations between entities should be explicit and type-safe.

### 6.2 Core Data Types

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

### 6.3 Example TypeScript Definition

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

### 6.4 Extensibility

- **Custom Types:** Developers can define new types by extending `Custom` or composing `Object`/`Array` types.
- **Validation:** Each type can have built-in or custom validation logic.
- **Metadata:** All types can accept a `meta` field for additional, system-specific information.

### 6.5 Example Usage

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

### 6.6 Migration/Deployment Plan

1. **Define the new type system in the `dp-datatype` package.**
2. **Update backend models and APIs to use the new types.**
3. **Provide migration scripts/utilities to convert existing data to the new types.**
4. **Update frontend and all sub-systems to consume the new type definitions.**
5. **Document the new type system and provide examples for extension.**
6. **Add validation and conversion utilities for all types.**
7. **Iterate and extend as new requirements emerge.**

### 6.1.1 Extensible String Validation

- `StringType` now supports:
  - `format`: Standard format key (e.g., 'email', 'address', 'country').
  - `formatFunction`: Custom validation function key, referencing a frontend registry.
  - `formatParams`: Parameters for custom validation logic.
- The frontend maintains a registry of allowed validation functions, and the backend can specify which to use by key.
- This approach is secure, extensible, and allows for business-specific or locale-specific validation without sending code from backend to frontend.
- Example:
  ```ts
  const stringFormatValidators: Record<string, (value: string, params?: Record<string, unknown>) => boolean> = {
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    address: v => /[0-9]/.test(v) && /[a-zA-Z]/.test(v) && v.length >= 5,
    country: v => /^[A-Za-z]{2,}$/.test(v),
    validateHKID: v => /^[A-Z]{1,2}[0-9]{6}\([0-9A]\)$/.test(v),
    // ...more
  };
  ```
- The backend should only send keys for known/allowed functions, and frontend should document and version the registry.

### 6.1.2 Extensible Validation for All Types

- All types now support:
  - `validateFunction`: Custom validation function key, referencing a frontend registry for that type.
  - `validateParams`: Parameters for custom validation logic.
- The frontend maintains a registry of allowed validation functions for each type, and the backend can specify which to use by key.
- This approach is secure, extensible, and allows for business-specific or locale-specific validation for any type, not just strings.
- Example for NumberType:
  ```ts
  const numberValidators: Record<string, (value: number, params?: Record<string, unknown>) => boolean> = {
    isEven: v => v % 2 === 0,
    isPositive: v => v > 0,
    // ...more
  };
  ```
- The backend should only send keys for known/allowed functions, and frontend should document and version the registry for each type.

### 6.1.3 Type-Specific Validation Structure

- Each type's validation logic is now implemented in its own file/folder under `src/rules/{type}/index.ts` (e.g., `validateStringType`, `validateNumberType`, etc.).
- The main `validateType` utility in `utils.ts` simply delegates to these type-specific functions, reducing complexity and improving maintainability.
- This structure makes it easy to add, test, and extend validation logic for any type without touching the core utility.
- Example:
  ```ts
  // In src/utils.ts
  import { validateStringType } from './rules/string';
  // ...
  export function validateType(value: unknown, typeDef: BaseType): boolean {
    switch (typeDef.type) {
      case 'String':
        return validateStringType(value, typeDef as StringType);
      // ...
    }
  }
  ```

### 6.1.5 List of Available Validation Functions

Below is a list of all available validation functions for each type, with a short description for each. This helps business owners and developers keep track of the options available for data validation.

#### String
- `email`: Checks if the value is a valid email address (simple regex).
- `address`: Checks if the value looks like an address (contains at least one number, one letter, and is at least 5 characters).
- `country`: Checks if the value is a valid country code or name (at least 2 letters).
- `string`: Checks if the value is a string (always true for any string).
- `validateHKID`: Checks if the value is a valid Hong Kong ID (HKID) format.

#### Number
- `isEven`: Checks if the number is even.
- `isPositive`: Checks if the number is greater than zero.

#### Boolean
- `isTrue`: Checks if the value is `true`.
- `isFalse`: Checks if the value is `false`.

#### DateTime
- `isFuture`: Checks if the date/time is in the future.
- `isPast`: Checks if the date/time is in the past.

*Other types (Json, List, Reference, File, Array, Object, RichText, GeoPoint, Custom) currently have no built-in validators, but you can add your own as needed in their respective folders.*
