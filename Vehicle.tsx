import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';

// A hook to manage keyboard controls in a reusable way
const useKeyboardControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          setControls(c => ({ ...c, forward: true }));
          break;
        case 'ArrowDown':
        case 's':
          setControls(c => ({ ...c, backward: true }));
          break;
        case 'ArrowLeft':
        case 'a':
          setControls(c => ({ ...c, left: true }));
          break;
        case 'ArrowRight':
        case 'd':
          setControls(c => ({ ...c, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          setControls(c => ({ ...c, forward: false }));
          break;
        case 'ArrowDown':
        case 's':
          setControls(c => ({ ...c, backward: false }));
          break;
        case 'ArrowLeft':
        case 'a':
          setControls(c => ({ ...c, left: false }));
          break;
        case 'ArrowRight':
        case 'd':
          setControls(c => ({ ...c, right: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
};

export const Vehicle = () => {
  const body = useRef<RapierRigidBody>(null);
  const controls = useKeyboardControls();

  useFrame((_state, delta) => {
    if (!body.current) return;

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 30 * delta;
    const torqueStrength = 15 * delta;

    if (controls.forward) {
      impulse.z -= impulseStrength;
    }
    if (controls.backward) {
      impulse.z += impulseStrength;
    }
    if (controls.left) {
      torque.y += torqueStrength;
    }
    if (controls.right) {
      torque.y -= torqueStrength;
    }

    body.current.applyImpulse(impulse, true);
    body.current.applyTorqueImpulse(torque, true);
  });

  return (
    <RigidBody ref={body} colliders="cuboid" mass={1} position={[0, 1, 0]} restitution={0.1} friction={0.5}>
      <mesh>
        <boxGeometry args={[1.2, 0.5, 2.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};