"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const rawProgress = useMotionValue(0); // 0 → 1
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 200,
    damping: 40,
  });
  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      rawProgress.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [rawProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-9000">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #6366f1, #a78bfa, #06b6d4)",
        }}
      />
    </div>
  );
}
