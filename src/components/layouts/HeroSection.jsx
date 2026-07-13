import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import CameraLens from '../canvas/CameraLens';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* --- TOP NAVIGATION --- */}
      <header className="navbar">
        <div className="nav-logo">AURA</div>
        
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <div className="nav-dropdown">
            <span>Shoes & Pairs</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
          <a href="#contact">Contact Us</a>
          <a href="#connect">Connect</a>
        </nav>

        <div className="nav-auth">
          <button className="btn-text">Log in</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </header>

      {/* --- MAIN HERO SPLIT --- */}
      <main className="hero-main">
        
        {/* Left Column: Typography & CTA */}
        <div className="hero-copy">
          <span className="eyebrow">PROJECTS . CREATE .</span>
          
          <h1 className="hero-title">
            Sustainable <br/>
            crafting 95% <br/>
            protocol in web.
          </h1>
          
          <p className="hero-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia maiores illum unde eum cumque necessitatibus, id quasi voluptas officia aliquam, iste fuga voluptatem, architecto blanditiis minus error dolor dolorem sunt.
          </p>
          
          <button className="btn-secondary">
            Read More
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Right Column: 3D Asset Container */}
        <div className="hero-canvas-container">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Suspense fallback={null}>
              {/* Studio lighting setup for metallic reflections */}
              <Environment preset="city" />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
              <directionalLight position={[-10, -10, 10]} intensity={1} color="#5ab0ff" />
              
              <CameraLens modelPath="/models/camera.glb" baseScale={30} />
              
              {/* Fake ambient occlusion shadow to ground the floating object */}
              <ContactShadows 
                position={[0, -2.5, 0]} 
                opacity={0.6} 
                scale={10} 
                blur={2.5} 
                far={4} 
              />
            </Suspense>
          </Canvas>
        </div>
      </main>

      {/* --- DECORATIONS & CONTROLS --- */}
      <div className="side-pagination">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <div className="bottom-pagination">
        <div className="line-dot"></div>
        <div className="line-dot active-line"></div>
        <div className="line-dot"></div>
      </div>

      <div className="floating-actions">
        <button className="icon-btn">+</button>
        <button className="icon-btn">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
           </svg>
        </button>
      </div>
    </section>
  );
}