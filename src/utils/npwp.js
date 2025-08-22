/**
 * Format NPWP with separators (XX.XXX.XXX.X-XXX.XXX)
 * @param {string} npwp - NPWP without separators
 * @returns {string} - Formatted NPWP with separators
 */
export function formatNPWP(npwp) {
  if (!npwp) return ''
  
  // Remove any existing separators
  const cleanNpwp = npwp.replace(/[.-]/g, '')
  
  // Ensure it's 15 digits
  if (cleanNpwp.length !== 15) return npwp
  
  // Format: XX.XXX.XXX.X-XXX.XXX
  return `${cleanNpwp.slice(0, 2)}.${cleanNpwp.slice(2, 5)}.${cleanNpwp.slice(5, 8)}.${cleanNpwp.slice(8, 9)}-${cleanNpwp.slice(9, 12)}.${cleanNpwp.slice(12, 15)}`
}

/**
 * Remove separators from NPWP for storage
 * @param {string} npwp - NPWP with or without separators
 * @returns {string} - Clean NPWP without separators
 */
export function cleanNPWP(npwp) {
  if (!npwp) return ''
  return npwp.replace(/[.-]/g, '')
}

/**
 * Validate NPWP format
 * @param {string} npwp - NPWP to validate
 * @returns {boolean} - True if valid
 */
export function validateNPWP(npwp) {
  if (!npwp) return false
  const cleanNpwp = cleanNPWP(npwp)
  return /^\d{15}$/.test(cleanNpwp)
}