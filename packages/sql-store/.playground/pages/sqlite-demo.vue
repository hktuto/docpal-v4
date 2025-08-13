<template>
  <div class="sqlite-demo">
    <h1>SQLite Composable Helper Demo</h1>
    
    <!-- Status Section -->
    <div class="status-section">
      <h2>📊 Status</h2>
      <div class="status-grid">
        <div class="status-item">
          <span class="label">Initialized:</span>
          <span :class="['value', isInitialized ? 'success' : 'error']">
            {{ isInitialized ? '✅ Yes' : '❌ No' }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">Loading:</span>
          <span :class="['value', loading ? 'warning' : 'success']">
            {{ loading ? '⏳ Yes' : '✅ No' }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">Syncing:</span>
          <span :class="['value', isSyncing ? 'warning' : 'success']">
            {{ isSyncing ? '🔄 Yes' : '✅ No' }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">Data Status:</span>
          <span :class="['value', getDataStatusClass()]">
            {{ getDataStatusText() }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">Records:</span>
          <span class="value">{{ data.length }}</span>
        </div>
        <div class="status-item">
          <span class="label">Last Sync:</span>
          <span class="value">{{ lastSync ? formatDate(lastSync) : 'Never' }}</span>
        </div>
        <div class="status-item">
          <span class="label">Worker Type:</span>
          <span :class="['value', isSharedWorker ? 'success' : 'neutral']">
            {{ isSharedWorker ? '🔄 SharedWorker' : '🔧 Regular Worker' }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">Client ID:</span>
          <span class="value client-id">{{ clientId }}</span>
        </div>
      </div>
      
      <div v-if="error" class="error-message">
        <strong>Error:</strong> {{ error }}
      </div>
    </div>

    <!-- Actions Section -->
    <div class="actions-section">
      <h2>🎮 Actions</h2>
      <div class="action-buttons">
        <button @click="() => load()" :disabled="!isInitialized || loading" class="btn">
          {{ loading ? 'Loading...' : '🔄 Load Data' }}
        </button>
        <button @click="syncData" :disabled="!isInitialized || isSyncing" class="btn">
          {{ isSyncing ? 'Syncing...' : '🔄 Manual Sync' }}
        </button>
        <button @click="refreshData" :disabled="!isInitialized || loading" class="btn">
          🔄 Force Refresh
        </button>
        <button @click="clearAllData" :disabled="!isInitialized || data.length === 0" class="btn btn-danger">
          🗑️ Clear All
        </button>
        <button @click="addSampleData" :disabled="!isInitialized || loading" class="btn btn-secondary">
          ➕ Add Sample Data
        </button>
      </div>
    </div>

    <!-- Create User Section -->
    <div class="create-section">
      <h2>➕ Create User</h2>
      <div class="form-grid">
        <input v-model="newUser.name" placeholder="Name" class="input" />
        <input v-model="newUser.email" placeholder="Email" class="input" />
        <input v-model.number="newUser.age" type="number" placeholder="Age" class="input" />
        <button @click="createUser" :disabled="!isInitialized || loading" class="btn btn-primary">
          Create User
        </button>
      </div>
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <h2>🔍 Search Users</h2>
      <div class="search-form">
        <input v-model="searchEmail" placeholder="Search by email..." class="input" />
        <button @click="searchUsers" :disabled="!isInitialized || loading" class="btn">
          Search
        </button>
      </div>
      
      <div v-if="searchResults.length > 0" class="search-results">
        <h3>Search Results:</h3>
        <div class="user-list">
          <div v-for="user in searchResults" :key="user.id" class="user-item">
            <div class="user-info">
              <strong>{{ user.name }}</strong> ({{ user.email }})
              <span :class="['status', user.isActive ? 'active' : 'inactive']">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="user-actions">
              <button @click="toggleUserStatus(user)" class="btn btn-small">
                {{ user.isActive ? 'Deactivate' : 'Activate' }}
              </button>
              <button @click="deleteUser(user.id)" class="btn btn-small btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Display Section -->
    <div class="data-section">
      <h2>📋 User Data</h2>
      <div class="data-actions">
        <button @click="() => load()" :disabled="!isInitialized || loading" class="btn">
          {{ loading ? 'Loading...' : '🔄 Load Data' }}
        </button>
        <span v-if="lastOperationSource" class="last-operation">
          Last operation: {{ lastOperationSource }}
        </span>
      </div>
      
      <div v-if="data.length === 0" class="empty-state">
        <p>No data loaded. Click "Load Data" to start.</p>
      </div>
      
      <div v-else class="user-list">
        <div v-for="user in data" :key="user.id" class="user-item">
          <div class="user-info">
            <strong>{{ user.name }}</strong> ({{ user.email }})
            <span class="age">Age: {{ user.age }}</span>
            <span :class="['status', user.isActive ? 'active' : 'inactive']">
              {{ user.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <div class="user-actions">
            <button @click="toggleUserStatus(user)" class="btn btn-small">
              {{ user.isActive ? 'Deactivate' : 'Activate' }}
            </button>
            <button @click="deleteUser(user.id)" class="btn btn-small btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Callback Log Section -->
    <div class="callback-section">
      <h2>📝 Callback Log</h2>
      <div class="callback-log">
        <div v-for="(log, index) in callbackLogs" :key="index" class="log-entry">
          <span class="timestamp">{{ formatTime(log.timestamp) }}</span>
          <span :class="['log-level', log.level]">{{ log.level.toUpperCase() }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
        <div v-if="callbackLogs.length === 0" class="empty-state">
          <p>No callback events yet. Perform some actions to see callbacks in action!</p>
        </div>
      </div>
      <button @click="clearCallbackLogs" class="btn btn-small">Clear Log</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSqliteTable } from '../../composables/useSqliteTable'
import { useSqliteBridge } from '../../composables/useSqliteBridge'
import { userTableConfig } from './userTable'

// Initialize the table composable
const {
  data,
  loading,
  error,
  lastSync,
  isInitialized,
  isSyncing,
  dataStatus,
  initialize,
  load,
  create,
  update,
  remove,
  clear,
  find,
  refresh,
  sync
} = useSqliteTable(userTableConfig)

// Get SQLite bridge for connection status
const { getConnectionStatus, isSharedWorker, clientId } = useSqliteBridge()

// Local state
const newUser = ref({
  name: '',
  email: '',
  age: 25,
  isActive: true
})

const searchEmail = ref('')
const searchResults = ref<any[]>([])
const lastOperationSource = ref<string>('')
const callbackLogs = ref<Array<{timestamp: Date, level: string, message: string}>>([])

// Helper functions
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

function getDataStatusClass(): string {
  switch (dataStatus.value) {
    case 'fresh': return 'success'
    case 'stale': return 'warning'
    case 'empty': return 'error'
    default: return 'neutral'
  }
}

function getDataStatusText(): string {
  switch (dataStatus.value) {
    case 'fresh': return '🟢 Fresh'
    case 'stale': return '🟡 Stale'
    case 'empty': return '🔴 Empty'
    default: return '⚪ Unknown'
  }
}

function addCallbackLog(level: string, message: string) {
  callbackLogs.value.unshift({
    timestamp: new Date(),
    level,
    message
  })
  
  // Keep only last 50 logs
  if (callbackLogs.value.length > 50) {
    callbackLogs.value = callbackLogs.value.slice(0, 50)
  }
}

function clearCallbackLogs() {
  callbackLogs.value = []
}

// Override console methods to capture callback logs
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error
}

console.log = (...args) => {
  originalConsole.log(...args)
  if (args[0]?.includes('📊') || args[0]?.includes('🔄') || args[0]?.includes('➕') || 
      args[0]?.includes('🗑️') || args[0]?.includes('✅') || args[0]?.includes('❌') || 
      args[0]?.includes('💥')) {
    addCallbackLog('info', args.join(' '))
  }
}

console.warn = (...args) => {
  originalConsole.warn(...args)
  if (args[0]?.includes('📊') || args[0]?.includes('🔄') || args[0]?.includes('➕') || 
      args[0]?.includes('🗑️') || args[0]?.includes('✅') || args[0]?.includes('❌') || 
      args[0]?.includes('💥')) {
    addCallbackLog('warning', args.join(' '))
  }
}

console.error = (...args) => {
  originalConsole.error(...args)
  if (args[0]?.includes('📊') || args[0]?.includes('🔄') || args[0]?.includes('➕') || 
      args[0]?.includes('🗑️') || args[0]?.includes('✅') || args[0]?.includes('❌') || 
      args[0]?.includes('💥')) {
    addCallbackLog('error', args.join(' '))
  }
}

// Initialize on mount
onMounted(async () => {
  await load()
})

// Action functions
async function syncData() {
  const result = await sync()
  if (result.success) {
    lastOperationSource.value = `API sync (${result.synced} records)`
  } else {
    lastOperationSource.value = `Sync failed: ${result.errors.join(', ')}`
  }
}

async function refreshData() {
  const result = await refresh()
  if (result.success) {
    lastOperationSource.value = `Force refresh (${result.data?.length || 0} records)`
  } else {
    lastOperationSource.value = `Refresh failed: ${result.error}`
  }
}

async function createUser() {
  if (!newUser.value.name || !newUser.value.email) {
    alert('Please fill in name and email')
    return
  }

  const result = await create({
    id: 0, // Will be assigned by database
    name: newUser.value.name,
    email: newUser.value.email,
    age: newUser.value.age,
    isActive: newUser.value.isActive,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  if (result.success) {
    lastOperationSource.value = `Created user: ${result.data?.name}`
    // Reset form
    newUser.value = {
      name: '',
      email: '',
      age: 25,
      isActive: true
    }
  } else {
    lastOperationSource.value = `Create failed: ${result.error}`
  }
}

async function toggleUserStatus(user: any) {
  const result = await update(
    { id: user.id },
    { isActive: !user.isActive }
  )

  if (result.success) {
    lastOperationSource.value = `Updated user: ${user.name}`
  } else {
    lastOperationSource.value = `Update failed: ${result.error}`
  }
}

async function deleteUser(userId: number) {
  if (!confirm('Are you sure you want to delete this user?')) return

  const result = await remove({ id: userId })

  if (result.success) {
    lastOperationSource.value = `Deleted user ID: ${userId}`
  } else {
    lastOperationSource.value = `Delete failed: ${result.error}`
  }
}

async function searchUsers() {
  if (!searchEmail.value.trim()) {
    searchResults.value = []
    return
  }

  const result = await find({ email: searchEmail.value })
  
  if (result.success) {
    searchResults.value = result.data || []
    lastOperationSource.value = `Search found ${searchResults.value.length} results`
  } else {
    searchResults.value = []
    lastOperationSource.value = `Search failed: ${result.error}`
  }
}

async function clearAllData() {
  if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return

  const result = await clear()
  
  if (result.success) {
    lastOperationSource.value = `Cleared all data (${result.affectedRows} records)`
  } else {
    lastOperationSource.value = `Clear failed: ${result.error}`
  }
}

async function addSampleData() {
  const sampleUsers = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      age: 28,
      isActive: true
    },
    {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      age: 32,
      isActive: false
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      age: 25,
      isActive: true
    }
  ]

  for (const user of sampleUsers) {
    await create({
      id: 0,
      name: user.name,
      email: user.email,
      age: user.age,
      isActive: user.isActive,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  lastOperationSource.value = `Added ${sampleUsers.length} sample users`
}
</script>

<style scoped>
.sqlite-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.status-section, .actions-section, .create-section, .search-section, .data-section, .callback-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
}

.label {
  font-weight: 600;
  color: #495057;
}

.value {
  font-weight: 500;
}

.value.success { color: #28a745; }
.value.warning { color: #ffc107; }
.value.error { color: #dc3545; }
.value.neutral { color: #6c757d; }

.client-id {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8em;
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  background: #007bff;
  color: white;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-primary { background: #007bff; }
.btn-secondary { background: #6c757d; }
.btn-danger { background: #dc3545; }
.btn-small { padding: 6px 12px; font-size: 0.9em; }

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  align-items: end;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-form .input {
  flex: 1;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
}

.status.active {
  background: #d4edda;
  color: #155724;
}

.status.inactive {
  background: #f8d7da;
  color: #721c24;
}

.age {
  color: #6c757d;
  font-size: 0.9em;
}

.empty-state {
  text-align: center;
  color: #6c757d;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 6px;
}

.data-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.last-operation {
  color: #6c757d;
  font-size: 0.9em;
}

.callback-log {
  max-height: 300px;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
}

.log-entry {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  padding: 5px;
  border-radius: 4px;
}

.log-entry:hover {
  background: #e9ecef;
}

.timestamp {
  color: #6c757d;
  font-size: 0.8em;
  min-width: 80px;
}

.log-level {
  font-weight: 600;
  min-width: 60px;
  text-align: center;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 0.8em;
}

.log-level.info {
  background: #d1ecf1;
  color: #0c5460;
}

.log-level.warning {
  background: #fff3cd;
  color: #856404;
}

.log-level.error {
  background: #f8d7da;
  color: #721c24;
}

.message {
  flex: 1;
  word-break: break-word;
}

.search-results {
  margin-top: 20px;
}

.search-results h3 {
  margin-bottom: 15px;
  color: #495057;
}
</style>
