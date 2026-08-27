import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface DumbbellProps {
  weight: number
  colorTheme: string
  isSpinning: boolean
}

function DumbbellModel({ weight, colorTheme, isSpinning }: DumbbellProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (isSpinning) {
      groupRef.current.rotation.y += delta * 0.8
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.1
    }
  })

  // Calculate plate count based on selected weight
  const plateCount = Math.max(1, Math.min(4, Math.floor(weight / 25) + 1))
  const plateOffsets = [-0.9, -1.05, -1.2, -1.35]
  const rightPlateOffsets = [0.9, 1.05, 1.2, 1.35]

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 🏋️ Stainless Steel Knurled Center Bar */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2.8, 32]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Knurled Grip Center Sleeve */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 1.2, 32]} />
        <meshStandardMaterial
          color="#222222"
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>

      {/* Left Calibrated Weight Plates */}
      {Array.from({ length: plateCount }).map((_, i) => (
        <group key={`left-${i}`} position={[plateOffsets[i], 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.65 - i * 0.05, 0.65 - i * 0.05, 0.12, 32]} />
            <meshStandardMaterial
              color={colorTheme}
              metalness={0.7}
              roughness={0.3}
              emissive={colorTheme}
              emissiveIntensity={0.25}
            />
          </mesh>
          {/* Inner ring */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.13, 32]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Right Calibrated Weight Plates */}
      {Array.from({ length: plateCount }).map((_, i) => (
        <group key={`right-${i}`} position={[rightPlateOffsets[i], 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.65 - i * 0.05, 0.65 - i * 0.05, 0.12, 32]} />
            <meshStandardMaterial
              color={colorTheme}
              metalness={0.7}
              roughness={0.3}
              emissive={colorTheme}
              emissiveIntensity={0.25}
            />
          </mesh>
          {/* Inner ring */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.13, 32]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* End Collars */}
      <mesh position={[-1.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
        <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[1.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.1, 32]} />
        <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default function DumbbellConfigurator3D() {
  const [weight, setWeight] = useState<number>(50)
  const [colorTheme, setColorTheme] = useState<string>('#CCFF00') // Volt Neon
  const [isSpinning, setIsSpinning] = useState<boolean>(true)

  const colors = [
    { name: 'Volt Neon', hex: '#CCFF00' },
    { name: 'Crimson Red', hex: '#FF3E3E' },
    { name: 'Cyber Cyan', hex: '#00F0FF' },
    { name: 'Gold Titan', hex: '#FFD700' },
    { name: 'Stealth Black', hex: '#222222' },
  ]

  const weights = [15, 30, 50, 75, 100]

  return (
    <div className="w-full bg-surface/90 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <span className="text-volt font-mono text-xs uppercase tracking-widest font-bold">
            3D INTERACTIVE CUSTOMIZER
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-0.5">
            CALIBRATED DUMBBELL LAB
          </h3>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Drag to rotate in 360° · Select plate loads & custom metallic finishes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSpinning(!isSpinning)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              isSpinning ? 'bg-volt text-black' : 'bg-cyber text-gray-400 border border-white/10'
            }`}
          >
            {isSpinning ? '⏸️ Pause Spin' : '▶️ Auto Rotate'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Canvas */}
        <div className="lg:col-span-7 h-[340px] sm:h-[420px] bg-black/60 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-3 left-3 z-10 bg-black/70 px-3 py-1 rounded-lg border border-volt/30 text-[10px] font-mono text-volt">
            ⚡ {weight} KG TITAN PRO DUMBBELL
          </div>

          <Canvas camera={{ position: [0, 1.2, 3.8], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 5, 4]} intensity={2.5} color="#FFFFFF" />
            <directionalLight position={[-4, -3, -2]} intensity={2} color={colorTheme} />
            <pointLight position={[0, 0, 2]} intensity={1.5} color="#FFFFFF" />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <DumbbellModel weight={weight} colorTheme={colorTheme} isSpinning={isSpinning} />
            </Float>

            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
          </Canvas>
        </div>

        {/* Interactive Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Weight Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-gray-300 font-bold uppercase">
                LOAD CAPACITY (KG)
              </label>
              <span className="text-lg font-black text-volt font-mono">{weight} KG</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {weights.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeight(w)}
                  className={`py-2 rounded-xl text-xs font-mono font-black transition-all cursor-pointer ${
                    weight === w
                      ? 'bg-volt text-black shadow-volt-glow scale-105'
                      : 'bg-cyber text-gray-400 border border-white/10 hover:border-white/30'
                  }`}
                >
                  {w}kg
                </button>
              ))}
            </div>
          </div>

          {/* Color Finish Selector */}
          <div>
            <label className="text-xs font-mono text-gray-300 font-bold uppercase block mb-2">
              METALLIC FINISH COLORWAY
            </label>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorTheme(c.hex)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    colorTheme === c.hex
                      ? 'bg-cyber border-2 border-volt text-white shadow-volt-glow'
                      : 'bg-cyber/60 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Specs Callout */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Grip Diameter:</span>
              <span className="text-white font-bold">32mm Diamond Knurl</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Steel Standard:</span>
              <span className="text-volt font-bold">Hard Chrome & Urethane</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-400">Calibration Accuracy:</span>
              <span className="text-white font-bold">± 10 Grams Olympic Spec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
