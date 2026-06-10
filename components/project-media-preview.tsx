"use client";

import { MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type ProjectMediaPreviewProps = {
  address?: string;
  alt: string;
  src: string;
};

export function ProjectMediaPreview({
  address = "opollo.onpoint.vn",
  alt,
  src,
}: ProjectMediaPreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const scrollAnimationRef = useRef<Animation | null>(null);
  const cursorAnimationRef = useRef<Animation | null>(null);
  const cursorFollowFrameRef = useRef(0);
  const cursorPositionRef = useRef({ x: 0, y: 0 });
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    const viewport = viewportRef.current;
    const image = imageRef.current;

    if (!frame || !viewport || !image) {
      return;
    }

    const syncDistance = () => {
      setScrollDistance(Math.max(0, image.offsetHeight - viewport.clientHeight));
    };

    const resizeObserver = new ResizeObserver(syncDistance);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );

    image.addEventListener("load", syncDistance);
    resizeObserver.observe(frame);
    resizeObserver.observe(image);
    visibilityObserver.observe(frame);
    syncDistance();

    return () => {
      image.removeEventListener("load", syncDistance);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    if (!coarsePointer || !isVisible || scrollDistance <= 0) {
      return;
    }

    playJourney(true);

    return stopAnimations;
  }, [isVisible, scrollDistance]);

  function stopAnimations() {
    cancelAnimationFrame(cursorFollowFrameRef.current);
    scrollAnimationRef.current?.cancel();
    cursorAnimationRef.current?.cancel();
    scrollAnimationRef.current = null;
    cursorAnimationRef.current = null;
  }

  function playJourney(loop: boolean) {
    const viewport = viewportRef.current;
    const image = imageRef.current;
    const cursor = cursorRef.current;

    if (
      !viewport ||
      !image ||
      !cursor ||
      scrollDistance <= 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    stopAnimations();

    const y = (progress: number) =>
      `translate3d(0, ${Math.round(scrollDistance * progress * -1)}px, 0)`;
    const duration = loop ? 26000 : 22000;
    const iterations = loop ? Infinity : 1;
    const scrollEase = "cubic-bezier(0.45, 0, 0.15, 1)";

    scrollAnimationRef.current = image.animate(
      [
        { transform: y(0), offset: 0, easing: scrollEase },
        { transform: y(0.04), offset: 0.025, easing: scrollEase },
        { transform: y(0.14), offset: 0.2, easing: "linear" },
        { transform: y(0.14), offset: 0.33, easing: scrollEase },
        { transform: y(0.38), offset: 0.5, easing: "linear" },
        { transform: y(0.38), offset: 0.59, easing: scrollEase },
        { transform: y(0.65), offset: 0.76, easing: "linear" },
        { transform: y(0.65), offset: 0.84, easing: scrollEase },
        { transform: y(1), offset: 0.98, easing: "linear" },
        { transform: y(1), offset: 1 },
      ],
      {
        duration,
        direction: loop ? "alternate" : "normal",
        easing: "linear",
        fill: "forwards",
        iterations,
      },
    );

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    const point = (x: number, yPosition: number) =>
      `translate3d(${Math.round(width * x)}px, ${Math.round(
        height * yPosition,
      )}px, 0)`;

    if (loop) {
      cursorAnimationRef.current = cursor.animate(
        [
          { opacity: 1, transform: point(0.69, 0.25), offset: 0, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { opacity: 1, transform: point(0.66, 0.3), offset: 0.025, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { opacity: 1, transform: point(0.58, 0.46), offset: 0.26, easing: "linear" },
          { opacity: 1, transform: point(0.58, 0.46), offset: 0.34, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { opacity: 1, transform: point(0.68, 0.59), offset: 0.51, easing: "linear" },
          { opacity: 1, transform: point(0.68, 0.59), offset: 0.6, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { opacity: 1, transform: point(0.47, 0.43), offset: 0.77, easing: "linear" },
          { opacity: 1, transform: point(0.47, 0.43), offset: 0.85, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          { opacity: 1, transform: point(0.61, 0.55), offset: 0.98, easing: "ease-out" },
          { opacity: 0, transform: point(0.61, 0.55), offset: 1 },
        ],
        {
          duration,
          direction: "alternate",
          easing: "linear",
          fill: "forwards",
          iterations,
        },
      );
    }
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches
    ) {
      return;
    }

    const viewport = viewportRef.current;
    const cursor = cursorRef.current;

    if (!viewport || !cursor) {
      return;
    }

    cursorAnimationRef.current?.cancel();
    cursorAnimationRef.current = null;

    const rect = viewport.getBoundingClientRect();
    cursorTargetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (cursorPositionRef.current.x === 0 && cursorPositionRef.current.y === 0) {
      cursorPositionRef.current = cursorTargetRef.current;
    }

    cursor.style.opacity = "1";
    cancelAnimationFrame(cursorFollowFrameRef.current);

    const follow = () => {
      const current = cursorPositionRef.current;
      const target = cursorTargetRef.current;
      const next = {
        x: current.x + (target.x - current.x) * 0.28,
        y: current.y + (target.y - current.y) * 0.28,
      };

      cursorPositionRef.current = next;
      cursor.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;

      if (
        Math.abs(target.x - next.x) > 0.2 ||
        Math.abs(target.y - next.y) > 0.2
      ) {
        cursorFollowFrameRef.current = requestAnimationFrame(follow);
      }
    };

    cursorFollowFrameRef.current = requestAnimationFrame(follow);
  }

  function hidePointer() {
    const cursor = cursorRef.current;

    cancelAnimationFrame(cursorFollowFrameRef.current);
    if (cursor) {
      cursor.style.opacity = "0";
    }
  }

  function returnToTop() {
    const image = imageRef.current;

    if (!image) {
      return;
    }

    const currentTransform = getComputedStyle(image).transform;
    stopAnimations();
    scrollAnimationRef.current = image.animate(
      [
        { transform: currentTransform === "none" ? "translate3d(0, 0, 0)" : currentTransform },
        { transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 1700,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        fill: "forwards",
      },
    );
  }

  return (
    <div
      className={`project-media-preview${isVisible ? " is-visible" : ""}`}
      onBlur={returnToTop}
      onFocus={() => playJourney(false)}
      onMouseEnter={() => playJourney(false)}
      onMouseLeave={() => {
        hidePointer();
        returnToTop();
      }}
      ref={frameRef}
      tabIndex={0}
    >
      <div className="project-browser-bar" aria-hidden="true">
        <span className="project-browser-controls">
          <i />
          <i />
          <i />
        </span>
        <span className="project-browser-address">{address}</span>
      </div>
      <div
        className="project-browser-viewport"
        onPointerLeave={hidePointer}
        onPointerMove={followPointer}
        ref={viewportRef}
      >
        <img alt={alt} decoding="async" loading="lazy" ref={imageRef} src={src} />
        <span className="project-preview-cursor" ref={cursorRef} aria-hidden="true">
          <MousePointer2 size={18} strokeWidth={1.7} />
        </span>
      </div>
    </div>
  );
}
