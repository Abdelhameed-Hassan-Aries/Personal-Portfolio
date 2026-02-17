"use client";

import { useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

interface UseMousePositionOptions {
  enabled?: boolean;
}

export function useMousePosition({ enabled = true }: UseMousePositionOptions = {}) {
  const mouseRef = useRef<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const updateFromCoords = (clientX: number, clientY: number) => {
      mouseRef.current = {
        x: clientX,
        y: clientY,
        normalizedX: (clientX / window.innerWidth) * 2 - 1,
        normalizedY: -((clientY / window.innerHeight) * 2 - 1),
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateFromCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      updateFromCoords(touch.clientX, touch.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      updateFromCoords(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove",  handleMouseMove,  { passive: true });
    window.addEventListener("touchmove",  handleTouchMove,  { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove",  handleMouseMove);
      window.removeEventListener("touchmove",  handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [enabled]);

  return mouseRef;
}
