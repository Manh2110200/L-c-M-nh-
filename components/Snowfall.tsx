
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Snowfall: React.FC = () => {
  const count = 1500;
  const mesh = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 1] = Math.random() * 50;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      mesh.current.geometry.attributes.position.array[i * 3 + 1] -= 0.05;
      mesh.current.geometry.attributes.position.array[i * 3] += Math.sin(time + i) * 0.01;
      
      if (mesh.current.geometry.attributes.position.array[i * 3 + 1] < -10) {
        mesh.current.geometry.attributes.position.array[i * 3 + 1] = 40;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ffffff" transparent opacity={0.8} />
    </points>
  );
};

export default Snowfall;
