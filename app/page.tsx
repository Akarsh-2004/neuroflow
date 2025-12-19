"use client";

import React, { useEffect, useState } from "react";
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

/* -------------------- ENHANCED 3D SLIDESHOW -------------------- */

function Slideshow() {
  const images = ["/1.png", "/2.png", "/3.png"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full flex items-center justify-center [perspective:1200px]">
        {images.map((src, idx) => {
          const diff = (idx - active + images.length) % images.length;
          
          let zIndex = 10;
          let opacity = 0;
          let transform = "translateZ(-200px) rotateY(0deg)";

          if (diff === 0) {
            zIndex = 30;
            opacity = 1;
            transform = "translateZ(0px) translateX(0) rotateY(0deg)";
          } else if (diff === 1) {
            zIndex = 20;
            opacity = 0.7;
            transform = "translateX(50%) translateZ(-150px) rotateY(-15deg)";
          } else {
            zIndex = 20;
            opacity = 0.7;
            transform = "translateX(-50%) translateZ(-150px) rotateY(15deg)";
          }

          return (
            <div
              key={src}
              className="absolute w-[320px] h-[200px] sm:w-[500px] sm:h-[320px] md:w-[750px] md:h-[450px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ zIndex, opacity, transform }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black">
                <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              </div>
              <div 
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-primary/20 blur-[40px] rounded-[100%] transition-opacity duration-1000"
                style={{ opacity: diff === 0 ? 0.6 : 0 }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------- MAIN PAGE -------------------- */

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[100vh] -z-10 overflow-hidden">
        <video
          src="/videobg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
      </div>

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 pt-32 pb-16 text-center z-30">
        <div className="inline-flex items-center gap-2 mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/80">
            Intelligent Systems
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
          <span className="text-black drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.2)]">
            Orchestrate Intelligence with
          </span>
          <span className="block mt-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600 bg-clip-text text-transparent animate-gradient">
            Autonomous Automation
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Neuroflow unifies AI-driven workflows, emotion-aware intelligence,
          offline reasoning, and quantum-inspired decision logic.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-6 rounded-xl font-bold">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 rounded-xl backdrop-blur-md border-white/10 bg-white/5 font-bold">
            <Play className="mr-2 h-4 w-4 fill-current" /> See How It Works
          </Button>
        </div>
      </section>

      {/* SLIDESHOW */}
      <Slideshow />

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:scale-105 transition-transform"
            >
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES - REDUCED TOP SPACE */}
      <section className="pb-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card/70 p-8 hover:-translate-y-2 hover:shadow-2xl transition-all"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMP IMAGE - REDUCED TOP SPACE */}
      <img src="/comp.png" alt="Components" className="w-full mt-4 object-cover" />

      {/* ANIMATION STYLES */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

const STATS = [
  { value: "Offline-First", label: "Privacy-Preserving Execution" },
  { value: "Emotion-Aware", label: "Human-Centric Intelligence" },
  { value: "Quantum-Inspired", label: "Advanced Decision Logic" },
  { value: "No-Code + AI", label: "Composable Automation" },
];

const FEATURES = [
  {
    title: "Visual Workflow Designer",
    description: "Design complex automation pipelines using a visual, node-based editor.",
    icon: <Brain className="h-6 w-6" />,
  },
  {
    title: "AI-Powered Intelligence",
    description: "Embed AI agents for reasoning, prediction, and adaptive decisions.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Composable Integrations",
    description: "Connect APIs, cloud services, and internal tools seamlessly.",
    icon: <Plug className="h-5 w-5" />,
  },
  {
    title: "Observable Execution",
    description: "Trace workflows and AI decisions with logs and metrics.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: "Secure by Design",
    description: "Offline execution, encryption, access control, and data sovereignty.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "Extensible Platform",
    description: "Extend Neuroflow via APIs, plugins, agents, or embedded logic.",
    icon: <Puzzle className="h-6 w-6" />,
  },
];