import { ref, readonly } from 'vue'
import { SchemaBuilder } from '../utils/schemaBuilder'
import { useSqliteBridge } from './useSqliteBridge'

// Type constraint for database records that must have an id
interface DatabaseRecord {
  id: string | number
  [key: string]: any
}

// Core types for SQLite composable helper
export interface TableSchema {
  name: string
  columns: ColumnDefinition[]
  indexes?: IndexDefinition[]
  constraints?: ConstraintDefinition[]
}

export interface TableHooks<T = any> {
  beforeFind?: (where: Record<string, any>, options?: QueryOptions) => Promise<void> | void
  afterFind?: (data: T[], where: Record<string, any>, options?: QueryOptions) => Promise<void> | void
  beforeFindOne?: (where: Record<string, any>) => Promise<void> | void
  afterFindOne?: (data: T, where: Record<string, any>) => Promise<void> | void
  beforeCreate?: (data: Record<string, any>) => Promise<void> | void
  afterCreate?: (data: T, originalData: Record<string, any>) => Promise<void> | void
  beforeUpdate?: (where: Record<string, any>, data: Record<string, any>) => Promise<void> | void
  afterUpdate?: (data: T, where: Record<string, any>, originalData: Record<string, any>) => Promise<void> | void
  beforeRemove?: (where: Record<string, any>) => Promise<void> | void
  afterRemove?: (where: Record<string, any>) => Promise<void> | void
  beforeClear?: () => Promise<void> | void
  afterClear?: () => Promise<void> | void
  beforeExecuteQuery?: (sql: string, params?: any[]) => Promise<void> | void
  afterExecuteQuery?: (data: any[], sql: string, params?: any[]) => Promise<void> | void
  beforeExecuteTransaction?: (operations: Array<{ sql: string; params?: any[] }>) => Promise<void> | void
  afterExecuteTransaction?: (result: any, operations: Array<{ sql: string; params?: any[] }>) => Promise<void> | void
  beforeSyncData?: (apiData: T[]) => Promise<void> | void
  afterSyncData?: (result: SyncResult<T>) => Promise<void> | void
}

export interface SyncResult<T = any> {
  new: T[]
  updated: T[]
  deleted: T[]
  total: number
}

export interface TableConfig<T = any> {
  schema: TableSchema
  hooks?: TableHooks<T>
}

export interface ColumnDefinition {
  name: string
  type: 'TEXT' | 'INTEGER' | 'REAL' | 'BLOB' | 'BOOLEAN' | 'DATE'
  nullable?: boolean
  primaryKey?: boolean
  autoIncrement?: boolean
  unique?: boolean
  default?: any
}

export interface IndexDefinition {
  name: string
  columns: string[]
  unique?: boolean
}

export interface ConstraintDefinition {
  name: string
  type: 'FOREIGN_KEY' | 'CHECK' | 'UNIQUE'
  definition: string
}

export interface QueryOptions {
  limit?: number
  offset?: number
  orderBy?: string
  orderDirection?: 'ASC' | 'DESC'
  where?: Record<string, any>
}

export interface CrudResult<T = any> {
  data?: T
  affectedRows?: number
}

export interface TableState {
  isInitialized: boolean
  error: string | null
}

