# JSON Schema Middleware Layer Requirements

## Overview
DocPal consists of multiple subsystems (Document Management, Workflow, Case Management, EasyForm, Master Table) that each have their own data type implementations. To ensure consistent data handling and validation across these systems, we will implement a JSON Schema-based middleware layer.


## What is JSON Schema?
JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It provides a contract for the JSON data required by a given application, and how that data can be modified. JSON Schema is based on the JSON data format and is designed to be language-independent.

Key features of JSON Schema:
- Define the structure of your JSON data
- Validate JSON data against the schema
- Provide documentation for your data format
- Enable automated testing and data quality checks
- Support for complex validation rules and constraints

### JSON Schema Resources
- [Official JSON Schema Documentation](https://json-schema.org/learn/getting-started-step-by-step)
- [JSON Schema Specification (Draft 2020-12)](https://json-schema.org/draft/2020-12/json-schema-core.html)
- [JSON Schema Validator](https://www.jsonschemavalidator.net/)
- [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)
- [JSON Schema Examples](https://json-schema.org/learn/miscellaneous-examples)

## Why Choose JSON Schema?

### 1. Industry Standard
- Widely adopted in the industry
- Strong community support
- Regular updates and improvements
- Extensive tooling ecosystem
- Proven in production environments

### 2. Language and Platform Independence
- Works with any programming language
- No vendor lock-in
- Consistent validation across platforms
- Easy integration with existing systems
- Support for multiple validation libraries

### 3. Rich Validation Features
- Type checking
- Format validation
- Custom validation rules
- Conditional validation
- Complex data relationships
- Array and object constraints
- Numeric range validation
- String pattern matching

### 4. Documentation and Self-Description
- Self-documenting schemas
- Clear data structure definition
- Human-readable format
- Automatic documentation generation
- OpenAPI/Swagger integration

### 5. Performance and Scalability
- Efficient validation
- Support for bulk validation
- Caching capabilities
- Streaming validation
- Incremental validation

### 6. Integration Benefits
- REST API compatibility
- Database schema validation
- Form validation
- Data transformation
- API documentation
- Code generation

### 7. Development Experience
- Rich IDE support
- Auto-completion
- Type hints
- Error messages
- Testing utilities
- Debugging tools

### 8. Maintenance and Evolution
- Schema versioning
- Backward compatibility
- Schema composition
- Reusable components
- Easy updates and modifications

### 9. Security
- Input validation
- Data sanitization
- Type safety
- Size constraints
- Access control

### 10. Cost Effectiveness
- Open standard
- Free to use
- Wide range of free tools
- Reduced development time
- Lower maintenance costs


## Current State (As-Is) Data Type Matrix

| Data Type | Document Management | Workflow | Case Management | EasyForm | Master Table |
|-----------|-------------------|----------|----------------|----------|--------------|
| String | ✓ | ✓ | ✓ | ✓ | ✓ |
| Short Text | - | - | ✓ | - | ✓ |
| Long Text | - | - | ✓ | - | ✓ |
| Number | ✓ | ✓ | - | ✓ | - |
| Integer | - | - | ✓ | - | ✓ |
| Float | - | - | ✓ | - | ✓ |
| Date | ✓ | ✓ | ✓ | ✓ | ✓ |
| Boolean | ✓ | ✓ | ✓ | ✓ | ✓ |
| JSON | - | - | ✓ | - | ✓ |
| Master Table | - | - | ✓ | - | - |
| Folder Cabinet Id | - | - | ✓ | - | - |
| Relation | - | - | - | - | ✓ |

Legend:
- ✓ : Type is supported
- - : Type is not supported

## Objectives
1. Create a standardized data model for inter-system communication
2. Provide clear API documentation for third-party integrations
3. Implement robust input validation across all subsystems
4. Ensure type safety and data consistency

## Key Features

### 1. Standardized Data Model
- Define a common JSON Schema for each data type
- Map subsystem-specific types to standardized schemas
- Support bidirectional conversion between subsystem types and standard schemas

### 2. Third-Party Integration Support
- Provide comprehensive JSON Schema documentation
- Include example payloads and responses
- Document validation rules and constraints
- Support OpenAPI/Swagger integration

### 3. Input Validation
- Implement strict type checking
- Validate data constraints (min/max values, patterns, etc.)
- Provide clear error messages for invalid inputs
- Support custom validation rules per subsystem

## Data Type Standardization

### Core Data Types
1. Text Types
   - String
   - Short Text
   - Long Text

2. Numeric Types
   - Number
   - Integer
   - Float

3. Date/Time Types
   - Date

4. Boolean Type
   - Boolean

5. Complex Types
   - Reference (unified type for Master Table, Relation, and Folder Cabinet Id)

### Reference Type Definition
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "type": { 
      "type": "string",
      "enum": [
        "document",
        "workflow",
        "case",
        "easyform",
        "master_table",
        "folder_cabinet",
        "relation"
      ]
    }
  },
  "required": ["id", "type"],
  "additionalProperties": false
}
```

### Reference Type Benefits
1. **Unified Interface**
   - Single consistent way to reference any subsystem
   - Simplified validation and type checking
   - Easier to maintain and extend
   - Support for cross-system references

2. **Better Type Safety**
   - Clear distinction between different types of references
   - Built-in validation for reference types
   - Type-specific metadata support
   - Enforced system and type combinations

3. **Improved Integration**
   - Consistent API responses
   - Clear documentation
   - Easier to implement in new systems
   - Support for versioning and permissions

4. **Enhanced Maintainability**
   - Single source of truth for reference handling
   - Reduced code duplication
   - Easier to update reference handling logic
   - Extensible metadata structure

### Subsystem Data Type Mapping

| Subsystem | Current Types | Proposed Types | Changes |
|-----------|--------------|----------------|---------|
| Document Management | String | String | No changes |
| | Boolean | Boolean | |
| | Number | Number | |
| | Date | Date | |
| | | Reference | • Add Reference type for cross-system connections |
| Workflow | String | String | No changes |
| | Number | Number | |
| | Boolean | Boolean | |
| | Date | Date | |
| | | Reference | • Add Reference type for cross-system connections |
| Case Management | String | String | • Master Table → Reference |
| | Short Text | Short Text | • Folder Cabinet Id → Reference |
| | Long Text | Long Text | |
| | Integer | Integer | |
| | Float | Float | |
| | Date | Date | |
| | JSON | JSON | |
| | Boolean | Boolean | |
| | Master Table | Reference | |
| | Folder Cabinet Id | | |
| EasyForm | String | String | No changes |
| | Boolean | Boolean | |
| | Number | Number | |
| | Date | Date | |
| | | Reference | • Add Reference type for cross-system connections |
| Master Table | String | String | • Relation → Reference |
| | Short Text | Short Text | |
| | Long Text | Long Text | |
| | Integer | Integer | |
| | Float | Float | |
| | Date | Date | |
| | JSON | JSON | |
| | Boolean | Boolean | |
| | Relation | Reference | |

Legend:
- → : Indicates type conversion/mapping
- No changes: System already uses standardized types


## Technical Requirements

### 1. Schema Definition
- Use JSON Schema Draft 2020-12
- Implement custom keywords for DocPal-specific features
- Support schema composition and inheritance
- Define clear rules for type conversion between subsystems
- Implement reference type validation and resolution

### 2. Validation Engine
- Implement efficient validation algorithms
- Support async validation for complex types
- Provide detailed validation error messages
- Cache validation results for performance
- Handle reference type resolution and validation

### 3. Integration Layer
- Provide REST API endpoints for schema validation
- Support bidirectional conversion between subsystem types
- Implement reference resolution endpoints

### 4. Documentation
- Generate OpenAPI documentation
- Document migration paths
- Document type conversion rules between subsystems
- Document reference type usage and best practices

## Performance Requirements
- Support for bulk validation
- Efficient memory usage
- Caching strategy for frequently used schemas
- Optimized handling of complex type conversions
- Efficient reference resolution

## Future Considerations
- Support for custom data types
- Schema evolution and versioning
- Enhanced reference type features
- Improved reference resolution caching
- Support for reference type inheritance
