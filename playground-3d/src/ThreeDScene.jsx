// src/ThreeDScene.jsx
import React, { useRef, useContext, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { PlayerContext, MOCK_SHOPS } from './App';

// Color mapping helper
const tailwindToHex = {
  'bg-indigo-500': '#6366f1',
  'bg-green-500': '#22c55e',
  'bg-red-500': '#ef4444',
  'bg-blue-500': '#3b82f6'
};

// Individual 3D Shop Box
function Shop3D({ shop }) {
  const meshRef = useRef();

  const position = useMemo(() => {
    const x = (shop.id * 10) - 25; // spread shops in X
    const z = -10;
    return [x, 0.5, z];
  }, [shop.id]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = 0.5 + Math.sin(Date.now() / 500) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => window.open(shop.url, '_blank')}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={tailwindToHex[shop.color] || '#6366f1'} />
      <Html distanceFactor={10} position={[0, 1.2, 0]} center>
        <div className="text-white font-bold text-center">{shop.name}</div>
      </Html>
    </mesh>
  );
}

// Ground Plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#2c2447" />
    </mesh>
  );
}

function Camera() {
  const { playerPos } = useContext(PlayerContext);
  useFrame((state) => {
    state.camera.position.x = playerPos.x / 10;
    state.camera.position.z = 10 + playerPos.z / 10;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Main 3D Scene
export default function ThreeDScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 5, 10], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Ground />
      {MOCK_SHOPS.map(shop => (
        <Shop3D key={shop.id} shop={shop} />
      ))}
      <Camera />
    </Canvas>
  );
}
