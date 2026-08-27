import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MEMBERSHIP_PLANS } from '../data/gymData'
import type { MembershipTier } from '../types'
import Hero3DCanvas from '../components/3d/Hero3DCanvas'
import MembershipCard3D from '../components/MembershipCard3D'
import { buildGymUpiUri, generateGymUpiQr } from '../lib/payment'

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<'month' | 'annual'>('month')
  const [selectedPlanTier, setSelectedPlanTier] = useState<MembershipTier>('gold_vip')
  const [dynamicQrUrl, setDynamicQrUrl] = useState<string>('')
  const [buyerName, setBuyerName] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [utrNumber, setUtrNumber] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)

  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.tier === selectedPlanTier) || MEMBERSHIP_PLANS[2]
  const payablePrice = billingCycle === 'annual' ? currentPlan.priceAnnual : currentPlan.priceMonth

  useEffect(() => {
    generateGymUpiQr(payablePrice, currentPlan.name).then(setDynamicQrUrl)
  }, [payablePrice, currentPlan.name])

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!buyerName || !buyerPhone || utrNumber.length < 6) return
    setOrderSuccess(true)
  }

  return (
    <div className="min-h-screen bg-void text-white font-display overflow-x-hidden pt-20">
      {/* ── 🥊 HERO SECTION (3D Titanium Core) ── */}
      <section className="relative min-h-[90vh] flex items-center px-6 border-b border-white/10 overflow-hidden">
        {/* Ambient Neon Glow Backdrops */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-volt/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12">
          {/* Left Column: Massive Split Headline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono font-bold tracking-widest uppercase">
              <span>⚡</span>
              <span>EST. 2026 · ELITE PERFORMANCE LAB</span>
            </div>

            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
              FORGE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt via-white to-volt">
                OLYMPIAN.
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Kolkata’s premier high-performance biomechanics facility. 24/7 biometric turnstile access, certified Olympian coaching, and digital smart membership passes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#membership-section"
                className="px-8 py-4 rounded-xl bg-volt text-black font-black text-sm uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🎟️ Claim VIP Pass</span>
                <span>➔</span>
              </a>
              <Link
                to="/workouts"
                className="px-8 py-4 rounded-xl bg-cyber border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
              >
                🏋️ Workouts
              </Link>
              <Link
                to="/trainers"
                className="px-8 py-4 rounded-xl bg-cyber border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
              >
                👥 Coaches
              </Link>
            </div>

            {/* Live Stats Ticker */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-volt">15,000</p>
                <p className="text-xs text-gray-400 font-mono uppercase">SQ.FT TURF</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">24/7</p>
                <p className="text-xs text-gray-400 font-mono uppercase">VIP QR ACCESS</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-crimson">50+</p>
                <p className="text-xs text-gray-400 font-mono uppercase">CERTIFIED COACHES</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Canvas */}
          <div className="lg:col-span-5 relative">
            <Hero3DCanvas />
          </div>
        </div>
      </section>

      {/* ── 💳 MEMBERSHIP PLANS & DYNAMIC UPI CHECKOUT ── */}
      <section id="membership-section" className="py-24 px-6 bg-cyber/60 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-volt font-mono text-xs uppercase tracking-widest font-bold">
              MEMBERSHIP TIERS & DIGITAL PASS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-2 text-white">
              SELECT YOUR <span className="text-volt">TIER</span>
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Unlock instant turnstile QR access, personal training, and recovery amenities.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="inline-flex items-center gap-2 bg-surface p-1.5 rounded-full border border-white/10 mt-6">
              <button
                type="button"
                onClick={() => setBillingCycle('month')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                  billingCycle === 'month' ? 'bg-volt text-black shadow-volt-glow' : 'text-gray-300'
                }`}
              >
                Monthly Plan
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-volt text-black shadow-volt-glow' : 'text-gray-300'
                }`}
              >
                <span>Annual Pass</span>
                <span className="px-1.5 py-0.5 rounded-full bg-crimson text-white text-[9px] font-bold">
                  SAVE 25%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: 3D Holographic Card & Plan Cards */}
            <div className="lg:col-span-7 space-y-8">
              <MembershipCard3D
                tier={selectedPlanTier}
                memberName={buyerName.trim() || 'VIP ATHLETE'}
                qrData={`TITAN-${selectedPlanTier.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`}
              />

              {/* Tier Selection Radio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MEMBERSHIP_PLANS.map((plan) => {
                  const active = selectedPlanTier === plan.tier
                  const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonth
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanTier(plan.tier)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        active
                          ? 'bg-surface border-volt shadow-volt-glow scale-102'
                          : 'bg-cyber/60 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-gray-400 block mb-1">
                        {plan.name}
                      </span>
                      <p className="text-2xl font-black text-white">
                        ₹{price}
                        <span className="text-xs font-normal text-gray-400">/{billingCycle === 'annual' ? 'yr' : 'mo'}</span>
                      </p>
                      <ul className="mt-3 space-y-1.5 text-[11px] text-gray-300">
                        {plan.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-volt">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Instant UPI QR & Activation Form */}
            <div className="lg:col-span-5">
              <div className="bg-surface border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-xl font-black text-white uppercase mb-1">
                  ⚡ INSTANT UPI PASS ACTIVATION
                </h3>
                <p className="text-xs text-gray-400 mb-6 font-mono">
                  PAYABLE: ₹{payablePrice} · {currentPlan.name}
                </p>

                {orderSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="text-5xl">🎉</div>
                    <h4 className="text-xl font-black text-volt uppercase">
                      VIP PASS ACTIVATED!
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Your digital biometric check-in pass has been activated. Present your QR card at the gym entrance.
                    </p>
                    <Link
                      to="/dashboard"
                      className="inline-block px-6 py-3 bg-volt text-black font-black text-xs uppercase rounded-xl shadow-volt-glow"
                    >
                      Open Member Dashboard ➔
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-4">
                    {/* Dynamic QR Display */}
                    <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-white/10 rounded-2xl">
                      {dynamicQrUrl && (
                        <img
                          src={dynamicQrUrl}
                          alt="Dynamic Gym UPI QR"
                          className="w-44 h-44 rounded-xl border border-volt/30 shadow-lg mb-2"
                        />
                      )}
                      <span className="text-[11px] font-mono text-volt font-bold">
                        🔒 ₹{payablePrice}.00 AUTO-LOCKED IN QR
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 mt-0.5">
                        Scan with GPay / PhonePe / Paytm
                      </span>

                      {/* 1-Tap Mobile UPI Intent */}
                      <a
                        href={buildGymUpiUri(payablePrice, currentPlan.name)}
                        className="mt-3 px-5 py-2 rounded-xl bg-volt/10 text-volt border border-volt/30 text-xs font-mono font-bold hover:bg-volt hover:text-black transition-all"
                      >
                        ⚡ 1-Tap Direct UPI App Pay
                      </a>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-gray-400 block mb-1">
                        YOUR FULL NAME
                      </label>
                      <input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="e.g. Debajoyti Barman"
                        required
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-volt outline-none font-display"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-gray-400 block mb-1">
                        10-DIGIT MOBILE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="e.g. 9876543210"
                        required
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-volt outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-gray-400 block mb-1">
                        12-DIGIT UPI UTR / TRANSACTION ID
                      </label>
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                        placeholder="e.g. 408123456789"
                        required
                        className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-volt outline-none font-mono font-bold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-volt text-black font-black text-sm uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer mt-4"
                    >
                      🚀 Activate VIP Pass (₹{payablePrice})
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
