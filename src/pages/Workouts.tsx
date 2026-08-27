import { useState } from 'react'
import { EXERCISES, MUSCLE_DETAILS } from '../data/gymData'
import type { MuscleGroup } from '../types'

export default function Workouts() {
  const [filterMuscle, setFilterMuscle] = useState<MuscleGroup | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = EXERCISES.filter((ex) => {
    const matchesMuscle = filterMuscle === 'all' || ex.targetMuscle === filterMuscle
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase())
    return matchesMuscle && matchesSearch
  })

  return (
    <div className="min-h-screen bg-void text-white font-display pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-volt font-mono text-xs uppercase tracking-widest font-bold">
            EXERCISE ENCYCLOPEDIA
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-2">
            OLYMPIAN <span className="text-volt">WORKOUTS</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3">
            Hypertrophy-proven movements engineered for raw power, muscle density, and zero injury biomechanics.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-cyber p-4 rounded-3xl border border-white/10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises by name or equipment (e.g. Barbell, Dips)..."
            className="w-full sm:w-96 bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-volt outline-none font-display"
          />

          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterMuscle('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase transition-all cursor-pointer ${
                filterMuscle === 'all'
                  ? 'bg-volt text-black shadow-volt-glow'
                  : 'bg-surface text-gray-400 hover:text-white'
              }`}
            >
              All Muscles
            </button>
            {(Object.keys(MUSCLE_DETAILS) as MuscleGroup[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFilterMuscle(m)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono uppercase transition-all cursor-pointer ${
                  filterMuscle === m
                    ? 'bg-volt text-black shadow-volt-glow'
                    : 'bg-surface text-gray-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ex) => (
            <div
              key={ex.id}
              className="bg-surface/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-volt/40 transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-mono text-volt uppercase font-bold tracking-wider">
                    {ex.targetMuscle} TARGET
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-crimson/15 text-crimson text-[10px] font-mono font-bold border border-crimson/30">
                    {ex.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white uppercase group-hover:text-volt transition-colors mb-2">
                  {ex.name}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-4">
                  {ex.description}
                </p>

                <div className="bg-black/40 border border-white/5 rounded-2xl p-3 mb-4 space-y-1">
                  <p className="text-xs font-mono text-gray-400">
                    🏋️ <strong>Equipment:</strong> {ex.equipment}
                  </p>
                  <p className="text-xs font-mono text-gray-400">
                    ⏱️ <strong>Scheme:</strong> {ex.defaultSets} Sets × {ex.defaultReps}
                  </p>
                </div>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                    PRO FORM TIPS:
                  </span>
                  {ex.tips.map((tip, idx) => (
                    <p key={idx} className="text-xs text-gray-300 flex items-start gap-1.5">
                      <span className="text-volt">▸</span>
                      <span>{tip}</span>
                    </p>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Added ${ex.name} to today's workout tracker!`)}
                className="w-full py-3 rounded-xl bg-cyber border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-volt hover:text-black hover:border-volt transition-all cursor-pointer"
              >
                + Add to Workout Tracker
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
