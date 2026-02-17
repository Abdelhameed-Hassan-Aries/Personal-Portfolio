"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

function FloatingLabel({
  id,
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  disabled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isRaised = focused || value.length > 0;

  const baseClass = [
    "w-full bg-white/4 border rounded-xl px-4 text-white text-sm",
    "[font-family:var(--font-inter)] placeholder-transparent",
    "focus:outline-none transition-colors duration-200 resize-none",
    disabled
      ? "border-white/4 opacity-50 cursor-not-allowed"
      : "border-white/8 focus:border-indigo-500/50",
  ].join(" ");

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={[
          "absolute left-4 pointer-events-none select-none transition-all duration-200",
          isRaised
            ? "top-2 text-[10px] text-indigo-400 [font-family:var(--font-jetbrains)] tracking-wider"
            : "top-1/2 -translate-y-1/2 text-sm text-white/30",
        ].join(" ")}
        style={{ top: multiline && !isRaised ? "1.2rem" : undefined }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          disabled={disabled}
          className={`${baseClass} pt-6 pb-4`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`${baseClass} pt-5 pb-3 h-14`}
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmit] = useState<SubmitState>("idle");
  const [errorMessage, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error ??
            (res.status === 503
              ? "Email service not configured. Add RESEND_API_KEY to .env.local."
              : "Something went wrong. Please try again."),
        );
      }

      setSubmit("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again.",
      );
      setSubmit("error");
    }
  };

  const socials = [
    { icon: Github,   href: siteConfig.github,                 label: "GitHub"   },
    { icon: Linkedin, href: siteConfig.linkedin,                label: "LinkedIn" },
    { icon: Mail,     href: `mailto:${siteConfig.email}`,       label: "Email"    },
  ];

  const isBusy = submitState === "submitting";

  return (
    <section
      id="contact"
      className="relative section-padding"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%), #02020a",
      }}
    >
      <div className="gradient-divider mb-12 sm:mb-20" />

      <div className="max-content">
        <AnimatedSection className="text-center mb-10 sm:mb-16">
          <p className="text-xs [font-family:var(--font-jetbrains)] tracking-[0.4em] text-indigo-400 uppercase mb-4">
            {"// 05. CONTACT"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold [font-family:var(--font-space-grotesk)] text-white">
            Let&apos;s Build
            <br />
            <span className="text-gradient-primary">Something Great</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-white/40 text-sm sm:text-base max-w-xl mx-auto">
            Have a project in mind, a role to fill, or just want to say hi? My
            inbox is always open.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start max-w-5xl mx-auto">
          {/* Left — info */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              <div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Whether you&apos;re a startup looking for a senior frontend
                  engineer, a Shopify brand needing expert development, or just
                  someone with an interesting idea — I&apos;d love to hear from
                  you.
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm [font-family:var(--font-jetbrains)]"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <p className="text-xs [font-family:var(--font-jetbrains)] tracking-widest text-white/25 uppercase mb-4">
                  Find me on
                </p>
                <div className="flex gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.93 }}
                      className="w-10 h-10 rounded-xl glass border border-white/8 hover:border-indigo-500/30 flex items-center justify-center text-white/40 hover:text-white/80 transition-colors duration-200"
                    >
                      <Icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick facts */}
              <div className="space-y-3">
                {[
                  { label: "Response time", value: "< 24 hours"          },
                  { label: "Timezone",      value: "EET (UTC+2)"          },
                  { label: "Open to",       value: "Full-time · Remote"   },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2 border-b border-white/5"
                  >
                    <span className="text-xs text-white/30 [font-family:var(--font-jetbrains)]">
                      {label}
                    </span>
                    <span className="text-xs text-white/60 [font-family:var(--font-jetbrains)]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="glass rounded-2xl p-8 border border-white/7">
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <CheckCircle2 size={52} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white [font-family:var(--font-space-grotesk)]">
                      Message sent!
                    </h3>
                    <p className="text-sm text-white/50">
                      Thanks for reaching out. I&apos;ll get back to you within
                      24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setSubmit("idle");
                        setForm({ name: "", email: "", message: "" });
                      }}
                      className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FloatingLabel
                      id="name"
                      label="Your Name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      disabled={isBusy}
                    />
                    <FloatingLabel
                      id="email"
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      disabled={isBusy}
                    />
                    <FloatingLabel
                      id="message"
                      label="Your Message"
                      value={form.message}
                      onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                      multiline
                      disabled={isBusy}
                    />

                    {/* Error banner */}
                    <AnimatePresence>
                      {submitState === "error" && errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs [font-family:var(--font-jetbrains)]"
                        >
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          {errorMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={isBusy}
                      whileHover={
                        !isBusy
                          ? { scale: 1.02, boxShadow: "0 0 30px rgba(99,102,241,0.35)" }
                          : {}
                      }
                      whileTap={!isBusy ? { scale: 0.98 } : {}}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isBusy ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
