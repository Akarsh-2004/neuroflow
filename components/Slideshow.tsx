"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export default function FeatureSlideshow({
  features,
  interval = 4000,
}: {
  features: Feature[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, interval);
    return () => clearInterval(id);
  }, [features.length, interval]);

  const prev = () =>
    setIndex((i) => (i - 1 + features.length) % features.length);
  const next = () => setIndex((i) => (i + 1) % features.length);

  const feature = features[index];

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Slide */}
      <div className="relative rounded-3xl border border-border bg-card/70 backdrop-blur-sm p-10 transition-all duration-500">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {feature.icon}
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-4">
          {feature.title}
        </h3>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Progress Dots */}
        <div className="mt-8 flex items-center gap-2">
          {features.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-3 backdrop-blur hover:bg-muted transition"
        aria-label="Previous"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        className="absolute -right-16 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-3 backdrop-blur hover:bg-muted transition"
        aria-label="Next"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
