import { describe, it, expect } from 'vitest'
import { formatNPWP, cleanNPWP, validateNPWP } from '../npwp'

describe('NPWP Utilities', () => {
  describe('formatNPWP', () => {
    it('should format a clean NPWP correctly', () => {
      const npwp = '123456789012345'
      const formatted = formatNPWP(npwp)
      expect(formatted).toBe('12.345.678.9-012.345')
    })

    it('should handle empty input', () => {
      expect(formatNPWP('')).toBe('')
      expect(formatNPWP(null)).toBe('')
      expect(formatNPWP(undefined)).toBe('')
    })

    it('should return original if not 15 digits', () => {
      const shortNpwp = '1234567890123'
      expect(formatNPWP(shortNpwp)).toBe(shortNpwp)
    })

    it('should remove existing separators before formatting', () => {
      const npwp = '12.345.678.9-012.345'
      const formatted = formatNPWP(npwp)
      expect(formatted).toBe('12.345.678.9-012.345')
    })
  })

  describe('cleanNPWP', () => {
    it('should remove all separators', () => {
      const npwp = '12.345.678.9-012.345'
      const cleaned = cleanNPWP(npwp)
      expect(cleaned).toBe('123456789012345')
    })

    it('should handle empty input', () => {
      expect(cleanNPWP('')).toBe('')
      expect(cleanNPWP(null)).toBe('')
      expect(cleanNPWP(undefined)).toBe('')
    })

    it('should handle already clean NPWP', () => {
      const npwp = '123456789012345'
      expect(cleanNPWP(npwp)).toBe('123456789012345')
    })
  })

  describe('validateNPWP', () => {
    it('should validate correct NPWP', () => {
      expect(validateNPWP('123456789012345')).toBe(true)
    })

    it('should validate formatted NPWP', () => {
      expect(validateNPWP('12.345.678.9-012.345')).toBe(true)
    })

    it('should reject short NPWP', () => {
      expect(validateNPWP('1234567890123')).toBe(false)
    })

    it('should reject long NPWP', () => {
      expect(validateNPWP('12345678901234567')).toBe(false)
    })

    it('should reject empty input', () => {
      expect(validateNPWP('')).toBe(false)
      expect(validateNPWP(null)).toBe(false)
      expect(validateNPWP(undefined)).toBe(false)
    })

    it('should reject non-numeric characters', () => {
      expect(validateNPWP('1234567890123ab')).toBe(false)
    })
  })
})