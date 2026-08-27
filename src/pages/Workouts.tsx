import { useState, useEffect } from 'react'
import { EXERCISES, MUSCLE_DETAILS } from '../data/gymData'
import type { Exercise, MuscleGroup } from '../types'

export default function Workouts() {
  const [filterMuscle, setFilterMuscle] = useState<MuscleGroup | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Olympian'>('all')
  const [search, setSearch] = useState('')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  // Interactive Rest Timer State inside Modal
  const [timerSeconds, setTimerSeconds] = useState<number>(60)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [logSuccess, setLogSuccess] = useState<boolean>(false)

  // Log Form State inside Modal
  const [logWeight, setLogWeight] = useState<string>('60')
  const [logReps, setLogReps] = useState<string>('10')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timerSeconds])

  const openExerciseModal = (ex: Exercise) => {
    setSelectedExercise(ex)
    setTimerSeconds(ex.restSeconds || 60)
    setIsTimerRunning(false)
    setLogSuccess(false)
  }

  const handleLogSet = (e: React.FormEvent) => {
    e.preventDefault()
    setLogSuccess(true)
    setTimeout(() => {
      setLogSuccess(false)
    }, 2500)
  }

  const filtered = EXERCISES.filter((ex) => {
    const matchesMuscle = filterMuscle === 'all' || ex.targetMuscle === filterMuscle
    const matchesDifficulty = filterDifficulty === 'all' || ex.difficulty === filterDifficulty
    const matchesSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase()) ||
      ex.primaryBenefit.toLowerCase().includes(search.toLowerCase())
    return matchesMuscle && matchesDifficulty && matchesSearch
  })

  return (
    <div className="min-h-screen bg-void text-white font-display pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* 🔮 Ambient Glassmorphic Glow Atmosphere */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-volt/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyanGlow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* ── 🌟 HEADER & BEGINNER GUIDE BANNER ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-volt/10 border border-volt/30 text-volt text-xs font-mono font-bold tracking-widest uppercase">
            <span>⚡</span>
            <span>HYPERTROPHY & BIOMECHANICS ENCYCLOPEDIA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            OLYMPIAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-volt via-white to-cyanGlow">WORKOUTS</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Click any movement below to open the <strong>Step-by-Step Execution Guide</strong>, common mistakes, and interactive rest timer.
          </p>

          {/* User-Friendly Quick-Start Pill */}
          <div className="inline-flex items-center gap-3 bg-cyber/90 border border-white/10 px-5 py-2.5 rounded-2xl text-xs font-mono text-gray-300 backdrop-blur-md">
            <span>💡 <strong>Quick Tip:</strong> Tap any card to see form cues & log sets</span>
          </div>
        </div>

        {/* ── 🔍 SEARCH & ADVANCED FILTER CONTROLS ── */}
        <div className="bg-surface/80 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises by name, barbell, dumbbell..."
                className="w-full bg-black/50 border border-white/15 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-volt outline-none font-display transition-all"
              />
            </div>

            {/* Level Filter Switcher */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-mono text-gray-400 uppercase mr-1 hidden sm:inline">LEVEL:</span>
              {(['all', 'Beginner', 'Intermediate', 'Olympian'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFilterDifficulty(lvl)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                    filterDifficulty === lvl
                      ? 'bg-volt text-black shadow-volt-glow'
                      : 'bg-black/40 text-gray-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {lvl === 'all' ? 'All Levels' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Muscle Group Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => setFilterMuscle('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap ${
                filterMuscle === 'all'
                  ? 'bg-cyanGlow text-black shadow-cyan-glow scale-105'
                  : 'bg-black/40 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              🏋️ All Muscles ({EXERCISES.length})
            </button>
            {(Object.keys(MUSCLE_DETAILS) as MuscleGroup[]).map((m) => {
              const details = MUSCLE_DETAILS[m]
              const isSelected = filterMuscle === m
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFilterMuscle(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-volt text-black shadow-volt-glow scale-105'
                      : 'bg-black/40 text-gray-400 border border-white/10 hover:text-white'
                  }`}
                >
                  <span>{details.icon}</span>
                  <span>{details.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 🏋️ WORKOUT CARDS GRID (GLASSMORPHIC) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ex) => {
            const muscleInfo = MUSCLE_DETAILS[ex.targetMuscle]
            return (
              <div
                key={ex.id}
                onClick={() => openExerciseModal(ex)}
                className="bg-surface/70 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-volt/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col justify-between relative overflow-hidden shadow-lg hover:shadow-volt-glow"
              >
                {/* Glowing Top Accent Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: muscleInfo.color }}
                />

                <div>
                  {/* Top Badges Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{ex.visualIcon}</span>
                      <span
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider"
                        style={{ backgroundColor: `${muscleInfo.color}20`, color: muscleInfo.color }}
                      >
                        {muscleInfo.icon} {muscleInfo.name}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase ${
                        ex.difficulty === 'Beginner'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : ex.difficulty === 'Intermediate'
                          ? 'bg-cyanGlow/20 text-cyanGlow border border-cyanGlow/30'
                          : 'bg-crimson/20 text-crimson border border-crimson/30'
                      }`}
                    >
                      {ex.difficulty}
                    </span>
                  </div>

                  {/* Title & Benefit */}
                  <h3 className="text-xl font-black text-white uppercase group-hover:text-volt transition-colors mb-1">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-volt font-mono font-bold mb-3">
                    🎯 {ex.primaryBenefit}
                  </p>

                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-4">
                    {ex.description}
                  </p>

                  {/* Quick Metric Pills */}
                  <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/5 rounded-2xl p-3 mb-4 text-xs font-mono">
                    <div className="text-gray-400">
                      <span>⏱️ </span>
                      <span className="text-white font-bold">{ex.defaultSets} × {ex.defaultReps}</span>
                    </div>
                    <div className="text-gray-400 text-right">
                      <span>🔥 </span>
                      <span className="text-volt font-bold">~{ex.caloriesBurn} kcal</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Pill */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400">
                    🔧 {ex.equipment}
                  </span>
                  <span className="text-xs font-mono font-bold text-volt flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Guide</span>
                    <span>➔</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── 🪟 INTERACTIVE GLASSMORPHIC POPUP MODAL ("popop type") ── */}
        {selectedExercise && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
            onClick={() => setSelectedExercise(null)}
          >
            <div
              className="bg-gradient-to-b from-surface to-cyber border-2 border-volt/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[0_0_60px_rgba(204,255,0,0.25)] relative max-h-[90vh] overflow-y-auto space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedExercise(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-volt hover:text-black flex items-center justify-center text-white text-base font-bold transition-all cursor-pointer"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{selectedExercise.visualIcon}</span>
                  <span className="px-3 py-1 bg-volt/10 text-volt border border-volt/30 rounded-full text-xs font-mono font-bold uppercase">
                    {MUSCLE_DETAILS[selectedExercise.targetMuscle].name} · {selectedExercise.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                  {selectedExercise.name}
                </h2>
                <p className="text-xs sm:text-sm text-volt font-mono mt-1 font-bold">
                  🎯 {selectedExercise.primaryBenefit}
                </p>
              </div>

              {/* Specs & Tempo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/50 border border-white/10 rounded-2xl p-4 text-center font-mono">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Sets & Reps</p>
                  <p className="text-xs font-bold text-white mt-0.5">{selectedExercise.defaultSets} × {selectedExercise.defaultReps}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Tempo Speed</p>
                  <p className="text-xs font-bold text-cyanGlow mt-0.5">{selectedExercise.tempo}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Burn Rate</p>
                  <p className="text-xs font-bold text-volt mt-0.5">~{selectedExercise.caloriesBurn} kcal</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Equipment</p>
                  <p className="text-xs font-bold text-white mt-0.5 truncate">{selectedExercise.equipment}</p>
                </div>
              </div>

              {/* ── 📖 STEP-BY-STEP HOW-TO GUIDE ── */}
              <div>
                <h4 className="text-xs font-mono text-gray-300 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <span>📖</span>
                  <span>STEP-BY-STEP EXECUTION GUIDE:</span>
                </h4>
                <div className="space-y-3">
                  {selectedExercise.steps.map((st) => (
                    <div
                      key={st.step}
                      className="bg-black/30 border border-white/5 p-3.5 rounded-2xl flex items-start gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-volt text-black font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {st.step}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white uppercase">{st.title}</p>
                        <p className="text-xs text-gray-300 leading-relaxed mt-0.5">{st.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── ⚠️ COMMON MISTAKES TO AVOID ── */}
              <div className="bg-crimson/10 border border-crimson/30 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-mono text-crimson uppercase tracking-widest font-bold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>CRITICAL MISTAKES TO AVOID:</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedExercise.mistakes.map((mis, i) => (
                    <li key={i} className="text-xs text-gray-300 leading-relaxed">
                      {mis}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── ⏱️ INTERACTIVE REST INTERVAL TIMER ── */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">
                    INTERACTIVE REST INTERVAL
                  </span>
                  <span className="text-2xl font-black font-mono text-volt">
                    {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      isTimerRunning
                        ? 'bg-crimson text-white shadow-crimson-glow'
                        : 'bg-volt text-black shadow-volt-glow'
                    }`}
                  >
                    {isTimerRunning ? '⏸️ Pause Rest' : '▶️ Start Rest Timer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTimerRunning(false)
                      setTimerSeconds(selectedExercise.restSeconds || 60)
                    }}
                    className="px-3 py-2 rounded-xl bg-surface border border-white/10 text-xs font-mono text-gray-400 hover:text-white"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>

              {/* ── 📝 DIRECT LOG SET FORM ── */}
              <form onSubmit={handleLogSet} className="bg-surface border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-300 font-bold uppercase">
                    LOG YOUR COMPLETED SET
                  </span>
                  {logSuccess && (
                    <span className="text-xs font-mono text-volt font-bold animate-pulse">
                      ✓ Logged to Dashboard!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 block mb-1">WEIGHT (KG)</label>
                    <input
                      type="number"
                      value={logWeight}
                      onChange={(e) => setLogWeight(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono outline-none focus:border-volt"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 block mb-1">REPS COMPLETED</label>
                    <input
                      type="number"
                      value={logReps}
                      onChange={(e) => setLogReps(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono outline-none focus:border-volt"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-volt text-black font-black text-xs uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer"
                >
                  + Save Set to Today's Workout
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
