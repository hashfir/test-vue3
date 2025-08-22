<template>
  <div class="notification-container">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', `notification--${notification.type}`]"
      >
        <div class="notification__content">
          {{ notification.message }}
        </div>
        <button 
          class="notification__close"
          @click="removeNotification(notification.id)"
        >
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useNotifications } from '../composables/useNotifications'

const { notifications, removeNotification } = useNotifications()
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
  border-left: 4px solid #ccc;
}

.notification--success {
  border-left-color: #10b981;
  background-color: #f0fdf4;
  color: #065f46;
}

.notification--error {
  border-left-color: #ef4444;
  background-color: #fef2f2;
  color: #991b1b;
}

.notification--warning {
  border-left-color: #f59e0b;
  background-color: #fffbeb;
  color: #92400e;
}

.notification--info {
  border-left-color: #3b82f6;
  background-color: #eff6ff;
  color: #1e40af;
}

.notification__content {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

.notification__close {
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  margin-left: 12px;
  padding: 0;
  line-height: 1;
}

.notification__close:hover {
  opacity: 1;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>