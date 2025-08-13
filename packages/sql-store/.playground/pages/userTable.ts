import type { TableConfig } from '../../composables/useSqliteTable'

// Define the data structure (same for API and database)
interface UserData {
  id: number
  name: string
  email: string
  age: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Mock API functions (replace with your actual API wrapper)
const mockApiEndpoints = {
  list: async (params?: any): Promise<UserData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data - replace with your actual API call
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 25,
        isActive: true,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        age: 35,
        isActive: false,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z'
      }
    ]
  },

  create: async (data: UserData): Promise<UserData> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock creation - replace with your actual API call
    return {
      ...data,
      id: Math.floor(Math.random() * 1000) + 100, // Generate random ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  update: async (id: string | number, data: Partial<UserData>): Promise<UserData> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock update - replace with your actual API call
    return {
      id: Number(id),
      name: data.name || 'Updated User',
      email: data.email || 'updated@example.com',
      age: data.age || 0,
      isActive: data.isActive ?? true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: new Date().toISOString()
    }
  },

  delete: async (id: string | number): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Mock deletion - replace with your actual API call
    return true
  },

  get: async (id: string | number): Promise<UserData> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Mock get - replace with your actual API call
    return {
      id: Number(id),
      name: 'User ' + id,
      email: `user${id}@example.com`,
      age: 25,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  }
}

// Table configuration - No transformers needed since API and DB data are the same
export const userTableConfig: TableConfig<UserData, UserData> = {
  name: 'users',
  schema: {
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        primaryKey: true,
        autoIncrement: true
      },
      {
        name: 'name',
        type: 'TEXT',
        nullable: false
      },
      {
        name: 'email',
        type: 'TEXT',
        nullable: false,
        unique: true
      },
      {
        name: 'age',
        type: 'INTEGER',
        nullable: true
      },
      {
        name: 'isActive',
        type: 'BOOLEAN',
        nullable: false,
        default: true
      },
      {
        name: 'createdAt',
        type: 'TEXT',
        nullable: false
      },
      {
        name: 'updatedAt',
        type: 'TEXT',
        nullable: false
      }
    ],
    indexes: [
      {
        name: 'idx_users_email',
        columns: ['email'],
        unique: true
      },
      {
        name: 'idx_users_active',
        columns: ['isActive']
      }
    ]
  },
  api: {
    endpoints: mockApiEndpoints, // All endpoints available
    options: {
      retryAttempts: 3,
      retryDelay: 1000
    }
  },
  // Optional: Add query transformer if API expects different parameter names
  transformers: {
    // Example: API uses different parameter names than database
    queryTransformer: (dbQueryOptions: any) => {
      const apiParams: any = { ...dbQueryOptions }
      
      // Example: API uses 'page' and 'size' instead of 'offset' and 'limit'
      if (dbQueryOptions.offset !== undefined && dbQueryOptions.limit) {
        apiParams.page = Math.floor(dbQueryOptions.offset / dbQueryOptions.limit) + 1
        apiParams.size = dbQueryOptions.limit
        delete apiParams.offset
        delete apiParams.limit
      }
      
      // Example: API uses 'sort' instead of 'orderBy'
      if (dbQueryOptions.orderBy) {
        apiParams.sort = dbQueryOptions.orderBy
        delete apiParams.orderBy
      }
      
      return apiParams
    }
  },
  callbacks: {
    // Called when data is loaded (from local DB or API)
    onDataLoaded: (data, source) => {
      console.log(`📊 Data loaded from ${source}:`, data.length, 'records')
    },
    
    // Called when data is updated
    onDataUpdated: (data, source) => {
      console.log(`🔄 Data updated from ${source}:`, data.length, 'records')
    },
    
    // Called when a new record is created
    onDataCreated: (data, source) => {
      console.log(`➕ Record created from ${source}:`, data)
    },
    
    // Called when a record is deleted
    onDataDeleted: (id, source) => {
      console.log(`🗑️ Record deleted from ${source}:`, id)
    },
    
    // Called when sync starts
    onSyncStarted: () => {
      console.log('🔄 Sync started...')
    },
    
    // Called when sync completes successfully
    onSyncCompleted: (data, synced) => {
      console.log(`✅ Sync completed: ${synced} records synced`)
    },
    
    // Called when sync fails
    onSyncFailed: (error) => {
      console.error('❌ Sync failed:', error)
    },
    
    // Called when any operation encounters an error
    onError: (error, operation) => {
      console.error(`💥 Error in ${operation}:`, error)
    }
  },
  sync: {
    strategy: 'immediate',
    interval: 30000 // 30 seconds
  },
  options: {
    enableLogging: true
  }
}

// Example: Read-only configuration (only list endpoint)
export const createReadOnlyUserConfig = (): TableConfig<UserData, UserData> => ({
  ...userTableConfig,
  api: {
    endpoints: {
      list: mockApiEndpoints.list // Only read operations
      // No create, update, delete endpoints
    },
    options: {
      retryAttempts: 3,
      retryDelay: 1000
    }
  }
})

// Example: Write-only configuration (no list endpoint)
export const createWriteOnlyUserConfig = (): TableConfig<UserData, UserData> => ({
  ...userTableConfig,
  api: {
    endpoints: {
      create: mockApiEndpoints.create,
      update: mockApiEndpoints.update,
      delete: mockApiEndpoints.delete
      // No list endpoint - data only flows from local to API
    },
    options: {
      retryAttempts: 3,
      retryDelay: 1000
    }
  }
})

// Example: Local-only configuration (no API endpoints)
export const createLocalOnlyUserConfig = (): TableConfig<UserData, UserData> => ({
  ...userTableConfig,
  // No api configuration - purely local database
  sync: {
    strategy: 'manual' // No automatic syncing
  }
})
