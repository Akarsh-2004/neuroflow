'use client';

import { useState } from 'react';
import { Puzzle, Zap, GitBranch, Cpu, ArrowRight, ChevronRight, Link2, Code, Settings, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamically import the GraphVisualizer component with SSR disabled
const GraphVisualizer = dynamic(
  () => import('@/components/graph-visualizer'),
  { ssr: false, loading: () => <div className="w-full h-[600px] rounded-xl bg-gray-900/50 border border-gray-800 flex items-center justify-center">Loading graph visualizer...</div> }
);

export default function NeuroCreatePage() {
  const features = [
    {
      icon: <Link2 className="h-6 w-6 text-pink-400" />,
      title: "Easy Integrations",
      description: "Connect your favorite apps and services in just a few clicks."
    },
    {
      icon: <Zap className="h-6 w-6 text-pink-400" />,
      title: "Smart Automation",
      description: "Create powerful automations with our intuitive workflow builder."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-pink-400" />,
      title: "Multi-step Workflows",
      description: "Build complex workflows with conditional logic and multiple steps."
    },
    {
      icon: <Cpu className="h-6 w-6 text-pink-400" />,
      title: "AI-Powered",
      description: "Let our AI suggest the best automations for your needs."
    },
    {
      icon: <Code className="h-6 w-6 text-pink-400" />,
      title: "Graph Visualization",
      description: "Visualize complex data relationships with interactive 3D graphs."
    },
    {
      icon: <Settings className="h-6 w-6 text-pink-400" />,
      title: "Customizable",
      description: "Tailor the visualization to match your specific data needs."
    }
  ];
  
  const [activeTab, setActiveTab] = useState<'workflows' | 'graph'>('graph');

  const integrations = [
    { name: 'Slack', icon: '/integrations/slack.svg' },
    { name: 'Notion', icon: '/integrations/notion.svg' },
    { name: 'Google Drive', icon: '/integrations/google-drive.svg' },
    { name: 'Trello', icon: '/integrations/trello.svg' },
    { name: 'GitHub', icon: '/integrations/github.svg' },
    { name: 'Zapier', icon: '/integrations/zapier.svg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent">
              Neuro Create
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Connect your apps, automate workflows, and get more done. 
              Our powerful automation platform makes it easy to create custom integrations without code.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/templates" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                Explore Templates <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Visualization Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Interactive Graph Visualization
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              Explore and interact with your data using our powerful 3D graph visualization tool.
              Connect nodes, analyze relationships, and gain insights like never before.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setActiveTab('graph')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'graph' 
                    ? 'bg-pink-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Graph View
              </button>
              <button
                onClick={() => setActiveTab('workflows')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'workflows' 
                    ? 'bg-pink-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Workflows
              </button>
            </div>
          </div>
          
          {/* Graph Visualization */}
          <div className="mt-8">
            {activeTab === 'graph' ? (
              <div className="bg-gray-900/50 rounded-xl p-1 border border-gray-800">
                <GraphVisualizer />
              </div>
            ) : (
              <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Share2 className="h-8 w-8 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Your Workflows</h3>
                  <p className="text-gray-400 mb-6">
                    Create and manage your automation workflows in one place. 
                    Connect apps, set up triggers, and automate repetitive tasks with ease.
                  </p>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    Create New Workflow
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Features Grid */}
          <div className="mt-24">
            <div className="mx-auto max-w-2xl lg:text-center mb-12">
              <h2 className="text-base font-semibold leading-7 text-pink-400">Features</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to automate your workflow
              </p>
              <p className="mt-4 text-lg text-gray-400">
                Our platform is packed with powerful features to help you build, visualize, and manage your automations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-pink-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-pink-400">Integrations</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Works with your favorite tools
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Connect Neuro Create with thousands of apps and services you already use.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {integrations.map((integration) => (
              <div key={integration.name} className="col-span-1 flex justify-center">
                <div className="h-16 w-32 rounded-lg bg-white/5 flex items-center justify-center p-4 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <span className="text-gray-300 font-medium">{integration.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gray-900">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to automate your workflow?
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Start building for free.</span>
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white">
              Create Account
            </Button>
            <Link href="/templates" className="text-sm font-semibold leading-6 text-white">
              View Templates <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
