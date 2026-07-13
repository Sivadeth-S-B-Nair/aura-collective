import React from 'react';
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
            The standard approach to conceptualizing modern designs. 
            Integrating performance with aesthetic precision to build 
            future-proof digital architectures.
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
          {/* This div is your placeholder. 
            When ready, replace the contents of this div with your 
            <Canvas> and 3D Model components. 
          */}
          <div className="canvas-placeholder">
            <span>[ 3D Asset Canvas Area ]</span>
          </div>
        </div>
      </main>

      {/* --- DECORATIONS & CONTROLS --- */}
      {/* Right side pagination */}
      <div className="side-pagination">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      {/* Bottom Center pagination */}
      <div className="bottom-pagination">
        <div className="line-dot"></div>
        <div className="line-dot active-line"></div>
        <div className="line-dot"></div>
      </div>

      {/* Bottom Right Floating Icons */}
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