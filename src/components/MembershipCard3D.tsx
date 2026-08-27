import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import type { MembershipTier } from '../types'

interface MembershipCard3DProps {
  tier: MembershipTier
  memberName?: string
  expiryDate?: string
  qrData?: string
}

export default function MembershipCard3D({
  tier = 'gold_vip',
  memberName = 'VIP ATHLETE',
  expiryDate = 'EXP: 31 DEC 2026',
  qrData = 'TITAN-VIP-84920',
}: MembershipCard3DProps) {
  const [qrUrl, setQrUrl] = useState('')
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  useEffect(() => {
    QRCode.toDataURL(qrData, {
      width: 140,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    }).then(setQrUrl)
  }, [qrData])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setRotateX(-y * 0.08)
    setRotateY(x * 0.08)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const getTierStyles = () => {
    switch (tier) {
      case 'gold_vip':
        return {
          border: 'border-yellow-400/60',
          gradient: 'from-amber-950 via-zinc-900 to-yellow-950',
          badge: 'bg-yellow-400 text-black',
          glow: 'shadow-[0_0_40px_rgba(250,204,21,0.25)]',
          title: 'OLYMPIAN GOLD VIP',
        }
      case 'silver':
        return {
          border: 'border-zinc-300/60',
          gradient: 'from-zinc-800 via-neutral-900 to-zinc-900',
          badge: 'bg-zinc-200 text-black',
          glow: 'shadow-[0_0_40px_rgba(228,228,231,0.2)]',
          title: 'TITAN SILVER PASS',
        }
      default:
        return {
          border: 'border-amber-700/60',
          gradient: 'from-stone-900 via-neutral-950 to-amber-950',
          badge: 'bg-amber-600 text-white',
          glow: 'shadow-[0_0_40px_rgba(217,119,6,0.2)]',
          title: 'TITAN BRONZE PASS',
        }
    }
  }

  const styles = getTierStyles()

  return (
    <div
      className="perspective-1000 w-full max-w-sm mx-auto cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full aspect-[1.58/1] rounded-3xl p-6 bg-gradient-to-br ${styles.gradient} ${styles.border} border-2 ${styles.glow} transition-transform duration-200 ease-out backdrop-blur-xl flex flex-col justify-between overflow-hidden`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic metallic reflection sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-70" />

        {/* Top Card Row */}
        <div className="flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-black tracking-widest text-sm text-white uppercase font-display">
                TITANFORGE 3D
              </span>
            </div>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${styles.badge}`}>
              {styles.title}
            </span>
          </div>

          {/* Biometric Turnstile QR */}
          {qrUrl && (
            <div className="bg-white p-1.5 rounded-xl shadow-lg border border-white/20">
              <img src={qrUrl} alt="Check-in QR" className="w-14 h-14 rounded-lg" />
            </div>
          )}
        </div>

        {/* Bottom Card Row */}
        <div className="flex justify-between items-end z-10">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
              MEMBER ID: TF-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-lg font-black text-white tracking-wide font-display mt-0.5">
              {memberName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-volt font-mono font-bold">
              {expiryDate}
            </p>
            <p className="text-[9px] text-gray-400 font-mono">
              24/7 ALL-ACCESS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
