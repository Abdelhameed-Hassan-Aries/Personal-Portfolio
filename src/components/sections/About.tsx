"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { aboutData } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: StatItem & { isInView: boolean }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

const TERM_LINES = [
  { prompt: "$", text: "whoami", type: "cmd" },
  { prompt: ">", text: "Abdelhameed Hassan", type: "output" },
  { prompt: "$", text: "cat role.txt", type: "cmd" },
  { prompt: ">", text: "Senior Frontend Engineer", type: "output" },
  { prompt: "$", text: "ls skills/ | head -4", type: "cmd" },
  { prompt: ">", text: "React  Shopify  TypeScript", type: "output" },
  { prompt: "$", text: "echo $STATUS", type: "cmd" },
  { prompt: ">", text: "Open to work  ✓", type: "success" },
];

function TerminalAvatar({ isInView }: { isInView: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;

    const next = () => {
      if (i < TERM_LINES.length) {
        setVisibleLines(++i);
        timerRef.current = setTimeout(next, i % 2 === 1 ? 420 : 220);
      }
    };

    timerRef.current = setTimeout(next, 600);
    return () => clearTimeout(timerRef.current);
  }, [isInView]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#080818] border border-white/7">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/3 border-b border-white/6">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-3 text-[10px] text-white/25 [font-family:var(--font-jetbrains)] tracking-wider">
          ~/abdelhameed — bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-2 overflow-hidden">
        {TERM_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={
              visibleLines > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }
            }
            transition={{ duration: 0.25 }}
            className="flex items-start gap-2 leading-relaxed"
          >
            <span
              className={[
                "text-xs [font-family:var(--font-jetbrains)] select-none shrink-0",
                line.type === "cmd" ? "text-indigo-400" : "text-white/20",
              ].join(" ")}
            >
              {line.prompt}
            </span>
            <span
              className={[
                "text-xs [font-family:var(--font-jetbrains)]",
                line.type === "cmd"
                  ? "text-white/80"
                  : line.type === "success"
                    ? "text-emerald-400"
                    : "text-cyan-300/80",
              ].join(" ")}
            >
              {line.text}
            </span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        {visibleLines >= TERM_LINES.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-indigo-400 [font-family:var(--font-jetbrains)]">
              $
            </span>
            <span className="typing-cursor text-white/60 text-xs [font-family:var(--font-jetbrains)]">
              ▌
            </span>
          </div>
        )}
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
          backgroundSize: "100% 3px",
        }}
      />
    </div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const avatarRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isAvatarInView = useInView(avatarRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative section-padding"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(99,102,241,0.04) 0%, transparent 70%), #02020a",
      }}
    >
      {/* Top divider */}
      <div className="gradient-divider mb-12 sm:mb-20" />

      <div className="max-content">
        {/* Section label */}
        <AnimatedSection className="text-center mb-10 sm:mb-20">
          <p className="text-xs [font-family:var(--font-jetbrains)] tracking-[0.4em] text-indigo-400 uppercase mb-4">
            {"// 01. ABOUT"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold [font-family:var(--font-space-grotesk)] text-white">
            Who I Am
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* Terminal — first on mobile, right on desktop */}
          <div className="order-1 lg:order-2 space-y-6">
            <AnimatedSection delay={0.1} direction="right">
              <div
                ref={avatarRef}
                className="relative mx-auto w-full max-w-sm lg:mx-0"
              >
                {/* Outer glow */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-40 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(6,182,212,0.2))",
                    filter: "blur(12px)",
                  }}
                />
                {/* Tilt border */}
                <div
                  className="absolute inset-0 rounded-2xl border border-indigo-500/15 pointer-events-none"
                  style={{ transform: "rotate(2deg) scale(1.02)" }}
                />
                <div className="relative h-[280px] sm:h-[280px]">
                  <TerminalAvatar isInView={isAvatarInView} />
                </div>
              </div>
            </AnimatedSection>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutData.stats.map((stat, i) => (
                <AnimatedSection
                  key={stat.label}
                  delay={0.2 + i * 0.1}
                  direction="up"
                >
                  <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/6 hover:border-indigo-500/25 transition-colors duration-300">
                    <p className="text-2xl sm:text-3xl font-bold [font-family:var(--font-space-grotesk)] text-gradient-primary mb-1">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        label={stat.label}
                        isInView={isStatsInView}
                      />
                    </p>
                    <p className="text-[10px] sm:text-xs text-white/40 [font-family:var(--font-jetbrains)]">
                      {stat.label}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Bio — second on mobile, left on desktop */}
          <div className="order-2 lg:order-1 space-y-5 sm:space-y-6">
            {aboutData.bio.map((paragraph, i) => (
              <AnimatedSection key={i} delay={i * 0.15} direction="left">
                <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
                  {paragraph}
                </p>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={0.4} direction="left">
              <ul className="space-y-2.5 sm:space-y-3 pt-1">
                {aboutData.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-xs sm:text-sm text-white/55"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-indigo-400 mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
