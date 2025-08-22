<script setup>
import NotificationContainer from './components/NotificationContainer.vue'
</script>

<template>
  <div id="app">
    <header>
      <div class="container">
        <h1 class="app-title">Penandatangan SPT</h1>
      </div>
    </header>
    
    <main class="app-main">
      <router-view />
    </main>
    
    <NotificationContainer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app-header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
}

.app-header .container {
  padding: 16px 20px;
}

.app-title {
  text-align: left;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.app-main {
  min-height: calc(100vh - 80px);
  padding: 0;
}

/* Global button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #4b5563;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-outline {
  background-color: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background-color: #f9fafb;
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .app-title {
    font-size: 20px;
  }
}
</style>