export function useSqliteTable<T = any, U extends DatabaseRecord = any>(config: TableConfig<T>) {
  const { open, exec, query, transaction } = useSqliteBridge()
  
  // Use unique key for each table's initialization state
  const isInitialized = useState(`sqlite-${config.schema.name}`, () => false)
  const error = ref<string | null>(null)

  // Initialize database and table
  async function initialize(): Promise<void> {
    try {
      error.value = null

      // Open database connection
      await open()

      // Create table if not exists
      const createTableSQL = SchemaBuilder.buildCreateTableSQL(config.schema)
      await exec(createTableSQL)

      // Create indexes if defined
      if (config.schema.indexes) {
        for (const index of config.schema.indexes) {
          const createIndexSQL = SchemaBuilder.buildCreateIndexSQL(index, config.schema.name)
          await exec(createIndexSQL)
        }
      }

      // Mark table as initialized
      isInitialized.value = true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Ensure table is initialized before operations
  async function ensureInitialized(): Promise<void> {
    if (!isInitialized.value) {
      await initialize()
    }
  }

  // Check if table is already initialized
  function isTableInitialized(): boolean {
    return isInitialized.value
  }

  // Find records by criteria
  async function find(where: Record<string, any>, options?: QueryOptions): Promise<T[]> {
    try {
      await ensureInitialized()

      // Call before hook if provided
      if (config.hooks?.beforeFind && typeof config.hooks.beforeFind === 'function') {
        await config.hooks.beforeFind(where, options)
      }

      const { sql, params } = SchemaBuilder.buildSelectSQL(config.schema.name, {
        ...options,
        where
      })
      
      const result = await query<T[]>(sql, params)

      // Call after hook if provided
      if (config.hooks?.afterFind && typeof config.hooks.afterFind === 'function') {
        config.hooks.afterFind(result, where, options)
      }
      return result
    } catch (err) {
      console.error('find error', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Find single record by criteria
  async function findOne(where: Record<string, any>): Promise<T> {
    try {
      await ensureInitialized()

      // Call before hook if provided
      if (config.hooks?.beforeFindOne && typeof config.hooks.beforeFindOne === 'function') {
        await config.hooks.beforeFindOne(where)
      }

      const result = await find(where, { limit: 1 })
      
      if (result && result.length > 0) {
        const data = result[0]

        // Call after hook if provided
        if (config.hooks?.afterFindOne && typeof config.hooks.afterFindOne === 'function') {
          await config.hooks.afterFindOne(data, where)
        }

        return data
      }
      
      throw new Error('Record not found')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Create new record
  async function create(data: Record<string, any>): Promise<T> {
    try {
      await ensureInitialized()

      // Call before hook if provided
      if (config.hooks?.beforeCreate && typeof config.hooks.beforeCreate === 'function') {
        await config.hooks.beforeCreate(data)
      }

      const { sql, params } = SchemaBuilder.buildInsertSQL(config.schema.name, data)
      await exec(sql, params)

      // Return the created record
      const createdData = await findOne({ id: data.id })

      // Call after hook if provided
      if (config.hooks?.afterCreate && typeof config.hooks.afterCreate === 'function') {
        await config.hooks.afterCreate(createdData, data)
      }

      return createdData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Update existing record
  async function update(where: Record<string, any>, data: Record<string, any>): Promise<T> {
    try {
      await ensureInitialized()

      const { sql, params } = SchemaBuilder.buildUpdateSQL(config.schema.name, data, where)
      await exec(sql, params)

      // Return the updated record
      return await findOne(where)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Delete record(s)
  async function remove(where: Record<string, any>): Promise<void> {
    try {
      await ensureInitialized()

      const { sql, params } = SchemaBuilder.buildDeleteSQL(config.schema.name, where)
      await exec(sql, params)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Clear all data from table
  async function clear(): Promise<void> {
    try {
      await ensureInitialized()

      const sql = `DELETE FROM ${config.schema.name}`
      await exec(sql)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Execute custom query
  async function executeQuery(sql: string, params?: any[]): Promise<any[]> {
    try {
      await ensureInitialized()

      const result = await query<any[]>(sql, params)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Execute transaction
  async function executeTransaction(operations: Array<{ sql: string; params?: any[] }>): Promise<any> {
    try {
      await ensureInitialized()

      const ops = operations.map(op => ({
        kind: 'exec' as const,
        sql: op.sql,
        params: op.params
      }))

      const result = await transaction(ops)
      return result
    } catch (err) {
      console.error('executeTransaction error', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Check if table exists
  async function tableExists(): Promise<boolean> {
    try {
      const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name=?`
      const result = await query<{ name: string }[]>(sql, [config.schema.name])
      return result.length > 0
    } catch (err) {
      return false
    }
  }

  // Get table info
  async function getTableInfo(): Promise<any[]> {
    try {
      await ensureInitialized()

      const sql = `PRAGMA table_info(${config.schema.name})`
      const result = await query<any[]>(sql)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Delete table by name
  async function deleteTable(tableName?: string): Promise<void> {
    try {
      await ensureInitialized()

      const targetTableName = tableName || config.schema.name
      const sql = `DROP TABLE IF EXISTS ${targetTableName}`
      await exec(sql)

      // Remove from initialized tables state if it's the current table
      if (targetTableName === config.schema.name) {
        isInitialized.value = false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }

  // Sync data from API with local database
  async function syncData(data: {
    create: (T & DatabaseRecord)[],
    update: (T & DatabaseRecord)[],
    delete: (T & DatabaseRecord)[]
  }): Promise<SyncResult<T>> {
    try {
      await ensureInitialized()

      // Call before hook if provided
      if (config.hooks?.beforeSyncData && typeof config.hooks.beforeSyncData === 'function') {
        await config.hooks.beforeSyncData([...data.create, ...data.update])
      }

      const operations: Array<{ sql: string; params?: any[] }> = []

      // Prepare INSERT operations for new items
      for (const item of data.create) {
        const { sql, params } = SchemaBuilder.buildInsertSQL(config.schema.name, item as Record<string, any>)
        operations.push({ sql, params })
      }

      // Prepare UPDATE operations for updated items
      for (const item of data.update) {
        const { sql, params } = SchemaBuilder.buildUpdateSQL(
          config.schema.name, 
          item as Record<string, any>, 
          { id: item.id }
        )
        operations.push({ sql, params })
      }

      // Prepare DELETE operations for deleted items
      for (const item of data.delete) {
        const { sql, params } = SchemaBuilder.buildDeleteSQL(
          config.schema.name, 
          { id: item.id }
        )
        operations.push({ sql, params })
      }

      // Execute all operations in a single transaction
      if (operations.length > 0) {
        await executeTransaction(operations)
      }

      const result: SyncResult<T> = {
        new: data.create,
        updated: data.update,
        deleted: data.delete,
        total: data.create.length + data.update.length + data.delete.length
      }
      // Call after hook if provided
      if (config.hooks?.afterSyncData && typeof config.hooks.afterSyncData === 'function') {
        await config.hooks.afterSyncData(result)
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      throw new Error(errorMessage)
    }
  }



  // Clear error state
  function clearError(): void {
    error.value = null
  }

  return {
    // State
    isInitialized: readonly(isInitialized),
    error: readonly(error),

    // Methods
    initialize,
    ensureInitialized,
    isTableInitialized,
    find,
    findOne,
    create,
    update,
    remove,
    clear,
    executeQuery,
    executeTransaction,
    tableExists,
    getTableInfo,
    deleteTable,
    syncData,
    clearError
  }
}
