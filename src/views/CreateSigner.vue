<template>
  <div class="create-signer">
    <div class="header">
      <h1>Add New Signer</h1>
      <router-link to="/" class="btn btn-secondary">
        Back to List
      </router-link>
    </div>

    <form @submit.prevent="handleSubmit" class="signer-form">
      <div class="form-group">
        <label for="name" class="form-label">Name *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="form-input"
          :class="{ 'form-input--error': errors.name }"
          placeholder="Enter signer name"
        />
        <div v-if="errors.name" class="form-error">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="npwp" class="form-label">NPWP *</label>
        <input
          id="npwp"
          v-model="displayNpwp"
          type="text"
          class="form-input"
          :class="{ 'form-input--error': errors.npwp }"
          placeholder="XX.XXX.XXX.X-XXX.XXX"
          maxlength="20"
          @input="handleNpwpInput"
        />
        <div v-if="errors.npwp" class="form-error">{{ errors.npwp }}</div>
        <div class="form-help">NPWP should be 15 digits</div>
      </div>

      <div class="form-group">
        <label for="statusTaxpayer" class="form-label">Taxpayer Status *</label>
        <select
          id="statusTaxpayer"
          v-model="form.statusTaxpayer"
          class="form-input"
          :class="{ 'form-input--error': errors.statusTaxpayer }"
        >
          <option value="">Select status</option>
          <option value="ACTIVE">Active</option>
          <option value="NOT_ACTIVE">Not Active</option>
        </select>
        <div v-if="errors.statusTaxpayer" class="form-error">{{ errors.statusTaxpayer }}</div>
      </div>

      <div class="form-group">
        <label for="signatory" class="form-label">Signatory Type *</label>
        <select
          id="signatory"
          v-model="form.signatory"
          class="form-input"
          :class="{ 'form-input--error': errors.signatory }"
        >
          <option value="">Select signatory type</option>
          <option value="TAXPAYER">Taxpayer</option>
          <option value="AUTHORIZED_REPRESENTATIVE">Authorized Representative</option>
        </select>
        <div v-if="errors.signatory" class="form-error">{{ errors.signatory }}</div>
      </div>

      <div class="form-group">
        <label class="form-checkbox-label">
          <input
            type="checkbox"
            v-model="form.defaultSignatory"
            class="form-checkbox"
          />
          <span class="form-checkbox-text">Set as default signatory</span>
        </label>
      </div>

      <div class="form-actions">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          {{ loading ? 'Creating...' : 'Create Signer' }}
        </button>
        <router-link to="/" class="btn btn-outline">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { signersApi } from '../services/api'
import { formatNPWP, cleanNPWP, validateNPWP } from '../utils/npwp'
import { useNotifications } from '../composables/useNotifications'

const router = useRouter()
const { showSuccess, showError } = useNotifications()

const form = ref({
  name: '',
  npwp: '',
  statusTaxpayer: '',
  signatory: '',
  defaultSignatory: false
})

const displayNpwp = ref('')
const errors = ref({})
const loading = ref(false)

const handleNpwpInput = (event) => {
  const value = event.target.value
  const cleaned = cleanNPWP(value)
  
  // Update the actual form value (without separators)
  form.value.npwp = cleaned
  
  // Update display value (with separators)
  displayNpwp.value = formatNPWP(cleaned)
  
  // Clear NPWP error if it becomes valid
  if (validateNPWP(cleaned)) {
    delete errors.value.npwp
  }
}

const validateForm = () => {
  const newErrors = {}
  
  if (!form.value.name.trim()) {
    newErrors.name = 'Name is required'
  }
  
  if (!form.value.npwp) {
    newErrors.npwp = 'NPWP is required'
  } else if (!validateNPWP(form.value.npwp)) {
    newErrors.npwp = 'NPWP must be 15 digits'
  }
  
  if (!form.value.statusTaxpayer) {
    newErrors.statusTaxpayer = 'Taxpayer status is required'
  }
  
  if (!form.value.signatory) {
    newErrors.signatory = 'Signatory type is required'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    showError('Please fix the errors in the form')
    return
  }
  
  loading.value = true
  
  try {
    await signersApi.createSigner({
      name: form.value.name.trim(),
      npwp: form.value.npwp, // Store without separators
      statusTaxpayer: form.value.statusTaxpayer,
      signatory: form.value.signatory,
      defaultSignatory: form.value.defaultSignatory
    })
    
    showSuccess('Signer created successfully')
    router.push('/')
  } catch (err) {
    showError('Failed to create signer. Please try again.')
    console.error('Error creating signer:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-signer {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0;
  color: #333;
}

.signer-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input--error {
  border-color: #ef4444;
}

.form-error {
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444;
}

.form-help {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
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

.btn-outline {
  background-color: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background-color: #f9fafb;
}

.form-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
}

.form-checkbox {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.form-checkbox-text {
  user-select: none;
}

select.form-input {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
  padding-right: 40px;
  appearance: none;
}
</style>