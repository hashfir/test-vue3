import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationContainer from '../NotificationContainer.vue'
import { useNotifications } from '../../composables/useNotifications'

describe('NotificationContainer', () => {
  let wrapper
  let notifications

  beforeEach(() => {
    wrapper = mount(NotificationContainer)
    notifications = useNotifications()
    // Clear any existing notifications
    notifications.clearAll()
  })

  it('should render empty when no notifications', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render success notification', async () => {
    notifications.showSuccess('Test success message')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render error notification', async () => {
    notifications.showError('Test error message')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render multiple notifications', async () => {
    notifications.showSuccess('Success message')
    notifications.showError('Error message')
    notifications.showWarning('Warning message')
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should remove notification when close button is clicked', async () => {
    notifications.showSuccess('Test message')
    await wrapper.vm.$nextTick()
    
    const closeButton = wrapper.find('.notification__close')
    expect(closeButton.exists()).toBe(true)
    
    await closeButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should apply correct CSS classes for different notification types', async () => {
    notifications.showSuccess('Success')
    notifications.showError('Error')
    notifications.showWarning('Warning')
    notifications.showInfo('Info')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.notification--success').exists()).toBe(true)
    expect(wrapper.find('.notification--error').exists()).toBe(true)
    expect(wrapper.find('.notification--warning').exists()).toBe(true)
    expect(wrapper.find('.notification--info').exists()).toBe(true)
  })
})