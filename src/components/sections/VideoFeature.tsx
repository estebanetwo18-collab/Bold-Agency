"use client";

import { useRef, useState } from "react";
import { videoFeature } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function VideoFeature() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="relative bg-paper py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <Reveal className="relative order-1 aspect-video overflow-hidden bg-ink">
          <video
            ref={videoRef}
            src={videoFeature.video}
            poster={videoFeature.poster}
            className="h-full w-full object-cover"
            controls={playing}
            playsInline
            preload="metadata"
          />
          {!playing ? (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Reproducir video"
              className="group absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/30"
            >
              <span className="flex h-20 w-20 items-center justify-center border border-paper/70 bg-ink/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-volt">
                <PlayIcon />
              </span>
            </button>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="order-2">
          <span className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            <span className="h-1.5 w-1.5 bg-volt" />
            {videoFeature.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {videoFeature.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-grey">{videoFeature.body}</p>
          <div className="mt-8">
            <MagneticButton href={videoFeature.cta.href} variant="ink">
              {videoFeature.cta.label}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
      <path d="M1 1.5L19 11L1 20.5V1.5Z" fill="currentColor" className="text-paper" />
    </svg>
  );
}
