
type WorkerRequestType = 'open' | 'migrate' | 'exec' | 'query' | 'transaction'

interface WorkerRequest<T = any> {
  id: string
  type: WorkerRequestType
  payload?: T
  clientId?: string // For SharedWorker to identify different clients
}

interface WorkerResponse<T = any> {
  id: string
  ok: boolean
  result?: T
  error?: string
  clientId?: string // For SharedWorker to route responses to correct client
}

// Generate unique client ID for this instance
const clientId = `client_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`

// Use SharedWorker if available, fallback to regular Worker
let worker: Worker | SharedWorker | null = null
let port: MessagePort | null = null
let isSharedWorker = false
let isWorkerAvailable = false

// Check if workers are available (not in test environment)
if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
  isWorkerAvailable = true
  
  // Check if SharedWorker is available
  if ('SharedWorker' in window) {
    // Use SharedWorker
    worker = new SharedWorker('/workers/sqlite.shared-worker.js', { type: 'module' })
    port = (worker as SharedWorker).port
    port.start()
    isSharedWorker = true
  } else {
    // Fallback to regular Worker
    worker = new Worker('/workers/sqlite.standalone-worker.js', { type: 'module' })
    isSharedWorker = false
    console.log('SharedWorker not supported, using regular Worker for SQLite bridge')
  }
}

// Track pending requests
const pendingRequests = new Map<string, { resolve: (value: any) => void; reject: (error: any) => void }>()

// Connection status
let isConnected = false
let connectionError: string | null = null

// Handle messages from worker
function handleWorkerMessage(e: MessageEvent<WorkerResponse>) {
  const { id, ok, result, error, clientId: responseClientId } = e.data
  // For SharedWorker, only handle messages for this client
  if (responseClientId && responseClientId !== clientId) {
    return
  }
  
  const pendingRequest = pendingRequests.get(id)
  if (pendingRequest) {
    pendingRequests.delete(id)
    
    if (ok) {
      pendingRequest.resolve(result)
    } else {
      pendingRequest.reject(new Error(error || 'Worker error'))
    }
  }
}

// Handle connection events
function handleConnect() {
  isConnected = true
  connectionError = null
  console.log('SQLite bridge connected')
}

function handleDisconnect(error?: string) {
  isConnected = false
  connectionError = error || 'Connection lost'
  console.warn('SQLite bridge disconnected:', connectionError)
  
  // Reject all pending requests
  for (const [id, { reject }] of pendingRequests.entries()) {
    pendingRequests.delete(id)
    reject(new Error('Connection lost'))
  }
}

// Set up message handlers only if workers are available
if (isWorkerAvailable && worker) {
  if (port) {
    // SharedWorker
    port.onmessage = handleWorkerMessage
    // Note: MessagePort doesn't have onerror, errors are handled in onmessage
  } else {
    // Regular Worker
    (worker as Worker).onmessage = handleWorkerMessage
    ;(worker as Worker).onerror = (event: ErrorEvent) => {
      console.error('Worker error:', event.error)
      handleDisconnect('Worker error')
    }
  }
}

export function useSqliteBridge() {
  // No-op functions for when workers are not available
  function noOpOpen() {
    return Promise.resolve()
  }
  
  function noOpMigrate(migrations: string[]) {
    return Promise.resolve()
  }
  
  function noOpExec(sql: string, params?: any[]) {
    return Promise.resolve()
  }
  
  function noOpQuery<T = any>(sql: any, params?: any[]) {
    return Promise.resolve([] as T)
  }
  
  function noOpTransaction(ops: Array<{ kind: 'exec'|'query', sql: string, params?: any[] }>) {
    return Promise.resolve()
  }

  function open() {
    if (!isWorkerAvailable) return noOpOpen()
    return send('open')
  }
  
  function migrate(migrations: string[]) {
    if (!isWorkerAvailable) return noOpMigrate(migrations)
    return send('migrate', { migrations })
  }
  
  function exec(sql: string, params?: any[]) {
    if (!isWorkerAvailable) return noOpExec(sql, params)
    return send('exec', { sql, params })
  }
  
  function query<T = any>(sql: any, params?: any[]) {
    if (!isWorkerAvailable) return noOpQuery<T>(sql, params)
    return send<T>('query', { sql, params })
  }
  
  function transaction(ops: Array<{ kind: 'exec'|'query', sql: string, params?: any[] }>) {
    if (!isWorkerAvailable) return noOpTransaction(ops)
    return send('transaction', { ops })
  }
  
  function send<T = any, P = any>(type: WorkerRequestType, payload?: P): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // Check connection status
      const id = `${type}_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
      
      // Store the promise handlers
      pendingRequests.set(id, { resolve, reject })
      
      // Create the request
      const request: WorkerRequest<P> = {
        id,
        type,
        payload,
        clientId
      }
      
      try {
        // Send the message
        if (port) {
          // SharedWorker
          port.postMessage(request)
        } else if (worker) {
          // Regular Worker
          (worker as Worker).postMessage(request)
        } else {
          // Silently reject if no worker available
          reject(new Error('No worker available'))
          return
        }
        
        // Set a timeout to clean up pending requests
        setTimeout(() => {
          const pendingRequest = pendingRequests.get(id)
          if (pendingRequest) {
            pendingRequests.delete(id)
            pendingRequest.reject(new Error(`Request timeout: ${type}`))
          }
        }, 30000) // 30 second timeout
      } catch (error) {
        pendingRequests.delete(id)
        reject(new Error(`Failed to send request: ${error}`))
      }
    })
  }
  
  // Cleanup function to remove this client's pending requests
  function cleanup() {
    // Reject all pending requests for this client
    for (const [id, { reject }] of pendingRequests.entries()) {
      reject(new Error('Client disconnected'))
    }
    pendingRequests.clear()
  }
  
  // Get connection status
  function getConnectionStatus() {
    return {
      isConnected: isWorkerAvailable ? isConnected : false,
      isSharedWorker,
      isWorkerAvailable,
      connectionError: isWorkerAvailable ? connectionError : null,
      clientId,
      pendingRequestsCount: pendingRequests.size
    }
  }

  onUnmounted(() => {
    cleanup()
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', cleanup)
    }
  })

  onMounted(() => {
    open()
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', cleanup)
    }
  })

  
  return {
    open,
    migrate,
    exec,
    query,
    transaction,
    cleanup,
    getConnectionStatus,
    clientId, // Expose clientId for debugging
    isSharedWorker, // Expose worker type for debugging
    isWorkerAvailable // Expose worker availability for debugging
  }
}


