import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Vehicle } from './Vehicle';

export const Game = () => {
  return (
    <Canvas style={{ background: '#333' }} camera={{ position: [0, 6, 12], fov: 60 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Physics>
        {/* The vehicle */}
        <Vehicle />

        {/* The floor */}
        <RigidBody type="fixed" restitution={0.1} friction={1.0}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  );
};