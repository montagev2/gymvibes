import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

interface ZoneInfo {
  id: string
  name: string
  icon: string
  position: [number, number, number]
  color: string
  tag: string
  equipment: string[]
  description: string
}

const GYM_ZONES: ZoneInfo[] = [
  {
    id: 'iron',
    name: 'HEAVY IRON PIT',
    icon: '🏋️‍♂️',
    position: [-2, 0.2, -1],
    color: '#CCFF00',
    tag: 'ZONE 01',
    equipment: ['10 Olympic Power Racks', 'Eleiko Calibrated Plates', 'Dumbbells 5–75 KG', 'Deadlift Drop Platforms'],
    description: 'The hardcore strength zone with competition-spec steel and heavy knurled barbells.',
  },
  {
    id: 'recovery',
    name: 'SAUNA & COLD PLUNGE',
    icon: '🧊',
    position: [2, 0.2, -1],
    color: '#00F0FF',
    tag: 'ZONE 02',
    equipment: ['85°C Infrared Dry Sauna', '3°C Triple Filtration Cold Baths', 'Compression Boots Lounge'],
    description: 'Cellular recovery lab designed to drop inflammation and flush lactic acid.',
  },
  {
    id: 'turf',
    name: 'CROSSFIT & SLED TURF',
    icon: '⚡',
    position: [-2, 0.2, 1.5],
    color: '#FF3E3E',
    tag: 'ZONE 03',
    equipment: ['40-Meter Sprint Track', 'Heavy Sleds & Prowlers', 'Climbing Ropes', 'Assault Air Bikes'],
    description: 'High-intensity conditioning, sprint acceleration, and functional athletic horsepower.',
  },
  {
    id: 'fuel',
    name: 'PROTEIN & FUEL BAR',
    icon: '🥤',
    position: [2, 0.2, 1.5],
    color: '#FFD700',
    tag: 'ZONE 04',
    equipment: ['Zero-Sugar Whey Smoothies', 'Organic Cold Brew Coffee', 'BCAA Hydration Station', 'Macro Meal Preps'],
    description: 'Fresh pre-workout energy and post-session protein nutrition crafted on demand.',
  },
]

function FloorScene({ activeZone, onSelectZone }: { activeZone: string; onSelectZone: (id: string) => void }) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* 🏢 Main Gym Floor Base (Black Obsidian Texture) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#111111" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Cyber Grid Border Lines */}
      <gridHelper args={[9, 9, '#CCFF00', '#222222']} position={[0, 0, 0]} />

      {/* 4 Interactive Zone Platforms */}
      {GYM_ZONES.map((z) => {
        const isSelected = activeZone === z.id
        return (
          <group
            key={z.id}
            position={z.position}
            onClick={(e) => {
              e.stopPropagation()
              onSelectZone(z.id)
            }}
          >
            {/* Zone Platform Base */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[2.6, 0.2, 2]} />
              <meshStandardMaterial
                color={isSelected ? z.color : '#1A1A1A'}
                emissive={isSelected ? z.color : '#000000'}
                emissiveIntensity={isSelected ? 0.4 : 0.1}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing Corner Pillars */}
            <mesh position={[-1.2, 0.4, -0.9]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
              <meshStandardMaterial color={z.color} emissive={z.color} emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[1.2, 0.4, -0.9]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 16]} />
              <meshStandardMaterial color={z.color} emissive={z.color} emissiveIntensity={0.8} />
            </mesh>

            {/* Floating 3D Zone Label */}
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.22}
              color={isSelected ? '#FFFFFF' : '#AAAAAA'}
              anchorX="center"
              anchorY="middle"
            >
              {`${z.icon} ${z.name}`}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

export default function GymFloor3DCanvas() {
  const [activeZone, setActiveZone] = useState<string>('iron')

  const currentZone = GYM_ZONES.find((z) => z.id === activeZone) || GYM_ZONES[0]

  return (
    <div className="w-full bg-cyber/80 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-volt font-mono text-xs uppercase tracking-widest font-bold">
            3D ISOMETRIC FACILITY EXPLORER
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white uppercase mt-0.5">
            VIRTUAL 15,000 SQ.FT FLOOR TOUR
          </h3>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Click any 3D zone platform below or switch with buttons
          </p>
        </div>

        {/* Zone Switcher Tabs */}
        <div className="flex flex-wrap gap-2">
          {GYM_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              onClick={() => setActiveZone(z.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeZone === z.id
                  ? 'bg-volt text-black shadow-volt-glow scale-105'
                  : 'bg-surface text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <span>{z.icon}</span>
              <span>{z.tag}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Isometric Canvas */}
        <div className="lg:col-span-7 h-[360px] sm:h-[440px] bg-black/70 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-black/80 px-3 py-1.5 rounded-xl border border-volt/30 text-[11px] font-mono text-volt">
            🎮 Drag to Orbit Floor · Click Platforms to Inspect
          </div>

          <Canvas camera={{ position: [0, 4.5, 5.5], fov: 42 }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 8, 5]} intensity={2} color="#FFFFFF" />
            <directionalLight position={[-5, 4, -4]} intensity={1.5} color={currentZone.color} />
            <pointLight position={[0, 3, 0]} intensity={2} color="#CCFF00" />

            <FloorScene activeZone={activeZone} onSelectZone={setActiveZone} />

            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2.3}
              minPolarAngle={Math.PI / 4}
              rotateSpeed={0.6}
            />
          </Canvas>
        </div>

        {/* Selected Zone Deep Dive Card */}
        <div className="lg:col-span-5 bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono text-volt uppercase font-bold tracking-widest">
                {currentZone.tag} SPECIFICATIONS
              </span>
              <h4 className="text-2xl font-black text-white uppercase mt-1 flex items-center gap-2">
                <span>{currentZone.icon}</span>
                <span>{currentZone.name}</span>
              </h4>
            </div>
            <span
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ backgroundColor: currentZone.color }}
            />
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            {currentZone.description}
          </p>

          <div>
            <h5 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
              EQUIPMENT HIGHLIGHTS:
            </h5>
            <div className="space-y-2">
              {currentZone.equipment.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-white/5 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs text-white"
                >
                  <span className="text-volt font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
