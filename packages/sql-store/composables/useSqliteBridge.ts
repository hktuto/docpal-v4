
type WorkerRequestType = 'open' | 'migrate' | 'exec' | 'query' | 'transaction'

interface WorkerRequest<T = any> {
  id: string
  type: WorkerRequestType
  payload?: T
}

interface WorkerResponse<T = any> {
  id: string
  ok: boolean
  result?: T
  error?: string
}

const worker = new Worker('/workers/sqlite.standalone-worker.js', { type: 'module' })


export function useSqliteBridge() {
  worker.onmessage = (e: any) => {
    console.log('onmessage', e.data)
    // if (e.data?.forward) worker?.postMessage(e.data.forward)
  }
  function open() {
    console.log('open');
    return send('open')
  }
  function migrate(migrations: string[]) {
    return send('migrate', { migrations })
  }
  function exec(sql: string, params?: any[]) {
    return send('exec', { sql, params })
  }
  function query<T = any>(sql: any, params?: any[]) {
    return send<T>('query', { sql, params })
  }
  function transaction(ops: Array<{ kind: 'exec'|'query', sql: string, params?: any[] }>) {
    return send('transaction', { ops })
  }
  function send<T = any, P = any>(type: WorkerRequestType, payload?: P): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      worker.postMessage({ type, payload })
      worker.onmessage = (e: MessageEvent<WorkerResponse<T>>) => {
        if (e.data.ok) resolve(e.data.result as T)
        else reject(new Error(e.data.error || 'Worker error'))
      }
    })
  }
  return {
    open,
    migrate,
    exec,
    query,
    transaction
  }
}


