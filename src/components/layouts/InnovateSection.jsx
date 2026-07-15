import React, { useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useGSAP } from "@gsap/react";
import "./InnovateSection.css";

export default function InnovateSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // We bind the timeline to the scroll position of this specific section.
      // It starts when the top of the section hits 60% of the viewport height.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Staggered text reveal (translating up from behind a hidden mask)
      tl.fromTo(
        ".reveal-text",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" },
      );

      // 2. Draw the SVG lines simultaneously with the text
      tl.fromTo(
        ".animated-line",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
        "-=1", // Start slightly after the text begins revealing
      );

      // 3. Fade in the paragraph and button
      tl.fromTo(
        ".innovate-copy",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=1",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section className="innovate-section" ref={sectionRef}>
      {/* Background SVG Grid */}
      <div className="innovate-grid-bg"></div>

      {/* The organic blue lines mimicking the video */}
      <svg
        className="innovate-svg-overlay"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"    
      >
        <path
          className="animated-line"
          d="M 4 600 C 40 469 182 268 261 425 S 574 364 993 74"
          pathLength="100"
        />
        <path
          className="animated-line line-thin"
          d="M 189 509 C 400 450 489 492 813 368 S 530 3 235 259"
          pathLength="100"
        />
      </svg>

      <div className="innovate-container">
        {/* Massive Typography Block */}
        <div className="innovate-heading-wrapper">
          <div className="text-mask">
            <h2 className="reveal-text">INNOVATE.</h2>
          </div>
          <div className="text-mask indent-1">
            <h2 className="reveal-text">CREATE.</h2>
          </div>
          <div className="text-mask indent-2">
            <h2 className="reveal-text">IMPACT.</h2>
          </div>
        </div>

        {/* Copy and CTA Block */}
        <div className="innovate-copy">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident
            vitae dolores ipsum libero, sit culpa beatae placeat id autem ipsa
            qui nihil fuga eligendi architecto, numquam cupiditate. Cumque,
            officiis at!
          </p>
          <button className="btn-dark">
            Read More
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
