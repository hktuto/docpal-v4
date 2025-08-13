# SQLite Composable Helper - Phase 1

A powerful Vue 3 composable for managing SQLite tables with full CRUD operations, built on top of SQLite WASM.

## Features

- ✅ **Table Management**: Automatic table creation and schema management
- ✅ **CRUD Operations**: Create, Read, Update, Delete operations
- ✅ **Data Transformers**: Convert between API and database formats
- ✅ **Reactive State**: Vue 3 reactive state management
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Error Handling**: Comprehensive error handling and logging
- ✅ **Query Building**: Dynamic SQL query generation
- ✅ **Transactions**: Support for database transactions

## Installation

The package is already included in your workspace. Make sure the SQLite WASM worker is available at `/workers/sqlite.standalone-worker.js`.

## Quick Start

### 1. Define Your Table Configuration

```typescript
import type { TableConfig } from '@your-org/sql-store/types'

interface UserApiData {
  id: number
  name: string
  email: string
  isActive: boolean
  createdAt: string
}

interface UserColumnData {
  id: number
  name: string
  email: string
  is_active: number // SQLite uses INTEGER for booleans
  created_at: string
}

const userTableConfig: TableConfig<UserApiData, UserColumnData> = {
  name: 'users',
  schema: {
    name: 'users',
    columns: [
      { name: 'id', type: 'INTEGER', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'TEXT', nullable: false },
      { name: 'email', type: 'TEXT', nullable: false, unique: true },
      { name: 'is_active', type: 'INTEGER', nullable: false, default: 1 },
      { name: 'created_at', type: 'TEXT', nullable: false }
    ],
    indexes: [
      { name: 'idx_users_email', columns: ['email'], unique: true }
    ]
  },
  transformers: {
    apiToColumn: (apiData) => ({
      id: apiData.id,
      name: apiData.name,
      email: apiData.email,
      is_active: apiData.isActive ? 1 : 0,
      created_at: apiData.createdAt
    }),
    columnToApi: (columnData) => ({
      id: columnData.id,
      name: columnData.name,
      email: columnData.email,
      isActive: columnData.is_active === 1,
      createdAt: columnData.created_at
    })
  },
  options: {
    enableCache: true,
    enableLogging: true
  }
}
```

### 2. Use the Composable

```vue
<template>
  <div>
    <button @click="initTable" :disabled="isInitialized">
      Initialize Table
    </button>
    
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="user in data" :key="user.id">
          {{ user.name }} ({{ user.email }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useSqliteTable } from '@your-org/sql-store/composables/useSqliteTable'
import { userTableConfig } from './userTableConfig'

const {
  state,
  isLoading,
  hasError,
  isInitialized,
  data,
  initialize,
  load,
  create,
  update,
  remove
} = useSqliteTable(userTableConfig)

onMounted(async () => {
  await initialize()
  await load()
})
</script>
```

## API Reference

### Table Configuration

```typescript
interface TableConfig<T = any, U = any> {
  name: string                    // Table name
  schema: TableSchema            // Database schema
  transformers?: DataTransformers<T, U>  // Data conversion functions
  options?: {
    enableCache?: boolean        // Auto-refresh after operations
    enableLogging?: boolean      // Console logging
  }
}
```

### Schema Definition

```typescript
interface TableSchema {
  name: string
  columns: ColumnDefinition[]
  indexes?: IndexDefinition[]
  constraints?: ConstraintDefinition[]
}

interface ColumnDefinition {
  name: string
  type: 'TEXT' | 'INTEGER' | 'REAL' | 'BLOB' | 'BOOLEAN'
  nullable?: boolean
  primaryKey?: boolean
  autoIncrement?: boolean
  unique?: boolean
  default?: any
}
```

### Composable Return Value

```typescript
const {
  // Reactive State
  state,           // Full reactive state object
  isLoading,       // Loading state
  hasError,        // Error state
  isInitialized,   // Initialization state
  data,            // Current table data
  lastSync,        // Last sync timestamp

  // Methods
  initialize,      // Initialize table
  load,           // Load all data
  find,           // Find records by criteria
  findOne,        // Find single record
  create,         // Create new record
  update,         // Update existing record
  remove,         // Delete record(s)
  clear,          // Clear all data
  executeQuery,   // Execute custom SQL
  executeTransaction, // Execute transaction
  refresh,        // Refresh data
  clearError      // Clear error state
} = useSqliteTable(config)
```

