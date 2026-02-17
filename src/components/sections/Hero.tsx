"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { heroData, siteConfig } from "@/data/portfolio";

const TYPING_SPEED   = 80;
const DELETING_SPEED = 45;
const PAUSE_DURATION = 2200;

function TypingAnimation({ roles }: { roles: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex,   setRoleIndex]   = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (phase === "typing") {
      if (displayText.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutRef.current = setTimeout(
          () => setPhase("deleting"),
          PAUSE_DURATION
        );
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, DELETING_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, phase, roleIndex, roles]);

  return (
    <span className="text-gradient-primary">
      {displayText}
      <span className="typing-cursor text-indigo-400 font-thin">|</span>
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.4 },
  },
};

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const handleScrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 55%, rgba(2,2,10,0.65) 0%, rgba(2,2,10,0.25) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-2 w-full max-w-5xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Available badge */}
        {siteConfig.available && (
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium [font-family:var(--font-jetbrains)] tracking-wider bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>
        )}

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm md:text-base [font-family:var(--font-jetbrains)] tracking-[0.2em] sm:tracking-[0.25em] text-white/40 uppercase mb-3 sm:mb-4"
        >
          {heroData.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-bold [font-family:var(--font-space-grotesk)] tracking-tight text-white mb-3 sm:mb-4"
          style={{ lineHeight: 1.05, fontSize: "clamp(2.6rem, 10vw, 6.5rem)" }}
        >
          {heroData.name.split(" ").map((word, i, arr) => (
            <span key={i} className="inline-block mr-[0.2em]">
              {i === arr.length - 1 ? (
                <span className="text-gradient-primary">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </motion.h1>

        {/* Typing animation row */}
        <motion.div
          variants={itemVariants}
          className="font-semibold [font-family:var(--font-space-grotesk)] min-h-8 flex items-center justify-center mb-6 sm:mb-8"
          style={{ fontSize: "clamp(1rem, 4vw, 1.875rem)" }}
        >
          <TypingAnimation roles={heroData.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white/50 leading-relaxed mb-8 sm:mb-12 px-2 sm:px-0"
        >
          {heroData.tagline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200 sm:min-w-[150px]"
          >
            My Journey
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm glass border border-white/12 text-white/80 hover:text-white hover:border-indigo-500/40 transition-all duration-200 sm:min-w-[150px]"
          >
            {heroData.cta.secondary}
          </motion.button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github,   href: siteConfig.github,             label: "GitHub"   },
            { icon: Linkedin, href: siteConfig.linkedin,            label: "LinkedIn" },
            { icon: Mail,     href: `mailto:${siteConfig.email}`,   label: "Email"    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, color: "#a78bfa" }}
              whileTap={{ scale: 0.9 }}
              className="text-white/30 hover:text-white/80 transition-colors duration-200"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={handleScrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-2 flex flex-col items-center gap-2 text-white/25 hover:text-white/60 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs [font-family:var(--font-jetbrains)] tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-1 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #02020a)",
        }}
      />
    </section>
  );
}
