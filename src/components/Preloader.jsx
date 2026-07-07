import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { gsap } from "../lib/gsap";
import "./Preloader.css";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(
    (context, contextSafe) => {
      const split = new SplitText(headlineRef.current, {
        type: "chars",
        charsClass: "char",
      });

      gsap.set(split.chars, {
        x: () => gsap.utils.random(-1200, 1200),
        y: () => gsap.utils.random(-900, 900),
        z: () => gsap.utils.random(-1000, 400),
        rotationX: () => gsap.utils.random(-220, 220),
        rotationY: () => gsap.utils.random(-220, 220),
        rotationZ: () => gsap.utils.random(-120, 120),
        opacity: 0,
        filter: "blur(18px)",
      });

      const runAnimation = contextSafe(() => {
        const tl = gsap.timeline({ onComplete: () => onComplete?.() });

        tl.to(split.chars, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          stagger: { each: 0.035, from: "random" },
        })
          .to(
            split.chars,
            {
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power2.out",
              stagger: { each: 0.035, from: "random" },
            },
            "<0.1"
          )
          .to(containerRef.current, { autoAlpha: 0, duration: 0.6 }, "+=0.3");
      });

      Promise.all([document.fonts.ready]).then(runAnimation);

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