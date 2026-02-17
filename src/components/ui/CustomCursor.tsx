"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Returns true when the primary input is coarse (touch) or the viewport is narrow. */
function isTouchOrMobile() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 768px)").matches
  );
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  // Lazy initialiser — evaluated once on first render (client only)
  const [hidden, setHidden] = useState<boolean>(
    () => typeof window !== "undefined" && isTouchOrMobile()
  );

  const hoverCheckRef = useRef<number | null>(null);

  useEffect(() => {
    const widthMq = window.matchMedia("(max-width: 768px)");
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const updateHiddenState = () => setHidden(widthMq.matches || coarseMq.matches);
    updateHiddenState();
    widthMq.addEventListener("change", updateHiddenState);
    coarseMq.addEventListener("change", updateHiddenState);

    return () => {
      widthMq.removeEventListener("change", updateHiddenState);
      coarseMq.removeEventListener("change", updateHiddenState);
    };
  }, []);

  useEffect(() => {
    if (hidden) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (hoverCheckRef.current) cancelAnimationFrame(hoverCheckRef.current);
      hoverCheckRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el) {
          const isInteractive = !!el.closest(
            "a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']"
          );
          setIsHovering((prev) => (prev === isInteractive ? prev : isInteractive));
        }
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (hoverCheckRef.current) {
        cancelAnimationFrame(hoverCheckRef.current);
        hoverCheckRef.current = null;
      }
    };
  }, [cursorX, cursorY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-indigo-400"
          animate={{
            width: isClicking ? 6 : 8,
            height: isClicking ? 6 : 8,
            x: "-50%",
            y: "-50%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9998"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-indigo-400/60"
          animate={{
            width: isHovering ? 48 : isClicking ? 20 : 36,
            height: isHovering ? 48 : isClicking ? 20 : 36,
            x: "-50%",
            y: "-50%",
            borderColor: isHovering
              ? "rgba(167,139,250,0.8)"
              : "rgba(99,102,241,0.5)",
            backgroundColor: isHovering
              ? "rgba(99,102,241,0.08)"
              : "transparent",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </motion.div>
    </>
  );
}
