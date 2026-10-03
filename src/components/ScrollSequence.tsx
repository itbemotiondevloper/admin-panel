"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollSequence.module.css";

export type ScrollSequenceOverlay = {
  text: string;
  start: number;
  end: number;
  eyebrow?: string;
};

type DecodedFrame = {
  source: ImageBitmap | HTMLImageElement;
  width: number;
  height: number;
  close: () => void;
};
type DeviceHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};
type Geometry = {
  canvasWidth: number;
  canvasHeight: number;
  sourceWidth: number;
  sourceHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ScrollSequenceProps = {
  frameCount: number;
  framePath?: (frameNumber: number, variant: "desktop" | "mobile") => string;
  scrollLengthVh?: number;
  overlays?: ScrollSequenceOverlay[];
  objectPosition?: { x: number; y: number };
  preloadRadius?: number;
  mobileBreakpointPx?: number;
  className?: string;
  ariaLabel?: string;
};

const defaultFramePath = (frameNumber: number, variant: "desktop" | "mobile") =>
  `/scroll-sequence/${variant}/frame-${String(frameNumber).padStart(4, "0")}.webp`;
const defaultOverlays: ScrollSequenceOverlay[] = [];
const defaultObjectPosition = { x: 0.5, y: 0.5 };
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function ScrollSequence({
  frameCount,
  framePath = defaultFramePath,
  scrollLengthVh = 500,
  overlays = defaultOverlays,
  objectPosition = defaultObjectPosition,
  preloadRadius = 8,
  mobileBreakpointPx = 767,
  className = "",
  ariaLabel = "Scroll-controlled animation",
}: ScrollSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas || frameCount < 1) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const hints = navigator as DeviceHints;
    const isMobile = window.matchMedia(`(max-width: ${mobileBreakpointPx}px)`).matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const constrained = isMobile &&
      (Boolean(hints.connection?.saveData) || (hints.deviceMemory ?? 8) <= 4);
    const variant = isMobile ? "mobile" : "desktop";
    const concurrency = constrained ? 3 : isMobile ? 4 : 7;
    const cacheLimit = constrained ? 24 : isMobile ? 36 : 64;
    const ahead = constrained ? 10 : isMobile ? 15 : Math.max(20, Math.round(preloadRadius * 2.5));
    const behind = constrained ? 4 : isMobile ? 5 : Math.max(6, preloadRadius);
    const openingCount = constrained ? 10 : isMobile ? 12 : 16;
    const anchors = [Math.floor(frameCount / 3), Math.floor(2 * frameCount / 3), frameCount - 1];

    const cache = new Map<number, DecodedFrame>();
    const queued = new Map<number, number>();
    const active = new Map<number, AbortController>();
    const failed = new Map<number, number>();
    let disposed = false;
    let targetFrame = 0;
    let drawnFrame = -1;
    let direction = 1;
    let renderRaf = 0;
    let resizeRaf = 0;
    let refreshRaf = 0;
    let readyPublished = false;
    let firstPainted = false;
    let geometry: Geometry | null = null;
    let scrollTrigger: ScrollTrigger | null = null;

    const geometryFor = (frame: DecodedFrame): Geometry => {
      if (geometry && geometry.canvasWidth === canvas.width &&
          geometry.canvasHeight === canvas.height && geometry.sourceWidth === frame.width &&
          geometry.sourceHeight === frame.height) return geometry;

      const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height);
      const width = frame.width * scale;
      const height = frame.height * scale;
      geometry = {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        sourceWidth: frame.width,
        sourceHeight: frame.height,
        x: (canvas.width - width) * clamp(objectPosition.x, 0, 1),
        y: (canvas.height - height) * clamp(objectPosition.y, 0, 1),
        width,
        height,
      };
      return geometry;
    };

    const updateReady = () => {
      if (readyPublished || !firstPainted) return;
      if (reducedMotion) {
        readyPublished = true;
        setIsReady(true);
        return;
      }
      const restored = targetFrame >= openingCount + 8;
      let readyFrames = 0;
      let unavailableFrames = 0;
      if (restored) {
        for (let offset = -3; offset <= 6; offset += 1) {
          const index = targetFrame + offset;
          if (index < 0 || index >= frameCount) continue;
          if (cache.has(index)) readyFrames += 1;
          else if ((failed.get(index) ?? 0) > 1) unavailableFrames += 1;
        }
      } else {
        for (let index = 0; index < Math.min(openingCount, frameCount); index += 1) {
          if (cache.has(index)) readyFrames += 1;
          else if ((failed.get(index) ?? 0) > 1) unavailableFrames += 1;
        }
      }
      const threshold = Math.max(1, (restored ? 7 : Math.min(openingCount, frameCount)) - unavailableFrames);
      const anchorResolved = anchors.some((index) => cache.has(index)) ||
        anchors.every((index) => (failed.get(index) ?? 0) > 1);
      if (readyFrames >= threshold && (anchorResolved || frameCount <= openingCount)) {
        readyPublished = true;
        setIsReady(true);
      }
    };

    const drawFrame = (index: number, frame: DecodedFrame) => {
      const rect = geometryFor(frame);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.fillStyle = "#080908";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(frame.source, rect.x, rect.y, rect.width, rect.height);
      drawnFrame = index;
      firstPainted = true;
      updateReady();
    };

    const bestAvailable = () => {
      if (cache.has(targetFrame)) return targetFrame;
      for (let distance = 1; distance < frameCount; distance += 1) {
        const preferred = targetFrame + distance * direction;
        const other = targetFrame - distance * direction;
        if (cache.has(preferred)) return preferred;
        if (cache.has(other)) return other;
      }
      return -1;
    };

    const render = () => {
      renderRaf = 0;
      if (disposed) return;
      const index = bestAvailable();
      if (index < 0 || index === drawnFrame) return;
      const frame = cache.get(index);
      if (frame) drawFrame(index, frame);
    };
    const requestRender = () => {
      if (!renderRaf) renderRaf = window.requestAnimationFrame(render);
    };

    const trimCache = () => {
      if (cache.size <= cacheLimit) return;
      const protectedFrames = new Set([targetFrame, drawnFrame]);
      for (let distance = -4; distance <= 4; distance += 1) protectedFrames.add(targetFrame + distance);
      for (let distance = 1; distance <= Math.min(12, ahead); distance += 1) {
        protectedFrames.add(targetFrame + distance * direction);
      }
      const candidates = [...cache.keys()]
        .filter((index) => !protectedFrames.has(index))
        .sort((a, b) => Math.abs(b - targetFrame) - Math.abs(a - targetFrame));
      for (const index of candidates) {
        if (cache.size <= cacheLimit) break;
        cache.get(index)?.close();
        cache.delete(index);
      }
    };

    const decodeWithImage = async (blob: Blob): Promise<DecodedFrame> => {
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.decoding = "async";
      try {
        image.src = url;
        await image.decode();
        return {
          source: image,
          width: image.naturalWidth,
          height: image.naturalHeight,
          close: () => { image.src = ""; },
        };
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    const fetchAndDecode = async (index: number, controller: AbortController) => {
      const response = await fetch(framePath(index + 1, variant), { signal: controller.signal });
      if (!response.ok) throw new Error(`Frame ${index + 1}: HTTP ${response.status}`);
      const blob = await response.blob();
      if (controller.signal.aborted) return;
      let frame: DecodedFrame;
      if (typeof createImageBitmap === "function") {
        try {
          const bitmap = await createImageBitmap(blob);
          frame = {
            source: bitmap,
            width: bitmap.width,
            height: bitmap.height,
            close: () => bitmap.close(),
          };
        } catch {
          frame = await decodeWithImage(blob);
        }
      } else {
        frame = await decodeWithImage(blob);
      }
      if (disposed || controller.signal.aborted) {
        frame.close();
        return;
      }
      cache.set(index, frame);
      trimCache();
      updateReady();
      requestRender();
    };

    const pumpQueue = () => {
      if (disposed) return;
      while (active.size < concurrency && queued.size) {
        let selected = -1;
        let priority = Number.POSITIVE_INFINITY;
        for (const [index, value] of queued) {
          if (value < priority) { selected = index; priority = value; }
        }
        if (selected < 0) break;
        queued.delete(selected);
        if (cache.has(selected) || active.has(selected) || (failed.get(selected) ?? 0) > 1) continue;
        const controller = new AbortController();
        active.set(selected, controller);
        void fetchAndDecode(selected, controller)
          .catch(() => {
            if (disposed || controller.signal.aborted) return;
            const attempts = (failed.get(selected) ?? 0) + 1;
            failed.set(selected, attempts);
            if (attempts <= 1) queued.set(selected, 0);
            else updateReady();
          })
          .finally(() => {
            active.delete(selected);
            if (!disposed) pumpQueue();
          });
      }
    };

    const queueFrame = (index: number, priority: number) => {
      if (index < 0 || index >= frameCount || cache.has(index) || active.has(index)) return;
      if ((failed.get(index) ?? 0) > 1) return;
      queued.set(index, Math.min(priority, queued.get(index) ?? Number.POSITIVE_INFINITY));
    };

    const updateQueue = () => {
      queued.clear();
      queueFrame(targetFrame, 0);
      if (!reducedMotion) {
        for (let distance = 1; distance <= Math.max(ahead, behind); distance += 1) {
          if (distance <= ahead) queueFrame(targetFrame + distance * direction, distance);
          if (distance <= behind) queueFrame(targetFrame - distance * direction, distance + ahead);
        }
        if (!readyPublished) {
          for (let index = 0; index < Math.min(openingCount, frameCount); index += 1) {
            queueFrame(index, targetFrame < openingCount + 8 ? index + 1 : 45 + index);
          }
          anchors.forEach((index, position) => queueFrame(index, 60 + position));
        }
      }
      pumpQueue();
    };

    const updateOverlays = (progress: number) => {
      overlays.forEach((overlay, index) => {
        const element = overlayRefs.current[index];
        if (!element) return;
        const start = clamp(overlay.start, 0, 1);
        const end = clamp(overlay.end, start, 1);
        const fade = Math.min(0.035, (end - start) / 4);
        const fadeIn = start === 0 ? 1 : clamp((progress - start) / Math.max(fade, 0.001), 0, 1);
        const fadeOut = end === 1 ? 1 : clamp((end - progress) / Math.max(fade, 0.001), 0, 1);
        gsap.set(element, {
          autoAlpha: Math.min(fadeIn, fadeOut),
          y: (1 - fadeIn) * 24 - (1 - fadeOut) * 18,
        });
      });
    };

    const syncToProgress = (progress: number) => {
      const next = clamp(Math.round(progress * (frameCount - 1)), 0, frameCount - 1);
      if (next !== targetFrame) {
        const jumped = Math.abs(next - targetFrame) > ahead + behind;
        direction = next > targetFrame ? 1 : -1;
        targetFrame = next;
        if (jumped) {
          active.forEach((controller, index) => {
            if (Math.abs(index - next) > ahead + behind &&
                (readyPublished || !anchors.includes(index))) controller.abort();
          });
        }
        updateQueue();
        requestRender();
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      updateOverlays(progress);
    };

    const resizeCanvas = () => {
      resizeRaf = 0;
      const bounds = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, constrained ? 1.25 : isMobile ? 1.5 : 2);
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      geometry = null;
      const frame = cache.get(drawnFrame);
      if (frame) drawFrame(drawnFrame, frame);
      else requestRender();
    };
    const requestResize = () => {
      if (!resizeRaf) resizeRaf = window.requestAnimationFrame(resizeCanvas);
    };

    const resizeObserver = new ResizeObserver(requestResize);
    resizeObserver.observe(canvas);
    window.visualViewport?.addEventListener("resize", requestResize);
    window.addEventListener("resize", requestResize);
    requestResize();

    if (reducedMotion) {
      updateOverlays(0);
    } else {
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => syncToProgress(self.progress),
        onRefresh: (self) => syncToProgress(self.progress),
      });
      syncToProgress(scrollTrigger.progress);
    }
    updateQueue();

    const restoreScrollState = () => {
      ScrollTrigger.refresh();
      if (scrollTrigger) syncToProgress(scrollTrigger.progress);
      requestRender();
    };
    window.addEventListener("pageshow", restoreScrollState);
    refreshRaf = window.requestAnimationFrame(restoreScrollState);

    return () => {
      disposed = true;
      if (renderRaf) window.cancelAnimationFrame(renderRaf);
      if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
      if (refreshRaf) window.cancelAnimationFrame(refreshRaf);
      window.removeEventListener("pageshow", restoreScrollState);
      window.removeEventListener("resize", requestResize);
      window.visualViewport?.removeEventListener("resize", requestResize);
      resizeObserver.disconnect();
      scrollTrigger?.kill();
      active.forEach((controller) => controller.abort());
      active.clear();
      queued.clear();
      cache.forEach((frame) => frame.close());
      cache.clear();
    };
  }, [frameCount, framePath, mobileBreakpointPx, objectPosition.x, objectPosition.y, overlays, preloadRadius]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sequence} ${className}`.trim()}
      style={{ height: `${scrollLengthVh}vh` }}
      aria-label={ariaLabel}
    >
      <div className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.overlays} aria-live="off">
          {overlays.map((overlay, index) => (
            <div
              key={`${overlay.text}-${overlay.start}`}
              ref={(node) => { overlayRefs.current[index] = node; }}
              className={styles.overlay}
            >
              <p className={styles.eyebrow}>
                {overlay.eyebrow ?? String(index + 1).padStart(2, "0")}
              </p>
              <h2 className={styles.title}>{overlay.text}</h2>
            </div>
          ))}
        </div>
        <div className={`${styles.loader} ${isReady ? styles.loaderReady : ""}`} aria-hidden={isReady}>
          Preparing experience
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span ref={progressRef} className={styles.progressFill} />
        </div>
      </div>
    </section>
  );
}
