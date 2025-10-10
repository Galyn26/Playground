// src/ThreeDScene.jsx
import React, { useRef, useContext, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { PlayerContext, MOCK_SHOPS } from './App'; // Ensure these are exported from App.jsx

// --- 3D Shop ---
function Shop3D({ shop, onNavigate }) {
  const { playerPos } = useContext(PlayerContext);
  const meshRef = useRef();

  const position = useMemo(() => {
    const x = (shop.id * 2) - 4;
    const z = 5;
    return [x - playerPos.x / 50, 0.5, z - playerPos.z / 50];
  }, [shop.id, playerPos.x, playerPos.z]);

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
      onClick={() => onNavigate(shop.url)}
      castShadow
      receiveShadow
      scale={[1.2, 1.2, 1.2]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={shop.color.replace('bg-', '') || 'royalblue'} />
      <Html distanceFactor={10} position={[0, 1.2, 0]} center>
        <div className="text-white font-bold text-center">{shop.name}</div>
      </Html>
    </mesh>
  );
}

// --- Ground Plane ---
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#2c2447" />
    </mesh>
  );
}

// --- Smooth Camera Follow ---
function CameraFollow() {
  const { camera } = useThree();
  const { playerPos } = useContext(PlayerContext);
  const target = useRef([0, 5, 10]);

  useFrame(() => {
    const lerpFactor = 0.1;
    // target camera position smoothly
    camera.position.x += ((playerPos.x / 2) - camera.position.x) * lerpFactor;
    camera.position.z += ((playerPos.z / 2 + 10) - camera.position.z) * lerpFactor;
    camera.position.y += (5 - camera.position.y) * lerpFactor;
    camera.lookAt(playerPos.x / 2, 0, playerPos.z / 2);
  });

  return null;
}

// --- Player Marker ---
function PlayerMarker() {
  const { playerPos } = useContext(PlayerContext);
  return (
    <mesh position={[playerPos.x / 2, 0.5, playerPos.z / 2]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

// --- Main 3D Scene ---
export default function ThreeDScene({ onNavigate }) {
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

      <CameraFollow />

      <Ground />

      {MOCK_SHOPS.map(shop => (
        <Shop3D key={shop.id} shop={shop} onNavigate={onNavigate} />
      ))}

      <PlayerMarker />
    </Canvas>
  );
}
