import type { TableSchema, ColumnDefinition, IndexDefinition, ConstraintDefinition } from '../types'

export class SchemaBuilder {
  static buildCreateTableSQL(schema: TableSchema): string {
    const columns = schema.columns.map(col => this.buildColumnDefinition(col)).join(',\n  ')
    const constraints = schema.constraints?.map(constraint => this.buildConstraintDefinition(constraint)).join(',\n  ') || ''
    
    let sql = `CREATE TABLE IF NOT EXISTS ${schema.name} (\n  ${columns}`
    
    if (constraints) {
      sql += `,\n  ${constraints}`
    }
    
    sql += '\n)'
    return sql
  }

  static buildColumnDefinition(column: ColumnDefinition): string {
    let definition = `${column.name} ${column.type}`
    
    if (column.primaryKey) {
      definition += ' PRIMARY KEY'
      if (column.autoIncrement) {
        definition += ' AUTOINCREMENT'
      }
    }
    
    if (column.unique) {
      definition += ' UNIQUE'
    }
    
    if (!column.nullable) {
      definition += ' NOT NULL'
    }
    
    if (column.default !== undefined) {
      if (typeof column.default === 'string') {
        definition += ` DEFAULT '${column.default}'`
      } else {
        definition += ` DEFAULT ${column.default}`
      }
    }
    
    return definition
  }

  static buildConstraintDefinition(constraint: ConstraintDefinition): string {
    return `CONSTRAINT ${constraint.name} ${constraint.type} ${constraint.definition}`
  }

  static buildCreateIndexSQL(index: IndexDefinition, tableName: string): string {
    const unique = index.unique ? 'UNIQUE ' : ''
    const columns = index.columns.join(', ')
    return `CREATE ${unique}INDEX IF NOT EXISTS ${index.name} ON ${tableName} (${columns})`
  }

  static buildDropTableSQL(tableName: string): string {
    return `DROP TABLE IF EXISTS ${tableName}`
  }

  static buildTableExistsSQL(tableName: string): string {
    return `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`
  }

  static buildSelectSQL(tableName: string, options?: {
    columns?: string[]
    where?: Record<string, any>
    orderBy?: string
    orderDirection?: 'ASC' | 'DESC'
    limit?: number
    offset?: number
  }): { sql: string; params: any[] } {
    const columns = options?.columns?.join(', ') || '*'
    let sql = `SELECT ${columns} FROM ${tableName}`
    const params: any[] = []
    
    if (options?.where) {
      const whereClauses = Object.entries(options.where).map(([key, value]) => {
        params.push(value)
        return `${key} = '${value}'`
      })
      sql += ` WHERE ${whereClauses.join(' AND ')}`
    }
    
    if (options?.orderBy) {
      sql += ` ORDER BY ${options.orderBy} ${options.orderDirection || 'ASC'}`
    }
    
    if (options?.limit) {
      sql += ` LIMIT ${options.limit}`
    }
    
    if (options?.offset) {
      sql += ` OFFSET ${options.offset}`
    }
    
    return { sql, params }
  }

  static buildInsertSQL(tableName: string, data: Record<string, any>): { sql: string; params: any[] } {
    const columns = Object.keys(data)
    const placeholders = columns.map(() => '?').join(', ')
    const sql = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`
    const params = Object.values(data)
    
    return { sql, params }
  }

  static buildUpdateSQL(tableName: string, data: Record<string, any>, where: Record<string, any>): { sql: string; params: any[] } {
    const setClauses = Object.keys(data).map(key => `${key} = ?`)
    const whereClauses = Object.keys(where).map(key => `${key} = ?`)
    
    const sql = `UPDATE ${tableName} SET ${setClauses.join(', ')} WHERE ${whereClauses.join(' AND ')}`
    const params = [...Object.values(data), ...Object.values(where)]
    
    return { sql, params }
  }

  static buildDeleteSQL(tableName: string, where: Record<string, any>): { sql: string; params: any[] } {
    const whereClauses = Object.keys(where).map(key => `${key} = ?`)
    const sql = `DELETE FROM ${tableName} WHERE ${whereClauses.join(' AND ')}`
    const params = Object.values(where)
    
    return { sql, params }
  }
}

