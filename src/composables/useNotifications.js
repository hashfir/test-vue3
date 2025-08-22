import { ref, reactive } from 'vue'

const notifications = ref([])

export function useNotifications() {
  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random()
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    }
    
    notifications.value.push(notification)
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
    
    return id
  }
  
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  const showSuccess = (message) => addNotification(message, 'success')
  const showError = (message) => addNotification(message, 'error')
  const showWarning = (message) => addNotification(message, 'warning')
  const showInfo = (message) => addNotification(message, 'info')
  
  const clearAll = () => {
    notifications.value = []
  }
  
  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll
  }
}