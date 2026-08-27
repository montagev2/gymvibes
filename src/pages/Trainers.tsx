import { useState } from 'react'
import { TRAINERS } from '../data/gymData'
import type { Trainer } from '../types'

export default function Trainers() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null)
  const [bookingSlot, setBookingSlot] = useState<string>('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [bookedSuccess, setBookedSuccess] = useState(false)

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingSlot || !clientName || !clientPhone) return
    setBookedSuccess(true)
  }

  return (
    <div className="min-h-screen bg-void text-white font-display pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-volt font-mono text-xs uppercase tracking-widest font-bold">
            CERTIFIED COACHING ROSTER
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-2">
            MEET THE <span className="text-volt">OLYMPIANS</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3">
            1-on-1 personalized hypertrophy coaching, competition prep, and advanced biomechanics programming.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS.map((tr) => (
            <div
              key={tr.id}
              className="bg-surface/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between hover:border-volt/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyber border border-white/15 flex items-center justify-center text-3xl shadow-inner">
                    {tr.avatar}
                  </div>
                  <div className="text-right">
                    <span className="text-volt font-black text-sm">★ {tr.rating}</span>
                    <p className="text-[10px] text-gray-400 font-mono">({tr.reviewsCount} reviews)</p>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase group-hover:text-volt transition-colors mb-1">
                  {tr.name}
                </h3>
                <p className="text-volt font-mono text-xs font-bold uppercase mb-4">
                  {tr.specialty}
                </p>

                <p className="text-gray-300 text-xs leading-relaxed mb-6">
                  {tr.bio}
                </p>

                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">Experience:</span>
                    <span className="text-white font-bold">{tr.experienceYears} Years Active</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">1-on-1 Rate:</span>
                    <span className="text-volt font-bold">₹{tr.hourlyFee} / Hour</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedTrainer(tr)
                  setBookingSlot(tr.availableSlots[0] || '')
                  setBookedSuccess(false)
                }}
                className="w-full py-3.5 rounded-xl bg-volt text-black font-black text-xs uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer"
              >
                📅 Book 1-on-1 Slot
              </button>
            </div>
          ))}
        </div>

        {/* Slot Booking Modal */}
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-surface border border-volt/40 rounded-3xl p-8 max-w-md w-full shadow-volt-glow relative">
              <button
                type="button"
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl font-bold cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-2xl font-black text-white uppercase mb-1">
                BOOK SESSION
              </h3>
              <p className="text-xs text-volt font-mono mb-6">
                WITH {selectedTrainer.name.toUpperCase()}
              </p>

              {bookedSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="text-4xl">🎉</div>
                  <h4 className="text-lg font-black text-volt uppercase">
                    SLOT CONFIRMED!
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Your session with {selectedTrainer.name} at <strong>{bookingSlot}</strong> is locked in. We have sent confirmation details to your phone.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedTrainer(null)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-volt text-black font-bold text-xs uppercase"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">
                      SELECT TIME SLOT
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTrainer.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBookingSlot(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                            bookingSlot === slot
                              ? 'bg-volt text-black shadow-volt-glow'
                              : 'bg-black/40 border border-white/10 text-gray-300 hover:border-volt/40'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Debajoyti Barman"
                      required
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-volt outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">
                      MOBILE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      required
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-volt outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-volt text-black font-black text-xs uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer mt-4"
                  >
                    Confirm Booking (₹{selectedTrainer.hourlyFee})
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
