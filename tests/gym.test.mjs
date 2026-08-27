import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

describe('Dynamic In-Memory Gym UPI QR Generator', () => {
  const buildGymUpiUri = (upiId, gymName, amount, planName) => {
    const cleanPa = upiId.trim()
    const cleanPn = encodeURIComponent(gymName)
    const cleanAm = Math.max(1, amount).toFixed(2)
    const cleanTn = encodeURIComponent(`${gymName} ${planName} Pass`)
    return `upi://pay?pa=${cleanPa}&pn=${cleanPn}&am=${cleanAm}&cu=INR&tn=${cleanTn}`
  }

  test('Generates valid UPI URI with exact amount and plan name', () => {
    const uri = buildGymUpiUri('8170859653-2@ybl', 'TITANFORGE 3D', 2499, 'TITAN SILVER')
    assert.ok(uri.includes('am=2499.00'))
    assert.ok(uri.includes('pa=8170859653-2@ybl'))
    assert.ok(uri.includes('TITANFORGE'))
  })

  test('Embeds annual discount pass amount with 2 decimal places', () => {
    const uri = buildGymUpiUri('8170859653-2@ybl', 'TITANFORGE 3D', 22999, 'TITAN SILVER ANNUAL')
    assert.ok(uri.includes('am=22999.00'))
  })
})

describe('Biometric Turnstile QR Code Generation & Validation', () => {
  const generatePassCode = (tier, userId) => {
    return `TF-${tier.toUpperCase()}-${userId.slice(0, 6)}`
  }

  test('Generates unique format for Gold VIP members', () => {
    const code = generatePassCode('gold_vip', 'debajoyti123')
    assert.equal(code, 'TF-GOLD_VIP-debajo')
  })

  test('Validates active QR turnstile pass pattern', () => {
    const isValidPass = (code) => /^TF-[A-Z_]+-[a-z0-9]+$/i.test(code)
    assert.ok(isValidPass('TF-GOLD_VIP-debajo'))
    assert.ok(isValidPass('TF-SILVER-member1'))
    assert.equal(isValidPass('INVALID_CODE'), false)
  })
})
