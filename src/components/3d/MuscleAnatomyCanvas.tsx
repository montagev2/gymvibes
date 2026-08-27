import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import type { MuscleGroup } from '../../types'

interface MuscleAnatomyProps {
  selectedMuscle: MuscleGroup
  onSelectMuscle: (m: MuscleGroup) => void
}

function AnatomicalModel({ selectedMuscle, onSelectMuscle }: MuscleAnatomyProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<MuscleGroup | null>(null)

  useFrame(() => {
    if (!groupRef.current) return
    // Subtle idle floating rotation if not hovering
    if (!hovered) {
      groupRef.current.rotation.y += 0.003
    }
  })

  const getMaterialColor = (group: MuscleGroup) => {
    if (selectedMuscle === group) return '#CCFF00' // Volt Active
    if (hovered === group) return '#00F0FF' // Cyan Hover
    return '#2A2A2A' // Neutral Cyber Dark
  }

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* 🧠 Head / Cranium */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#1E1E1E" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 💥 CHEST (Pectorals) */}
      <mesh
        position={[0, 1.25, 0.12]}
        onClick={(e) => {
          e.stopPropagation()
          onSelectMuscle('chest')
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered('chest')
        }}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[0.85, 0.42, 0.35]} />
        <meshStandardMaterial
          color={getMaterialColor('chest')}
          emissive={selectedMuscle === 'chest' ? '#CCFF00' : hovered === 'chest' ? '#00F0FF' : '#000000'}
          emissiveIntensity={selectedMuscle === 'chest' ? 0.6 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* 💥 SHOULDERS (Deltoids) */}
      <mesh
        position={[-0.6, 1.35, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('shoulders') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('shoulders') }}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={getMaterialColor('shoulders')}
          emissive={selectedMuscle === 'shoulders' ? '#FFD700' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh
        position={[0.6, 1.35, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('shoulders') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('shoulders') }}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={getMaterialColor('shoulders')}
          emissive={selectedMuscle === 'shoulders' ? '#FFD700' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 💥 BICEPS */}
      <mesh
        position={[-0.68, 0.95, 0.05]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('biceps') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('biceps') }}
        onPointerOut={() => setHovered(null)}
      >
        <capsuleGeometry args={[0.13, 0.35, 16, 16]} />
        <meshStandardMaterial
          color={getMaterialColor('biceps')}
          emissive={selectedMuscle === 'biceps' ? '#00F0FF' : '#000000'}
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh
        position={[0.68, 0.95, 0.05]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('biceps') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('biceps') }}
        onPointerOut={() => setHovered(null)}
      >
        <capsuleGeometry args={[0.13, 0.35, 16, 16]} />
        <meshStandardMaterial
          color={getMaterialColor('biceps')}
          emissive={selectedMuscle === 'biceps' ? '#00F0FF' : '#000000'}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 💥 ABS / CORE */}
      <mesh
        position={[0, 0.72, 0.1]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('abs') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('abs') }}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[0.6, 0.55, 0.28]} />
        <meshStandardMaterial
          color={getMaterialColor('abs')}
          emissive={selectedMuscle === 'abs' ? '#CCFF00' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 💥 LATS & BACK */}
      <mesh
        position={[0, 1.15, -0.12]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('lats') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('lats') }}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[0.9, 0.65, 0.25]} />
        <meshStandardMaterial
          color={getMaterialColor('lats')}
          emissive={selectedMuscle === 'lats' ? '#CCFF00' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 💥 QUADS / LEGS */}
      <mesh
        position={[-0.24, -0.15, 0.05]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('quads') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('quads') }}
        onPointerOut={() => setHovered(null)}
      >
        <capsuleGeometry args={[0.18, 0.75, 16, 16]} />
        <meshStandardMaterial
          color={getMaterialColor('quads')}
          emissive={selectedMuscle === 'quads' ? '#00F0FF' : '#000000'}
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh
        position={[0.24, -0.15, 0.05]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('quads') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('quads') }}
        onPointerOut={() => setHovered(null)}
      >
        <capsuleGeometry args={[0.18, 0.75, 16, 16]} />
        <meshStandardMaterial
          color={getMaterialColor('quads')}
          emissive={selectedMuscle === 'quads' ? '#00F0FF' : '#000000'}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 💥 GLUTES & LOWER */}
      <mesh
        position={[0, 0.25, -0.1]}
        onClick={(e) => { e.stopPropagation(); onSelectMuscle('glutes') }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered('glutes') }}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[0.65, 0.4, 0.35]} />
        <meshStandardMaterial
          color={getMaterialColor('glutes')}
          emissive={selectedMuscle === 'glutes' ? '#FF3E3E' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 🏷️ 3D Floating Indicator Tag */}
      <Text
        position={[0, 2.3, 0]}
        fontSize={0.16}
        color="#CCFF00"
        anchorX="center"
        anchorY="middle"
      >
        {`TARGET: ${selectedMuscle.toUpperCase()}`}
      </Text>
    </group>
  )
}

export default function MuscleAnatomyCanvas({ selectedMuscle, onSelectMuscle }: MuscleAnatomyProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const handleResetCamera = (view: 'front' | 'back' | 'legs') => {
    if (!controlsRef.current) return
    if (view === 'front') {
      controlsRef.current.setAzimuthalAngle(0)
    } else if (view === 'back') {
      controlsRef.current.setAzimuthalAngle(Math.PI)
    } else if (view === 'legs') {
      controlsRef.current.setAzimuthalAngle(0)
    }
  }

  return (
    <div className="w-full h-[400px] lg:h-[500px] bg-cyber/60 rounded-3xl border border-white/10 relative overflow-hidden">
      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-volt/30 text-[11px] font-mono text-volt tracking-widest uppercase">
        ⚡ 3D Interactive Physique · Drag to Rotate
      </div>

      {/* Bottom Camera Angle Presets for Easy Mobile UX */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
        <button
          type="button"
          onClick={() => handleResetCamera('front')}
          className="px-3 py-1 rounded-xl text-[10px] font-mono uppercase bg-surface hover:bg-volt hover:text-black transition-all cursor-pointer"
        >
          Front
        </button>
        <button
          type="button"
          onClick={() => handleResetCamera('back')}
          className="px-3 py-1 rounded-xl text-[10px] font-mono uppercase bg-surface hover:bg-volt hover:text-black transition-all cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => onSelectMuscle('chest')}
          className="px-3 py-1 rounded-xl text-[10px] font-mono uppercase bg-volt/20 text-volt hover:bg-volt hover:text-black transition-all cursor-pointer"
        >
          Chest
        </button>
        <button
          type="button"
          onClick={() => onSelectMuscle('quads')}
          className="px-3 py-1 rounded-xl text-[10px] font-mono uppercase bg-cyanGlow/20 text-cyanGlow hover:bg-cyanGlow hover:text-black transition-all cursor-pointer"
        >
          Legs
        </button>
      </div>

      <Canvas camera={{ position: [0, 0.8, 3.6], fov: 48 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={2} color="#FFFFFF" />
        <directionalLight position={[-4, -3, -3]} intensity={1.5} color="#CCFF00" />
        <pointLight position={[0, 2, 2]} intensity={2} color="#00F0FF" />

        <AnatomicalModel selectedMuscle={selectedMuscle} onSelectMuscle={onSelectMuscle} />

        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
