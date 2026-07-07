import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "../lib/gsap";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(headlineRef.current, {
        type: "chars",
        charsClass: "char",
      });

      // 1. Scatter every character to a random position + 3D rotation.
      gsap.set(split.chars, {
        x: () => gsap.utils.random(-800, 800),
        y: () => gsap.utils.random(-800, 800),
        z: () => gsap.utils.random(-800,800),
        rotationX: () => gsap.utils.random(-180, 180),
        rotationY: () => gsap.utils.random(-180, 180),
        rotationZ: () => gsap.utils.random(-90, 90),
        opacity: 0,
      });

      // 2. Only assemble once real assets are ready. Right now that's just
      //    the webfont; later phases will add image/model preloading here.
      Promise.all([document.fonts.ready]).then(() => {
        gsap
          .timeline({ onComplete: () => onComplete?.() })
          .to(split.chars, {
            x: 0,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            stagger: { each: 0.03, from: "random" },
          })
          .to(containerRef.current, { autoAlpha: 0, duration: 0.6 }, "+=0.3");
      });

      return () => split.revert();
    },
    { scope: containerRef }
  );

  return (
    <div className="preloader" ref={containerRef}>
      <h1 className="preloader__headline" ref={headlineRef}>
        AURA COLLECTIVE
      </h1>
    </div>
  );
}