## Usage Examples

### Basic CRUD Operations

```typescript
// Initialize table
await initialize()

// Load all data
await load()

// Create a new record
const newUser = {
  name: 'John Doe',
  email: 'john@example.com',
  isActive: true,
  createdAt: new Date().toISOString()
}
await create(newUser)

// Find records
const activeUsers = await find({ is_active: 1 })

// Find single record
const user = await findOne({ email: 'john@example.com' })

// Update record
await update({ id: 1 }, { name: 'Jane Doe' })

// Delete record
await remove({ id: 1 })

// Clear all data
await clear()
```

### Advanced Queries

```typescript
// Load with options
await load({
  limit: 10,
  offset: 20,
  orderBy: 'created_at',
  orderDirection: 'DESC'
})

// Find with options
await find(
  { is_active: 1 },
  { 
    limit: 5,
    orderBy: 'name',
    orderDirection: 'ASC'
  }
)
```

### Custom Queries

```typescript
// Execute custom SQL
const result = await executeQuery(
  'SELECT COUNT(*) as count FROM users WHERE is_active = ?',
  [1]
)

// Execute transaction
await executeTransaction([
  { sql: 'INSERT INTO users (name, email) VALUES (?, ?)', params: ['User1', 'user1@example.com'] },
  { sql: 'INSERT INTO users (name, email) VALUES (?, ?)', params: ['User2', 'user2@example.com'] }
])
```

### Error Handling

```typescript
const result = await create(userData)
if (!result.success) {
  console.error('Failed to create user:', result.error)
  // Handle error appropriately
}
```

## Data Transformers

Data transformers allow you to convert between your API data format and the database column format:

```typescript
const transformers = {
  // Convert API data to database columns
  apiToColumn: (apiData: UserApiData): UserColumnData => ({
    id: apiData.id,
    name: apiData.name,
    email: apiData.email,
    is_active: apiData.isActive ? 1 : 0,  // Convert boolean to integer
    created_at: apiData.createdAt
  }),

  // Convert database columns to API data
  columnToApi: (columnData: UserColumnData): UserApiData => ({
    id: columnData.id,
    name: columnData.name,
    email: columnData.email,
    isActive: columnData.is_active === 1,  // Convert integer to boolean
    createdAt: columnData.created_at
  })
}
```

## Best Practices

### 1. Schema Design

- Use meaningful column names
- Define appropriate data types
- Add indexes for frequently queried columns
- Use constraints for data integrity

### 2. Data Transformers

- Keep transformers simple and focused
- Handle type conversions (boolean ↔ integer)
- Maintain data consistency
- Consider null/undefined handling

### 3. Error Handling

- Always check operation results
- Provide meaningful error messages
- Implement retry logic for critical operations
- Log errors for debugging

### 4. Performance

- Use indexes for frequently queried columns
- Limit query results when possible
- Use transactions for multiple operations
- Consider caching strategies

## Migration from Phase 1 to Phase 2

When Phase 2 (API Integration) is implemented, your existing Phase 1 code will continue to work. The API configuration will be added as an optional property:

```typescript
const config: TableConfig = {
  // ... existing Phase 1 config
  api: {
    baseUrl: 'https://api.example.com',
    endpoints: {
      list: '/users',
      create: '/users',
      update: '/users/{id}',
      delete: '/users/{id}'
    }
  },
  sync: {
    strategy: 'immediate',
    interval: 30000
  }
}
```

## Troubleshooting

### Common Issues

1. **Table not initialized**: Call `initialize()` before other operations
2. **Data not loading**: Check if the table exists and has data
3. **Transformer errors**: Verify data types match your schema
4. **SQL errors**: Check column names and data types

### Debug Mode

Enable logging to see detailed operations:

```typescript
const config = {
  // ... other config
  options: {
    enableLogging: true
  }
}
```

## Next Steps

Phase 1 provides a solid foundation for local SQLite operations. In Phase 2, we'll add:

- API integration and synchronization
- Offline queue management
- Conflict resolution
- Real-time sync capabilities
- Batch operations

The current implementation is production-ready for local-first applications and can be extended with API integration when needed.


