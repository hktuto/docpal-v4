# JSON Schema Middleware System Flow

## Overview
This document describes how the JSON Schema middleware layer facilitates communication and validation between different subsystems in DocPal.

## System Architecture

```mermaid
graph TD
    subgraph "Client Applications"
        A[Web Client]
        B[Third Party API]
    end

    subgraph "JSON Schema Middleware"
        D[Schema Registry]
        E[Validation Service]
        F[Type Converter]
    end

    subgraph "DocPal Subsystems"
        G[Document Management]
        H[Workflow]
        I[Case Management]
        J[EasyForm]
        K[Master Table]
    end

    %% Client to Middleware connections
    A -->|Request with Data| E
    B -->|Request with Data| E
    E -->|Validation Result| A
    E -->|Validation Result| B

    %% Middleware internal connections
    E -->|Get Schema| D
    E -->|Convert Types| F
    F -->|Get Type Mapping| D

    %% Middleware to Subsystem connections
    E -->|Validated Data| G
    E -->|Validated Data| H
    E -->|Validated Data| I
    E -->|Validated Data| J
    E -->|Validated Data| K

    %% Subsystem to Middleware connections
    G -->|Schema Updates| D
    H -->|Schema Updates| D
    I -->|Schema Updates| D
    J -->|Schema Updates| D
    K -->|Schema Updates| D
```

## Flow Description

### 1. Schema Registration
- Each subsystem registers its data types and schemas with the Schema Registry
- Schemas are versioned and stored centrally
- Type mappings between subsystems are defined
- Reference type relationships are established

### 2. Data Validation Flow
1. **Client Request**
   - Client sends data to the Validation Service
   - Request includes target subsystem and operation type

2. **Schema Retrieval**
   - Validation Service fetches relevant schema from Schema Registry
   - Checks schema version compatibility
   - Retrieves type mapping rules

3. **Type Conversion**
   - Type Converter transforms data to target subsystem format
   - Handles reference type resolution
   - Applies validation rules

4. **Validation**
   - Validates data against schema
   - Checks reference integrity
   - Verifies permissions
   - Returns validation results

5. **Subsystem Processing**
   - Validated data is sent to target subsystem
   - Subsystem processes the data
   - Returns result to client

### 3. Cross-System Communication

```mermaid
sequenceDiagram
    participant Client
    participant Validation
    participant Registry
    participant Converter
    participant SubsystemA
    participant SubsystemB

    Client->>Validation: Send Data
    Validation->>Registry: Get Schema
    Registry-->>Validation: Return Schema
    Validation->>Converter: Convert Types
    Converter-->>Validation: Converted Data
    Validation->>SubsystemA: Validated Data
    SubsystemA->>SubsystemB: Reference Request
    SubsystemB-->>SubsystemA: Reference Data
    SubsystemA-->>Validation: Process Result
    Validation-->>Client: Final Result
```

## Key Components

### 1. Schema Registry
- Central storage for all JSON schemas
- Version control for schemas
- Type mapping definitions
- Reference type relationships
- Schema validation rules

### 2. Validation Service
- Schema validation
- Type checking
- Reference resolution
- Permission verification
- Error handling

### 3. Type Converter
- Data type conversion
- Format transformation
- Reference type handling
- Cross-system type mapping
- Validation rule application

## Error Handling

### 1. Validation Errors
- Schema validation failures
- Type conversion errors
- Reference resolution failures
- Permission violations

### 2. System Errors
- Schema registry unavailable
- Subsystem communication failures
- Type conversion failures
- Reference resolution timeouts

### 3. Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {
      "validationErrors": [],
      "typeErrors": [],
      "referenceErrors": []
    }
  }
}
```

## Performance Considerations

### 1. Caching
- Schema caching
- Type mapping cache
- Reference resolution cache
- Validation result cache

### 2. Optimization
- Bulk validation
- Parallel processing
- Lazy loading
- Incremental validation

### 3. Monitoring
- Validation performance
- Type conversion metrics
- Reference resolution times
- Error rates
- Cache hit rates 
