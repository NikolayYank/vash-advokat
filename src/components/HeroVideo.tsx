"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import OptimizedImage from "./OptimizedImage";

const MuxPlayerLazy = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => null,
});

interface Props {
  playbackId: string;
  thumbnailTime: number;
  accentColor?: string;
  posterSrc: string;
  posterAlt: string;
  playLabel: string;
}

export default function HeroVideo({
  playbackId,
  thumbnailTime,
  accentColor = "#d4af37",
  posterSrc,
  posterAlt,
  playLabel,
}: Props) {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <MuxPlayerLazy
        playbackId={playbackId}
        streamType="on-demand"
        thumbnailTime={thumbnailTime}
        accentColor={accentColor}
        autoPlay
        style={{ width: "100%", display: "block", aspectRatio: "16/9" }}
      />
    );
  }

  return (
    <button
      type="button"
      className="hero-video-facade"
      onClick={() => setStarted(true)}
      aria-label={playLabel}
    >
      <OptimizedImage
        src={posterSrc}
        alt={posterAlt}
        width={1200}
        height={675}
        priority
        sizes="(max-width: 720px) 100vw, 600px"
        className="hero-video-facade-img"
      />
      <span className="hero-video-play-btn" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="64" height="64" focusable="false">
          <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.55)" />
          <polygon points="26,20 26,44 46,32" fill="white" />
        </svg>
      </span>
    </button>
  );
}
