# Proposed Standardized Data Types for DocPal

## Overview
This document proposes a simplified set of core data types that will be used across all DocPal subsystems. The goal is to reduce complexity and ensure consistent data handling throughout the platform.

- Document type
- Workflow
- Case
- Easy form
- Master table


## Core Data Types

### 1. Text
```json
{
  "type": "string",
  "format": "text",
  "properties": {
    "maxLength": { "type": "integer" },
    "minLength": { "type": "integer" },
    "pattern": { "type": "string" }
  }
}
```
- Used for: Single line text, Short text, Long text
- Replaces: String, Short Text, Long Text
- Common use cases: Names, Titles, Descriptions

### 2. Number
```json
{
  "type": "number",
  "properties": {
    "format": { "enum": ["integer", "float", "decimal"] },
    "minimum": { "type": "number" },
    "maximum": { "type": "number" },
    "precision": { "type": "integer" }
  }
}
```
- Used for: All numeric values
- Replaces: Integer, Float, Decimal
- Common use cases: Quantities, Prices, Measurements

### 3. Date
```json
{
  "type": "string",
  "format": "date-time",
  "properties": {
    "format": { "enum": ["date", "datetime", "time"] }
  }
}
```
- Used for: All date and time values
- Replaces: Date, DateTime, Time
- Common use cases: Timestamps, Due dates, Schedules

### 4. Boolean
```json
{
  "type": "boolean"
}
```
- Used for: True/False values
- Replaces: Boolean
- Common use cases: Flags, Toggles, Status indicators

### 5. Reference
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "type": { "type": "string" },
    "system": { "type": "string" }
  }
}
```
- Used for: Relations, References, Foreign keys
- Replaces: Relation, Folder Cabinet Id
- Common use cases: Document references, User references, System links

### 6. Object
```json
{
  "type": "object",
  "additionalProperties": true
}
```
- Used for: Complex data structures
- Replaces: JSON, Object
- Common use cases: Configuration, Metadata, Custom data

### 7. Array
```json
{
  "type": "array",
  "items": {
    "type": "any"
  }
}
```
- Used for: Lists and collections
- Replaces: Array
- Common use cases: Multiple values, Collections, Lists

## Migration Benefits

1. **Simplified Integration**
   - Reduced number of data types to understand and implement
   - Consistent validation rules across systems
   - Clear mapping between systems

2. **Better Type Safety**
   - Strong typing for all data types
   - Built-in validation rules
   - Clear error messages

3. **Improved Developer Experience**
   - Fewer data types to learn
   - Consistent API responses
   - Better documentation

4. **Enhanced Maintainability**
   - Centralized type definitions
   - Easier to update and extend
   - Reduced code duplication

## Implementation Strategy

1. **Phase 1: Core Types**
   - Implement basic type definitions
   - Create validation rules
   - Set up type conversion utilities

2. **Phase 2: System Integration**
   - Update each subsystem to use new types
   - Implement type conversion layers
   - Add validation middleware

3. **Phase 3: Documentation & Tools**
   - Create developer documentation
   - Build type generation tools
   - Implement testing utilities

## Example Usage

```typescript
// Example type definition
interface Document {
  id: string;
  title: Text;
  createdDate: Date;
  author: Reference;
  metadata: Object;
  tags: Array<string>;
  isArchived: Boolean;
}

// Example validation
const schema = {
  type: "object",
  properties: {
    title: { type: "string", format: "text", maxLength: 100 },
    createdDate: { type: "string", format: "date-time" },
    author: { type: "object", properties: { id: { type: "string" } } },
    metadata: { type: "object" },
    tags: { type: "array", items: { type: "string" } },
    isArchived: { type: "boolean" }
  }
};
```

## Next Steps

1. Review and approve the proposed data types
2. Create detailed migration plan for each subsystem
3. Develop type conversion utilities
4. Implement validation middleware
5. Update documentation and examples
6. Create testing strategy
7. Plan for backward compatibility 
