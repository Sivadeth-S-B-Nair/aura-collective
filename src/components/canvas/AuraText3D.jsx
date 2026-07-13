import { useRef, useEffect } from "react";
import { Text3D } from "@react-three/drei";
import { gsap } from "../../lib/gsap";

const Letter = ({ char, index, targetX, fontUrl }) => {
  const meshRef = useRef();
  const materialRef = useRef(); // ADDED: You must have a ref to the material to fade it

  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    let ctx = gsap.context(() => {

      gsap.set(meshRef.current.position, {
        x: gsap.utils.random(-25, 25),
        y: gsap.utils.random(-15, 15),
        z: gsap.utils.random(20, 60), 
      });
      
      gsap.set(meshRef.current.rotation, {
        x: gsap.utils.random(-Math.PI * 4, Math.PI * 4),
        y: gsap.utils.random(-Math.PI * 4, Math.PI * 4),
        z: gsap.utils.random(-Math.PI * 2, Math.PI * 2),
      });

      // 2. ASSEMBLE
      gsap.to(meshRef.current.position, {
        x: targetX, 
        y: 0,
        z: 0,
        duration: 2.2, 
        ease: "power4.out", 
        delay: index * 0.04, 
      });

      gsap.to(meshRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.2,
        ease: "power4.out", 
        delay: index * 0.04,
      });

      // ADDED: This mathematically fades the 3D text.
      // It starts at 2.8s, perfectly syncing with the curtain close.
      // gsap.to(materialRef.current, {
      //   opacity: 0,
      //   duration: 0.8, // Exact duration of the curtain close in App.jsx
      //   ease: "power4.inOut",
      //   delay: 2.8,
      // });
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
        ref={materialRef}
        color="#d0d0d5" 
        metalness={0.9} 
        roughness={0.15} 
        envMapIntensity={2}
        // transparent={true} // CRITICAL: Without this, WebGL ignores opacity
        opacity={1}
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