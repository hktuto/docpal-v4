<template>
  <div class="playground-home">
    <h1>SQL Store Playground</h1>
    <p class="description">
      Welcome to the SQLite Composable Helper playground. Here you can test and explore the features of our SQLite management system.
    </p>
    
    <div class="demo-links">
      <NuxtLink to="/sqlite-demo" class="demo-card">
        <div class="demo-icon">🗄️</div>
        <h3>SQLite Demo</h3>
        <p>Interactive demo showcasing full CRUD operations with SQLite WASM</p>
        <div class="demo-features">
          <span class="feature">✅ Table Management</span>
          <span class="feature">✅ CRUD Operations</span>
          <span class="feature">✅ Data Transformers</span>
          <span class="feature">✅ Search & Filter</span>
        </div>
      </NuxtLink>
    </div>

    <div class="info-section">
      <h2>About SQLite Composable Helper</h2>
      <p>
        The SQLite Composable Helper is a powerful Vue 3 composable that provides a complete solution for managing SQLite tables in the browser using SQLite WASM.
      </p>
      
      <h3>Key Features:</h3>
      <ul>
        <li><strong>Local-First Storage:</strong> All data is stored locally in SQLite WASM</li>
        <li><strong>Type Safety:</strong> Full TypeScript support with generics</li>
        <li><strong>Reactive State:</strong> Vue 3 reactive state management</li>
        <li><strong>Data Transformers:</strong> Convert between API and database formats</li>
        <li><strong>Error Handling:</strong> Comprehensive error handling and logging</li>
        <li><strong>Query Building:</strong> Dynamic SQL generation with security</li>
        <li><strong>Transactions:</strong> Support for database transactions</li>
      </ul>

      <h3>Phase 1 Complete:</h3>
      <p>
        Phase 1 provides a solid foundation for local SQLite operations. In Phase 2, we'll add API integration, synchronization, and offline queue management.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this page
</script>

<style scoped>
.playground-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
}

.description {
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 50px;
  line-height: 1.6;
}

.demo-links {
  margin-bottom: 60px;
}

.demo-card {
  display: block;
  padding: 30px;
  border: 2px solid #e1e5e9;
  border-radius: 16px;
  background: white;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #007bff;
}

.demo-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
}

.demo-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
}

.demo-card p {
  color: #666;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
}

.demo-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.feature {
  background: #e8f4fd;
  color: #007bff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.info-section {
  background: #f8f9fa;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #dee2e6;
}

.info-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.info-section h3 {
  color: #495057;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 30px 0 15px 0;
}

.info-section p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.info-section ul {
  color: #666;
  line-height: 1.8;
  padding-left: 20px;
}

.info-section li {
  margin-bottom: 8px;
}

.info-section strong {
  color: #495057;
}

@media (max-width: 768px) {
  .playground-home {
    padding: 20px 15px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .demo-card {
    padding: 20px;
  }
  
  .demo-features {
    flex-direction: column;
    align-items: center;
  }
  
  .info-section {
    padding: 25px;
  }
}
</style>
