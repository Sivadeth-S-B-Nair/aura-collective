import { useState, useRef } from "react";
import Preloader from "./components/ui/Preloader";
import Home from "./pages/Home";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [startTransition, setStartTransition] = useState(false);
  
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const appRef = useRef(null);

  useGSAP(() => {
    if (!startTransition) return;

    const tl = gsap.timeline();

    // 1. Close panels
    tl.to(leftPanelRef.current, { x: "50vw", duration: 0.8, ease: "power3.inOut" }, 0)
      .to(rightPanelRef.current, { x: "-50vw", duration: 0.8, ease: "power3.inOut" }, 0)
      
      // 2. Unmount preloader, mount the Home page
      .call(() => {
        setIsLoading(false);
      })
      
      // 3. Open panels
      .to(leftPanelRef.current, { x: "0vw", duration: 0.8, ease: "power3.inOut" }, "+=0.2")
      .to(rightPanelRef.current, { x: "0vw", duration: 0.8, ease: "power3.inOut" }, "<");
      
  }, { dependencies: [startTransition], scope: appRef });

  return (
    <div ref={appRef}>
      {isLoading && <Preloader onComplete={() => setStartTransition(true)} />}

      <div className="transition-overlay">
        <div className="transition-panel left" ref={leftPanelRef}></div>
        <div className="transition-panel right" ref={rightPanelRef}></div>
      </div>

      {/* Once loading is complete, the Home page mounts behind the closed panels */}
      {!isLoading && <Home />}
    </div>
  );
}

export default App;