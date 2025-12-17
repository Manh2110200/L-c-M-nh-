
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, ContactShadows } from '@react-three/drei';
import ChristmasTree from './components/ChristmasTree';
import Snowfall from './components/Snowfall';
import UIOverlay from './components/UIOverlay';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-[#02050c]">
      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 3, 12]} fov={40} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd700" castShadow />
        <spotLight 
          position={[0, 15, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <ChristmasTree />
          <Snowfall />
          <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />
          <ContactShadows 
            position={[0, -2.7, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          minDistance={7} 
          maxDistance={20} 
          maxPolarAngle={Math.PI / 1.8} 
          autoRotate
          autoRotateSpeed={0.5}
          target={[0, 0.5, 0]}
        />
      </Canvas>

      {/* UI Overlay */}
      <UIOverlay />

      {/* Hiệu ứng phủ sương nhẹ mờ ảo ở các góc */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
    </div>
  );
};

export default App;
