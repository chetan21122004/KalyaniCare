"use client";

import { useEffect, useRef, useState } from "react";
import { X, ShieldCheck, Send, Loader2, CheckCircle2, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqereyl";

type FormState = "idle" | "submitting" | "success" | "error";

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("openEnquiryPopup", handleOpen);
    return () => window.removeEventListener("openEnquiryPopup", handleOpen);
  }, []);

  // Trap focus and close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setFormState("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "submitting") return;
    setFormState("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState("success");
        formRef.current?.reset();
        // Auto-close after 3 s on success
        setTimeout(() => handleClose(), 3000);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Book a nanny — enquiry form"
    >
      {/* Panel */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-elevated border border-border animate-in fade-in zoom-in-95 duration-200">

        {/* Brand banner */}
        <div className="relative bg-gradient-brand px-6 pt-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <Baby className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">KalyaniCare</p>
                <p className="font-display text-lg font-bold text-white leading-tight">Book a Nanny</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-sm text-white/75 leading-relaxed">
            Share your requirement — we&apos;ll match you with a verified nanny.
          </p>
        </div>

        {/* Form body */}
        <div className="p-6">
          {formState === "success" ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-deep">Enquiry Received!</h3>
              <p className="text-sm text-foreground/65 max-w-xs">
                Our team will reach out shortly to match you with the right caregiver.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="kcp-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary-deep">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  id="kcp-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full name"
                  className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-medium text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="kcp-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary-deep">
                  WhatsApp / Phone <span className="text-accent">*</span>
                </label>
                <input
                  id="kcp-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-medium text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Area */}
              <div>
                <label htmlFor="kcp-area" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary-deep">
                  Your locality
                </label>
                <input
                  id="kcp-area"
                  name="area"
                  type="text"
                  placeholder="Hinjewadi, Wakad, Baner…"
                  className="w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-medium text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Error */}
              {formState === "error" && (
                <p className="text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">
                  Something went wrong. Please try again or WhatsApp us directly.
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                className="h-12 w-full rounded-xl text-sm font-bold"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Enquiry
                  </>
                )}
              </Button>

              {/* Trust note */}
              <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-foreground/50">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/60" />
                Your details are kept private and secure
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
