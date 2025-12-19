"use client";
import React, { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem 1rem 2rem',
      boxSizing: 'border-box',
      borderBottom: '1px solid #e5e7eb',
      background: '#fff',
      zIndex: 10,
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="/logo_neuroflow.svg" alt="Neuroflow Logo" style={{ height: '60px', width: 'auto', display: 'block' }} />
        <span style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}></span>
      </div>
      <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="#features" className="nav-link">Features</a>
        <a href="#how" className="nav-link">How it works</a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="/auth" className="nav-link nav-login">Login</a>
        <a href="/get-started" className="nav-link">Get Started</a>
      </nav>
      <button className="mobile-menu-btn" aria-label="Open menu" style={{ display: 'none', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>
      <nav id="mobile-menu" className="mobile-nav" style={{
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        right: 0,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        borderRadius: '0 0 0.5rem 0.5rem',
        zIndex: 100,
        minWidth: '180px',
        padding: '1rem 0'
      }}>
        <a href="#features" className="nav-link" style={{ padding: '0.75rem 1.5rem' }} onClick={() => setMenuOpen(false)}>Features</a>
        <a href="#how" className="nav-link" style={{ padding: '0.75rem 1.5rem' }} onClick={() => setMenuOpen(false)}>How it works</a>
        <a href="#pricing" className="nav-link" style={{ padding: '0.75rem 1.5rem' }} onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="/auth" className="nav-link nav-login" style={{ padding: '0.75rem 1.5rem' }} onClick={() => setMenuOpen(false)}>Login</a>
        <a href="/get-started" className="nav-link" style={{ padding: '0.75rem 1.5rem' }} onClick={() => setMenuOpen(false)}>Get Started</a>
      </nav>
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 901px) {
          .mobile-nav, .mobile-menu-btn { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
        .nav-link {
          font-weight: 500;
          text-decoration: none;
          color: #222;
          background: transparent;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .nav-link.nav-login {
          border: 1px solid #222;
          margin-left: 1rem;
        }
        .nav-link:hover {
          background: #f3f4f6;
          color: #111;
        }
      `}</style>
    </header>
  );
}