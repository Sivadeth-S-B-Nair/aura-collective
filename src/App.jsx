import { useState, useRef } from "react";
import Preloader from "./components/Preloader";
import { gsap } from "./lib/gsap";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  // This function is triggered by the Preloader when the 3D text finishes
  const handleTransition = () => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. SLAM SHUT: Move panels from off-screen to the center
      tl.to(leftPanelRef.current, { xPercent: 100, duration: 0.8, ease: "power4.inOut" }, 0)
        .to(rightPanelRef.current, { xPercent: -100, duration: 0.8, ease: "power4.inOut" }, 0)
        
        // 2. THE SWAP: The screen is black. We silently kill the 3D canvas and mount the homepage.
        .call(() => {
          setIsLoading(false);
        })
        
        // 3. REVEAL: Open the panels back up to show the homepage
        .to(leftPanelRef.current, { xPercent: 0, duration: 0.8, ease: "power4.inOut" }, "+=0.1")
        .to(rightPanelRef.current, { xPercent: 0, duration: 0.8, ease: "power4.inOut" }, "<");
    });
  };

  return (
    <>
      {/* TRANSITION LAYER: 
        This sits outside the Preloader so it survives the component unmounting 
      */}
      <div className="transition-overlay">
        <div className="transition-panel left" ref={leftPanelRef}></div>
        <div className="transition-panel right" ref={rightPanelRef}></div>
      </div>

      {isLoading && <Preloader onComplete={handleTransition} />}

      {!isLoading && (
        <main>
          <section className="hero">
            <h1>Aura Collective Homepage</h1>
            <p>The 3D canvas is dead. You are now in standard DOM.</p>
          </section>
        </main>
      )}
    </>
  );
}

export default App;