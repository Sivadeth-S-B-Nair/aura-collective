import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { gsap } from "../../lib/gsap";
import AuraText3D from "../canvas/AuraText3D";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const fontAssetUrl = "/fonts/font.json";

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Fade the canvas out.
      // Duration and ease perfectly match the panel closing animation in App.jsx.
      // gsap.to(containerRef.current, {
      //   opacity: 0,
      //   duration: 0.8, 
      //   ease: "power3.inOut",
      //   delay: 2.8, 
      // });

      // 2. Signal App.jsx to close the panels at the exact same moment the fade starts.
      gsap.delayedCall(2.8, () => {
        if (onComplete) onComplete();
      });

    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="preloader" ref={containerRef}>
      <Canvas camera={{ position: [0, 0, 18], fov: 40 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />

          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />

          <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
            <group position={[0, 1, 0]}>
              <AuraText3D text="AURA" fontUrl={fontAssetUrl} />
            </group>

            <group position={[0, -1, 0]}>
              <AuraText3D text="COLLECTIVE" fontUrl={fontAssetUrl} />
            </group>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}