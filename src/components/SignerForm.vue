<template>
  <form @submit.prevent="handleSubmit" class="signer-form">
    <div class="form-group">
      <label for="name" class="form-label">*Field Wajib Diisi</label>
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
      <div class="form-help">NPWP harus 15 digits</div>
    </div>

    <div class="form-group">
      <label for="name" class="form-label">Nama *</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-input"
        :class="{ 'form-input--error': errors.name }"
        placeholder="Nama Penandatanganan SPT"
      />
      <div v-if="errors.name" class="form-error">{{ errors.name }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">Status Wajib Pajak*</label>
      <div class="radio-group" :class="{ 'radio-group--error': errors.statusTaxpayer }">
        <label class="radio-label">
          <input
            type="radio"
            v-model="form.statusTaxpayer"
            value="ACTIVE"
            class="radio-input"
          />
          <span class="radio-text">Aktif</span>
        </label>
        <label class="radio-label">
          <input
            type="radio"
            v-model="form.statusTaxpayer"
            value="NOT_ACTIVE"
            class="radio-input"
          />
          <span class="radio-text">Tidak Aktif</span>
        </label>
      </div>
      <div v-if="errors.statusTaxpayer" class="form-error">{{ errors.statusTaxpayer }}</div>
    </div>

    <div class="form-group">
      <label class="form-label">bertindak sebagai *</label>
      <div class="radio-group" :class="{ 'radio-group--error': errors.signatory }">
        <label class="radio-label">
          <input
            type="radio"
            v-model="form.signatory"
            value="TAXPAYER"
            class="radio-input"
          />
          <span class="radio-text">Wajib Pajak</span>
        </label>
        <label class="radio-label">
          <input
            type="radio"
            v-model="form.signatory"
            value="AUTHORIZED_REPRESENTATIVE"
            class="radio-input"
          />
          <span class="radio-text">Kuasa</span>
        </label>
      </div>
      <div v-if="errors.signatory" class="form-error">{{ errors.signatory }}</div>
    </div>

    <div class="form-group">
      <label class="form-checkbox-label">
        <input
          type="checkbox"
          v-model="form.defaultSignatory"
          class="form-checkbox"
        />
        <span class="form-checkbox-text">Jadikan Sebagai Default</span>
      </label>
    </div>

    <div class="form-actions">
      <button
        type="submit"
        class="btn btn-danger"
        :disabled="loading"
      >
        {{ loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update' : 'Create') }}
      </button>
      <button
        type="button"
        class="btn btn-outline"
        @click="$emit('cancel')"
        :disabled="loading"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { formatNPWP, cleanNPWP, validateNPWP } from '../utils/npwp'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  name: '',
  npwp: '',
  statusTaxpayer: '',
  signatory: '',
  defaultSignatory: false
})

const displayNpwp = ref('')
const errors = ref({})

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
    newErrors.npwp = 'NPWP harus 15 digit'
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

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }
  
  emit('submit', {
    name: form.value.name.trim(),
    npwp: form.value.npwp, // Store without separators
    statusTaxpayer: form.value.statusTaxpayer,
    signatory: form.value.signatory,
    defaultSignatory: form.value.defaultSignatory
  })
}

// Watch for initial data changes (for edit mode)
watch(() => props.initialData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    form.value = {
      name: newData.name || '',
      npwp: newData.npwp || '',
      statusTaxpayer: newData.statusTaxpayer || '',
      signatory: newData.signatory || '',
      defaultSignatory: newData.defaultSignatory || false
    }
    
    // Set display NPWP with formatting
    displayNpwp.value = formatNPWP(newData.npwp || '')
  }
}, { immediate: true })

// Reset form when not in edit mode
watch(() => props.isEdit, (isEdit) => {
  if (!isEdit) {
    form.value = {
      name: '',
      npwp: '',
      statusTaxpayer: '',
      signatory: '',
      defaultSignatory: false
    }
    displayNpwp.value = ''
    errors.value = {}
  }
})
</script>

<style scoped>
.signer-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
  text-align: left;
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

.btn-outline {
  background-color: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-outline:hover:not(:disabled) {
  background-color: #f9fafb;
}

.form-checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  color: #374151;
}

.radio-group {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.radio-group--error {
  border: 1px solid #ef4444;
  border-radius: 6px;
  padding: 8px;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 400;
  color: #374151;
}

.radio-input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
}

.radio-text {
  user-select: none;
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