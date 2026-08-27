import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

function KettlebellCore() {
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
        <meshBasicMaterial color="#CCFF00" />
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
          color="#CCFF00"
          emissive="#CCFF00"
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
  return (
    <div className="w-full h-full min-h-[420px] lg:min-h-[560px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#FFFFFF" />
        <pointLight position={[-4, -2, -2]} intensity={3} color="#CCFF00" />
        <pointLight position={[4, -2, 2]} intensity={2} color="#FF3E3E" />

        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
          <KettlebellCore />
        </Float>
      </Canvas>
    </div>
  )
}
