import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function KettlebellCore({ glowColor }: { glowColor: string }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.4
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15
  })

  return (
    <group ref={meshRef} position={[0, -0.2, 0]}>
      {/* Heavy Kettlebell Body */}
      <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#121212"
          roughness={0.25}
          metalness={0.9}
        />
      </Sphere>

      {/* Cyber Neon Glow Ring */}
      <Torus args={[1.35, 0.04, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={glowColor} />
      </Torus>

      {/* Titan Handle */}
      <Torus args={[0.7, 0.14, 32, 64]} position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          color="#222222"
          roughness={0.4}
          metalness={0.8}
        />
      </Torus>

      {/* Neon Energy Core */}
      <Sphere args={[0.6, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={0.8}
          distort={0.4}
          speed={3}
          roughness={0.1}
        />
      </Sphere>
    </group>
  )
}

export default function Hero3DCanvas() {
  const [glowColor, setGlowColor] = useState('#CCFF00')

  const themes = [
    { name: 'Volt', color: '#CCFF00' },
    { name: 'Cyan', color: '#00F0FF' },
    { name: 'Crimson', color: '#FF3E3E' },
    { name: 'Gold', color: '#FFD700' },
  ]

  return (
    <div className="w-full h-full min-h-[420px] lg:min-h-[560px] relative pointer-events-auto">
      {/* Floating 3D HUD Selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        <span className="text-[10px] font-mono text-gray-400 uppercase">CORE THEME:</span>
        {themes.map((t) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setGlowColor(t.color)}
            className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
              glowColor === t.color ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'
            }`}
            style={{ backgroundColor: t.color }}
            title={t.name}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-gray-300">
        🎮 Drag in 360°
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFFFF" />
        <pointLight position={[-4, -2, -2]} intensity={3} color={glowColor} />
        <pointLight position={[4, -2, 2]} intensity={2} color="#FFFFFF" />

        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
          <KettlebellCore glowColor={glowColor} />
        </Float>

        <OrbitControls enableZoom={false} rotateSpeed={0.8} />
      </Canvas>
    </div>
  )
}
