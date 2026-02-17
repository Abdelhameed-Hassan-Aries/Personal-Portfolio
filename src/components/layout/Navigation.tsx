"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import Logo from "@/components/ui/Logo";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Highlights", href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navigation() {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen,      setMenuOpen]      = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown, { capture: true });
    return () => document.removeEventListener("pointerdown", handlePointerDown, { capture: true });
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (navClickTimeoutRef.current) {
        clearTimeout(navClickTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (href: string) => {
    const shouldDelayScroll = menuOpen;
    setMenuOpen(false);
    if (navClickTimeoutRef.current) {
      clearTimeout(navClickTimeoutRef.current);
    }

    const scrollToTarget = () => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    if (!shouldDelayScroll) {
      scrollToTarget();
      return;
    }

    navClickTimeoutRef.current = setTimeout(() => {
      scrollToTarget();
      navClickTimeoutRef.current = null;
    }, 300);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
        className={[
          "fixed top-0 left-0 right-0 z-100",
          "transition-all duration-500",
          isScrolled
            ? "bg-space/85 backdrop-blur-xl border-b border-white/6"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Home"
          >
            <Logo size={32} />
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive  = activeSection === sectionId;
              return (
                <li key={label}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={[
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive ? "text-white" : "text-white/50 hover:text-white/90",
                    ].join(" ")}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-white/6 border border-white/8"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
            >
              Let&apos;s Talk
            </motion.a>

            <motion.button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className={[
                "md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/70 hover:text-white hover:bg-white/6 transition-colors",
                menuOpen ? "pointer-events-none" : "",
              ].join(" ")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Full-screen overlay — z-[101] sits above the nav bar (z-100) so the hamburger is fully covered and can't be re-triggered by touch bleed-through */}
            <motion.div
              key="drawer"
              ref={drawerRef}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed inset-0 z-101 md:hidden backdrop-blur-2xl flex flex-col"
              style={{
                background:
                  "linear-gradient(160deg, rgba(15,10,40,0.97) 0%, rgba(8,6,28,0.98) 50%, rgba(4,3,18,0.99) 100%)",
              }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/6">
                <Logo size={28} />
                <motion.button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/6 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Centred nav links */}
              <nav className="flex-1 flex flex-col items-center justify-center px-8">
                <ul className="flex flex-col items-center gap-2 w-full max-w-xs">
                  {NAV_LINKS.map(({ label, href }, i) => {
                    const sectionId = href.replace("#", "");
                    const isActive  = activeSection === sectionId;
                    return (
                      <motion.li
                        key={label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="w-full"
                      >
                        <button
                          onClick={() => handleNavClick(href)}
                          className={[
                            "w-full text-center py-3.5 rounded-xl text-base font-medium transition-all duration-150",
                            isActive
                              ? "text-white bg-white/8 border border-white/12"
                              : "text-white/50 hover:text-white hover:bg-white/4",
                          ].join(" ")}
                        >
                          {label}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer CTA */}
              <div className="px-8 pb-10 pt-4 flex flex-col items-center gap-3">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.06 }}
                  onClick={() => handleNavClick("#contact")}
                  className="w-full max-w-xs py-3.5 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-500 transition-colors text-sm"
                >
                  Let&apos;s Talk
                </motion.button>
                <p className="text-[10px] text-white/20 [font-family:var(--font-jetbrains)]">
                  {siteConfig.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
