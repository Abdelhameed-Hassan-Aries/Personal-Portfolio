import { useId } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * AH monogram — interlocking custom letterforms.
 *
 * Design concept:
 *  – The A's right leg and the H's left post are SHARED — one single
 *    diagonal stroke that belongs to both letters simultaneously.
 *  – This negative-space trick makes the mark feel crafted rather than
 *    typeset, and reflects engineering precision.
 *  – A gradient runs top-left indigo → bottom-right cyan across the
 *    whole mark so the shared stroke reads as the "energy" of the logo.
 *  – The background square is dark with a very subtle gradient border.
 */
export default function Logo({ size = 36, className = "" }: LogoProps) {
  const uniqueId = useId().replace(/:/g, "");
  const gId = `lg-${uniqueId}`; // gradient id
  const bgId = `lb-${uniqueId}`; // border gradient id
  const glowId = `lgl-${uniqueId}`; // glow filter id

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Abdelhameed Hassan logo"
    >
      <defs>
        {/* Main gradient — indigo → violet → cyan */}
        <linearGradient id={gId} x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#818cf8" />
          <stop offset="45%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* Border gradient */}
        <linearGradient id={bgId} x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
        </linearGradient>

        {/* Subtle inner glow */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background rounded square */}
      <rect width="44" height="44" rx="11" fill="#080816" />

      {/* Gradient border */}
      <rect
        x="0.6" y="0.6"
        width="42.8" height="42.8"
        rx="10.5"
        stroke={`url(#${bgId})`}
        strokeWidth="1.2"
        fill="none"
      />

      {/*
        ── LETTER ANATOMY ─────────────────────────────────────
        
        The A occupies x: 5 → 22, apex at (13.5, 7)
        The H occupies x: 19 → 39, posts from y:7 → y:37

        KEY TRICK: The A's right leg doubles as the H's left post.
        They meet and share the diagonal from (13.5, 7) down to (22, 37).
        The H's right post is at x=38.

        CROSSBARS:
          A crossbar: y=25, x 8 → 19  (two-thirds down the A)
          H crossbar: y=22, x 22 → 38 (mid-height of the H)

        The two crossbars are at slightly different heights which creates
        a dynamic tension — they don't align, giving the mark movement.
      */}

      {/* ── A left leg: (13.5, 7) → (5, 37) */}
      <line
        x1="13.5" y1="7"
        x2="5"    y2="37"
        stroke={`url(#${gId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── A right leg / H left post (SHARED): (13.5, 7) → (22, 37) */}
      <line
        x1="13.5" y1="7"
        x2="22"   y2="37"
        stroke={`url(#${gId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── A crossbar: x 8.5 → 19, y 26 */}
      <line
        x1="8.5" y1="26"
        x2="19"  y2="26"
        stroke={`url(#${gId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ── H right post: (38, 7) → (38, 37) */}
      <line
        x1="38" y1="7"
        x2="38" y2="37"
        stroke={`url(#${gId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── H crossbar: x 22 → 38, y 22 */}
      <line
        x1="22" y1="22"
        x2="38" y2="22"
        stroke={`url(#${gId})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/*
        ── ACCENT DOT — sits at the apex of the A / top of the shared
           stroke. A tiny filled circle in the brightest gradient stop,
           acting as a "locking pin" for the two letters.
      */}
      <circle
        cx="13.5" cy="7"
        r="1.8"
        fill="#c4b5fd"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
}
