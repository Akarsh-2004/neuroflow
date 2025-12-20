"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Brain,
  Zap,
  Plug,
  BarChart3,
  Lock,
  Puzzle,
} from "lucide-react";
import Link from "next/link";

/* -------------------- 1. ADVANCED GESTURE: 3D TILT CARD -------------------- */
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

/* -------------------- 3. 3D SLIDESHOW -------------------- */
function Slideshow() {
  const images = ["/1.png", "/2.png", "/3.png"];
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const handleClick = (idx: number) => {
    setActive(idx);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full flex items-center justify-center [perspective:1200px]">
        {images.map((src, idx) => {
          const diff = (idx - active + images.length) % images.length;
          let zIndex = 10;
          let opacity = 0;
          let transform = "translateZ(-200px) rotateY(0deg)";
          let cursor = "cursor-pointer";

          if (diff === 0) {
            zIndex = 30; opacity = 1;
            transform = "translateZ(0px) translateX(0) rotateY(0deg)";
            cursor = "cursor-default";
          } else if (diff === 1) {
            zIndex = 20; opacity = 0.7;
            transform = "translateX(50%) translateZ(-150px) rotateY(-15deg)";
          } else {
            zIndex = 20; opacity = 0.7;
            transform = "translateX(-50%) translateZ(-150px) rotateY(15deg)";
          }

          return (
            <div
              key={src}
              onClick={() => handleClick(idx)}
              className={`absolute w-[320px] h-[200px] sm:w-[500px] sm:h-[320px] md:w-[750px] md:h-[450px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${cursor}`}
              style={{ zIndex, opacity, transform }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black group">
                <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- MAIN PAGE -------------------- */
export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* MOUSE SPOTLIGHT */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.06), transparent 40%)`
        }}
      />

      {/* HERO VIDEO BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-white">
        <video src="/videobg.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65 backdrop-saturate-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      {/* ================= HERO (UPDATED UI) ================= */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32 text-center">
        <h1 className="text-5xl md:text-6xl font-black leading-tight text-white">
          Orchestrate Intelligence with
          <span className="block bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600 bg-clip-text text-transparent">
            Autonomous Automation
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Neuroflow unifies AI workflows, emotion-aware intelligence,
          and quantum-inspired reasoning.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" className="px-8 py-6 font-bold bg-white text-black hover:bg-gray-200 rounded-lg">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 backdrop-blur-md border-white/20 text-white hover:bg-white/10 rounded-lg"
          >
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>
      </section>

      {/* SLIDESHOW */}
      <Slideshow />

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <TiltCard key={stat.label} className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-white/10 group cursor-default">
              <div className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">{stat.value}</div>
              <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* FEATURES VIDEO SECTION */}
      <div className="relative w-full h-[100vh] overflow-hidden flex items-center border-t border-white/5">
        <video src="/2.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70 backdrop-saturate-[0.5]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs uppercase tracking-widest text-indigo-300">Core Intelligence Layer</span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-white">Beyond Automation. <span className="block bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600 bg-clip-text text-transparent">A Thinking System.</span></h2>
            <p className="text-lg text-gray-400 mb-10">Neuroflow combines a <strong>quantum-inspired AI reasoning engine</strong> and <strong>no-code automation fabric</strong>.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {FEATURE_LIST.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors"><item.icon className="h-5 w-5 text-indigo-400" /></div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES - GLASS CARDS */}
      <section className="py-24 relative z-10 bg-black">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <TiltCard key={f.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.07] transition-all group overflow-hidden relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed">{f.description}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* COMP IMAGE */}
      <section className="px-4 pb-20 bg-black">
        <div className="mx-auto max-w-7xl relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img src="/comp.png" alt="Components" className="w-full object-cover opacity-80" />
            </div>
        </div>
      </section>

      {/* MAIN FEATURES SECTION - UPDATED */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-black via-gray-950 to-black">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block mb-3 text-sm font-medium px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              <span className="bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Next-Gen AI Solutions
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Transform your workflow with our cutting-edge AI technologies designed for the future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Automation - New Design */}
            <Link href="/features/ai-automation" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1 block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <Zap className="h-7 w-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Automation</h3>
                <p className="text-gray-400 mb-6">Create intelligent workflows with our no-code AI automation builder that adapts to your needs</p>
                <div className="flex items-center text-indigo-400 group-hover:text-white transition-colors">
                  <span className="mr-2">Explore AI Automation</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            {/* Emotion AI - New Design */}
            <Link href="/features/emotion-ai" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-6 transform group-hover:-rotate-6 transition-transform">
                  <Brain className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Emotion AI</h3>
                <p className="text-gray-400 mb-6">Advanced emotion recognition that works offline, keeping your data private and secure on-device</p>
                <div className="flex items-center text-purple-400 group-hover:text-white transition-colors">
                  <span className="mr-2">Discover Emotion AI</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            {/* Quantum AI - New Design */}
            <Link href="/features/quantum-ai" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1 block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform">
                  <BarChart3 className="h-7 w-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Quantum AI</h3>
                <p className="text-gray-400 mb-6">Leverage quantum-inspired algorithms to solve complex problems with unprecedented speed</p>
                <div className="flex items-center text-cyan-400 group-hover:text-white transition-colors">
                  <span className="mr-2">Explore Quantum AI</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            {/* Neuro Create - New Design */}
            <Link href="/features/neuro-create" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-pink-500/30 transition-all duration-500 hover:-translate-y-1 block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-600/20 flex items-center justify-center mb-6 transform group-hover:-rotate-12 transition-transform">
                  <Puzzle className="h-7 w-7 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Neuro Create</h3>
                <p className="text-gray-400 mb-6">Connect and automate your favorite apps with our powerful integration platform</p>
                <div className="flex items-center text-pink-400 group-hover:text-white transition-colors">
                  <span className="mr-2">Start Building</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="relative overflow-hidden group px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <span className="relative z-10">Get Started with NeuroFlow</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/templates" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="/integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/tutorials" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/community" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/press" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="/gdpr" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-indigo-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                NeuroFlow
              </span>
            </div>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} NeuroFlow. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const STATS = [
  { value: "Offline-First", label: "Privacy-Preserving Execution" },
  { value: "Emotion-Aware", label: "Human-Centric Intelligence" },
  { value: "Quantum-Inspired", label: "Advanced Decision Logic" },
  { value: "No-Code + AI", label: "Composable Automation" },
];

const FEATURE_LIST = [
  { icon: Brain, title: "Quantum Thinking Engine", desc: "Probabilistic, multi-path reasoning." },
  { icon: Zap, title: "AI Automation Fabric", desc: "Workflows powered by autonomous agents." },
  { icon: Lock, title: "Offline & Downloadable", desc: "Run models locally with zero leakage." },
  { icon: Puzzle, title: "Composable Intelligence", desc: "Plug in tools and APIs like blocks." },
];

const FEATURES = [
  { title: "Visual Workflow Designer", description: "Design pipelines using a visual, node-based editor.", icon: <Brain className="h-6 w-6" /> },
  { title: "AI-Powered Intelligence", description: "Embed AI agents for reasoning and adaptive decisions.", icon: <Zap className="h-6 w-6" /> },
  { title: "Composable Integrations", description: "Connect APIs and cloud services seamlessly.", icon: <Plug className="h-5 w-5" /> },
  { title: "Observable Execution", description: "Trace workflows and decisions with logs and metrics.", icon: <BarChart3 className="h-6 w-6" /> },
  { title: "Secure by Design", description: "Encryption, access control, and data sovereignty.", icon: <Lock className="h-6 w-6" /> },
  { title: "Extensible Platform", description: "Extend via APIs, plugins, and embedded logic.", icon: <Puzzle className="h-6 w-6" /> },
];