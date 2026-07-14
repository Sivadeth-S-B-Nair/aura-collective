import { useRef, useEffect } from 'react';
import { useGLTF, Float } from '@react-three/drei';
import { gsap } from '../../lib/gsap';

export default function CameraLens({ modelPath = '/models/camera.glb', baseScale = 1 }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) return;

    let ctx = gsap.context(() => {
      // 1. Initial State: Start at 10% of whatever baseScale you define
      gsap.set(groupRef.current.scale, { 
        x: baseScale * 0.1, 
        y: baseScale * 0.1, 
        z: baseScale * 0.1 
      });
      gsap.set(groupRef.current.rotation, { x: 1, y: -Math.PI, z: -0.5 });

      // 2. The Reveal: Animate up to the full baseScale
      gsap.to(groupRef.current.scale, {
        x: baseScale, 
        y: baseScale, 
        z: baseScale,
        duration: 2.4,
        ease: "power3.out",
      });

      gsap.to(groupRef.current.rotation, {
        x: 0, 
        y: -Math.PI / 8, 
        z: 0, 
        duration: 2.4,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [baseScale]); // Added baseScale to dependency array

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload('/models/camera.glb');