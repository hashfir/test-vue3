<template>
  <div class="signers-list">
    <div class="content-wrapper">
      <div class="header-wrapper">
        <div class="header">
          <h4>Tambah dan edit daftar penandatanganan SPT anda</h4>
          <button @click="openCreateModal" class="btn btn-danger">
           Tambah
          </button>
        </div>
      </div>

    <div v-if="loading" class="loading">
      Loading signers...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="signers.length === 0" class="empty">
      No signers found. <button @click="openCreateModal" class="link-button">Add the first signer</button>.
    </div>

    <div v-else class="table-container">
      <table class="signers-table">
        <thead>
          <tr>
            <th>NPWP</th>
            <th>Nama</th>
            <th>Sebagai</th>
            <th>Status</th>
            <th>Default</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="signer in signers" :key="signer.id">
             <td>{{ formatNPWP(signer.npwp) }}</td>
            <td>{{ signer.name }}</td>
            <td>
              {{ signer.signatory === 'TAXPAYER' ? 'Wajib Pajak' : signer.signatory === 'AUTHORIZED_REPRESENTATIVE' ? 'Kuasa' : signer.signatory }}
            </td>
            <td>
                <span :class="['status-badge', signer.statusTaxpayer === 'ACTIVE' ? 'status-active' : 'status-inactive']">
                {{ signer.statusTaxpayer === 'ACTIVE' ? 'Aktif' : 'Tidak Aktif' }}
                </span>
            </td>
            <td>
              <span :class="['default-badge', signer.defaultSignatory ? 'is-default' : '']">
                {{ signer.defaultSignatory ? 'Ya' : 'Tidak' }}
              </span>
            </td>
            <td class="actions">
                <button
                @click="openEditModal(signer)"
                class="btn btn-small btn-edit"
                title="Edit"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="vertical-align: middle; margin-right: 4px;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-11.25 11.25a2.25 2.25 0 01-.948.563l-4.5 1.5a.75.75 0 01-.948-.948l1.5-4.5a2.25 2.25 0 01.563-.948l11.25-11.25z" />
                </svg>
                Edit
                </button>
                <button
                @click="deleteSigner(signer.id)"
                class="btn btn-small btn-danger"
                :disabled="deleting === signer.id"
                >
                {{ deleting === signer.id ? 'Deleting...' : 'Delete' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create Modal -->
    <Modal
      :isOpen="isCreateModalOpen"
      title="Add New Signer"
      @close="closeCreateModal"
    >
      <SignerForm
        :loading="loading"
        @submit="handleCreate"
        @cancel="closeCreateModal"
      />
    </Modal>

    <!-- Edit Modal -->
    <Modal
      :isOpen="isEditModalOpen"
      title="Update Signer"
      @close="closeEditModal"
    >
      <SignerForm
        :initialData="editingSignerData"
        :isEdit="true"
        :loading="loading"
        @submit="handleUpdate"
        @cancel="closeEditModal"
      />
    </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signersApi } from '../services/api'
import { formatNPWP } from '../utils/npwp'
import { useNotifications } from '../composables/useNotifications'
import Modal from '../components/Modal.vue'
import SignerForm from '../components/SignerForm.vue'

const signers = ref([])
const loading = ref(false)
const error = ref('')
const deleting = ref(null)

// Modal states
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const editingSignerData = ref({})
const editingSignerId = ref(null)

const { showSuccess, showError } = useNotifications()

const fetchSigners = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await signersApi.getSigners()
    signers.value = response.data.data || response.data
  } catch (err) {
    error.value = 'Failed to fetch signers. Please try again.'
    showError('Failed to fetch signers')
    console.error('Error fetching signers:', err)
  } finally {
    loading.value = false
  }
}

const deleteSigner = async (id) => {
  if (!confirm('Are you sure you want to delete this signer?')) {
    return
  }
  
  deleting.value = id
  
  try {
    await signersApi.deleteSigner(id)
    signers.value = signers.value.filter(signer => signer.id !== id)
    showSuccess('Signer deleted successfully')
  } catch (err) {
    showError('Failed to delete signer')
    console.error('Error deleting signer:', err)
  } finally {
    deleting.value = null
  }
}

// Modal handlers
const openCreateModal = () => {
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
}

const openEditModal = (signer) => {
  editingSignerData.value = { ...signer }
  editingSignerId.value = signer.id
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  editingSignerData.value = {}
  editingSignerId.value = null
}

// Form handlers
const handleCreate = async (signerData) => {
  loading.value = true
  
  try {
    await signersApi.createSigner(signerData)
    await fetchSigners()
    showSuccess('Signer created successfully')
    closeCreateModal()
  } catch (err) {
    showError('Failed to create signer. Please try again.')
    console.error('Error creating signer:', err)
  } finally {
    loading.value = false
  }
}

const handleUpdate = async (signerData) => {
  loading.value = true
  
  try {
    await signersApi.updateSigner(editingSignerId.value, signerData)
    await fetchSigners()
    showSuccess('Signer updated successfully')
    closeEditModal()
  } catch (err) {
    showError('Failed to update signer. Please try again.')
    console.error('Error updating signer:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchSigners)
</script>

<style scoped>
.signers-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px;
  min-height: 400px;
}

.header-wrapper {
  /* background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0; */
  padding: 24px;
  margin-bottom: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h4 {
  margin: 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.loading, .error, .empty {
  text-align: center;
  padding: 40px;
  font-size: 16px;
}

.error {
  color: #ef4444;
}

.empty {
  color: #666;
}

.link-button {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font: inherit;
}

.link-button:hover {
  color: #2563eb;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.signers-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.signers-table th,
.signers-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.signers-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.signers-table tr:hover {
  background-color: #f9fafb;
}

.actions {
  display: flex;
  gap: 8px;
}

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
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary {
  background-color: white;
  color: #ef4444;
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
.btn-edit {
  color: #ef4444;
  background-color: white;
  box-shadow: inset 0 0 0 1px #ef4444;
}

.btn-edit:hover:not(:disabled) {
  background-color: #fee2e2;
  color: #b91c1c;
  box-shadow: inset 0 0 0 2px #b91c1c;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-small {
  padding: 6px 12px;
  font-size: 12px;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-inactive {
  background-color: #fef2f2;
  color: #991b1b;
}

.default-badge {
  font-weight: 500;
}

.default-badge.is-default {
  color: #059669;
}

@media (max-width: 768px) {
  .signers-table {
    font-size: 14px;
  }
  
  .actions {
    flex-direction: column;
    gap: 4px;
  }
  
  .btn-small {
    padding: 4px 8px;
    font-size: 11px;
  }
}
</style>