import QRCode from 'qrcode'

export const GYM_UPI_ID = import.meta.env.VITE_GYM_UPI || '8170859653-2@ybl'
export const GYM_NAME = import.meta.env.VITE_GYM_NAME || 'TITANFORGE 3D'

export function buildGymUpiUri(amount: number, planName: string): string {
  const cleanPa = GYM_UPI_ID.trim()
  const cleanPn = encodeURIComponent(GYM_NAME)
  const cleanAm = Math.max(1, amount).toFixed(2)
  const cleanTn = encodeURIComponent(`${GYM_NAME} ${planName} Pass`)
  return `upi://pay?pa=${cleanPa}&pn=${cleanPn}&am=${cleanAm}&cu=INR&tn=${cleanTn}`
}

export async function generateGymUpiQr(amount: number, planName: string): Promise<string> {
  const uri = buildGymUpiUri(amount, planName)
  try {
    return await QRCode.toDataURL(uri, {
      width: 280,
      margin: 1,
      color: {
        dark: '#0A0A0A',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
  } catch (err) {
    console.warn('Failed to generate Gym UPI QR:', err)
    return ''
  }
}
