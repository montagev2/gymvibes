import { useState } from 'react'
import MembershipCard3D from '../components/MembershipCard3D'

interface LogEntry {
  id: string
  exercise: string
  weight: number
  reps: number
  date: string
}

export default function MemberDashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', exercise: 'Incline Barbell Bench Press', weight: 85, reps: 8, date: 'Today, 7:30 AM' },
    { id: '2', exercise: 'Barbell Back Squat', weight: 120, reps: 6, date: 'Yesterday' },
    { id: '3', exercise: 'Heavy Pendlay Row', weight: 80, reps: 8, date: '25 Aug 2026' },
  ])

  const [newExercise, setNewExercise] = useState('')
  const [newWeight, setNewWeight] = useState('')
  const [newReps, setNewReps] = useState('')

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExercise || !newWeight || !newReps) return
    const entry: LogEntry = {
      id: String(Date.now()),
      exercise: newExercise,
      weight: Number(newWeight),
      reps: Number(newReps),
      date: 'Just now',
    }
    setLogs([entry, ...logs])
    setNewExercise('')
    setNewWeight('')
    setNewReps('')
  }

  return (
    <div className="min-h-screen bg-void text-white font-display pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-volt font-mono text-xs uppercase tracking-widest font-bold">
              MEMBER PORTAL & DIGITAL PASS
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
              ATHLETE <span className="text-volt">DASHBOARD</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-volt/10 text-volt text-xs font-mono font-bold border border-volt/30">
              🟢 PASS ACTIVE · 24/7 ACCESS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: 3D Holographic Card Pass */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
              YOUR BIOMETRIC ENTRY CARD
            </h3>
            <MembershipCard3D
              tier="gold_vip"
              memberName="VIP ATHLETE"
              expiryDate="VALID: 31 DEC 2026"
              qrData="TITAN-VIP-OLYMPIAN-84920"
            />
            <div className="bg-surface/80 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-xs text-gray-300 font-mono">
                📱 Hold QR code 4 inches from the turnstile scanner for instant entrance.
              </p>
            </div>
          </div>

          {/* Right Column: Workout Logger & PR Tracker */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-xl font-black text-white uppercase mb-6 flex items-center gap-2">
                <span>⚡</span>
                <span>LOG TODAY'S WORKOUT SETS</span>
              </h3>

              <form onSubmit={handleAddLog} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-8">
                <input
                  type="text"
                  value={newExercise}
                  onChange={(e) => setNewExercise(e.target.value)}
                  placeholder="Exercise name (e.g. Incline Bench)"
                  required
                  className="sm:col-span-2 bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-volt outline-none font-display"
                />
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="Weight (KG)"
                  required
                  className="bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-volt outline-none font-mono"
                />
                <input
                  type="number"
                  value={newReps}
                  onChange={(e) => setNewReps(e.target.value)}
                  placeholder="Reps"
                  required
                  className="bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-volt outline-none font-mono"
                />
                <button
                  type="submit"
                  className="sm:col-span-4 py-3 rounded-xl bg-volt text-black font-black text-xs uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer"
                >
                  + Log Completed Set
                </button>
              </form>

              {/* Workout History List */}
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                RECENT REPS & HEAVY SETS:
              </h4>
              <div className="space-y-3">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-black/30 border border-white/5 p-4 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-white text-sm">{log.exercise}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">{log.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-volt font-mono">
                        {log.weight} KG
                      </span>
                      <span className="text-xs text-gray-400 font-mono ml-2">
                        × {log.reps} Reps
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
