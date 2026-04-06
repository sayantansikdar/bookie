import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { FloatingBook } from './FloatingBook';
import { MagicalDust } from './MagicalDust';

export const Scene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffe5b4" />
        <Suspense fallback={null}>
          <FloatingBook />
          <MagicalDust />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};
