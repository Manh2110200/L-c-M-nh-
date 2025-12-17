
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Ornament: React.FC<{ position: [number, number, number]; color: string; size?: number }> = ({ position, color, size = 0.12 }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(t + position[0]) * 0.001;
  });

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.05} 
        metalness={0.9} 
        emissive={color} 
        emissiveIntensity={0.3} 
      />
    </mesh>
  );
};

const Present: React.FC<{ position: [number, number, number]; color: string; rotation?: [number, number, number]; scale?: number }> = ({ position, color, rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    {/* Box */}
    <mesh castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
    {/* Ribbon horizontal */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.55, 0.1, 0.55]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
    {/* Ribbon vertical */}
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.1, 0.55, 0.55]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  </group>
);

const TreeLayer: React.FC<{ height: number; radius: number; yOffset: number; wobble?: number }> = ({ height, radius, yOffset, wobble = 0.05 }) => (
  <mesh position={[0, yOffset, 0]} castShadow>
    <coneGeometry args={[radius, height, 8]} />
    <meshStandardMaterial color="#064e06" roughness={1}>
       {/* Thêm một chút chuyển động nhẹ cho lá cây */}
    </meshStandardMaterial>
  </mesh>
);

const ChristmasTree: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const lightsRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
    if (lightsRef.current) {
      // Hiệu ứng đèn nhấp nháy
      lightsRef.current.children.forEach((light, i) => {
        const mesh = light as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 1 + Math.sin(t * 3 + i) * 0.8;
      });
    }
  });

  // Tọa độ ngẫu nhiên cho hạt trang trí
  const ornaments = useMemo(() => {
    const items = [];
    const colors = ['#ff0000', '#ffd700', '#00bfff', '#ff69b4', '#ffffff', '#8a2be2'];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 4.5 - 1.5; // Từ gốc lên ngọn
      const radiusAtHeight = (1 - (height + 1.5) / 5) * 2;
      const r = radiusAtHeight * 0.95;
      items.push({
        pos: [Math.cos(angle) * r, height, Math.sin(angle) * r] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 0.08 + Math.random() * 0.08
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Thân cây */}
      <mesh position={[0, -2.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 1.2, 12]} />
        <meshStandardMaterial color="#3d2b1f" roughness={1} />
      </mesh>

      {/* Các tầng lá cây - Làm dày hơn bằng cách chồng nhiều lớp */}
      <TreeLayer height={2.2} radius={2.2} yOffset={-1.1} />
      <TreeLayer height={2.0} radius={1.8} yOffset={-0.2} />
      <TreeLayer height={1.8} radius={1.4} yOffset={0.7} />
      <TreeLayer height={1.5} radius={1.0} yOffset={1.6} />
      <TreeLayer height={1.2} radius={0.5} yOffset={2.4} />

      {/* Ngôi sao lấp lánh trên đỉnh */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <group position={[0, 3.2, 0]}>
          <mesh rotation={[0, 0, 0]}>
            <octahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={5} />
          </mesh>
          <pointLight color="#ffd700" intensity={2} distance={5} />
        </group>
      </Float>

      {/* Các hạt trang trí */}
      {ornaments.map((o, i) => (
        <Ornament key={i} position={o.pos} color={o.color} size={o.size} />
      ))}

      {/* Đèn led dây quấn quanh cây */}
      <group ref={lightsRef}>
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = i * 0.6;
          const height = -1.5 + i * 0.08;
          const radiusAtHeight = (1 - (height + 1.5) / 5) * 2.1;
          return (
            <mesh key={`led-${i}`} position={[
              Math.cos(angle) * radiusAtHeight,
              height,
              Math.sin(angle) * radiusAtHeight
            ]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial 
                color={i % 3 === 0 ? "#ff0000" : i % 3 === 1 ? "#00ff00" : "#ffd700"} 
                emissive={i % 3 === 0 ? "#ff0000" : i % 3 === 1 ? "#00ff00" : "#ffd700"} 
                emissiveIntensity={2} 
              />
            </mesh>
          );
        })}
      </group>

      {/* Hiệu ứng bụi tiên lấp lánh quanh cây */}
      <Sparkles count={50} scale={5} size={2} speed={0.4} color="#ffd700" />

      {/* Các hộp quà dưới gốc */}
      <group position={[0, -2.5, 0]}>
        <Present position={[1.2, 0.25, 0.5]} color="#d42426" rotation={[0, Math.PI / 4, 0]} scale={1.2} />
        <Present position={[-1.0, 0.2, 1.2]} color="#228b22" rotation={[0, -Math.PI / 6, 0]} scale={0.8} />
        <Present position={[0.2, 0.2, -1.5]} color="#ffd700" rotation={[0, Math.PI / 3, 0]} scale={1.1} />
        <Present position={[-1.5, 0.2, -0.8]} color="#00008b" rotation={[0, 0.5, 0]} scale={0.9} />
      </group>
      
      {/* Nền tuyết trắng */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.7, 0]} receiveShadow>
        <circleGeometry args={[15, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
    </group>
  );
};

export default ChristmasTree;
