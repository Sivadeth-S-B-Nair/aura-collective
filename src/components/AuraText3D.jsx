import { useRef, useEffect } from "react";
import { Text3D } from "@react-three/drei";
import { gsap } from "../lib/gsap";

const Letter = ({ char, index, targetX, fontUrl }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (!meshRef.current) return;

    let ctx = gsap.context(() => {
      gsap.set(meshRef.current.position, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-20, 20),
        z: gsap.utils.random(-40, 20),
      });
      
      gsap.set(meshRef.current.rotation, {
        x: gsap.utils.random(-Math.PI * 4, Math.PI * 4),
        y: gsap.utils.random(-Math.PI * 4, Math.PI * 4),
        z: gsap.utils.random(-Math.PI * 2, Math.PI * 2),
      });

      gsap.to(meshRef.current.position, {
        x: targetX, 
        y: 0,
        z: 0,
        duration: 2,
        ease: "expo.inOut",
        delay: index * 0.05,
      });

      gsap.to(meshRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.5,
        ease: "expo.inOut",
        delay: index * 0.05,
      });
    });

    return () => ctx.revert();
  }, [index, targetX]);

  return (
    <Text3D
      ref={meshRef}
      font={fontUrl}
      size={1.1}
      height={0.5}
      curveSegments={16}
      bevelEnabled
      bevelThickness={0.06}
      bevelSize={0.04}
      bevelOffset={0}
      bevelSegments={8}
    >
      {char}
      <meshStandardMaterial 
        color="#d0d0d5" 
        metalness={0.9} 
        roughness={0.15} 
        envMapIntensity={2}
      />
    </Text3D>
  );
};

export default function AuraText3D({ text, fontUrl }) {
  const letters = text.split("");
  const letterSpacing = 1.35; 
  
  const totalWidth = (letters.length - 1) * letterSpacing;
  const startX = -totalWidth / 2;

  return (
    <group>
      {letters.map((char, i) => {

        const exactTargetX = startX + (i * letterSpacing);
        
        return (
          <Letter
            key={i}
            char={char}
            index={i}
            targetX={exactTargetX} 
            fontUrl={fontUrl}
          />
        );
      })}
    </group>
  );
}