"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/5 bg-[#020209]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <Logo size={30} />
          </motion.button>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github,   href: siteConfig.github,                 label: "GitHub"   },
              { icon: Linkedin, href: siteConfig.linkedin,                label: "LinkedIn" },
              { icon: Mail,     href: `mailto:${siteConfig.email}`,       label: "Email"    },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, color: "#a78bfa" }}
                whileTap={{ scale: 0.9 }}
                className="text-white/25 hover:text-white/60 transition-colors duration-200"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl glass border border-white/8 hover:border-indigo-500/30 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/4 text-center">
          <p className="text-xs text-white/15 [font-family:var(--font-jetbrains)]">
            © {new Date().getFullYear()} {siteConfig.name} · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
