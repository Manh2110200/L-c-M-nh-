
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars, ContactShadows } from '@react-three/drei';
import ChristmasTree from './components/ChristmasTree';
import Snowfall from './components/Snowfall';
import UIOverlay from './components/UIOverlay';
import { AppState, ChristmasWish } from './types';
import { generateChristmasWish } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [wish, setWish] = useState<ChristmasWish | null>(null);

  const handleOpenGift = async (name: string) => {
    setAppState(AppState.GENERATING);
    try {
      const result = await generateChristmasWish(name);
      setWish(result);
      setAppState(AppState.DISPLAYING);
    } catch (error) {
      console.error("Error:", error);
      setWish({ message: `Chúc ${name} một mùa Giáng sinh an lành, ấm áp và tràn đầy hạnh phúc!` });
      setAppState(AppState.DISPLAYING);
    }
  };

  const handleClose = () => {
    setAppState(AppState.IDLE);
    setWish(null);
  };

  return (
    <div className="relative w-full h-screen bg-[#010308]">
      {/* 3D Scene */}
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 3, 12]} fov={40} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffd700" castShadow />
        <spotLight 
          position={[0, 15, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={3} 
          castShadow 
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <ChristmasTree />
          <Snowfall />
          <Stars radius={100} depth={50} count={9000} factor={4} saturation={0} fade speed={1.2} />
          <Environment preset="night" />
          <ContactShadows 
            position={[0, -2.7, 0]} 
            opacity={0.5} 
            scale={20} 
            blur={2.5} 
            far={4.5} 
          />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          minDistance={8} 
          maxDistance={18} 
          maxPolarAngle={Math.PI / 1.8} 
          autoRotate={appState !== AppState.DISPLAYING}
          autoRotateSpeed={0.4}
          target={[0, 0.5, 0]}
        />
      </Canvas>

      {/* UI Overlay */}
      <UIOverlay 
        appState={appState} 
        onOpenGift={handleOpenGift} 
        wish={wish} 
        onClose={handleClose}
      />

      {/* Global Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  );
};

export default App;
