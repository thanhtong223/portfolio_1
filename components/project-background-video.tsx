"use client";

import { useEffect, useRef } from "react";

type ProjectBackgroundVideoProps = {
  src: string;
};

export function ProjectBackgroundVideo({ src }: ProjectBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    let frame = 0;
    let reversing = false;
    let previousTime = 0;
    const playbackSpeed = 0.78;

    video.playbackRate = playbackSpeed;

    const reverse = (timestamp: number) => {
      if (!reversing) {
        return;
      }

      if (!previousTime) {
        previousTime = timestamp;
      }

      const elapsed = Math.min((timestamp - previousTime) / 1000, 0.05);
      previousTime = timestamp;
      video.currentTime = Math.max(
        0,
        video.currentTime - elapsed * playbackSpeed,
      );

      if (video.currentTime <= 0.02) {
        reversing = false;
        previousTime = 0;
        video.currentTime = 0;
        void video.play();
        return;
      }

      frame = requestAnimationFrame(reverse);
    };

    const startReverse = () => {
      video.pause();
      reversing = true;
      previousTime = 0;
      frame = requestAnimationFrame(reverse);
    };

    video.addEventListener("ended", startReverse);

    return () => {
      reversing = false;
      cancelAnimationFrame(frame);
      video.removeEventListener("ended", startReverse);
    };
  }, []);

  return (
    <>
      <video
        className="project-highlight-background-video"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        ref={videoRef}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="project-highlight-video-wash" aria-hidden="true" />
    </>
  );
}
