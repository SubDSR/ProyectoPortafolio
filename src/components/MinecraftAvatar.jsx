import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import useMediaQuery from '../hooks/useMediaQuery'

const modelUrl = `${import.meta.env.BASE_URL}model.glb`

function SkinModel({ rotationY = 0 }) {
  const { scene } = useGLTF(modelUrl)
  return <primitive object={scene} rotation={[0, rotationY, 0]} />
}

// Monta dentro del Suspense: cuando el modelo ya cargó, espera un frame
// para que Stage complete su fit inicial y luego bloquea adjustCamera.
function LockAfterFit({ onLock }) {
  const cb = useRef(onLock)
  useEffect(() => {
    const id = requestAnimationFrame(() => cb.current())
    return () => cancelAnimationFrame(id)
  }, [])
  return null
}

useGLTF.preload(modelUrl)

export default function MinecraftAvatar() {
  const [adjustCamera, setAdjustCamera] = useState(true)
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <Canvas
      camera={{ position: [0, 0.5, 2], fov: 38 }}
      gl={{ alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <ambientLight intensity={2.5} />
      <directionalLight position={[2, 4, 3]} intensity={2} />
      <directionalLight position={[-2, 1, -2]} intensity={1} />
      <Suspense fallback={null}>
        <Stage
          environment={null}
          preset="portrait"
          intensity={0.3}
          adjustCamera={adjustCamera}
        >
          <SkinModel rotationY={Math.PI} />
        </Stage>
        <LockAfterFit onLock={() => setAdjustCamera(false)} />
        <OrbitControls
          target={[0, 0.5, 0]}
          enableZoom={false}
          enablePan={false}
          autoRotate={!isMobile}
          autoRotateSpeed={3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Suspense>
    </Canvas>
  )
}
