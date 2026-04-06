import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingBook = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} args={[2, 3, 0.4]} position={[0, 0, 0]}>
        <MeshTransmissionMaterial 
          thickness={0.5} 
          anisotropy={0.1} 
          ior={1.2} 
          resolution={256}
          roughness={0.2}
          color="#ffd700" 
        />
      </Box>
    </Float>
  );
};
