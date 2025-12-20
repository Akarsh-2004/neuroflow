import { Brain, Eye, Lock, Cpu, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EmotionAIPage() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: "Real-time Analysis",
      description: "Process and analyze emotions in real-time with low latency."
    },
    {
      icon: <Eye className="h-6 w-6 text-purple-400" />,
      title: "Facial Recognition",
      description: "Advanced facial expression analysis for accurate emotion detection."
    },
    {
      icon: <Lock className="h-6 w-6 text-purple-400" />,
      title: "Privacy First",
      description: "All processing happens on-device, keeping your data private and secure."
    },
    {
      icon: <Cpu className="h-6 w-6 text-purple-400" />,
      title: "Offline Capable",
      description: "Works without an internet connection, perfect for any environment."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent">
              Emotion AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Understand and respond to human emotions with our advanced AI technology. 
              Our offline-capable emotion recognition system brings a new dimension to user interaction.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Download SDK
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/features" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-400">Emotion Intelligence</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Advanced Emotion Recognition Technology
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our Emotion AI understands human emotions with remarkable accuracy, enabling more natural and intuitive interactions.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <div key={index} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gray-900">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to integrate Emotion AI?
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Download our SDK today.</span>
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Get Started
            </Button>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
              Request Demo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
