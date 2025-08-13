// Main exports for the sql-store package

// Composables
export { useSqliteTable } from './composables/useSqliteTable'
export { useSqliteBridge } from './composables/useSqliteBridge'

// Types
export type {
  TableConfig,
  TableSchema,
  ColumnDefinition,
  IndexDefinition,
  ConstraintDefinition,
  ApiConfig,
  DataTransformers,
  DataCallbacks,
  SyncConfig,
  QueryOptions,
  CrudResult,
  SyncResult,
  TableState
} from './composables/useSqliteTable'

// Utilities
export { SchemaBuilder } from './utils/schemaBuilder'

// Examples
export { 
  userTableConfig, 
  createReadOnlyUserConfig,
  createWriteOnlyUserConfig,
  createLocalOnlyUserConfig
} from './.playground/pages/userTable'
