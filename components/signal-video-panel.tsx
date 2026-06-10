"use client";

import { useEffect, useRef, useState } from "react";

type SignalVideoPanelProps = {
  ascii: string;
  code: string;
  detail: string;
  label: string;
  media: string;
  theme: string;
};

export function SignalVideoPanel({
  ascii,
  code,
  detail,
  label,
  media,
  theme,
}: SignalVideoPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const rawRef = useRef<HTMLVideoElement>(null);
  const asciiRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    const raw = rawRef.current;

    if (!panel || !raw || !("IntersectionObserver" in window)) {
      return;
    }

    const canAutoplay =
      window.matchMedia("(min-width: 720px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canAutoplay) {
          void raw.play();
          return;
        }

        raw.pause();
        asciiRef.current?.pause();
      },
      { rootMargin: "160px" },
    );

    observer.observe(panel);

    return () => observer.disconnect();
  }, []);

  function syncAscii() {
    const raw = rawRef.current;
    const asciiVideo = asciiRef.current;

    if (!raw || !asciiVideo || Number.isNaN(raw.currentTime)) {
      return;
    }

    if (Math.abs(asciiVideo.currentTime - raw.currentTime) > 0.035) {
      asciiVideo.currentTime = raw.currentTime;
    }

    return asciiVideo;
  }

  function activate() {
    const asciiVideo = syncAscii();
    void asciiVideo?.play();
    setActive(true);
  }

  function deactivate() {
    asciiRef.current?.pause();
    setActive(false);
  }

  return (
    <div
      ref={panelRef}
      className={`signal-panel signal-panel-${theme} ${active ? "signal-panel-active" : ""}`}
      data-label={label}
    >
      <button
        className="signal-media"
        type="button"
        aria-label={`Show ascii version of ${label}`}
        onBlur={deactivate}
        onFocus={activate}
        onPointerEnter={activate}
        onPointerLeave={deactivate}
      >
        <video
          ref={rawRef}
          className="signal-video signal-video-raw"
          src={media}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={syncAscii}
        />
        <video
          ref={asciiRef}
          className="signal-video signal-video-ascii"
          src={ascii}
          loop
          muted
          playsInline
          preload="none"
        />
      </button>
      <span className="signal-copy">
        <span>{label}</span>
        <code>{code}</code>
        <small>{detail}</small>
      </span>
    </div>
  );
}
