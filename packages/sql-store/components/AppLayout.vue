<template>
  <div class="app-layout">
    <el-container>
      <el-header class="main-header">
        <div class="header-content">
          <div class="header-left">
            <el-icon class="header-icon"><Monitor /></el-icon>
            <h1>SQL Store</h1>
            <span class="subtitle">Document Management System</span>
          </div>
          
          <div class="header-center">
            <el-menu 
              mode="horizontal" 
              :default-active="activeRoute"
              router
              class="main-menu"
            >
              <el-menu-item index="/">
                <el-icon><Monitor /></el-icon>
                <span>Dashboard</span>
              </el-menu-item>
              <el-menu-item index="/setup">
                <el-icon><Setting /></el-icon>
                <span>Database</span>
              </el-menu-item>
              <el-menu-item index="/browse">
                <el-icon><Folder /></el-icon>
                <span>Browse</span>
              </el-menu-item>
              <el-menu-item index="/search">
                <el-icon><Search /></el-icon>
                <span>Search</span>
              </el-menu-item>
            </el-menu>
          </div>
          
          <div class="header-right">
            <el-button-group>
              <el-button 
                type="primary" 
                @click="$router.push('/setup')"
                :icon="Setting"
                size="small"
              >
                Setup
              </el-button>
              <el-button 
                @click="$router.push('/browse')"
                :icon="Folder"
                size="small"
              >
                Browse
              </el-button>
              <el-button 
                @click="$router.push('/search')"
                :icon="Search"
                size="small"
              >
                Search
              </el-button>
            </el-button-group>
          </div>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <slot />
      </el-main>
      
      <el-footer class="main-footer">
        <div class="footer-content">
          <div class="footer-left">
            <span>SQL Store v0.1.0</span>
          </div>
          <div class="footer-center">
            <span>Powered by SQLite WASM + OPFS</span>
          </div>
          <div class="footer-right">
            <el-tag size="small" type="info">Development Mode</el-tag>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Monitor, Setting, Folder, Search } from '@element-plus/icons-vue'

const route = useRoute()

const activeRoute = computed(() => {
  return route.path
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  font-size: 32px;
  color: #409eff;
}

.header-left h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
}

.subtitle {
  color: #909399;
  font-size: 14px;
  margin-left: 8px;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.main-menu {
  background: transparent;
  border: none;
}

.main-menu :deep(.el-menu-item) {
  border-radius: 8px;
  margin: 0 4px;
  transition: all 0.3s ease;
}

.main-menu :deep(.el-menu-item:hover) {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
}

.main-menu :deep(.el-menu-item.is-active) {
  background: #409eff;
  color: white;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.main-content {
  padding: 24px;
  min-height: calc(100vh - 120px);
}

.main-footer {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  font-size: 14px;
  color: #606266;
}

.footer-left,
.footer-center,
.footer-right {
  flex: 1;
}

.footer-center {
  text-align: center;
}

.footer-right {
  text-align: right;
}

/* Responsive design */
@media (max-width: 1024px) {
  .header-center {
    display: none;
  }
  
  .subtitle {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
    padding: 12px 24px;
  }
  
  .header-right {
    width: 100%;
    justify-content: center;
  }
  
  .main-content {
    padding: 16px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 8px;
    padding: 12px 24px;
  }
  
  .footer-left,
  .footer-center,
  .footer-right {
    text-align: center;
  }
}
</style>



