"use client";

import React, { useState, useEffect } from "react";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 drop-shadow-md">
          <Brain className="h-6 w-6 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            NeuroFlow
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors drop-shadow-sm">
            Features
          </a>
          <a href="#how" className="text-sm font-medium text-gray-300 hover:text-white transition-colors drop-shadow-sm">
            How it works
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors drop-shadow-sm">
            Pricing
          </a>
          <a 
            href="/auth/login" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors drop-shadow-sm"
          >
            Sign In
          </a>
          <Button 
            asChild
            size="sm" 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
          >
            <a href="/auth/register">Get Started</a>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5">
          <a 
            href="#features" 
            className="text-lg font-medium text-gray-200 hover:text-indigo-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how" 
            className="text-lg font-medium text-gray-200 hover:text-indigo-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            How it works
          </a>
          <a 
            href="#pricing" 
            className="text-lg font-medium text-gray-200 hover:text-indigo-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </a>
          <div className="h-px bg-white/10 w-full my-2" />
          <Button 
            asChild
            variant="outline"
            className="w-full bg-black/30 border-gray-700 text-white hover:bg-gray-800/50"
          >
            <a href="/auth/login">Sign In</a>
          </Button>
          <Button 
            asChild
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            <a href="/auth/register">Get Started</a>
          </Button>
        </div>
      )}
    </header>
  );
}